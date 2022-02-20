import Joi from "joi";

export const requiredString = Joi.string().trim().required();

export const email = Joi.string()
  .trim()
  .email({ minDomainSegments: 2 });
