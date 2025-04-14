import { ICompetitionPoint } from "./fetchCompetitionDataTypes";

export const fetchCompetitionData = async (
  _lat: number,
  _lng: number,
  _radius: number
): Promise<ICompetitionPoint[]> => {
  return [
    {
      id: "c1",
      name: "Liberty View Industrial Plaza",
      size: "1.2M sqft",
      owner: "Salmar Properties",
      position: [40.6706, -74.0141],
      yearBuilt: 1920,
      vacancyRate: 5,
    },
    {
      id: "c2",
      name: "Industry City",
      size: "6.5M sqft",
      owner: "Jamestown/Belvedere",
      position: [40.6572, -74.0083],
      yearBuilt: 1906,
      vacancyRate: 8,
    },
    {
      id: "c3",
      name: "Brooklyn Army Terminal",
      size: "4M sqft",
      owner: "NYC EDC",
      position: [40.6456, -74.0253],
      yearBuilt: 1918,
      vacancyRate: 3,
    },
    {
      id: "c4",
      name: "Red Hook Warehousing",
      size: "170K sqft",
      owner: "UPS",
      position: [40.6769, -74.0154],
      yearBuilt: 1998,
      vacancyRate: 0,
    },
  ];
};
