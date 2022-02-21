import jwt from "jsonwebtoken";

function generateJWT({ config }) {
  return (userId, options = {}) => {
    const jwtSecret = config.get("app.jwtSecret");

    const token = jwt.sign(
      {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
      },
      jwtSecret,
      options,
    );

    return token;
  };
}

export default generateJWT;
