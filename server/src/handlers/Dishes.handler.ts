import { Dishes, IDish } from "../models";
import { Types } from "mongoose";
import { ErrorHandler, HttpStatusCode, HttpErrorMessage } from "../exceptions";


export default class DishHandler {
  static async getAllDishes() {
    try {
      return await Dishes.find({});
    } catch (error) {
      console.error(`Error in getAllDishes method: ${error}`);
      throw error;
    }
  }

  static async getDish(id: string) {
    try {
      return await Dishes.findById(id);
    } catch (error) {
      console.error(`Error in getDish method: ${error}`);
      throw error;
    }
  }
  static async getDishByRestaurantId(restaurantId: string) {
    try {
      return await Dishes.find({ restId: restaurantId });
    } catch (error) {
      console.error(`Error in getDishByRestaurantId method: ${error}`);
    }
  }
  static async updateDish(id: string, obj: any) {
    try {
      return await Dishes.findByIdAndUpdate(id, obj);
    } catch (error) {
      console.error(`Error in updateDish method: ${error}`);
      throw error;
    }
  }

  static async deleteDish(id: string) {
    try {
      return await Dishes.findByIdAndRemove(id);
    } catch (error) {
      console.error(`Error in deleteDish method: ${error}`);
      throw error;
    }
  }

  static async addDish(obj: IDish) {
    try {
      obj.restId = obj.restId.toString();
      const existingDishes = await Dishes.findOne({
        name: obj.name,
        restId: obj.restId,
      });

      if (existingDishes) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_ACCEPTABLE,
          HttpErrorMessage.NOT_ACCEPTABLE
        );
      }
      obj.restId = obj.restId.toString();
      const newDish = new Dishes({
        restId: new Types.ObjectId(obj.restId),
        name: obj.name,
        description: obj.description,
        price: obj.price,
        quantity: obj.quantity,
        image: obj.image,
        side: obj.side,
        changesOptions: obj.changesOptions,
        category: obj.category,
        mealTime: obj.mealTime,
        subcategory: obj.subcategory,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
      });

      return await newDish.save();
    } catch (error) {
      console.error(`Error in addDish method: ${error}`);
      throw error;
    }
  }
  static async addManyDishes(dishes: IDish[]) {
    try {
      const dishInstances: IDish[] = [];

      for (const dish of dishes) {
        const existingDish = await Dishes.findOne({
          restId: dish.restId,
          name: dish.name,
        });

        if (existingDish) {
          throw ErrorHandler.createHttpError(
            HttpStatusCode.NOT_ACCEPTABLE,
            HttpErrorMessage.NOT_ACCEPTABLE
          );
        }

        dish.restId = dish.restId.toString();
        const newDish = new Dishes({
          restId: new Types.ObjectId(dish.restId),
          name: dish.name,
          description: dish.description,
          price: dish.price,
          quantity: dish.quantity,
          image: dish.image,
          side: dish.side,
          changesOptions: dish.changesOptions,
          category: dish.category,
          mealTime: dish.mealTime,
          subcategory: dish.subcategory,
          createdAt: dish.createdAt,
          updatedAt: dish.updatedAt,
        });

        dishInstances.push(newDish);
      }

      return await Dishes.insertMany(dishInstances);
    } catch (error) {
      console.error(`Error in addManyDishes method: ${error}`);
      throw error;
    }
  }
}
