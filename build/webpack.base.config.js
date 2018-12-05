const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      path.resolve(__dirname, '../src/assets/scss/base.scss')
    ]
  }
}


module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'Components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    alias: {
      'scss-loader': 'sass-loader'
    }
  },  
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          },
          loaders: {
            sass: {
              sassResourcesLoader
            },
            scss: {
              sassResourcesLoader
            }
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true }
                },
                'stylus-loader'
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    indentedSyntax: true,
                    minimize: true
                  }
                },
                "sass-loader", // compiles Sass to CSS
                sassResourcesLoader
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'sass-loader', sassResourcesLoader]
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        /*
         * TODO: this is generating an error only in Heroku /nonprofits/43138428 route.
         * Disabled for now, needs to be checked out.
         */
        /*
        new webpack.optimize.ModuleConcatenationPlugin(), */
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
}
