const path = require('path');

module.exports = {
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    src: path.resolve(__dirname, './src/'),
                    components: path.join(__dirname, './src/components'),
                    utils: path.join(__dirname, './src/utils'),
                },
            },
        ],
        [
            'import',
            {
                libraryName: 'antd',
                style: true, // or 'css'
            },
        ],
    ],
};
