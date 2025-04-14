import { IDemographicArea } from "./fetchDemographicDataTypes";

export const fetchDemographicData = async (
  _lat: number,
  _lng: number,
  _radius: number
): Promise<IDemographicArea[]> => {
  return [
    {
      id: "d1",
      center: [40.6741, -74.0187],
      radius: 800,
      color: "#8B5CF6",
      data: {
        income: "$72,450",
        population: "28,750",
        growth: "+2.1%",
        employmentRate: "94.2%",
        medianAge: 33,
      },
    },
    {
      id: "d2",
      center: [40.6651, -74.0047],
      radius: 750,
      color: "#EC4899",
      data: {
        income: "$88,210",
        population: "31,200",
        growth: "+3.4%",
        employmentRate: "95.8%",
        medianAge: 36,
      },
    },
    {
      id: "d3",
      center: [40.6831, -73.9997],
      radius: 650,
      color: "#F59E0B",
      data: {
        income: "$65,780",
        population: "25,600",
        growth: "+1.8%",
        employmentRate: "92.7%",
        medianAge: 31,
      },
    },
  ];
};
