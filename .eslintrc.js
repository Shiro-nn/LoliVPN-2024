module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2022: true
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-typescript',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}