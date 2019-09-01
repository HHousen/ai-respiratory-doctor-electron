const webpack = require('webpack')
// const rules = require('./webpack.rules');

module.exports = {
    // Put your normal webpack config below here
    // module: {
    //   rules,
    // },
    plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          Swal: "sweetalert2"
        })
    ]
  };
  