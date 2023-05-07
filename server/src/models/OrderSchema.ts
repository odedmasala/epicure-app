import { Schema, model, Document } from "mongoose";

export interface IOrderItem  extends Document {
  dish: Schema.Types.ObjectId | string;
  quantity: number;
}

export interface IOrder extends Document {
  user: Schema.Types.ObjectId | string;
  restaurant: Schema.Types.ObjectId | string;
  dishes: IOrderItem[];
  totalAmount: number;
  address: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema<IOrderItem>(
  {
    dish: { type: Schema.Types.ObjectId, required: true, ref: "dishes" },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    restaurant: { type: Schema.Types.ObjectId, required: true, ref: "restaurants" },
    dishes: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      required: true,
      default: "Pending",
    },
  },
  { versionKey: false, suppressReservedKeysWarning: true, timestamps: true }
);

const Orders = model<IOrder>("orders", OrderSchema);

export default Orders;
