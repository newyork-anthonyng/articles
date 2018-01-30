const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "app.js"),

  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  
  node: {
    __dirname: false
  }
};
