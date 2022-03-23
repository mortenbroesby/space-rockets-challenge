import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useFavoriteContext } from "./context";

export function FavoritesSection() {
  const { isDrawerOpen, closeDrawer } = useFavoriteContext();

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
      </DrawerContent>
    </Drawer>
  );
}
