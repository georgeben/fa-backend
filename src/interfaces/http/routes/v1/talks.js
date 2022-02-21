import { Router } from "express";
import { makeInvoker } from "awilix-express";
import validator from "express-joi-validation";
import TalkController from "interfaces/http/controllers/TalkController";
import { submitTalkSchema } from "interfaces/http/validations/talk.validation";
import methodNotAllowedHandler from "interfaces/http/middleware/methodNotAllowed";
import CheckAuthentication from "interfaces/http/middleware/checkAuthentication";

const router = Router();
const api = makeInvoker(TalkController);
const authPolicy = makeInvoker(CheckAuthentication);
const validate = validator.createValidator({
  passError: true,
});

router
  .route("/")
  .get(
    api("getAll"),
  )
  .post(
    validate.body(submitTalkSchema, { joi: { abortEarly: true } }),
    api("submit"),
  )
  .all(methodNotAllowedHandler);

router
  .route("/:slug")
  .get(
    api("getOne"),
  )
  .all(methodNotAllowedHandler);

router
  .route("/:slug/attend")
  .post(
    authPolicy("isLoggedIn"),
    api("attend"),
  )
  .all(methodNotAllowedHandler);

router
  .route("/:id/chats")
  .get(
    authPolicy("isLoggedIn"),
    api("listChats"),
  )
  .all(methodNotAllowedHandler);

export default router;
