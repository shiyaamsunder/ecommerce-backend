import { NextFunction, Request, Response } from 'express';
import {
  Conflict,
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} from 'http-errors';
import { omit } from 'lodash';
import { createUser, validatePassword } from '../service/user.service';
import log from '../lib/logger';
import { sign } from '../utils/jwt.utils';
import config from 'config';

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (err) {
    if (err.isJoi === true) {
      console.log(err);
      return next(new UnprocessableEntity());
    }
    console.log(err);
    return next(new Conflict('User already exists'));
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await validatePassword(req.body);

    if (!user) {
      return next(new NotFound('Invalid username or password'));
    }

    // CREATE ACCESS TOKEN
    const accessToken = sign(
      { id: user._id },
      {
        expiresIn: config.get('accessTokenTtl'),
      }
    );

    // CREATE REFERSH TOKEN
    const refreshToken = sign(
      { id: user._id },
      {
        expiresIn: config.get('refreshTokenTtl'),
      }
    );
    return res.send({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return next(new InternalServerError());
  }
};
