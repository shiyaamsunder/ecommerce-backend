import mongoose from 'mongoose';
import { ProductDocument } from './product.model';
import { UserDocument } from './user.model';

export interface CartItemDocument extends mongoose.Document {
  items: { product: ProductDocument['_id']; amount: number }[];
  user: UserDocument['_id'][];
}

const CartItemSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'product' },
      amount: { type: Number, default: true }
    }
  ],
  user: { type: mongoose.Types.ObjectId, ref: 'user' }
});

const CartItem = mongoose.model<CartItemDocument>('cartitems', CartItemSchema);

export default CartItem;
