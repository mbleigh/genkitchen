import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import AnalyzeImage from "../../analyzeImage/client/index.js";
import MadLibs from "../../madlibs/client/index.js";
import ProductFilter from "../../filter/client/index.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/analyzeImage" Component={AnalyzeImage} />
        <Route path="/madlibs" Component={MadLibs} />
        <Route path="/filter" Component={ProductFilter} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
