// webpack.prod.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].js", // JS in /js folder
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans dist folder before build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css", // CSS in /css folder
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // Minify CSS
      new TerserPlugin(), // Minify JS
    ],
    splitChunks: {
      chunks: "all",
    },
  },
});
