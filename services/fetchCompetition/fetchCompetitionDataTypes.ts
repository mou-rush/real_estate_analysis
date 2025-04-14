export interface ICompetitionPoint {
  id: string;
  name: string;
  size: string;
  owner: string;
  position: [number, number];
  yearBuilt?: number;
  vacancyRate?: number;
}
