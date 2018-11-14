const path = require('path');

export default {
    entry: 'src/index.js',
    extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    env: {
        development: {
            extraBabelPlugins: ['dva-hmr'],
        },
    },
    alias: {
        utils: path.resolve(__dirname, 'src/utils'),
        src: path.resolve(__dirname, 'src/'),
        components: path.resolve(__dirname, 'src/components/'),
    },
    ignoreMomentLocale: true,
    theme: './src/theme.js',
    html: {
        template: './src/index.ejs',
    },
    disableDynamicImport: true,
    publicPath: '/',
    hash: true,
    /* proxy: {
        '/api': {
            target: 'http://localhost:8000/api',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
    }, */
};
