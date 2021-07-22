import { FilterQuery, QueryOptions } from 'mongoose';

import Product, { ProductDocument } from '../model/product.model';

export const findAllProducts = () => {
  return Product.find();
};

export const findAllProductsByQuery = async (
  query: FilterQuery<ProductDocument>
) => {
  return Product.find(query);
};

export const findOneProduct = (
  query: string,
  options: QueryOptions = { lean: true }
) => {
  return Product.findById(query, {}, options);
};

export const findAllProductsCategories = async () => {
  const categories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        category: { $first: '$category' },
        image: { $first: '$image' }
      }
    }
  ]);
  return categories;
};
