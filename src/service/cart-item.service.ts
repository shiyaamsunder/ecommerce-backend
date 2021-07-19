import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import CartItem, { CartItemDocument } from '../model/cart-item.model';
import User, { UserDocument } from '../model/user.model';

export const getCartItems = async (
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => {
  return User.findOne(query, {}, options).populate('cart');
};

export const createCart = async (
  input: DocumentDefinition<CartItemDocument>
) => {
  try {
    return await CartItem.create(input);
  } catch (error) {
    throw new Error(error);
  }
};

export function findAndUpdate(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  return User.findOneAndUpdate(query, update, options);
}

export function deleteCart(query: FilterQuery<CartItemDocument>) {
  return CartItem.deleteOne(query);
}
