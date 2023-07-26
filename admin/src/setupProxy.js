const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://amuseapi.wheelgo.net/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
