import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  Text,
} from "@chakra-ui/react";

import { useFavoriteContext } from "../../infrastructure";

export function FavoritesDrawer() {
  const { favorites, isDrawerOpen, closeDrawer } = useFavoriteContext();

  const launches = favorites.filter((item) => item.type === "Launch");
  const launchPads = favorites.filter((item) => item.type === "LaunchPad");

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
          <Text>Launches: {launches.length}</Text>
          <Text>LaunchPads: {launchPads.length}</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
