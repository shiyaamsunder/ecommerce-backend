import { Express, Response, Request, NextFunction } from 'express';
import { NotFound } from 'http-errors';
import {
  getCartItemsHandler,
  updateCartHandler
} from './controller/cart-item.controller';
import {
  getAllProductsHandler,
  getSingleProductHandler,
  getAllProductCategoriesHandler,
  getProductsFromCategory
} from './controller/product.controller';
import {
  createUserHandler,
  loginUserHandler
} from './controller/user.controller';
import { requiresUser } from './middleware';
import validate from './middleware/validateRequest';
import {
  createUserSchema,
  createUserSessionSchema
} from './schema/user.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Get all products
  app.get('/api/products', getAllProductsHandler);

  // Get all product categories
  app.get('/api/products/categories', getAllProductCategoriesHandler);

  // Get all products from a single category
  app.get('/api/products/categories/:category', getProductsFromCategory);

  // Get Single Product
  app.get('/api/products/:productId', getSingleProductHandler);

  // Get cart items
  app.get('/api/cart', requiresUser, getCartItemsHandler);

  // Update cart items
  app.post('/api/cart', requiresUser, updateCartHandler);

  // Register user
  app.post(
    '/api/users/register',
    validate(createUserSchema),
    createUserHandler
  );

  // Login user
  app.post(
    '/api/users/login',
    validate(createUserSessionSchema),
    loginUserHandler
  );

  //  Error handling
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(new NotFound('This route does not exist'));
  });

  app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });
}
