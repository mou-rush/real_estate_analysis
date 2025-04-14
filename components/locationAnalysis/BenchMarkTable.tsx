import React, { FC } from "react";
import { ISubmarketBenchmark } from "@/services/fetchSubmarketBenchmarks/fetchSubmarketBenchmarksTypes";

interface BenchmarkTableProps {
  benchmarks: ISubmarketBenchmark[];
}

const BenchmarkTable: FC<BenchmarkTableProps> = ({ benchmarks }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase whitespace-nowrap">
                Metric
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase whitespace-nowrap">
                Property Value
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase whitespace-nowrap">
                Submarket Average
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase whitespace-nowrap">
                Variance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {benchmarks.map((benchmark, index) => (
              <tr key={index}>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                  {benchmark.metric}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                  {benchmark.propertyValue}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                  {benchmark.submarketAvg}
                </td>
                <td
                  className={`px-4 py-3 whitespace-nowrap font-semibold ${
                    benchmark.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {benchmark.variance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BenchmarkTable;
