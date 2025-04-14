import { IPipelinePoint } from "./fetchPipelineDataTypes";

export const fetchPipelineData = async (): Promise<IPipelinePoint[]> => {
  return [
    {
      id: "p1",
      name: "Sunset Logistics Center",
      size: "320K sqft",
      status: "Under Construction",
      completion: "Q3 2025",
      position: [40.6602, -74.0232],
      developer: "Bridge Development",
    },
    {
      id: "p2",
      name: "Atlantic Basin Warehouse",
      size: "140K sqft",
      status: "Permitted",
      completion: "Q1 2026",
      position: [40.679, -74.017],
      developer: "Thor Equities",
    },
    {
      id: "p3",
      name: "Brooklyn Logistics Terminal",
      size: "450K sqft",
      status: "Planned",
      completion: "Q4 2026",
      position: [40.6601, -74.0122],
      developer: "Prologis",
    },
  ];
};
