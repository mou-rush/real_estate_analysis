"use client";
import React, { useState } from "react";
import { MapIcon, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationMap from "@/components/locationAnalysis/LocationMap";
import MapLegend from "@/components/locationAnalysis/MapLegend";
import MetricsSection from "@/components/locationAnalysis/MetricsSection";
import BenchmarkTable from "@/components/locationAnalysis/BenchMarkTable";
import { IMapLayerType } from "@/services/genericTypes/genericTypes";
import { useLocationData } from "@/hooks/useLocationData";
import ExportButtons from "@/components/locationAnalysis/ExportButtons";
import Image from "next/image";

const LocationAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"map" | "data">("map");
  const [selectedMetric, setSelectedMetric] = useState<IMapLayerType>("all");

  const {
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
  } = useLocationData();
  console.log("transitPoints1", transitPoints);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <Image
            src="/loading.png"
            alt="Loading Icon"
            className="mx-auto mb-4"
            width={74}
            height={37}
          />
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500" style={{ fontSize: "14px" }}>
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (error || !property || !locationMetrics) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600">
              Failed to load location data. Please try again later.
            </p>
          </div>
          <Button
            variant="default"
            className="bg-black text-white text-xs px-4 py-2 rounded cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Location Analysis</h1>
          <div className="flex justify-between items-center mb-6">
            <ExportButtons
              property={property}
              locationMetrics={locationMetrics}
              benchmarks={benchmarks}
              amenities={amenities}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">
                {property.name}, {property.address}
              </h2>
              <div className="text-sm text-gray-600 mt-1">
                {property.submarket} Submarket | {property.propertyType} |{" "}
                {property.squareFootage.toLocaleString()} sqft
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === "map" ? "default" : "outline"}
                className={`text-xs px-4 py-2 rounded flex items-center cursor-pointer ${
                  activeTab === "map"
                    ? "bg-black text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => setActiveTab("map")}
              >
                <MapIcon className="mr-2 h-4 w-4 cursor-pointer" />
                Map View
              </Button>
              <Button
                variant={activeTab === "data" ? "default" : "outline"}
                className={`text-xs px-4 py-2 rounded flex items-center cursor-pointer ${
                  activeTab === "data"
                    ? "bg-black text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => setActiveTab("data")}
              >
                <List className="mr-2 h-4 w-4 cursor-pointer" />
                Data View
              </Button>
            </div>
          </div>

          {/* Map View */}
          {activeTab === "map" && (
            <>
              <div className="flex mb-4 overflow-x-auto pb-2">
                <Button
                  variant={selectedMetric === "all" ? "default" : "outline"}
                  className={`text-xs px-3 py-1 mr-2 rounded-full cursor-pointer ${
                    selectedMetric === "all"
                      ? "bg-black text-white"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedMetric("all")}
                >
                  All Layers
                </Button>
                <Button
                  variant={selectedMetric === "transit" ? "default" : "outline"}
                  className={`text-xs px-3 py-1 mr-2 rounded-full cursor-pointer ${
                    selectedMetric === "transit"
                      ? "bg-black text-white"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedMetric("transit")}
                >
                  Transit
                </Button>
                <Button
                  variant={
                    selectedMetric === "competition" ? "default" : "outline"
                  }
                  className={`text-xs px-3 py-1 mr-2 rounded-full cursor-pointer ${
                    selectedMetric === "competition"
                      ? "bg-black text-white"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedMetric("competition")}
                >
                  Competition
                </Button>
                <Button
                  variant={
                    selectedMetric === "demographics" ? "default" : "outline"
                  }
                  className={`text-xs px-3 py-1 mr-2 rounded-full cursor-pointer ${
                    selectedMetric === "demographics"
                      ? "bg-black text-white"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedMetric("demographics")}
                >
                  Demographics
                </Button>
                <Button
                  variant={selectedMetric === "risks" ? "default" : "outline"}
                  className={`text-xs px-3 py-1 mr-2 rounded-full cursor-pointer ${
                    selectedMetric === "risks"
                      ? "bg-black text-white"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedMetric("risks")}
                >
                  Risk Factors
                </Button>
                <Button
                  variant={
                    selectedMetric === "pipeline" ? "default" : "outline"
                  }
                  className={`text-xs px-3 py-1 mr-2 rounded-full cursor-pointer ${
                    selectedMetric === "pipeline"
                      ? "bg-black text-white"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedMetric("pipeline")}
                >
                  Supply Pipeline
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <LocationMap
                      property={property}
                      transitPoints={transitPoints}
                      competitionPoints={competitionPoints}
                      pipelinePoints={pipelinePoints}
                      riskPoints={riskPoints}
                      floodZones={floodZones}
                      demographicAreas={demographicAreas}
                      selectedLayer={selectedMetric}
                    />
                  </div>
                </div>
                <div>
                  <MapLegend selectedLayer={selectedMetric} />
                </div>
              </div>
            </>
          )}

          {/* Data View */}
          {activeTab === "data" && <MetricsSection metrics={locationMetrics} />}

          {/* Amenities Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Nearby Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {amenities.map((category, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="text-sm font-semibold mb-3">
                    {category.type}
                  </h4>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm flex items-start">
                        <div className="h-2 w-2 bg-gray-400 rounded-full mr-2 mt-1.5"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Location Summary */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Location Summary</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm">
                {property.name} is strategically positioned in Brooklyn&apos;s{" "}
                {property.submarket} district, offering excellent connectivity
                to Manhattan (3.2 miles) and major transportation routes. The
                property benefits from low vacancy rates (
                {locationMetrics.marketDynamics[0].value}) in the submarket due
                to limited industrial land availability and growing last-mile
                delivery demand. Proximity to the Port of New York provides
                logistics advantages, while the 30-minute commute shed
                encompasses {locationMetrics.demographicData[2].value}
                potential workers. Despite moderate flood risk (Zone X), the
                area has seen substantial investment in flood mitigation
                following Hurricane Sandy. The property is well-positioned to
                maintain strong performance given the area&apos;s{" "}
                {locationMetrics.marketDynamics[1].value} YoY rent growth and
                limited competitive supply pipeline.
              </p>
            </div>
          </div>

          {/* Location Benchmark */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">
              Submarket Benchmarking
            </h3>
            <BenchmarkTable benchmarks={benchmarks} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationAnalysis;
