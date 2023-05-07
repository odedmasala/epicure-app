import Joi from "joi";
import { IChef } from "../../../models";

export const chefsSchema = {
    create: Joi.object<IChef>({
      fName: Joi.string().required(),
      lName: Joi.string().required(),
      fullName: Joi.string().required(),
      image: Joi.string().required(),
      description: Joi.string().required(),
      weekChef: Joi.boolean().default(false),
      newChef: Joi.boolean().default(false),
      viewed: Joi.number().required(),
    }),
    update: Joi.object<IChef>({
      fName: Joi.string(),
      lName: Joi.string(),
      fullName: Joi.string(),
      image: Joi.string(),
      description: Joi.string(),
      weekChef: Joi.boolean(),
      newChef: Joi.boolean(),
      viewed: Joi.number(),
    }),
  }