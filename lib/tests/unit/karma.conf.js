// Fire up a demo server in order to test some API actions.
require("./server")

const webpack = require("webpack")
var merge = require("webpack-merge")
var baseConfig = require("../../../build/webpack.base.config.js")
var webpackConfig = merge(baseConfig, {
  devtool: "#inline-source-map",
  plugins: [
    // expose env vars to the test configuration file
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "test"),
      "process.env.VUE_ENV": "\"client\"",
      "process.env.BASE_API": JSON.stringify(process.env.BASE_API || "http://localhost:1437/v1"),
      "process.env.COMMENT_API": JSON.stringify(process.env.COMMENT_API),
      "process.env.FB_APP_ID": JSON.stringify(process.env.FB_APP_ID),
      "process.env.IRS_SEARCH_API_URL": JSON.stringify(process.env.IRS_SEARCH_API_URL)
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ["PhantomJS"],
    frameworks: ["mocha", "sinon-chai"],
    reporters: ["spec", "coverage"],
    files: ["./index.js"],
    coverageReporter: {
      dir: "./coverage",
      reporters: [
        { type: "lcov", subdir: "." },
        { type: "text-summary" }
      ]
    },
    preprocessors: {
      "./index.js": ["webpack", "sourcemap"]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      quiet: true
    }
  })
}
