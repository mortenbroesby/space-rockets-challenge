import { Stack, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FavoriteButton } from "../../components";
import { LaunchPad } from "../../infrastructure";

export function FavoriteLaunchPadItem({
  launchPad,
  onClick,
}: {
  launchPad: LaunchPad;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const { site_id } = launchPad;

  const siteId = String(site_id);

  return (
    <Stack direction="row">
      <Box
        as={Link}
        to={`/launch-pads/${siteId}`}
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        position="relative"
        width="100%"
      >
        <Flex alignItems="center" padding={2}>
          <Box>
            <Box
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              fontSize="sm"
            >
              {launchPad.name}
            </Box>

            <Text color="gray.500" fontSize="xs">
              {launchPad.vehicles_launched.join(", ")}
            </Text>
          </Box>

          <Flex alignItems="center" marginLeft="auto">
            <FavoriteButton
              isFavorited={true}
              onClick={(event) => onClick(event)}
              size="small"
            />
          </Flex>
        </Flex>
      </Box>
    </Stack>
  );
}
