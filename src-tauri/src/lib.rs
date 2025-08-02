use tauri::{
    tray::TrayIconBuilder,
    menu::{Menu, MenuItemBuilder},
    AppHandle, Manager
};
use tauri_plugin_window_state::StateFlags;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default()
            .with_state_flags(StateFlags::all())
            .build()
        )
        // .plugin(tauri_plugin_vpn::init())
        .setup(|app| {
            // Создание элементов меню
            let quit = MenuItemBuilder::with_id("quit", "Quit").build(app)?;
            let show = MenuItemBuilder::with_id("show", "Show").build(app)?;

            // Создание меню для трея
            let tray_menu = Menu::with_items(app, &[&show, &quit])?;

            // Создание системного трея
            let _tray = TrayIconBuilder::new()
                .menu(&tray_menu)
                .on_menu_event(move |app, event| {
                    match event.id().as_ref() {
                        "quit" => {
                            std::process::exit(0);
                        }
                        "show" => {
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                        _ => {}
                    }
                })
                .build(app)?;

            Ok(())
        })
        // .invoke_handler(tauri::generate_handler![
        //     tauri_plugin_vpn::connect_vpn,
        //     tauri_plugin_vpn::disconnect_vpn,
        //     tauri_plugin_vpn::get_servers
        // ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}