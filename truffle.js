module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/rivets.js",
      "javascripts/m.js",
      "javascripts/script.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  deploy: [
    // "MetaCoin",
    // "ConvertLib",
    "Monument"
  ],
  rpc: {
    host: "localhost",
    port: 8101
  }
};
