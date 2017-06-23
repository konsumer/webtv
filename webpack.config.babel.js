import { DefinePlugin, optimize } from 'webpack'
import { resolve } from 'path'
import BabiliPlugin from 'babili-webpack-plugin'
const { ModuleConcatenationPlugin } = optimize

const config = {
  entry: {
    app: [
      './src/index'
    ]
  },
  output: {
    path: resolve(__dirname, './webroot/build'), // YOUR OUTPUT LOCATION
    publicPath: '/build/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new ModuleConcatenationPlugin())
  config.plugins.push(new BabiliPlugin())
}

export default config
