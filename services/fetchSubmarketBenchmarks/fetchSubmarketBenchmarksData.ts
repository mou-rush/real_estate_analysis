import { ISubmarketBenchmark } from "./fetchSubmarketBenchmarksTypes";

export const fetchSubmarketBenchmarksData = async (): Promise<
  ISubmarketBenchmark[]
> => {
  return [
    {
      metric: "Rent PSF",
      propertyValue: "$24.40",
      submarketAvg: "$21.75",
      variance: "+12.2%",
      isPositive: true,
      marketValue: "",
      submarketValue: "",
    },
    {
      metric: "Vacancy Rate",
      propertyValue: "0.0%",
      submarketAvg: "3.8%",
      variance: "+3.8%",
      isPositive: true,
      marketValue: "",
      submarketValue: "",
    },
    {
      metric: "Building Age",
      propertyValue: "4 years",
      submarketAvg: "42 years",
      variance: "-38 years",
      isPositive: true,
      marketValue: "",
      submarketValue: "",
    },
    {
      metric: "Clear Height",
      propertyValue: "36'",
      submarketAvg: "28'",
      variance: "+8'",
      isPositive: true,
      marketValue: "",
      submarketValue: "",
    },
    {
      metric: "Dock Ratio",
      propertyValue: "1:8,500 sqft",
      submarketAvg: "1:12,300 sqft",
      variance: "+31%",
      isPositive: true,
      marketValue: "",
      submarketValue: "",
    },
    {
      metric: "Parking Ratio",
      propertyValue: "1.2:1,000",
      submarketAvg: "0.9:1,000",
      variance: "+33%",
      isPositive: true,
      marketValue: "",
      submarketValue: "",
    },
  ];
};
