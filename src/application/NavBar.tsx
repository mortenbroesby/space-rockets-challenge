import { Flex, Text, Spacer, Button, Box } from "@chakra-ui/react";
import { Star } from "react-feather";

import { ColorModeSwitcher } from "../components";
import { useFavoriteContext } from "../infrastructure";

export function NavBar() {
  const { openDrawer } = useFavoriteContext();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={["2", null, "6"]}
      bg="gray.800"
      color="white"
      zIndex={2}
      width="100%"
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

      <Button
        colorScheme="blue"
        onClick={() => openDrawer()}
        paddingStart={["2", "4", "4"]}
        paddingEnd={["2", "4", "4"]}
      >
        <Box display={["block", "none", "none"]}>
          <Star />
        </Box>

        <Box display={["none", "block", "block"]}>
          <Text>Open Favorites</Text>
        </Box>
      </Button>

      <ColorModeSwitcher />
    </Flex>
  );
}
