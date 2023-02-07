import mongoose, { Document, Schema } from 'mongoose';
export interface IAuth {
  email: string;
  accessToken: string;
  refreshToken: string;
}
export interface IAuthModel extends IAuth, Document {}
const AuthSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true },
);
export default mongoose.model<IAuthModel>('Users', AuthSchema);
