import { Date, Schema, model } from "mongoose";

export interface IChef  extends Document {
  fName: string;
  lName: string;
  fullName: string;
  description: string;
  image: string;
  createdAt: Date;
  weekChef: boolean;
  newChef: boolean;
  viewed: number;
}

const chefSchema = new Schema<IChef>(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    fullName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    weekChef: { type: Boolean, default: false },
    newChef: { type: Boolean, default: false },
    viewed: { type: Number, required: true },
  },
  { versionKey: false, suppressReservedKeysWarning: true, timestamps: true }
);

const ChefModel = model<IChef>("chefs", chefSchema);

export default ChefModel;
