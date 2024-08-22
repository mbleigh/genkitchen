import React from "react";

interface Bounds {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  colors?: string[];
}

const RadialGradientOverlay: React.FC<{ bounds?: Bounds }> = ({ bounds }) => {
  return (
    <div
      className={`absolute ${
        bounds ? "opacity-100" : "opacity-0"
      } pointer-events-none transition-all border-4 border-red-500 rounded-xl`}
      style={
        bounds && {
          left: `${bounds.xMin / 10}%`,
          top: `${bounds.yMin / 10}%`,
          right: `${(1000 - bounds.xMax) / 10}%`,
          bottom: `${(1000 - bounds.yMax) / 10}%`,
          borderColor: bounds.colors ? bounds.colors[0] : "red",
          boxShadow: "0 0 10px black",
        }
      }
    />
  );
};

export default RadialGradientOverlay;
