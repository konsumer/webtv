import { DefinePlugin, optimize } from 'webpack'
import { resolve } from 'path'
import BabiliPlugin from 'babili-webpack-plugin'
const { ModuleConcatenationPlugin } = optimize

const env = {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}

if (process.env.API_URL_BASE) {
  env['process.env'].API_URL_BASE = JSON.stringify(process.env.API_URL_BASE)
}

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
        use: [
          {loader: 'babel-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
              sourceMap: process.env.NODE_ENV !== 'production',
              modules: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
              sourceMap: process.env.NODE_ENV !== 'production'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin(env)
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new ModuleConcatenationPlugin())
  config.plugins.push(new BabiliPlugin())
} else {
  config.devtool = 'source-map'
}

export default config
