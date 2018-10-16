const path = require('path')
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        console.log('custom config')
        config.resolve.alias.set("@page",path.join(__dirname,"src/views"))
    }
}
