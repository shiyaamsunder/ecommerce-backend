import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery
} from 'mongoose';
import CartItem, { CartItemDocument } from '../model/cart-item.model';

export const getCartItems = async (
  query: FilterQuery<CartItemDocument>,
  options: QueryOptions
) => {
  return CartItem.findOne(query, options)
    .populate({
      path: 'items',
      populate: 'product'
    })
    .lean();
};

export function findAndUpdate(
  query: FilterQuery<CartItemDocument>,
  update: UpdateQuery<CartItemDocument>,
  options: QueryOptions = {}
) {
  return CartItem.findOneAndUpdate(query, update, options);
}

export function deleteCart(query: FilterQuery<CartItemDocument>) {
  return CartItem.deleteOne(query);
}
