
const webpack = require('webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuedashboard/'
    : '/',
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    https: false, // https:{type:Boolean}
    open: true,
    proxy: 'http://localhost:3000'
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
      })
    ]
  }
}
