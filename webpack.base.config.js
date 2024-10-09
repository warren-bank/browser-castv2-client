const webpack      = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const path         = require('path')

module.exports = {
  entry: './src/globals.js',
  externals: {
    castv2: 'castv2'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'castv2-client.js',
    sourceMapFilename: 'castv2-client.map'
  },
  target: ['web'],
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
      path.resolve('../node_modules')
    ],
    fallback: {
      "events": require.resolve("events/"),
      "util":   require.resolve("util/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false
  },
  optimization: {
    nodeEnv: 'production', 
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          compress: true,
          sourceMap: true
        }
      }),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
