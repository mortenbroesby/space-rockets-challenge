import { Flex, Text, Spacer, Button } from "@chakra-ui/react";

import { isDev } from "../utils";
import { ColorModeSwitcher } from "../components";
import { useFavoriteContext } from "../infrastructure";

export function NavBar() {
  const debugVersion = process.env.REACT_APP_VERSION ?? -1;

  const isDevelopment = isDev();
  const debugString = isDevelopment ? `Version: ${debugVersion}` : "";

  const { openDrawer } = useFavoriteContext();

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
        ¡SPACE·R0CKETS! {debugString}
      </Text>

      <Spacer />

      <Button colorScheme="blue" onClick={() => openDrawer()}>
        Favorites
      </Button>

      <ColorModeSwitcher />
    </Flex>
  );
}
