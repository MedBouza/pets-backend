import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}
export interface IUserModel extends IUser, Document {}

// TODO : add password with encryption (MD5)
// add email and timestamp
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
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
