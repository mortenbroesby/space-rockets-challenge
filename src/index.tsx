import React from "react";
import ReactDOM from "react-dom";

import { Application } from "./application";

import { serviceWorker, reportWebVitals } from "./infrastructure";

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);

// See: https://cra.link/PWA
serviceWorker.register();

// See: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
