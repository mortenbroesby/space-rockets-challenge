import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Routes, Route } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";

import Home from "../domains/home";
import Launches from "../domains/launches";
import Launch from "../components/launch";
import LaunchPads from "../components/launch-pads";
import LaunchPad from "../components/launch-pad";

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

function RootComponents() {
  return (
    <div>
      <NavBar />
      <AppRoutes />
    </div>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
    </Flex>
  );
}
