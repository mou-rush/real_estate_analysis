type MetricItem = {
  label: string;
  value: string;
};

type PropertyMetricsProps = {
  metrics: MetricItem[];
};

export const PropertyMetrics = ({ metrics }: PropertyMetricsProps) => {
  return (
    <div className="grid grid-cols-6 gap-4 mt-6">
      {metrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
          <div className="font-medium">{metric.value}</div>
        </div>
      ))}
    </div>
  );
};
