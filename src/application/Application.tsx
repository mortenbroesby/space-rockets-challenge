import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import {
  HomePage,
  LaunchesPage,
  LaunchPage,
  LaunchPadsPage,
  LaunchPadPage,
  FavoritesDrawer,
} from "../domains";
import { FavoritesProvider } from "../infrastructure";
import { ApplicationFallback, defaultErrorHandler } from "../components";
import { NavBar } from "./NavBar";

export function Application() {
  return (
    <ChakraProvider>
      <CSSReset />

      <ErrorBoundary
        FallbackComponent={ApplicationFallback}
        onError={defaultErrorHandler}
      >
        <FavoritesProvider>
          <DefaultPage />
        </FavoritesProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

function DefaultPage() {
  return (
    <>
      <NavBar />
      <AppRoutes />
      <FavoritesDrawer />
    </>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launches" element={<LaunchesPage />} />
        <Route path="/launches/:launchId" element={<LaunchPage />} />
        <Route path="/launch-pads" element={<LaunchPadsPage />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPadPage />} />
      </Routes>
    </Router>
  );
}
