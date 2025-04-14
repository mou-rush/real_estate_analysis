import { IFloodZone } from "../genericTypes/genericTypes";
import { IRiskPoint } from "./fetchRiskDataTypes";

export const fetchRiskData = async (
  _lat: number,
  _lng: number,
  _radius: number
): Promise<{
  points: IRiskPoint[];
  floodZones: IFloodZone[];
}> => {
  return {
    points: [
      {
        id: "r1",
        name: "Former Gas Station",
        type: "Brownfield",
        year: "1998",
        detail: "Remediated in 2010",
        position: [40.672, -74.014],
        severity: "low",
      },
      {
        id: "r2",
        name: "Sandy Impact Area",
        type: "Historical Flooding",
        year: "2012",
        detail: "6ft storm surge",
        position: [40.673, -74.017],
        severity: "medium",
      },
      {
        id: "r3",
        name: "Air Quality Monitor",
        type: "Environmental",
        year: "2023",
        detail: "PM2.5 readings: Good",
        position: [40.675, -74.012],
        severity: "low",
      },
    ],
    floodZones: [
      {
        id: "f1",
        center: [40.673, -74.013],
        radius: 350,
        type: "Zone X",
        risk: "500-yr flood",
        detail: "0.2% annual chance",
      },
      {
        id: "f2",
        center: [40.679, -74.019],
        radius: 250,
        type: "Zone AE",
        risk: "100-yr flood",
        detail: "1% annual chance",
      },
    ],
  };
};
