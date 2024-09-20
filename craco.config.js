const path = require('path')

module.exports = {
    //webpack config
    webpack: {
        //Set up an alias
        alias: {
            //replace src with @
            '@': path.resolve(__dirname, 'src')
        }
    }
}