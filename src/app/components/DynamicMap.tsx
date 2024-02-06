import dynamic from "next/dynamic";
import React from "react";

// Dynamic import with SSR disabled
const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

const MapPage: React.FC = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapWithNoSSR />
    </div>
  );
};

export default MapPage;
