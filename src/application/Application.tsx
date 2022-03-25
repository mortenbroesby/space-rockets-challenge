import { BrowserRouter as Router } from "react-router-dom";
import { Box, ChakraProvider, CSSReset } from "@chakra-ui/react";
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
    <Router>
      <ChakraProvider>
        <CSSReset />

        <ErrorBoundary
          FallbackComponent={ApplicationFallback}
          onError={defaultErrorHandler}
        >
          <FavoritesProvider>
            <NavBar />
            <AppRoutes />
            <FavoritesDrawer />
          </FavoritesProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </Router>
  );
}

function AppRoutes() {
  return (
    <Box overflowX={"hidden"} overflowY={"hidden"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launches" element={<LaunchesPage />} />
        <Route path="/launches/:launchId" element={<LaunchPage />} />
        <Route path="/launch-pads" element={<LaunchPadsPage />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPadPage />} />
      </Routes>
    </Box>
  );
}
