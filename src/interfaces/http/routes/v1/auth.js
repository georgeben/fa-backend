import { Router } from "express";
import { makeInvoker } from "awilix-express";
import validator from "express-joi-validation";
import CheckAuthentication from "interfaces/http/middleware/checkAuthentication";
import AuthController from "interfaces/http/controllers/AuthController";
import MethodNotAllowedHandler from "interfaces/http/middleware/methodNotAllowed";
import { googleSignInSchema } from "interfaces/http/validations/auth.validation";

const router = Router();
const api = makeInvoker(AuthController);
const authPolicy = makeInvoker(CheckAuthentication);
const validate = validator.createValidator({
  passError: true,
});

router
  .route("/google")
  .post(
    authPolicy("allowAny"),
    validate.body(googleSignInSchema),
    api("googleSignIn"),
  )
  .all(MethodNotAllowedHandler);

router
  .route("/me")
  .get(
    authPolicy("isLoggedIn"),
    api("getCurrentUser"),
  )
  .all(MethodNotAllowedHandler);

export default router;
