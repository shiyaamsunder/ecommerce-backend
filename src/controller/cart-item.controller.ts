import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'http-errors';
import { get } from 'lodash';
import { findAndUpdate, getCartItems } from '../service/cart-item.service';
import { findUser } from '../service/user.service';

export const getCartItemsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = get(req, 'user');

    const userData = await getCartItems({ _id: user.id });
    const cart = get(userData, 'cart');

    return res.send({ cart });
  } catch (error) {
    return next(new InternalServerError());
  }
};

export const updateCartHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = get(req, 'user');
    const cart = get(req.body, 'cart');
    const updateduser = await findAndUpdate(
      { _id: user.id },
      { cart: cart },
      {}
    );

    res.send({ message: 'Cart updated' });
  } catch (error) {
    console.log(error);
    return next(new InternalServerError());
  }
};
