import { OAuth2Client } from "google-auth-library";
import logger from "infra/logger";
import UnauthorizedError from "interfaces/http/errors/Unauthorized";

function signInWithGoogle({ config, attendeeRepository, generateJwt }) {
  return async (idToken) => {
    const googleClientID = config.get("oauth.googleClientID");
    const client = new OAuth2Client(googleClientID);
    try {
      const token = await client.verifyIdToken({
        idToken,
        audience: googleClientID,
      });
      const payload = token.getPayload();
      let attendee = await attendeeRepository.find({ email: payload.email });
      if (!attendee) {
        attendee = await attendeeRepository.createDoc({
          name: `${payload.given_name} ${payload.family_name}`,
          email: payload.email,
          photoUrl: payload.picture,
        });
      }
      const authToken = generateJwt(attendee._id);

      return {
        user: attendee,
        token: authToken,
      };
    } catch (error) {
      logger.error("An error occurred in google sign in", {
        error: error.message || error.toString(),
        stack: error.stack,
      });
      if (error.toString().includes("Wrong number of segments in token")) {
        throw new UnauthorizedError("Could not sign in using your google ID token");
      }
      throw error;
    }
  };
}

export default signInWithGoogle;
