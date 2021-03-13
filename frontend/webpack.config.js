module.exports = {
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
