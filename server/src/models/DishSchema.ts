import { Schema, model, Document } from "mongoose";

export interface IDish extends Document {
  restId: Schema.Types.ObjectId | string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  side: string[];
  changesOptions: string[];
  category: Array<"Spicy" | "Vegetarian" | "Vegan">;
  mealTime: "Breakfast" | "Lunch" | "Dinner";
  subcategory?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DishSchema: Schema = new Schema<IDish>(
  {
    restId: { type: Schema.Types.ObjectId, required: true, ref: "restaurants" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    side: { type: [String], required: true },
    changesOptions: { type: [String], required: true },
    category: {
      type: [String],
      enum: ["Spicy", "Vegetarian", "Vegan"],
      validate: {
        validator: (value: string[]) => {
          return value.length <= 3;
        },
        message: "Category can have up to 3 values",
      },
      required: true,
    },
    mealTime: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },
    subcategory: { type: String },
  },
  { versionKey: false, suppressReservedKeysWarning: true, timestamps: true }
);

const Dishes = model<IDish>("dishes", DishSchema);

export default Dishes;
