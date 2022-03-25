import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  Stack,
  Text,
  Box,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Launch, LaunchPad, useFavoriteContext } from "../../infrastructure";

function FavoriteLaunchItem({ launch }: { launch: Launch }) {
  const { flight_number, mission_name, links } = launch;

  const flightNumberId = String(flight_number);

  return (
    <Stack direction="row" marginBottom={2}>
      <Box
        as={Link}
        to={`/launches/${flightNumberId}`}
        boxShadow="md"
        rounded="lg"
        overflow="hidden"
        position="relative"
        width="100%"
      >
        <Image
          src={
            links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            links.mission_patch_small
          }
          alt={`${mission_name} launch`}
          height={["100px", null, "100px"]}
          width="100%"
          objectFit="cover"
          objectPosition="center"
        />

        <Flex padding={2}>
          <Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {mission_name}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Stack>
  );
}

export function FavoritesDrawer() {
  const { favorites, isDrawerOpen, closeDrawer } = useFavoriteContext();

  const launches = favorites
    .filter((item) => item.type === "Launch")
    .map((item) => item.payload) as Launch[];

  const launchPads = favorites
    .filter((item) => item.type === "LaunchPad")
    .map((item) => item.payload) as LaunchPad[];

  const launchesItems = launches.map((launch) => {
    return <FavoriteLaunchItem launch={launch} key={launch.flight_number} />;
  });

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={() => closeDrawer()}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Favorites</DrawerHeader>

        <DrawerBody>
          <Text fontWeight={600} paddingBottom={2}>
            Launches ({launches.length})
          </Text>

          <Stack paddingBottom={10}>{launchesItems}</Stack>

          <Text fontWeight={600} paddingBottom={2}>
            LaunchPads ({launchPads.length})
          </Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
