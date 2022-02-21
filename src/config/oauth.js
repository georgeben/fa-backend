const config = {
  googleClientID: {
    doc: "Google client ID",
    format: "*",
    default: null,
    env: "GOOGLE_CLIENT_ID",
    sensitive: true,
  },
};

exports.oauth = config;
