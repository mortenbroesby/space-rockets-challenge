import React from "react";
import ReactDOM from "react-dom";

import { Application } from "./application";

import { reportWebVitals } from "./infrastructure";

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);

// See: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
