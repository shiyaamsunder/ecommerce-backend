import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'http-errors';
import { get, omit, pick } from 'lodash';
import { findAndUpdate, getCartItems } from '../service/cart-item.service';

export const getCartItemsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = get(req, 'user');
    const cartWithUserId = await getCartItems({ user: user.id });
    const nestedCartedData = omit(cartWithUserId, 'user');

    // const cart = nestedCartedData.items.map((item) => flatten(item));
    return res.send(nestedCartedData);
  } catch (error) {
    console.log(error);
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
    const updatedCart = await findAndUpdate({ user: user.id }, { items: cart });

    if (updatedCart) {
      res.send({ message: 'Cart updated', cart: updatedCart });
    } else {
      return next();
    }
  } catch (error) {
    console.log(error);
    return next(new InternalServerError());
  }
};
