import mongoose from 'mongoose';
import { ProductDocument } from './product.model';

export interface CartItemDocument extends mongoose.Document {
  quantity: number;
  items: [ProductDocument['_id']];
}

const CartItemSchema = new mongoose.Schema({
  quantity: { type: Number, default: true },
  items: [{ type: mongoose.Types.ObjectId, ref: 'products' }],
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
});

const CartItem = mongoose.model<CartItemDocument>('cartitems', CartItemSchema);

export default CartItem;
