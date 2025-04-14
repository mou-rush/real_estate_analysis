export interface ITransitPoint {
  id: string;
  name: string;
  type: string;
  position: [number, number];
  distance?: number; // distance from property in miles
}
