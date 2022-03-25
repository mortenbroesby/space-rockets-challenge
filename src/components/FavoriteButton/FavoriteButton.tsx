import { Box, IconButton } from "@chakra-ui/react";
import { Star } from "react-feather";

import { noop } from "../../utils";

export const FavoriteButton = ({
  onClick,
  isFavorited,
  size = "medium",
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFavorited: boolean;
  size?: "medium" | "small";
}) => {
  const buttonSize = size === "medium" ? "md" : "sm";
  const iconSize = size === "medium" ? 24 : 18;

  return (
    <Box>
      <IconButton
        aria-label="Favorite"
        onClick={(event) => (onClick ? onClick(event) : noop)}
        size={buttonSize}
        color={isFavorited ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"}
        colorScheme={isFavorited ? "green" : "whiteAlpha"}
        borderRadius={"50%"}
        borderWidth="1px"
        boxShadow="md"
      >
        <Star size={iconSize} />
      </IconButton>
    </Box>
  );
};
