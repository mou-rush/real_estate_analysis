export interface IFloodZone {
  id: string;
  center: [number, number];
  radius: number;
  type: string;
  risk: string;
  detail: string;
}

export type IMapLayerType =
  | "all"
  | "transit"
  | "competition"
  | "risks"
  | "pipeline"
  | "demographics";
