import { IconButton } from "@chakra-ui/react";
import { Check, Star } from "react-feather";

export const FavoriteButton = ({
  onClick,
  isFavorited,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFavorited: boolean;
}) => {
  return (
    <IconButton aria-label="Favorite" onClick={(event) => onClick(event)}>
      {isFavorited ? <Check /> : <Star />}
    </IconButton>
  );
};
