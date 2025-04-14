export interface IDemographicArea {
  id: string;
  center: [number, number];
  radius: number;
  color: string;
  data: {
    income: string;
    population: string;
    growth: string;
    employmentRate?: string;
    medianAge?: number;
  };
}
