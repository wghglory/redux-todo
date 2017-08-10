const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // create index.html injecting index_bundle.js in dist folder
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = {
    entry: ['babel-polyfill', './src/index.js'],  // es7 async await
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',   // debug source from chrome debugger
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                // background: url('../assets/img/x.png')
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { modules: false, importLoaders: 1 } },
                        {
                            loader: 'postcss-loader',
                            // Note: if postcss.config.js is in root, don't use config path. Use only file is another folder
                            // options: {
                            //   config: {
                            //     path: './config/postcss.config.js'
                            //   }
                            // }

                            // if not using postcss.config.js
                            // options: {
                            //   plugins: () => [
                            //     require('autoprefixer')(),
                            //     require('cssnano')()
                            //   ]
                            // }

                            options: {
                                config: {
                                    ctx: {
                                        cssnano: {},
                                        autoprefixer: {}
                                    }
                                }
                            }
                        }
                    ]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { modules: false, importLoaders: 1 } },
                        {
                            loader: 'postcss-loader',
                            // Note: if postcss.config.js is in root, don't use config path. Use only file is another folder
                            // options: {
                            //   config: {
                            //     path: './config/postcss.config.js'
                            //   }
                            // }

                            // if not using postcss.config.js
                            // options: {
                            //   plugins: () => [
                            //     require('autoprefixer')(),
                            //     require('cssnano')()
                            //   ]
                            // }

                            options: {
                                config: {
                                    ctx: {
                                        cssnano: {},
                                        autoprefixer: {}
                                    }
                                }
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.csv$/,
                loader: 'dsv-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV
        }),
        new ExtractTextPlugin('style.css')
    ]
};

/*// 1. package.json npm run build will set node env production. 
// 2. NODE_ENV in DefinePlugin: webpack will build this into bundle.js so React realizes it's for production now
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}
*/

module.exports = config;