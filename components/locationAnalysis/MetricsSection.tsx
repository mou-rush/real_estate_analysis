import React, { FC } from "react";
import MetricCard from "@/components/locationAnalysis/MetricCard";
import { ILocationDataSummary } from "@/services/fetchLocationMetrics/fetchLocationMetricsTypes";

interface MetricsSectionProps {
  metrics: ILocationDataSummary;
}

const MetricsSection: FC<MetricsSectionProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Property Access Metrics */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Property Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.propertyAccess.map((item, index) => (
            <MetricCard key={index} metric={item} />
          ))}
        </div>
      </div>

      {/* Demographic Data */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Demographic Data</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.demographicData.map((item, index) => (
            <MetricCard key={index} metric={item} />
          ))}
        </div>
      </div>

      {/* Risk Factors */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Risk Factors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.riskFactors.map((item, index) => (
            <MetricCard key={index} metric={item} />
          ))}
        </div>
      </div>

      {/* Market Dynamics */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Market Dynamics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.marketDynamics.map((item, index) => (
            <MetricCard key={index} metric={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;
