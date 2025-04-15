"use client";
import React, { FC } from "react";
import { formatTrend } from "@/lib/utils";
import { ILocationMetric } from "@/services/fetchLocationMetrics/fetchLocationMetricsTypes";

interface MetricCardProps {
  metric: ILocationMetric;
}

const MetricCard: FC<MetricCardProps> = ({ metric }) => {
  const trend = formatTrend(metric.trend, metric.change);

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
      <div className="font-medium flex items-center">
        {metric.value}
        {trend && (
          <span className={`ml-2 text-xs ${trend.class}`}>
            {trend.icon} {trend.text}
          </span>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1">{metric.detail}</div>
    </div>
  );
};

export default MetricCard;
