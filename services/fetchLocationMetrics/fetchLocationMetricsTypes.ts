export interface ILocationMetric {
  label: string;
  value: string;
  detail: string;
  trend?: "up" | "down" | "stable";
  change?: string;
}

export interface ILocationDataSummary {
  propertyAccess: ILocationMetric[];
  demographicData: ILocationMetric[];
  riskFactors: ILocationMetric[];
  marketDynamics: ILocationMetric[];
}
