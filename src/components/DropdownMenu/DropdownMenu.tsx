import { FC, ReactNode } from "react";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDown } from "react-feather";

export interface DropdownMenuProps {
  menuItems: ReactNode;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ menuItems }) => {
  const textColor = useColorModeValue("black", "white");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDown />} colorScheme="blue">
        Menu
      </MenuButton>

      <MenuList css={{ color: textColor }}>{menuItems}</MenuList>
    </Menu>
  );
};
