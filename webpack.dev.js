// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // In dev: inject into JS
      },
    ],
  },
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
  },
});
