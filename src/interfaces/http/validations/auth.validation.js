import Joi from "joi";

export const googleSignInSchema = Joi.object({
  id_token: Joi.string().trim().required(),
});
