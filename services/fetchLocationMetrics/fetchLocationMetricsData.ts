import { ILocationDataSummary } from "./fetchLocationMetricsTypes";

export const fetchLocationMetricsData =
  async (): Promise<ILocationDataSummary> => {
    return {
      propertyAccess: [
        { label: "Highway Access", value: "0.7 miles", detail: "BQE Exit 26" },
        {
          label: "Port Distance",
          value: "1.2 miles",
          detail: "Red Hook Container Terminal",
        },
        {
          label: "Airport Distance",
          value: "12.4 miles",
          detail: "JFK International",
        },
        {
          label: "Public Transit",
          value: "0.4 miles",
          detail: "Smith-9th St Station",
        },
      ],
      demographicData: [
        {
          label: "Population (1 mile)",
          value: "28,750",
          detail: "+2.1% YoY Growth",
          trend: "up",
          change: "+2.1%",
        },
        {
          label: "Median Income",
          value: "$72,450",
          detail: "Brooklyn Avg: $65,220",
          trend: "up",
          change: "+3.5%",
        },
        {
          label: "Labor Shed (30 min)",
          value: "1.2M",
          detail: "Working-age population",
          trend: "stable",
          change: "+0.7%",
        },
        {
          label: "Employment Rate",
          value: "94.2%",
          detail: "NY Metro: 93.8%",
          trend: "up",
          change: "+0.4%",
        },
      ],
      riskFactors: [
        {
          label: "Flood Risk",
          value: "Moderate",
          detail: "Zone X (500-yr flood zone)",
          trend: "stable",
        },
        {
          label: "Crime Index",
          value: "32",
          detail: "Below city average (47)",
          trend: "down",
          change: "-4%",
        },
        {
          label: "Traffic Volume",
          value: "18,400 AADT",
          detail: "On nearby Richards St",
          trend: "up",
          change: "+3.2%",
        },
        {
          label: "Environmental",
          value: "Low Risk",
          detail: "No active contamination",
          trend: "stable",
        },
      ],
      marketDynamics: [
        {
          label: "Submarket Vacancy",
          value: "2.4%",
          detail: "Metro Avg: 3.8%",
          trend: "down",
          change: "-0.6%",
        },
        {
          label: "Rent Growth",
          value: "+4.2%",
          detail: "YoY increase",
          trend: "up",
          change: "+4.2%",
        },
        {
          label: "New Supply (12mo)",
          value: "420K sqft",
          detail: "3 projects",
          trend: "up",
          change: "+120K",
        },
        {
          label: "Absorption (12mo)",
          value: "560K sqft",
          detail: "Net positive",
          trend: "up",
          change: "+27%",
        },
      ],
    };
  };
