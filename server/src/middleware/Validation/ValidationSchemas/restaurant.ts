import Joi from "joi";
import { IRestaurant ,Address} from "../../../models";

export const restaurantSchema = {
    create: Joi.object<IRestaurant>({
      name: Joi.string().required(),
      chef: Joi.string().required(),
      image: Joi.string().required(),
      image2: Joi.string(),
      chefId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      address: Joi.object<Address>({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
      }),
      phone: Joi.string(),
      email: Joi.string(),
      website: Joi.string(),
      new: Joi.boolean().default(false),
      open: Joi.boolean().default(false),
      higherPrice: Joi.number().required(),
      lowerPrice: Joi.number().required(),
      rate: Joi.number().required(),
    }),
    update: Joi.object<IRestaurant>({
      name: Joi.string(),
      chef: Joi.string(),
      image: Joi.string(),
      image2: Joi.string(),
      chefId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      address: Joi.object<Address>({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
      }),
      phone: Joi.string(),
      email: Joi.string(),
      website: Joi.string(),
      new: Joi.boolean(),
      open: Joi.boolean(),
      higherPrice: Joi.number(),
      lowerPrice: Joi.number(),
      rate: Joi.number(),
    }).min(1),
  }