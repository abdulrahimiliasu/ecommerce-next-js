const nextTranslate = require("next-translate");

module.exports = {
  ...nextTranslate(),
  reactStrictMode: true,
  images: {
    domains: [
      "images.ctfassets.net",
      "firebasestorage.googleapis.com",
      "media.graphcms.com",
    ],
  },
};
