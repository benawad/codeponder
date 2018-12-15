const withTypescript = require("@zeit/next-typescript")
const withCSS = require("@zeit/next-css")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

// const wcss = withCss({
//   webpack: config => {
//     console.log(config)
//     config.plugins.unshift(
//       new MonacoWebpackPlugin({
//         languages: ["json"],
//       })
//     )
//     config.module.rules.push({
//       test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/i,
//       use: {
//         loader: "url-loader",
//         options: {
//           limit: 8192,
//           publicPath: "./",
//           outputPath: "static/css/",
//           name: "[name].[ext]",
//         },
//       },
//     })
//     return config
//   },
// })

module.exports = withCSS(
  withTypescript({
    webpack(config) {
      config.node = {
        fs: "empty",
      }
      config.plugins.push(new MonacoWebpackPlugin())
      return config
    },
  })
)
