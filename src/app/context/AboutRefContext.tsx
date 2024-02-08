import React from "react";

// Explicitly define the context type
const AboutRefContext =
  React.createContext<React.RefObject<HTMLDivElement> | null>(null);

export default AboutRefContext;
