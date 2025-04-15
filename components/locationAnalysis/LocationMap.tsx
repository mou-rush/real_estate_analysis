"use client";
import React, { useState, useEffect, FC } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  LayerGroup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import {
  IFloodZone,
  IMapLayerType,
} from "@/services/genericTypes/genericTypes";

import { ITransitPoint } from "@/services/fetchTransit/fetchTransitDataTypes";
import { ICompetitionPoint } from "@/services/fetchCompetition/fetchCompetitionDataTypes";
import { IDemographicArea } from "@/services/fetchDemographic/fetchDemographicDataTypes";
import { IPipelinePoint } from "@/services/fetchPipeline/fetchPipelineDataTypes";
import { IPropertyData } from "@/services/fetchProperty/fetchPropertyDataTypes";
import { IRiskPoint } from "@/services/fetchRisk/fetchRiskDataTypes";
import {
  PropertyIcon,
  TransitIcon,
  CompetitionIcon,
  PipelineIcon,
  createCustomIcon,
  getRiskSeverityColor,
  getFloodZoneColor,
  addMarkerStyles,
} from "@/icons/mapIcons/mapIcons";

interface LocationMapProps {
  property: IPropertyData;
  transitPoints: ITransitPoint[];
  competitionPoints: ICompetitionPoint[];
  pipelinePoints: IPipelinePoint[];
  riskPoints: IRiskPoint[];
  floodZones: IFloodZone[];
  demographicAreas: IDemographicArea[];
  selectedLayer?: IMapLayerType;
}

const MapUpdater: FC<{ selectedLayer: IMapLayerType }> = ({
  selectedLayer,
}) => {
  const map = useMap();

  useEffect(() => {}, [selectedLayer, map]);
  return null;
};

const LocationMap: React.FC<LocationMapProps> = ({
  property,
  transitPoints,
  competitionPoints,
  pipelinePoints,
  riskPoints,
  floodZones,
  demographicAreas,
  selectedLayer = "all",
}) => {
  const [mapLayers, setMapLayers] = useState({
    transit: true,
    competition: true,
    risks: true,
    pipeline: true,
    demographics: true,
  });
  useEffect(() => {
    addMarkerStyles();
  }, []);
  useEffect(() => {
    if (selectedLayer === "all") {
      setMapLayers({
        transit: true,
        competition: true,
        risks: true,
        pipeline: true,
        demographics: true,
      });
    } else {
      setMapLayers({
        transit: selectedLayer === "transit",
        competition: selectedLayer === "competition",
        risks: selectedLayer === "risks",
        pipeline: selectedLayer === "pipeline",
        demographics: selectedLayer === "demographics",
      });
    }
  }, [selectedLayer]);

  return (
    <MapContainer
      id="location-map-container"
      center={property.position}
      zoom={15}
      style={{ height: "600px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapUpdater selectedLayer={selectedLayer} />

      {/* Property Marker */}
      <Marker position={property.position} icon={PropertyIcon}>
        <Popup>
          <div className="text-sm">
            <strong>
              {property.name}, {property.address}
            </strong>
            <br />
            {property.propertyType} | {property.squareFootage.toLocaleString()}{" "}
            sqft
            <br />
            Built {property.yearBuilt} | {property.occupancyRate}% Occupied
          </div>
        </Popup>
      </Marker>

      {/* 1-mile radius circle around property */}
      <Circle
        center={property.position}
        radius={1609}
        pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.05 }}
      />

      {/* Transit Layer */}
      {mapLayers.transit && (
        <LayerGroup>
          {transitPoints.map((point) => (
            <Marker
              key={`transit-${point.id}`}
              position={point.position}
              icon={TransitIcon}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{point.name}</strong>
                  <br />
                  Type: {point.type}
                  {point.distance && (
                    <>
                      <br />
                      Distance: {point.distance} miles
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Competition Layer */}
      {mapLayers.competition && (
        <LayerGroup>
          {competitionPoints.map((point) => (
            <Marker
              key={`competition-${point.id}`}
              position={point.position}
              icon={CompetitionIcon}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{point.name}</strong>
                  <br />
                  Size: {point.size}
                  <br />
                  Owner: {point.owner}
                  {point.yearBuilt && (
                    <>
                      <br />
                      Built: {point.yearBuilt}
                    </>
                  )}
                  {point.vacancyRate !== undefined && (
                    <>
                      <br />
                      Vacancy: {point.vacancyRate}%
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Pipeline Layer */}
      {mapLayers.pipeline && (
        <LayerGroup>
          {pipelinePoints.map((point) => (
            <Marker
              key={`pipeline-${point.id}`}
              position={point.position}
              icon={PipelineIcon}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{point.name}</strong>
                  <br />
                  Size: {point.size}
                  <br />
                  Status: {point.status}
                  <br />
                  Est. Completion: {point.completion}
                  {point.developer && (
                    <>
                      <br />
                      Developer: {point.developer}
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Risk Factors Layer */}
      {mapLayers.risks && (
        <LayerGroup>
          {riskPoints.map((point) => (
            <Marker
              key={`risk-${point.id}`}
              position={point.position}
              icon={createCustomIcon(getRiskSeverityColor(point.severity))}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{point.name}</strong>
                  <br />
                  Type: {point.type}
                  {point.year && (
                    <>
                      <br />
                      Year: {point.year}
                    </>
                  )}
                  {point.detail && (
                    <>
                      <br />
                      {point.detail}
                    </>
                  )}
                  {point.severity && (
                    <>
                      <br />
                      Severity:{" "}
                      {point.severity.charAt(0).toUpperCase() +
                        point.severity.slice(1)}
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Flood zones */}
          {floodZones.map((zone) => (
            <Circle
              key={`flood-${zone.id}`}
              center={zone.center}
              radius={zone.radius}
              pathOptions={{
                color: getFloodZoneColor(zone.type),
                fillColor: getFloodZoneColor(zone.type),
                fillOpacity: 0.2,
                weight: 1,
                dashArray: "5, 5",
              }}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{zone.type}</strong>
                  <br />
                  {zone.risk}
                  <br />
                  {zone.detail}
                </div>
              </Popup>
            </Circle>
          ))}
        </LayerGroup>
      )}

      {/* Demographics Layer */}
      {mapLayers.demographics && (
        <LayerGroup>
          {demographicAreas.map((area) => (
            <Circle
              key={`demo-${area.id}`}
              center={area.center}
              radius={area.radius}
              pathOptions={{
                color: area.color,
                fillColor: area.color,
                fillOpacity: 0.15,
                weight: 1,
              }}
            >
              <Popup>
                <div className="text-sm">
                  <strong>Demographic Area</strong>
                  <br />
                  Median Income: {area.data.income}
                  <br />
                  Population: {area.data.population}
                  <br />
                  Annual Growth: {area.data.growth}
                  {area.data.employmentRate && (
                    <>
                      <br />
                      Employment Rate: {area.data.employmentRate}
                    </>
                  )}
                  {area.data.medianAge && (
                    <>
                      <br />
                      Median Age: {area.data.medianAge}
                    </>
                  )}
                </div>
              </Popup>
            </Circle>
          ))}
        </LayerGroup>
      )}
    </MapContainer>
  );
};

export default LocationMap;
