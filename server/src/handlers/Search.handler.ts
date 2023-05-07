import { Chefs, Dishes, Restaurants } from "../models";

export default class SearchHandler {
  static async searchAll(name?: string) {
    try {
      const results = await Promise.all([
        name
          ? Chefs.aggregate([
              {
                $match: {
                  $or: [
                    { fName: { $regex: `^${name}`, $options: "i" } },
                    { lName: { $regex: `^${name}`, $options: "i" } },
                    { fullName: { $regex: `^${name}`, $options: "i" } },
                  ],
                },
              },
            ])
          : [],
        name
          ? Dishes.aggregate([
              {
                $lookup: {
                  from: "restaurants",
                  localField: "restId",
                  foreignField: "_id",
                  as: "restaurant",
                },
              },
              {
                $unwind: "$restaurant",
              },
              {
                $match: {
                  $or: [
                    { name: { $regex: `^${name}`, $options: "i" } },
                    {
                      "restaurant.name": { $regex: `^${name}`, $options: "i" },
                    },
                  ],
                },
              },
            ])
          : [],
        name
          ? Restaurants.aggregate([
              {
                $match: {
                  name: { $regex: `^${name}`, $options: "i" },
                },
              },
            ])
          : [],
      ]);
      return {
        chefs: results[0],
        dishes: results[1],
        restaurants: results[2],
      };
    } catch (error) {
      console.error(`Error in searchAll method: ${error}`);
      throw error;
    }
  }

  static async searchChefs(name: string) {
    try {
      return await Chefs.aggregate([
        {
          $match: {
            $or: [
              { fName: { $regex: `^${name}`, $options: "i" } },
              { lName: { $regex: `^${name}`, $options: "i" } },
              { fullName: { $regex: `^${name}`, $options: "i" } },
            ],
          },
        },
      ]);
    } catch (error) {
      console.error(`Error in searchChefs method: ${error}`);
      throw error;
    }
  }

  static async searchDishes(name: string) {
    try {
      return await Dishes.aggregate([
        {
          $lookup: {
            from: "restaurants",
            localField: "restId",
            foreignField: "_id",
            as: "restaurant",
          },
        },
        {
          $unwind: "$restaurant",
        },
        {
          $match: {
            $or: [
              { name: { $regex: `^${name}`, $options: "i" } },
              { "restaurant.name": { $regex: `^${name}`, $options: "i" } },
            ],
          },
        },
      ]);
    } catch (error) {
      console.error(`Error in searchDishes method: ${error}`);
      throw error;
    }
  }

  static async searchRestaurants(name: string) {
    try {
      return await Restaurants.aggregate([
        {
          $match: {
            name: { $regex: `^${name}`, $options: "i" },
          },
        },
      ]);
    } catch (error) {
      console.error(`Error in searchRestaurants method: ${error}`);
      throw error;
    }
  }
}
