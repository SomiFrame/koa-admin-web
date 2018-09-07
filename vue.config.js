const path = require('path')
module.exports = {
    chainWebpack: config => {
        console.log('custom config')
        config.resolve.alias.set("@page",path.join(__dirname,"src/views"))
    }
}
