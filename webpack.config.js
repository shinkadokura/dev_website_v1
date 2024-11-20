const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',

  // エントリーポイントをJSのみ指定
  entry: {
    'index.min': path.resolve(__dirname, "./src/assets/js/index.js"),
  },

  output: {
    path: path.resolve(__dirname, './cms/wp-content/themes/theme_name/common/'),
    filename: 'js/[name].js',
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  module: {
    rules: [
      // SCSS ファイルを直接処理
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // CSS を別ファイルとして抽出
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
              sourceMap: true,
            },
          },
          'postcss-loader', // PostCSS 設定
          'sass-loader', // Sass -> CSS 変換
        ],
      },
      // JS ファイルを Babel で処理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), // 出力先を一旦クリーンアップ
    new MiniCssExtractPlugin({
      filename: 'css/styles.min.css', // 出力するCSSファイルの名前
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `${path.resolve(__dirname, 'src')}/assets/img/`,
          to: `${path.resolve(__dirname, 'cms/wp-content/themes/theme_name')}/common/img/`,
        },
        {
          from: `${path.resolve(__dirname, 'src')}/assets/fonts/`,
          to: `${path.resolve(__dirname, 'cms/wp-content/themes/theme_name')}/common/fonts/`,
        },
      ],
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      // Terser プラグインで JS を圧縮
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // コンソールのログを削除
          },
        },
        extractComments: false, // コメントを別ファイルに出力しない
      }),
      new ImageMinimizerPlugin({
        test: /\.(jpe?g)$/i,
        deleteOriginalAssets: false,
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 70
              }
            }
          }
        },
        generator: [
          {
            filename: "[path][name][ext]",
            type: "asset",
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 70
                }
              }
            }
          },
          {
            filename: "[path][name][ext]",
            type: "asset",
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                avif: {
                  quality: 70
                }
              }
            }
          }
        ]
      }),
      new ImageMinimizerPlugin({
        test: /\.(png)$/i,
        deleteOriginalAssets: false,
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              png: {
                quality: 70
              }
            }
          }
        },
        generator: [
          {
            // filename: "[path][name].png[ext]",
            filename: "[path][name][ext]",
            type: "asset",
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 70
                }
              }
            }
          },
          {
            filename: "[path][name][ext]",
            type: "asset",
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                avif: {
                  quality: 70
                }
              }
            }
          }
        ]
      }),

      new ImageMinimizerPlugin({
        test: /\.(svg)$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.svgoMinify,
          options: {
            encodeOptions: {
              // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
              multipass: true,
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // customize default plugin options
                      inlineStyles: {
                        onlyMatchedOnce: false,
                      },
                      // or disable plugins
                      removeDoctype: false,
                    }
                  }
                }
              ]
            }
          }
        }
      })

    ],
  },

  target: ["web", "es5"],

  stats: {
    warningsFilter: /sass-loader/,
  },  

  watchOptions: {
    ignored: /node_modules/,
  },
};
