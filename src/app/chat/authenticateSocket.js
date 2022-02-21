function authenticateSocket({ decodeJwt, attendeeRepository }) {
  return async (socket, next) => {
    const { token } = socket.handshake.auth;
    if (token) {
      const payload = await decodeJwt(token);
      const user = await attendeeRepository.find({ _id: payload.sub });
      // eslint-disable-next-line no-param-reassign
      socket.user = user;
    }
    next();
  };
}

export default authenticateSocket;
