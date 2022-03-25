import { IconButton } from "@chakra-ui/react";
import { Check, Star } from "react-feather";

export const FavoriteButton = ({
  onClick,
  isFavorited,
  size = "medium",
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFavorited: boolean;
  size?: "medium" | "small";
}) => {
  const buttonSize = size === "medium" ? "md" : "sm";
  const iconSize = size === "medium" ? 24 : 12;

  return (
    <IconButton
      aria-label="Favorite"
      onClick={(event) => onClick(event)}
      size={buttonSize}
    >
      {isFavorited ? <Check size={iconSize} /> : <Star size={iconSize} />}
    </IconButton>
  );
};
