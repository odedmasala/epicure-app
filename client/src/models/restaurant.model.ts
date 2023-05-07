export interface Restaurant {
  _id: string;
  name: string;
  chef: string;
  image: string;
  image2?: string;
  chefId: string;
  address?: Address;
  phone?: string;
  email?: string;
  website?: string;
  createdAt: Date;
  new: boolean;
  open: boolean;
  higherPrice: number;
  lowerPrice: number;
  rate: number;
  __v: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export enum RestaurantCategory {
  ALL = "All",
  NEW = "New",
  POPULAR = "Most Popular",
  OPEN = "Open Now",
}

export enum RestaurantRange {
  PRICE = "Price Range",
  DISTANCE = "Distance",
  RATING = "Rating",
}
