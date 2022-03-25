import { Stack, Box, Image, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FavoriteButton } from "../../components";
import { Launch } from "../../infrastructure";
import { formatTimeAgo } from "../../utils";

export function FavoriteLaunchItem({
  launch,
  onClick,
}: {
  launch: Launch;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const { flight_number, mission_name, links, launch_date_utc } = launch;

  const flightNumberId = String(flight_number);

  return (
    <Stack direction="row">
      <Box
        as={Link}
        to={`/launches/${flightNumberId}`}
        boxShadow="md"
        rounded="lg"
        overflow="hidden"
        position="relative"
        width="100%"
      >
        <Image
          src={
            links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            links.mission_patch_small
          }
          alt={`${mission_name} launch`}
          height={["80px", null, "80px"]}
          width="100%"
          objectFit="cover"
          objectPosition="center"
        />

        <Flex direction="row" padding={2} alignItems="center">
          <Box>
            <Box
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              fontSize="sm"
            >
              {mission_name}
            </Box>

            <Flex direction="column">
              <Text color="gray.500" fontSize="xs">
                {formatTimeAgo(launch_date_utc)}
              </Text>
            </Flex>
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
