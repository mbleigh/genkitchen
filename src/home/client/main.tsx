import "./index.css";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.js";

const AnalyzeImage = React.lazy(() => import("../../analyzeImage/client/index.js"));
const MadLibs = React.lazy(() => import("../../madlibs/client/index.js"));
const ProductFilter = React.lazy(() => import("../../filter/client/index.js"));
const ItineraryDemo = React.lazy(() => import("../../itinerary/client/index.js"));

function LazyPage(Component: any) {
  return () => {
    return (
      <React.Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center text-xl min-h-screen">
            Loading...
          </div>
        }
      >
        <Component />
      </React.Suspense>
    );
  };
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/analyzeImage" Component={LazyPage(AnalyzeImage)} />
        <Route path="/madlibs" Component={LazyPage(MadLibs)} />
        <Route path="/filter" Component={LazyPage(ProductFilter)} />
        <Route path="/itinerary" Component={LazyPage(ItineraryDemo)} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
