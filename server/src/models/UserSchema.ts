import { Date, Schema, model } from "mongoose";

export interface IUser {
  userName: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { versionKey: false, suppressReservedKeysWarning: true, timestamps: true }
);

const Users = model<IUser>("users", userSchema);

export default Users;
