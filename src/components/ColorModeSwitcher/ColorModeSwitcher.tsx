import React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { Sun, Moon } from "react-feather";

export const ColorModeSwitcher = (props: any) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(Moon, Sun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      colorScheme="blue"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon size={20} />}
      {...props}
    />
  );
};
