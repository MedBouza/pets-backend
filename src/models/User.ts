import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
}
export interface IUserModel extends IUser, Document {}

// TODO : add password with encryption (MD5)
// add email and timestamp
const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true },
);
UserSchema.pre('save', async function (NextFunction) {
  if (!this.isModified('password')) {
    NextFunction();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
UserSchema.set('toJSON', {
  transform: (doc, res) => {
    delete res.password;
    delete res.__v;
    return res;
  },
});

export default mongoose.model<IUserModel>('Users', UserSchema);
