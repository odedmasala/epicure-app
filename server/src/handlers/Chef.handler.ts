import { ErrorHandler , HttpStatusCode, HttpErrorMessage } from "../exceptions";
import { Chefs } from "../models";
import { IChef } from "../models/ChefsSchema";

export default class ChefHandler {
  static async getAllChefs() {
    try {
      return await Chefs.find({});
    } catch (error) {
      console.error(`Error in getAllChefs method: ${error}`);
      throw error;
    }
  }

  static async getChef(id: string) {
    try {
      return await Chefs.findById(id);
    } catch (error) {
      console.error(`Error in getChef method: ${error}`);
      throw error;
    }
  }

  static async updateChef(id: string, obj: any) {
    try {
      return await Chefs.findByIdAndUpdate(id, obj);
    } catch (error) {
      console.error(`Error in updateChef method: ${error}`);
      throw error;
    }
  }

  static async deleteChef(id: string) {
    try {
      return await Chefs.findByIdAndRemove(id);
    } catch (error) {
      console.error(`Error in deleteChef method: ${error}`);
      throw error;
    }
  }
  static async addManyChefs(chefs: IChef[]) {
    try {
      const chefInstances:IChef[] = [];
      
      for (const chef of chefs) {
        const existingChef = await Chefs.findOne({
          fName: chef.fName,
          lName: chef.lName
        });
        
        if (existingChef) {
          throw ErrorHandler.createHttpError(HttpStatusCode.NOT_ACCEPTABLE, HttpErrorMessage.NOT_ACCEPTABLE);
        }
        
        const newChef = new Chefs({
          fName: chef.fName,
          lName: chef.lName,
          fullName: chef.fullName,
          description: chef.description,
          image: chef.image,
          weekChef: chef.weekChef,
          newChef: chef.newChef,
          viewed: chef.viewed,
        });
        
        chefInstances.push(newChef);
      }

      return await Chefs.insertMany(chefInstances);
    } catch (error) {
      console.error(`Error in addManyChefs method: ${error}`);
      throw error;
    }
  }


  static async addChef(obj: IChef) {
    try {
      const existingChef = await Chefs.findOne({
        fName: obj.fName,
        lName: obj.lName
      });
      if (existingChef) {
        throw  ErrorHandler.createHttpError(HttpStatusCode.NOT_ACCEPTABLE,HttpErrorMessage.NOT_ACCEPTABLE)
      }
      const newChef = new Chefs({
        fName: obj.fName,
        lName: obj.lName,
        fullName: obj.fullName,
        description: obj.description,
        image: obj.image,
        weekChef: obj.weekChef,
        newChef: obj.newChef,
        viewed: obj.viewed,
      });
      return await newChef.save();
    } catch (error) {
      console.error(`Error in addChef method: ${error}`);
      throw error;
    }
  }
}
