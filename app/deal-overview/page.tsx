"use client";
import dynamic from "next/dynamic";

const DealOverview = dynamic(
  () => import("@/components/overview/DealOverview"),
  {
    ssr: false,
  }
);

export default function DealOverviewPage() {
  return <DealOverview />;
}
