import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFound } from 'http-errors';
import {
  findAllProducts,
  findOneProduct,
  findAllProductsCategories,
} from '../service/product.service';

export const getAllProductsHandler = async (req: Request, res: Response) => {
  const products = await findAllProducts();

  return res.send(products);
};

export const getSingleProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId;

  try {
    const product = await findOneProduct(productId);
    return res.send(product);
  } catch (error) {
    return next(new NotFound('Product not found'));
  }
};

export const getAllProductCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await findAllProductsCategories();
    return res.send(categories);
  } catch (error) {
    console.log(error);
    return next(new InternalServerError());
  }
};
