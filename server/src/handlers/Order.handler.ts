import { Types } from "mongoose";
import { Orders, IOrder, Users, Restaurants, Dishes, } from "../models";
import { ErrorHandler, HttpStatusCode, HttpErrorMessage } from "../exceptions";


function populateOrderFields(query) {
  return query.populate("user").populate("restaurant").populate("dishes.dish");
}

export default class OrderHandler {
  static async getAllOrders() {
    try {
      return await populateOrderFields(Orders.find({}));
    } catch (error) {
      console.error(`Error in getAllOrders method: ${error}`);
      throw error;
    }
  }

  static async getOrder(id: string) {
    try {
      return await populateOrderFields(Orders.findById(id));
    } catch (error) {
      console.error(`Error in getOrder method: ${error}`);
      throw error;
    }
  }

  static async getOrdersByUserId(userId: string) {
    try {
      return await populateOrderFields(Orders.find({ user: userId }));
    } catch (error) {
      console.error(`Error in getOrdersByUserId method: ${error}`);
      throw error;
    }
  }

  static async getOrdersByRestaurantId(restaurantId: string) {
    try {
      return await populateOrderFields(
        Orders.find({ restaurant: restaurantId })
      );
    } catch (error) {
      console.error(`Error in getOrdersByRestaurantId method: ${error}`);
      throw error;
    }
  }

  static async updateOrder(id: string, obj: Partial<IOrder>) {
    try {
      return await populateOrderFields(
        Orders.findByIdAndUpdate(id, obj, { new: true })
      );
    } catch (error) {
      console.error(`Error in updateOrder method: ${error}`);
      throw error;
    }
  }

  static async deleteOrder(id: string) {
    try {
      return await Orders.findByIdAndRemove(id);
    } catch (error) {
      console.error(`Error in deleteOrder method: ${error}`);
      throw error;
    }
  }

  static async addOrder(obj: IOrder) {
    try {
      const userPipeline = [
        {
          $match: {
            _id:
              typeof obj.user === "string"
                ? new Types.ObjectId(obj.user)
                : obj.user,
          },
        },
      ];
      const restaurantPipeline = [
        {
          $match: {
            _id:
              typeof obj.restaurant === "string"
                ? new Types.ObjectId(obj.restaurant)
                : obj.restaurant,
          },
        },
      ];
      const dishPipeline = [
        {
          $match: {
            _id: {
              $in: obj.dishes.map((item) =>
                typeof item.dish === "string"
                  ? new Types.ObjectId(item.dish)
                  : item.dish
              ),
            },
          },
        },
      ];
      const userResults = await Users.aggregate(userPipeline);
      const restaurantResults = await Restaurants.aggregate(restaurantPipeline);
      const dishResults = await Dishes.aggregate(dishPipeline);

      if (
        userResults.length !== 1 ||
        restaurantResults.length !== 1 ||
        dishResults.length !== obj.dishes.length
      ) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }

      // Add the new order
      const newOrder = new Orders({
        user: obj.user,
        restaurant: obj.restaurant,
        dishes: obj.dishes,
        totalAmount: obj.totalAmount,
        address: obj.address,
        status: obj.status,
      });

      return await newOrder.save();
    } catch (error) {
      console.error(`Error in addOrder method: ${error}`);
      throw error;
    }
  }
}
