"use client";
import React from "react";
import { PropertyImage } from "@/components/overview/PropertyImage";
import { PropertyHeader } from "@/components/overview/PropertyHeader";
import { PropertyMetrics } from "@/components/overview/PropertyMetrics";
import { DealSummary } from "@/components/overview/DealSummary";
import { PersonalizedInsights } from "@/components/overview/PersonalizedInsights";
import { MetricCard } from "@/components/overview/MetricCard";
import { UnderwritingModelSelector } from "@/components/overview/UnderwritingModelSelector";
import {
  propertyMetrics,
  dealSummary,
  assetData,
  insights,
  bottomMetrics,
} from "@/mockData/dealOverview";

export default function DealOverview() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center mb-4 md:mb-0">
            Deal Overview
          </h1>
          <UnderwritingModelSelector modelName="Industrial.Template.v2.4.xlsx" />
        </div>
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PropertyImage src="/property.svg" alt="Property Image" />
            <div className="md:col-span-2">
              <PropertyHeader
                title="280 Richards, Brooklyn, NY"
                uploadDate="11/06/2024"
                propertyType="Warehouse"
              />
              <PropertyMetrics metrics={propertyMetrics} />
            </div>
          </div>
          <DealSummary summary={dealSummary} assetData={assetData} />
          <PersonalizedInsights insights={insights} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {bottomMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                metricLabel={metric.label}
                metricValue={metric.value}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
