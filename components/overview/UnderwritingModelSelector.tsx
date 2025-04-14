import { ChevronDown } from "lucide-react";

type UnderwritingModelSelectorProps = {
  modelName: string;
};

export const UnderwritingModelSelector = ({
  modelName,
}: UnderwritingModelSelectorProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 text-sm font-semibold">Underwriting Model</span>
      <div className="flex items-center border border-gray-300 rounded px-3 py-1">
        <span className="text-sm">{modelName}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
};
