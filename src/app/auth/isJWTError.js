function isJWTError() {
  return (error) => {
    const jwtErrors = [
      "TokenExpiredError",
      "JsonWebTokenError",
      "NotBeforeError",
    ];
    return jwtErrors.includes(error.name);
  };
}

export default isJWTError;
