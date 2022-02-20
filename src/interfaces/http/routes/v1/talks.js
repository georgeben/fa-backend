import { Router } from "express";
import { makeInvoker } from "awilix-express";
import validator from "express-joi-validation";
import TalkController from "interfaces/http/controllers/TalkController";
import { attendTalkSchema, submitTalkSchema } from "interfaces/http/validations/talk.validation";
import methodNotAllowedHandler from "interfaces/http/middleware/methodNotAllowed";

const router = Router();
const api = makeInvoker(TalkController);
const validate = validator.createValidator({
  passError: true,
});

router
  .route("/")
  .get(
    api("getAll"),
  )
  .post(
    validate.body(submitTalkSchema),
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
    validate.body(attendTalkSchema),
    api("attend"),
  )
  .all(methodNotAllowedHandler);

export default router;
