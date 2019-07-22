var webpackConfig =  require('@vue/cli-service/webpack.config.js')
module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            'tests/**/*.spec.js',   //tests目录下，所有.spce.js结尾的测试文件
        ],
        preprocessors: {
          'src/**/*.js': ['webpack'],
           '**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        reporters: ['spec'],
        browsers: ['Chrome'],
        colors: true,
        autoWatch: true,
        singleRun: false,
        client: {
          captureConsole: true // 设置由 terminal 捕捉 browser 的输出
        },
        concurrency: Infinity
    })
}


