import React from "react";
import { Flex, Text, Spacer } from "@chakra-ui/react";

import { isDev } from "../utils";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

export function NavBar() {
  const debugVersion = process.env.REACT_APP_VERSION ?? -1;

  const isDevelopment = isDev();
  const debugString = isDevelopment ? `Version: ${debugVersion}` : "";

  const debugComponent = isDevelopment ? (
    <Text fontFamily="mono" letterSpacing="2px" fontWeight="bold" fontSize="lg">
      {debugString}
    </Text>
  ) : null;

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

      <Spacer />

      {debugComponent}
      <ColorModeSwitcher />
    </Flex>
  );
}
