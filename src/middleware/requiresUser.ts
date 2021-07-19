import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { Forbidden } from 'http-errors';

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, 'user');

  if (!user) {
    return next(new Forbidden());
  }

  return next();
};

export default requiresUser;
