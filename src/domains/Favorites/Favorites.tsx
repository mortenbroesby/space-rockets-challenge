import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

export function FavoritesSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={() => setIsDrawerOpen(false)}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Favorites</DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
