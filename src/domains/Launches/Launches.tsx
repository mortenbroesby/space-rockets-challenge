import React from "react";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../../utils";
import { formatDate } from "../../utils";
import { Error } from "../../components/Error";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { noop } from "../../utils/misc";
import { Launches } from "./types/launches";

const PAGE_SIZE = 12;

interface LaunchesBaseProps {
  launch: Launches;
}

export function LaunchesPage() {
  const fetchOptions = {
    limit: PAGE_SIZE,
    order: "desc",
    sort: "launch_date_utc",
  };

  const {
    data,
    error,
    isValidating,
    setSize = noop,
    size = 0,
  } = useSpaceXPaginated("/launches/past", fetchOptions);

  const safeData: Launches[] = Array.isArray(data) ? data : [];
  const gridContent = safeData
    .flat()
    .map((launch) => <LaunchItem launch={launch} key={launch.flight_number} />);

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />

      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {gridContent}
      </SimpleGrid>

      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={safeData}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function LaunchItem({ launch }: LaunchesBaseProps) {
  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launch.launch_success ? (
            <Badge px="2" variant="solid" colorScheme="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" colorScheme="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launch.mission_name}
        </Box>

        <Flex>
          <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
