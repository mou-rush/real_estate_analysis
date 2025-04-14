import React, { FC } from "react";
import { ISubmarketBenchmark } from "@/services/fetchSubmarketBenchmarks/fetchSubmarketBenchmarksTypes";

interface BenchmarkTableProps {
  benchmarks: ISubmarketBenchmark[];
}

const BenchmarkTable: FC<BenchmarkTableProps> = ({ benchmarks }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Metric
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Property Value
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Submarket Average
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Variance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {benchmarks.map((benchmark, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {benchmark.metric}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {benchmark.propertyValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {benchmark.submarketAvg}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
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
