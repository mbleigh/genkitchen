import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AnalyzeImage from "../../analyzeImage/client";
import MadLibs from "../../madlibs/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/analyzeImage" Component={AnalyzeImage} />
        <Route path="/madlibs" Component={MadLibs} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
