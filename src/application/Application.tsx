import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Routes, Route } from "react-router-dom";

import { Home, Launches, Launch, LaunchPads, LaunchPad } from "../domains";
import { NavBar } from "./NavBar";

export function Application() {
  return (
    <Router>
      <ThemeProvider>
        <CSSReset />
        <RootComponents />
      </ThemeProvider>
    </Router>
  );
}

function RootComponents() {
  return (
    <div>
      <NavBar />
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/launches" element={<Launches />} />
      <Route path="/launches/:launchId" element={<Launch />} />
      <Route path="/launch-pads" element={<LaunchPads />} />
      <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
    </Routes>
  );
}
