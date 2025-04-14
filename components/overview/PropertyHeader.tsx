import { Button } from "@/components/ui/button";

type PropertyHeaderProps = {
  title: string;
  uploadDate: string;
  propertyType: string;
};

export const PropertyHeader = ({
  title,
  uploadDate,
  propertyType,
}: PropertyHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-sm text-gray-600 mt-1">
          Date Uploaded: {uploadDate}
        </div>
        <div className="text-sm text-gray-600">{propertyType}</div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          variant="default"
          className="bg-black text-white text-xs px-4 py-2 rounded"
        >
          Export to Excel
        </Button>
        <Button
          variant="default"
          className="bg-black text-white text-xs px-4 py-2 rounded"
        >
          Generate PowerPoint
        </Button>
      </div>
    </div>
  );
};
