import jwt from "jsonwebtoken";

function decodeJWT({ config }) {
  return (token) => {
    const jwtSecret = config.get("app.jwtSecret");
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
    });
  };
}

export default decodeJWT;
