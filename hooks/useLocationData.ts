import { useState, useEffect } from "react";
import { IFloodZone } from "@/services/genericTypes/genericTypes";
import { fetchAmenities } from "../services/fetchAmenities/fetchAmenities";
import { IAmenityCategory } from "@/services/fetchAmenities/fetchAmenitiesTypes";
import { ITransitPoint } from "@/services/fetchTransit/fetchTransitDataTypes";
import { ICompetitionPoint } from "@/services/fetchCompetition/fetchCompetitionDataTypes";
import { IDemographicArea } from "@/services/fetchDemographic/fetchDemographicDataTypes";
import { ILocationDataSummary } from "@/services/fetchLocationMetrics/fetchLocationMetricsTypes";
import { IPipelinePoint } from "@/services/fetchPipeline/fetchPipelineDataTypes";
import { IPropertyData } from "@/services/fetchProperty/fetchPropertyDataTypes";
import { IRiskPoint } from "@/services/fetchRisk/fetchRiskDataTypes";
import { ISubmarketBenchmark } from "@/services/fetchSubmarketBenchmarks/fetchSubmarketBenchmarksTypes";
import { fetchPropertyData } from "@/services/fetchProperty/fetchPropertyData";
import { fetchTransitData } from "@/services/fetchTransit/fetchTransitData";
import { fetchCompetitionData } from "@/services/fetchCompetition/fetchCompetitionData";
import { fetchPipelineData } from "@/services/fetchPipeline/fetchPipelineData";
import { fetchRiskData } from "@/services/fetchRisk/fetchRiskData";
import { fetchDemographicData } from "@/services/fetchDemographic/fetchDemographicData";
import { fetchLocationMetricsData } from "@/services/fetchLocationMetrics/fetchLocationMetricsData";
import { fetchSubmarketBenchmarksData } from "@/services/fetchSubmarketBenchmarks/fetchSubmarketBenchmarksData";

interface UseLocationDataReturn {
  isLoading: boolean;
  error: Error | null;
  property: IPropertyData | null;
  transitPoints: ITransitPoint[];
  competitionPoints: ICompetitionPoint[];
  pipelinePoints: IPipelinePoint[];
  riskPoints: IRiskPoint[];
  floodZones: IFloodZone[];
  demographicAreas: IDemographicArea[];
  locationMetrics: ILocationDataSummary | null;
  benchmarks: ISubmarketBenchmark[];
  amenities: IAmenityCategory[];
}

export const useLocationData = (): UseLocationDataReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [property, setProperty] = useState<IPropertyData | null>(null);
  const [transitPoints, setTransitPoints] = useState<ITransitPoint[]>([]);
  const [competitionPoints, setCompetitionPoints] = useState<
    ICompetitionPoint[]
  >([]);
  const [pipelinePoints, setPipelinePoints] = useState<IPipelinePoint[]>([]);
  const [riskPoints, setRiskPoints] = useState<IRiskPoint[]>([]);
  const [floodZones, setFloodZones] = useState<IFloodZone[]>([]);
  const [demographicAreas, setDemographicAreas] = useState<IDemographicArea[]>(
    []
  );
  const [locationMetrics, setLocationMetrics] =
    useState<ILocationDataSummary | null>(null);
  const [benchmarks, setBenchmarks] = useState<ISubmarketBenchmark[]>([]);
  const [amenities, setAmenities] = useState<IAmenityCategory[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const propertyData = await fetchPropertyData();
        setProperty(propertyData);

        const { position } = propertyData;
        const [lat, lng] = position;
        const radius = 2;

        const [
          transitData,
          competitionData,
          pipelineData,
          riskData,
          demographicData,
          metrics,
          benchmarkData,
          amenitiesData,
        ] = await Promise.all([
          fetchTransitData(lat, lng, radius),
          fetchCompetitionData(lat, lng, radius),
          fetchPipelineData(lat, lng, radius),
          fetchRiskData(lat, lng, radius),
          fetchDemographicData(lat, lng, radius),
          fetchLocationMetricsData(),
          fetchSubmarketBenchmarksData(),
          fetchAmenities(lat, lng, radius),
        ]);

        setTransitPoints(transitData);
        setCompetitionPoints(competitionData);
        setPipelinePoints(pipelineData);
        setRiskPoints(riskData.points);
        setFloodZones(riskData.floodZones);
        setDemographicAreas(demographicData);
        setLocationMetrics(metrics);
        setBenchmarks(benchmarkData);
        setAmenities(amenitiesData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return {
    isLoading,
    error,
    property,
    transitPoints,
    competitionPoints,
    pipelinePoints,
    riskPoints,
    floodZones,
    demographicAreas,
    locationMetrics,
    benchmarks,
    amenities,
  };
};
