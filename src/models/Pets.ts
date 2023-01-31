import mongoose, { Document, Schema } from 'mongoose';
import { IUserModel } from './User';
export interface IPets {
   name: string;
   age: Number;
   ownerId: IUserModel | string;
}
export interface IPetsModel extends IPets, Document {}
const PetsSchema = new Schema(
   {
      name: String,
      age: Number,
      ownerId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' }
   },
   { timestamps: true }
);
export default mongoose.model<IPetsModel>('Pets', PetsSchema);
