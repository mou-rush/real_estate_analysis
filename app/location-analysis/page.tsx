"use client";

import dynamic from "next/dynamic";

const LocationAnalysisComponent = dynamic(
  () => import("@/components/locationAnalysis/LocationAnalysis"),
  { ssr: false }
);

export default function LocationAnalysisPage() {
  return <LocationAnalysisComponent />;
}
