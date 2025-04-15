"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { formatCategoryName } from "@/lib/utils";
import {
  Metric,
  ExportData,
} from "@/services/exportService/exportServiceTypes";

const isClient = typeof window !== "undefined";

export const exportToPDF = async (data: ExportData): Promise<void> => {
  if (!isClient) return;

  try {
    const loadingDiv = document.createElement("div");
    loadingDiv.style.position = "fixed";
    loadingDiv.style.top = "0";
    loadingDiv.style.left = "0";
    loadingDiv.style.width = "100%";
    loadingDiv.style.height = "100%";
    loadingDiv.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    loadingDiv.style.display = "flex";
    loadingDiv.style.justifyContent = "center";
    loadingDiv.style.alignItems = "center";
    loadingDiv.style.zIndex = "9999";
    loadingDiv.innerHTML = "<div>Generating PDF... Please wait</div>";
    document.body.appendChild(loadingDiv);

    let mapCenter, mapZoom;
    if (isClient && window.leafletMap) {
      mapCenter = window.leafletMap.getCenter();
      mapZoom = window.leafletMap.getZoom();

      window.leafletMap.invalidateSize(false);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      window.leafletMap.setView(mapCenter, mapZoom, { animate: false });

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();

    pdf.setFontSize(18);
    pdf.text("Location Analysis Report", width / 2, 20, { align: "center" });

    pdf.setFontSize(14);
    pdf.text(`${data.property.name}, ${data.property.address}`, 14, 30);
    pdf.setFontSize(12);
    pdf.text(
      `${data.property.submarket} Submarket | ${
        data.property.propertyType
      } | ${data.property.squareFootage.toLocaleString()} sqft`,
      14,
      38
    );

    try {
      if (!isClient) throw new Error("Not running in client environment");

      const mapElement = document.getElementById("location-map-container");
      if (!mapElement) {
        throw new Error("Map container element not found");
      }

      if (isClient && window.leafletMap) {
        const mapPane = window.leafletMap.getPanes().mapPane;
        if (mapPane) {
          mapPane.style.transition = "none";
        }

        const mapElements = mapElement.querySelectorAll(
          ".leaflet-zoom-animated"
        );
        mapElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.transition = "none";
          }
        });
      }

      const canvas = await html2canvas(mapElement, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        scale: 2,
        backgroundColor: "#ffffff",
        imageTimeout: 0,
        removeContainer: false,
        ignoreElements: (element) => {
          return (
            element.classList &&
            element.classList.contains("leaflet-overlay-pane") &&
            !element.querySelector("canvas, svg")
          );
        },
        onclone: (clonedDoc) => {
          const clonedMap = clonedDoc.getElementById("location-map-container");
          if (clonedMap) {
            clonedMap.style.height = mapElement.offsetHeight + "px";
            clonedMap.style.width = mapElement.offsetWidth + "px";
            clonedMap.style.border = "1px solid #cccccc";
          }
        },
      });

      const mapImage = canvas.toDataURL("image/png");
      pdf.addImage(mapImage, "PNG", 14, 45, width - 28, 80);

      if (isClient && window.leafletMap) {
        const mapPane = window.leafletMap.getPanes().mapPane;
        if (mapPane) {
          mapPane.style.transition = "";
        }

        const mapElements = mapElement.querySelectorAll(
          ".leaflet-zoom-animated"
        );
        mapElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.transition = "";
          }
        });
      }
    } catch (mapError) {
      console.error("Failed to capture map image with html2canvas:", mapError);

      try {
        if (!isClient) throw new Error("Not running in client environment");

        const mapElement = document.getElementById("location-map-container");
        if (!mapElement) {
          throw new Error("Map container element not found");
        }

        const simpleCanvas = await html2canvas(mapElement, {
          useCORS: true,
          allowTaint: true,
          scale: 1,
          logging: false,
          backgroundColor: "#ffffff",
          foreignObjectRendering: false,
          removeContainer: true,
          onclone: (clonedDoc) => {
            const clonedMap = clonedDoc.getElementById(
              "location-map-container"
            );
            if (clonedMap) {
              clonedMap.style.height = mapElement.offsetHeight + "px";
              clonedMap.style.width = mapElement.offsetWidth + "px";
            }
          },
        });

        const simpleMapImage = simpleCanvas.toDataURL("image/png");
        pdf.addImage(simpleMapImage, "PNG", 14, 45, width - 28, 80);
      } catch (fallbackError) {
        console.error("Fallback approach failed:", fallbackError);
        pdf.text("Map image could not be captured", 14, 60);
        pdf.text("Please try using the 'Export Map as Image' option.", 14, 66);
      }
    }

    pdf.setFontSize(14);
    pdf.text("Location Metrics", 14, 140);

    let yPosition = 150;
    Object.entries(data.locationMetrics).forEach(
      ([category, metrics], index) => {
        if (index > 0) yPosition += 10;

        pdf.setFontSize(12);
        pdf.text(formatCategoryName(category), 14, yPosition);
        yPosition += 8;

        pdf.setFontSize(10);
        metrics.forEach((metric: Metric) => {
          pdf.text(`• ${metric.label}: ${metric.value}`, 18, yPosition);
          yPosition += 6;
        });
      }
    );

    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.text("Location Summary", 14, yPosition);
    yPosition += 10;

    const summaryText = `${data.property.name} is strategically positioned in ${data.property.submarket}, offering excellent connectivity and strategic advantages. The property benefits from the area's market dynamics and demographic characteristics.`;

    const splitSummary = pdf.splitTextToSize(summaryText, width - 28);
    pdf.setFontSize(10);
    pdf.text(splitSummary, 14, yPosition);

    pdf.save(
      `${data.property.name.replace(/\s+/g, "_")}_Location_Analysis.pdf`
    );

    if (isClient) {
      document.body.removeChild(loadingDiv);
    }
  } catch (error) {
    console.error("Error generating PDF:", error);

    if (isClient) {
      const loadingDiv = document.querySelector(
        'div[style*="position: fixed"]'
      );
      if (loadingDiv?.parentNode) {
        loadingDiv.parentNode.removeChild(loadingDiv);
      }
    }
    throw new Error("Failed to generate PDF report");
  }
};

