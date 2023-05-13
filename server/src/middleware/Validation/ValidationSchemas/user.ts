import Joi from "joi";
import { IUser } from "../../../models";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_!@#$%^&*]).{8,}$/;

export const userSchema = {
  create: Joi.object<IUser>({
    userName: Joi.string().required(),
    email: Joi.string().email().regex(emailRegex).required(),
    password: Joi.string().regex(passwordRegex).required(),
    avatar: Joi.string(),
    isAdmin: Joi.boolean().default(false),
  }),
  update: Joi.object<IUser>({
    userName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    avatar: Joi.string(),
    isAdmin: Joi.boolean(),
  }).min(1),
};
