"use client";
import React, { FC } from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMapLayerType } from "@/services/genericTypes/genericTypes";

interface MapLegendProps {
  selectedLayer: IMapLayerType;
}

const MapLegend: FC<MapLegendProps> = ({ selectedLayer }) => {
  const showAll = selectedLayer === "all";

  return (
    <div className="border border-gray-200 rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Map Legend</h3>
        <Button variant="ghost" className="p-1 h-6 w-6">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2">Property</h4>
          <div className="flex items-center mb-1">
            <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-xs">Subject Property</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 border-2 border-red-500 rounded-full mr-2"></div>
            <span className="text-xs">1-mile radius</span>
          </div>
        </div>

        {(showAll || selectedLayer === "transit") && (
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Transit</h4>
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs">Public Transit</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-700 rounded-full mr-2"></div>
              <span className="text-xs">Highways</span>
            </div>
          </div>
        )}

        {(showAll ||
          selectedLayer === "competition" ||
          selectedLayer === "pipeline") && (
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              Competition & Supply
            </h4>
            {(showAll || selectedLayer === "competition") && (
              <div className="flex items-center mb-1">
                <div className="h-3 w-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-xs">Industrial Properties</span>
              </div>
            )}
            {(showAll || selectedLayer === "pipeline") && (
              <div className="flex items-center">
                <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-xs">Development Pipeline</span>
              </div>
            )}
          </div>
        )}

        {(showAll || selectedLayer === "risks") && (
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              Risk Factors
            </h4>
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 bg-blue-300 rounded-full mr-2"></div>
              <span className="text-xs">Flood Zones</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs">Low Risk</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-xs">Medium Risk</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-xs">High Risk</span>
            </div>
          </div>
        )}

        {(showAll || selectedLayer === "demographics") && (
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              Demographics
            </h4>
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 bg-purple-500 opacity-50 rounded-full mr-2"></div>
              <span className="text-xs">Demographic Cluster 1</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 bg-pink-500 opacity-50 rounded-full mr-2"></div>
              <span className="text-xs">Demographic Cluster 2</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-amber-500 opacity-50 rounded-full mr-2"></div>
              <span className="text-xs">Demographic Cluster 3</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
