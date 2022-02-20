import Joi from "joi";
import { email, requiredString } from ".";

export const submitTalkSchema = Joi.object({
  title: requiredString,
  description: requiredString,
  durationInMinutes: Joi.number().integer().min(1).required(),
  name: requiredString,
  email: email.required(),
  professionalTitle: Joi.string().trim().allow(""),
  company: Joi.string().trim().allow(""),
  bio: requiredString,
  socials: Joi.object({
    linkedin: Joi.string()
      .uri({ scheme: ["https"] }),
    twitter: Joi.string()
      .uri({ scheme: ["https"] }),
  }),
  photoUrl: Joi.string()
    .uri({ scheme: ["https"] }),
});

export const attendTalkSchema = Joi.object({
  name: requiredString,
  email: email.required(),
});
