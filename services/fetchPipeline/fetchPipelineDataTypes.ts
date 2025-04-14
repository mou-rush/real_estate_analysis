export interface IPipelinePoint {
  id: string;
  name: string;
  size: string;
  status: string;
  completion: string;
  position: [number, number];
  developer?: string;
}
