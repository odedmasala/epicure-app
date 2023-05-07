import Joi from "joi";
import { IOrder, IOrderItem } from "../../../models";

const orderItemSchema = Joi.object<IOrderItem>({
  dish: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  quantity: Joi.number().min(1).required(),
});

export const orderSchema = {
  create: Joi.object<IOrder>({
    user: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    restaurant: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    dishes: Joi.array().items(orderItemSchema).required(),
    totalAmount: Joi.number().required(),
    address: Joi.string().required(),
    status: Joi.string().valid("Pending", "In Progress", "Completed", "Cancelled"),
  }),
  update: Joi.object<IOrder>({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    restaurant: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    dishes: Joi.array().items(orderItemSchema),
    totalAmount: Joi.number(),
    address: Joi.string(),
    status: Joi.string().valid("Pending", "In Progress", "Completed", "Cancelled"),
  }).min(1),
};
