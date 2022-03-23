import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import { NavBar } from "./NavBar";

import {
  HomePage,
  LaunchesPage,
  LaunchPage,
  LaunchPadsPage,
  LaunchPadPage,
  FavoritesProvider,
  FavoritesSection,
} from "../domains";

export function Application() {
  return (
    <Router>
      <FavoritesProvider>
        <ChakraProvider>
          <CSSReset />
          <RootComponents />
        </ChakraProvider>
      </FavoritesProvider>
    </Router>
  );
}

function RootComponents() {
  return (
    <div>
      <NavBar />
      <AppRoutes />
      <FavoritesSection />
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
