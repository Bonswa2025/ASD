// src/main.jsx
import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import StadslabSuiteHub from "./app.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Modules NIET direct importeren; we tonen alleen de hub.
       Later kun je via `links` of window.STADSLAB_APPS registreren. */}
    <StadslabSuiteHub
      links={{
        foodtruck: "",   // zet hier een URL als je stand-alone wil openen
        backoffice: "",
        staff: "",
      }}
    />
  </React.StrictMode>
);
