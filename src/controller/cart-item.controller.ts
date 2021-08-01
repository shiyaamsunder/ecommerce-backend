import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'http-errors';
import { get, omit, pick } from 'lodash';
import { flatten } from '../helpers';
import { findAndUpdate, getCartItems } from '../service/cart-item.service';

export const getCartItemsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = get(req, 'user');
    const cartWithUserId = await getCartItems(
      { user: user.id },
      { lean: true }
    );
    const nestedCartedData = omit(cartWithUserId, 'user');

    // const cart = nestedCartedData.items.map((item) => flatten(item));
    const cart = nestedCartedData.items.map((item) => {
      return {
        amount: item.amount,
        ...item.product._doc
      };
    });
    return res.send(cart);
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
    console.log(req.body);
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
