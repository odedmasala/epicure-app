export interface Chef {
  _id: string;
  fName: string;
  lName: string;
  fullName: string;
  description: string;
  image: string;
  weekChef: boolean;
  newChef: boolean;
  viewed: number;
  createdAt: Date;
  __v: number;
}
export enum ChefCategory {
  All = "All",
  new = "New",
  Viewed = "Most Viewed",
}
