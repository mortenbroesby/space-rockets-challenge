import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Launch, LaunchPad, useFavoriteContext } from "../../infrastructure";
import { FavoriteLaunchItem } from "./FavoriteLaunchItem";
import { FavoriteLaunchPadItem } from "./FavoriteLaunchPadItem";

export function FavoritesDrawer() {
  const { favorites, isDrawerOpen, closeDrawer, removeFromFavorites } =
    useFavoriteContext();

  const launches = favorites
    .filter((item) => item.type === "Launch")
    .map((item) => item.payload) as Launch[];

  const launchPads = favorites
    .filter((item) => item.type === "LaunchPad")
    .map((item) => item.payload) as LaunchPad[];

  const launchesItems = launches.map((launch) => {
    return (
      <FavoriteLaunchItem
        launch={launch}
        key={launch.flight_number}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          removeFromFavorites({
            id: `${launch.flight_number}`,
            type: "Launch",
          });
        }}
      />
    );
  });

  const launchPadsItems = launchPads.map((launchPad) => {
    return (
      <FavoriteLaunchPadItem
        launchPad={launchPad}
        key={launchPad.site_id}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          removeFromFavorites({ id: launchPad.site_id, type: "LaunchPad" });
        }}
      />
    );
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
            Launch Pads ({launchPads.length})
          </Text>
          <Stack paddingBottom={10}>{launchPadsItems}</Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
