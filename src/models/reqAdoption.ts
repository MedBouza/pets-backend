import mongoose, { Document, Schema } from 'mongoose';
import { IPetsModel } from './Pets';
import { IUserModel } from './User';
export interface IReqAdoption {
  sender: IUserModel;
  pet: IPetsModel;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
export interface IReqAdoptionModel extends IReqAdoption, Document {}
const reqAdoptionSchema = new Schema(
  {
    status: { type: String, default: 'PENDING' },
    sender: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    pet: { type: mongoose.SchemaTypes.ObjectId, ref: 'Pets' },
  },
  { timestamps: true },
);
export default mongoose.model<IReqAdoptionModel>(
  'ReqAdoption',
  reqAdoptionSchema,
);
