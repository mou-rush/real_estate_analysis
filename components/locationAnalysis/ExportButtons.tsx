"use client";
import React, { useState, FC } from "react";
import { FileDown, Download, ImageDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  exportToPDF,
  exportToExcel,
  exportCurrentMapView,
} from "@/services/exportService/exportService";
import { useNotification } from "@/contexts/NotificationContext";
import { IAmenityCategory } from "@/services/fetchAmenities/fetchAmenitiesTypes";
import { IPropertyData } from "@/services/fetchProperty/fetchPropertyDataTypes";
import { ILocationDataSummary } from "@/services/fetchLocationMetrics/fetchLocationMetricsTypes";
import { ISubmarketBenchmark } from "@/services/fetchSubmarketBenchmarks/fetchSubmarketBenchmarksTypes";

interface ExportButtonsProps {
  property: IPropertyData;
  locationMetrics: ILocationDataSummary;
  benchmarks: ISubmarketBenchmark[];
  amenities: IAmenityCategory[];
}

const ExportButtons: FC<ExportButtonsProps> = ({
  property,
  locationMetrics,
  benchmarks,
  amenities,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isPdfExporting, setIsPdfExporting] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const handlePdfExport = async () => {
    try {
      setIsPdfExporting(true);
      await exportToPDF({ property, locationMetrics, benchmarks, amenities });
      showNotification("PDF report successfully downloaded", "success");
    } catch (error) {
      console.error("PDF export failed:", error);
      showNotification("Failed to generate PDF report", "error");
    } finally {
      setIsPdfExporting(false);
    }
  };

  const handleDataExport = async () => {
    try {
      setIsExporting(true);
      exportToExcel({ property, locationMetrics, benchmarks, amenities });
      showNotification("Data successfully exported to Excel", "success");
    } catch (error) {
      console.error("Data export failed:", error);
      showNotification("Failed to export data to Excel", "error");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
      <Button
        variant="default"
        className="bg-black text-white text-xs px-4 py-2 rounded cursor-pointer w-full md:w-auto"
        onClick={handlePdfExport}
        disabled={isPdfExporting}
      >
        <FileDown className="mr-2 h-4 w-4" />
        {isPdfExporting ? "Generating..." : "Location PDF"}
      </Button>

      <Button
        variant="outline"
        className="border border-gray-300 text-xs px-4 py-2 rounded flex items-center cursor-pointer w-full md:w-auto"
        onClick={() => exportCurrentMapView(`${property.name}_Map`)}
        disabled={isExporting}
      >
        <ImageDown className="mr-2 h-4 w-4" />
        {isExporting ? "Exporting..." : "Export Map Only"}
      </Button>

      <Button
        variant="default"
        className="bg-black text-white text-xs px-4 py-2 rounded cursor-pointer w-full md:w-auto"
        onClick={handleDataExport}
        disabled={isExporting}
      >
        <Download className="mr-2 h-4 w-4" />
        {isExporting ? "Exporting..." : "Export Data"}
      </Button>
    </div>
  );
};

export default ExportButtons;
