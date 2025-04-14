import { IAmenityCategory } from "../fetchAmenities/fetchAmenitiesTypes";
import { ILocationDataSummary } from "../fetchLocationMetrics/fetchLocationMetricsTypes";
import { IPropertyData } from "../fetchProperty/fetchPropertyDataTypes";
import { ISubmarketBenchmark } from "../fetchSubmarketBenchmarks/fetchSubmarketBenchmarksTypes";

/*Extending the Window interface to include leafletMap */
declare global {
  export interface Window {
    leafletMap?: {
      getCenter: () => { lat: number; lng: number };
      getZoom: () => number;
      invalidateSize: (animate?: boolean) => void;
      setView: (
        center: { lat: number; lng: number },
        zoom: number,
        options?: { animate: boolean }
      ) => void;
      getPanes: () => { mapPane: HTMLElement };
    };
  }
}
export interface ExportData {
  property: IPropertyData;
  locationMetrics: ILocationDataSummary;
  benchmarks: ISubmarketBenchmark[];
  amenities: IAmenityCategory[];
}

export interface Metric {
  label: string;
  value: string;
}
