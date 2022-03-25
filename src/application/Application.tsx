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
import { ApplicationFallback } from "../components";
import { NavBar } from "./NavBar";

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

const errorHandler = (error: Error, info: { componentStack: string }) => {
  console.warn("error: ", { error, info });
};

function RootComponents() {
  return (
    <>
      <NavBar />
      <ErrorBoundary
        FallbackComponent={ApplicationFallback}
        onError={errorHandler}
      >
        <AppRoutes />
      </ErrorBoundary>
      <FavoritesDrawer />
    </>
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
