import { object, string, ref } from 'joi';

export const createUserSchema = object({
  body: object({
    email: string().email().required(),
    name: string().required(),
    password: string()
      .required()
      .min(6)
      .pattern(/^[a-zA-Z0-9_,-]*$/),
    passwordConfirmation: ref('password'),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    email: string().email().required(),
    password: string()
      .required()
      .min(6)
      .pattern(/^[a-zA-Z0-9_,-]*$/),
  }),
});
