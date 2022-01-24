const { createProxyMiddleware } = require('http-proxy-middleware');
const GRAPHQL_ENDPOINT = "http://demo.nexpwa.com/graphql/"
module.exports = function (app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: GRAPHQL_ENDPOINT,
      changeOrigin: true,
    })
  );
};