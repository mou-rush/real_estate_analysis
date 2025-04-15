import React from "react";

type MetricItem = {
  label: string;
  value: string | number;
};

type DealSummaryProps = {
  summary: string;
  assetData: MetricItem[];
};

export const DealSummary = ({ summary, assetData }: DealSummaryProps) => {
  return (
    <div className="mt-8 border-t border-gray-200 ">
      <h3 className="text-lg font-semibold mt-3">Deal Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border-r border-gray-200  p-4">
          <p className="text-sm">{summary}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Asset-Level Data</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {assetData.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="text-right text-gray-600">{item.label}</div>
                  <div className="text-left font-medium">{item.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
