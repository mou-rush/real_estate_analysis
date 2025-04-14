import { ITransitPoint } from "./fetchTransitDataTypes";

export const fetchTransitData = async (
  _lat: number,
  _lng: number,
  _radius: number
): Promise<ITransitPoint[]> => {
  return [
    {
      id: "t1",
      name: "Smith-9th St Station",
      type: "Subway",
      position: [40.6744, -74.0011],
      distance: 0.4,
    },
    {
      id: "t2",
      name: "Red Hook Ferry Terminal",
      type: "Ferry",
      position: [40.6787, -74.0191],
      distance: 0.6,
    },
    {
      id: "t3",
      name: "BQE Exit 26",
      type: "Highway Access",
      position: [40.6812, -74.0024],
      distance: 0.7,
    },
    {
      id: "t4",
      name: "Bus Stop B61",
      type: "Bus",
      position: [40.6751, -74.0087],
      distance: 0.2,
    },
  ];
};
