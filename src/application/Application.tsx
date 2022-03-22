import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import {
  HomePage,
  LaunchesPage,
  LaunchPage,
  LaunchPadsPage,
  LaunchPadPage,
} from "../domains";

import { NavBar } from "./NavBar";

export function Application() {
  return (
    <Router>
      <ChakraProvider>
        <CSSReset />
        <RootComponents />
      </ChakraProvider>
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
      <Route path="/" element={<HomePage />} />
      <Route path="/launches" element={<LaunchesPage />} />
      <Route path="/launches/:launchId" element={<LaunchPage />} />
      <Route path="/launch-pads" element={<LaunchPadsPage />} />
      <Route path="/launch-pads/:launchPadId" element={<LaunchPadPage />} />
    </Routes>
  );
}
