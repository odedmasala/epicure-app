import { chefsSchema, restaurantSchema, dishSchema, userSchema, orderSchema } from "../ValidationSchemas";

export const ValidationSchemas = {
  chef: chefsSchema,
  restaurant: restaurantSchema,
  dish: dishSchema,
  user: userSchema,
  order: orderSchema
};
