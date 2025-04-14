import { IPropertyData } from "./fetchPropertyDataTypes";

export const fetchPropertyData = async (): Promise<IPropertyData> => {
  return {
    name: "280 Richards",
    address: "280 Richards, Brooklyn, NY",
    submarket: "Red Hook",
    propertyType: "Warehouse",
    squareFootage: 312000,
    yearBuilt: 2021,
    occupancyRate: 100,
    position: [40.6741, -74.0097],
  };
};