export const exportMapAsImage = async (): Promise<string> => {
  if (!isClient) return "";

  try {
    const mapElement = document.getElementById("location-map-container");
    if (!mapElement) {
      throw new Error("Map container element not found");
    }

    let mapCenter, mapZoom;
    if (isClient && window.leafletMap) {
      /* Storing current view parameters */
      mapCenter = window.leafletMap.getCenter();
      mapZoom = window.leafletMap.getZoom();

      window.leafletMap.invalidateSize(false);
      window.leafletMap.setView(mapCenter, mapZoom, { animate: false });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (isClient && window.leafletMap) {
      const mapPane = window.leafletMap.getPanes().mapPane;
      if (mapPane) {
        mapPane.style.transition = "none";
      }
    }

    const canvas = await html2canvas(mapElement, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        const clonedMap = clonedDoc.getElementById("location-map-container");
        if (clonedMap) {
          clonedMap.style.height = mapElement.offsetHeight + "px";
          clonedMap.style.width = mapElement.offsetWidth + "px";
        }
      },
    });

    if (isClient && window.leafletMap) {
      const mapPane = window.leafletMap.getPanes().mapPane;
      if (mapPane) {
        mapPane.style.transition = "";
      }
    }

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Failed to export map as image:", error);
    throw new Error("Could not capture map image");
  }
};

export const exportCurrentMapView = async (
  fileName: string = "map-export"
): Promise<void> => {
  if (!isClient) return;

  try {
    const mapImageData = await exportMapAsImage();

    if (isClient) {
      const link = document.createElement("a");
      link.href = mapImageData;
      link.download = `${fileName.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return Promise.resolve();
  } catch (error) {
    console.error("Failed to export current map view:", error);
    return Promise.reject(error);
  }
};

export const exportToExcel = (data: ExportData): void => {
  if (!isClient) return;

  try {
    const wb = XLSX.utils.book_new();

    const propertyDetails = [
      ["Property Name", data.property.name],
      ["Address", data.property.address],
      ["Submarket", data.property.submarket],
      ["Property Type", data.property.propertyType],
      ["Square Footage", data.property.squareFootage],
    ];
    const propertyWs = XLSX.utils.aoa_to_sheet(propertyDetails);
    XLSX.utils.book_append_sheet(wb, propertyWs, "Property Details");

    // Create metrics worksheets
    Object.entries(data.locationMetrics).forEach(([category, metrics]) => {
      const metricsData = [["Metric", "Value"]];

      metrics.forEach((metric: Metric) => {
        metricsData.push([metric.label, metric.value]);
      });
      const metricsWs = XLSX.utils.aoa_to_sheet(metricsData);
      XLSX.utils.book_append_sheet(wb, metricsWs, formatCategoryName(category));
    });

    const benchmarkHeaders = ["Metric", "Property", "Submarket", "Market"];
    const benchmarkData = [benchmarkHeaders];
    data.benchmarks.forEach((benchmark) => {
      benchmarkData.push([
        benchmark.metric,
        benchmark.propertyValue,
        benchmark.submarketValue,
        benchmark.marketValue,
      ]);
    });
    const benchmarkWs = XLSX.utils.aoa_to_sheet(benchmarkData);
    XLSX.utils.book_append_sheet(wb, benchmarkWs, "Benchmarks");

    const amenitiesData = [["Category", "Items"]];
    data.amenities.forEach((category) => {
      category.items.forEach((item, i) => {
        amenitiesData.push([i === 0 ? category.type : "", item]);
      });
    });
    const amenitiesWs = XLSX.utils.aoa_to_sheet(amenitiesData);
    XLSX.utils.book_append_sheet(wb, amenitiesWs, "Amenities");

    XLSX.writeFile(
      wb,
      `${data.property.name.replace(/\s+/g, "_")}_Location_Data.xlsx`
    );
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw new Error("Failed to export data to Excel");
  }
};
