
const webpack = require('webpack')

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    https: false, // https:{type:Boolean}
    open: true
  },
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
  }
}