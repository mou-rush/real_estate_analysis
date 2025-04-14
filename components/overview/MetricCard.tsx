type MetricCardProps = {
  title: string;
  metricLabel: string;
  metricValue: string;
};

export const MetricCard = ({
  title,
  metricLabel,
  metricValue,
}: MetricCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-semibold mb-3">{title}</h4>
      <div className="flex items-center">
        <div className="bg-gray-100 p-2 rounded mr-3">
          <span className="text-xs">{metricLabel}</span>
        </div>
        <div className="text-xl font-bold">{metricValue}</div>
      </div>
    </div>
  );
};
