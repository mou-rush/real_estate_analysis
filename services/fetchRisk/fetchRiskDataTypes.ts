export interface IRiskPoint {
  id: string;
  name: string;
  type: string;
  year?: string;
  detail?: string;
  position: [number, number];
  severity?: "low" | "medium" | "high";
}
