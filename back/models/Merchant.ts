import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 8
export interface IMerchant extends Document {
  email: string;
  name: string;
  password: string;
  ownerFirstName: string;
  ownerLastName: string;
  description: string;
  address: string;
}

export const MerchantSchema: Schema<IMerchant> = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  password: { type: String, required: true },
  ownerFirstName: { type: String, required: false },
  ownerLastName: { type: String, required: false },
  description: { type: String, required: false },
  address: { type: String, required: false },
});

//Before saving, hash the password
MerchantSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
 });

export const Merchant: Model<IMerchant> = model('Merchant', MerchantSchema);


