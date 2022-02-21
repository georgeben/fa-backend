import BaseController from "./BaseController";

class AuthController extends BaseController {
  constructor({ signInWithGoogle, getLoggedInUser }) {
    super();
    this.signInWithGoogle = signInWithGoogle;
    this.getLoggedInUser = getLoggedInUser;
  }

  async googleSignIn(req, res) {
    const response = await this.signInWithGoogle(req.body.id_token);
    return this.responseBuilder.onSuccess(res, "Successfully signed in", response);
  }

  async getCurrentUser(req, res) {
    const attendee = await this.getLoggedInUser();
    return this.responseBuilder.onSuccess(res, "Successfully fetched user", attendee);
  }
}

export default AuthController;
