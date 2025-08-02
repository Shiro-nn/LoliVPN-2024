use tauri::command;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Server {
    id: String,
    name: String,
    flag: String,
    ping: String,
    load: String,
    x: f32,
    y: f32,
    premium: bool,
    region: String,
}

#[derive(Serialize)]
pub struct VPNStatus {
    connected: bool,
    error: Option<String>,
}

#[derive(Serialize)]
pub struct VPNStats {
    download_speed: f32,
    upload_speed: f32,
    bytes_downloaded: u64,
    bytes_uploaded: u64,
}

#[command]
pub async fn connect_vpn(server_id: String) -> Result<VPNStatus, String> {
    // Simulate VPN connection
    println!("Connecting to VPN server: {}", server_id);
    Ok(VPNStatus {
        connected: true,
        error: None
    })
}

#[command]
pub async fn disconnect_vpn() -> Result<VPNStatus, String> {
    // Simulate VPN disconnection
    println!("Disconnecting VPN");
    Ok(VPNStatus {
        connected: false,
        error: None
    })
}

#[command]
pub async fn get_servers() -> Result<Vec<Server>, String> {
    // Simulate server list
    Ok(vec![
        Server {
            id: "us-ny".to_string(),
            name: "New York".to_string(),
            flag: "🇺🇸".to_string(),
            ping: "45ms".to_string(),
            load: "low".to_string(),
            x: 20.0,
            y: 30.0,
            premium: false,
            region: "americas".to_string(),
        },
        Server {
            id: "uk-lon".to_string(),
            name: "London".to_string(),
            flag: "🇬🇧".to_string(),
            ping: "72ms".to_string(),
            load: "medium".to_string(),
            x: 40.0,
            y: 20.0,
            premium: true,
            region: "europe".to_string(),
        },
        Server {
            id: "jp-tky".to_string(),
            name: "Tokyo".to_string(),
            flag: "🇯🇵".to_string(),
            ping: "120ms".to_string(),
            load: "high".to_string(),
            x: 80.0,
            y: 35.0,
            premium: false,
            region: "asia".to_string(),
        },
        Server {
            id: "auto".to_string(),
            name: "Auto".to_string(),
            flag: "🌍".to_string(),
            ping: "0ms".to_string(),
            load: "low".to_string(),
            x: 0.0,
            y: 0.0,
            premium: false,
            region: "global".to_string(),
        }
    ])
}