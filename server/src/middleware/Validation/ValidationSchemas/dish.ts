import Joi from "joi";
import { IDish} from "../../../models";

export const dishSchema = {
    create: Joi.object<IDish>({
      restId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number().required(),
      quantity: Joi.number(),
      image: Joi.string().required(),
      side: Joi.array().items(Joi.string()),
      changesOptions: Joi.array().items(Joi.string()),
      category: Joi.array().items(
        Joi.string().valid("Spicy", "Vegetarian", "Vegan")
      ),
      mealTime: Joi.string().valid("Breakfast", "Lunch", "Dinner"),
      subcategory: Joi.string(),
    }),
    update: Joi.object<IDish>({
      restId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      quantity: Joi.number(),
      image: Joi.string(),
      side: Joi.array().items(Joi.string()),
      changesOptions: Joi.array().items(Joi.string()),
      category: Joi.array().items(
        Joi.string().valid("Spicy", "Vegetarian", "Vegan")
      ),
      mealTime: Joi.string().valid("Breakfast", "Lunch", "Dinner"),
      subcategory: Joi.string(),
    }).min(1),
  }