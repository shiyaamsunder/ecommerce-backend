import { AnySchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import log from '../lib/logger';
import { BadRequest, UnprocessableEntity } from 'http-errors';

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.validate({
        body: req.body,
      });

      if (validation.error?.isJoi) {
        console.log(validation.error);
        throw new UnprocessableEntity(validation.error.message);
      }
      return next();
    } catch (err) {
      return next(new UnprocessableEntity());
    }
  };

export default validate;
