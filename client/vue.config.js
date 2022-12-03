process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_TITLE = "Some CRUD app here";
process.env.VUE_APP_API_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8090/api"
    : "https://domain.domain/api";

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,

  chainWebpack: (config) =>
    config.plugin("html").tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    }),

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.output.filename =
        "js/[name].[contenthash:8].min.js" +
        "?v=" +
        process.env.VUE_APP_VERSION;
      config.output.chunkFilename =
        "js/[name].[contenthash:8].min.js" +
        "?v=" +
        process.env.VUE_APP_VERSION;
    } else {
      config.output.filename = "js/[name].js";
      config.output.chunkFilename = "js/[name].js";
    }
  },

  transpileDependencies: ["vuetify"],
};
