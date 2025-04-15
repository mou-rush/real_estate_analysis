import L from "leaflet";

interface SvgIconsType {
  [key: string]: string;
}

interface RiskSeverity {
  high: string;
  medium: string;
  low: string;
  default: string;
}

interface FloodZoneType {
  "zone a": string;
  "zone b": string;
  "zone c": string;
  "zone x": string;
  default: string;
}

export const createCustomIcon = (
  color: string = "#4b5563",
  type: string = "default"
): L.DivIcon => {
  const iconOptions: L.DivIconOptions = {
    iconSize: [25, 41] as L.PointExpression,
    iconAnchor: [12, 41] as L.PointExpression,
    popupAnchor: [1, -34] as L.PointExpression,
    html: "",
    className: "custom-map-marker",
  };

  const svgIcons: SvgIconsType = {
    default: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36px" height="36px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `,
    transit: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36px" height="36px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        <path d="M15 9h-2V7h-2v2H9v2h2v2h2v-2h2z" fill="white"/>
      </svg>
    `,
    competition: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36px" height="36px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        <path d="M12 6l-2 5h4z" fill="white"/>
      </svg>
    `,
    pipeline: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36px" height="36px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        <path d="M12 7v4h2" stroke="white" stroke-width="1.5" fill="none"/>
      </svg>
    `,
    risk: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36px" height="36px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        <path d="M12 7v3m0 2v.01" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `,
  };

  iconOptions.html = svgIcons[type] || svgIcons.default;

  return L.divIcon(iconOptions);
};

const propertyIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" width="48px" height="48px">
    <!-- Outer marker with thicker white border for emphasis -->
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
          stroke="white" stroke-width="1.5"/>
    
    <!-- House icon inside to indicate property -->
    <path d="M12 4.5L7.5 9H9v4h6V9h1.5L12 4.5z" fill="white"/>
    
    <!-- Small details to make the house shape more recognizable -->
    <rect x="10" y="10" width="1.5" height="3" fill="#10b981"/>
    <rect x="12.5" y="10" width="1.5" height="3" fill="#10b981"/>
  </svg>
`;

export const PropertyIcon = L.divIcon({
  html: propertyIconSvg,
  className: "custom-map-marker property-marker",
  iconSize: [48, 48] as L.PointExpression,
  iconAnchor: [24, 48] as L.PointExpression,
  popupAnchor: [0, -48] as L.PointExpression,
});

export const TransitIcon = createCustomIcon("#3b82f6", "transit");
export const CompetitionIcon = createCustomIcon("#f97316", "competition");
export const PipelineIcon = createCustomIcon("#facc15", "pipeline");
export const RiskIcon = createCustomIcon("#ef4444", "risk");

export const getRiskSeverityColor = (severity?: string): string => {
  const colors: RiskSeverity = {
    high: "#ef4444",
    medium: "#f97316",
    low: "#facc15",
    default: "#6b7280",
  };

  return (
    colors[severity?.toLowerCase() as keyof RiskSeverity] || colors.default
  );
};

export const getFloodZoneColor = (type?: string): string => {
  const colors: FloodZoneType = {
    "zone a": "#ef4444",
    "zone b": "#f97316",
    "zone c": "#facc15",
    "zone x": "#10b981",
    default: "#6b7280",
  };

  return colors[type?.toLowerCase() as keyof FloodZoneType] || colors.default;
};

export const markerStyles = `
.custom-map-marker {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-map-marker svg {
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
}
.property-marker {
  z-index: 1000 !important; /* Ensure property marker is on top */
}
.property-marker svg {
  filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.6)); /* Green glow effect */
  animation: pulse 2s infinite; /* Subtle pulse animation */
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
`;

export const addMarkerStyles = (): void => {
  if (typeof document !== "undefined") {
    const styleId = "custom-map-marker-styles";

    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.innerHTML = markerStyles;
      document.head.appendChild(styleElement);
    }
  }
};
