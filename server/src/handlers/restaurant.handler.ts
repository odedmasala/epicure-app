import { Types } from "mongoose";
import { Restaurants, IRestaurant } from "../models";
import { ErrorHandler, HttpStatusCode, HttpErrorMessage, } from "../exceptions";


export default class RestaurantHandler {
  static async getAllRestaurants() {
    try {
      return await Restaurants.find({});
    } catch (error) {
      console.error(`Error in getAllRestaurants method: ${error}`);
      throw error;
    }
  }

  static async getRestaurant(id: string) {
    try {
      return await Restaurants.findById(id);
    } catch (error) {
      console.error(`Error in getRestaurant method: ${error}`);
      throw error;
    }
  }
static async getRestaurantByChefId(id: string) {
  try{
    return await Restaurants.find({chefId:id});
  }catch(error){
    console.error(`Error in getRestaurantByChefId method: ${error}`);
  }
}
  static async updateRestaurant(id: string, obj: any) {
    try {
      return await Restaurants.findByIdAndUpdate(id, obj);
    } catch (error) {
      console.error(`Error in updateRestaurant method: ${error}`);
      throw error;
    }
  }

  static async deleteRestaurant(id: string) {
    try {
      return await Restaurants.findByIdAndRemove(id);
    } catch (error) {
      console.error(`Error in deleteRestaurant method: ${error}`);
      throw error;
    }
  }

  static async addManyRestaurants(restaurants: IRestaurant[]) {
    try {
      const restaurantInstances: IRestaurant[] = [];

      for (const restaurant of restaurants) {
        const existingRestaurant = await Restaurants.findOne({
          name: restaurant.name,
          chefId: restaurant.chefId,
        });

        if (existingRestaurant) {
          throw ErrorHandler.createHttpError(
            HttpStatusCode.NOT_ACCEPTABLE,
            HttpErrorMessage.NOT_ACCEPTABLE
          );
        }
        restaurant.chefId = restaurant.chefId.toString();
        const newRestaurant = new Restaurants({
          name: restaurant.name,
          chef: restaurant.chef,
          image: restaurant.image,
          image2: restaurant.image2,
          chefId: new Types.ObjectId(restaurant.chefId),
          address: restaurant.address,
          phone: restaurant.phone,
          email: restaurant.email,
          website: restaurant.website,
          createdAt: restaurant.createdAt,
          new: restaurant.new,
          open: restaurant.open,
          higherPrice: restaurant.higherPrice,
          lowerPrice: restaurant.lowerPrice,
          rate: restaurant.rate,
        });

        restaurantInstances.push(newRestaurant);
      }

      return await Restaurants.insertMany(restaurantInstances);
    } catch (error) {
      console.error(`Error in addManyRestaurants method: ${error}`);
      throw error;
    }
  }

  static async addRestaurant(obj: IRestaurant) {
    try {
      obj.chefId = obj.chefId.toString();
      const existingRestaurant = await Restaurants.findOne({
        name: obj.name,
        chefId: obj.chefId,
      });

      if (existingRestaurant) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_ACCEPTABLE,
          HttpErrorMessage.NOT_ACCEPTABLE
        );
      }
      obj.chefId = obj.chefId.toString();
      const newRestaurant = new Restaurants({
        name: obj.name,
        chef: obj.chef,
        image: obj.image,
        image2: obj.image2,
        chefId: new Types.ObjectId(obj.chefId),
        address: obj.address,
        phone: obj.phone,
        email: obj.email,
        website: obj.website,
        createdAt: obj.createdAt,
        new: obj.new,
        open: obj.open,
        higherPrice: obj.higherPrice,
        lowerPrice: obj.lowerPrice,
        rate: obj.rate,
      });

      return await newRestaurant.save();
    } catch (error) {
      console.error(`Error in addRestaurant method: ${error}`);
      throw error;
    }
  }
}
