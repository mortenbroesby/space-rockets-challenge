import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";
import { Check, Star } from "react-feather";

import { useSpaceXPaginated, noop, formatDate } from "../../utils";
import { Error, Breadcrumbs, LoadMoreButton } from "../../components";
import { Launch, useFavoriteContext } from "../../infrastructure";

const PAGE_SIZE = 12;

interface LaunchesBaseProps {
  launch: Launch;
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

  const safeData: Launch[] = Array.isArray(data) ? data : [];
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

const FavoriteButton = ({
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

export function LaunchItem({ launch }: LaunchesBaseProps) {
  const { isFavorited, addToFavorites, removeFromFavorites } =
    useFavoriteContext();

  const {
    flight_number,
    links,
    mission_name,
    launch_success,
    rocket,
    launch_date_utc,
    launch_site,
  } = launch;

  const flightNumberId = String(flight_number);
  const isFlightFavorited = isFavorited(flightNumberId);

  const setFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    flightNumberId: string,
    isFavorited: boolean
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavorited) {
      return removeFromFavorites({
        id: flightNumberId,
        type: "Launch",
      });
    } else {
      return addToFavorites({
        id: flightNumberId,
        type: "Launch",
        payload: launch,
      });
    }
  };

  return (
    <Box
      as={Link}
      to={`/launches/${flightNumberId}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          links.mission_patch_small
        }
        alt={`${mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Flex>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {launch_success ? (
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
              {rocket.rocket_name} &bull; {launch_site.site_name}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {mission_name}
          </Box>

          <Flex>
            <Text fontSize="sm">{formatDate(launch_date_utc)} </Text>

            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch_date_utc)}
            </Text>
          </Flex>
        </Box>

        <Flex alignItems="center" marginLeft="auto" p="6">
          <FavoriteButton
            isFavorited={isFlightFavorited}
            onClick={(event) => {
              setFavorite(event, flightNumberId, isFlightFavorited);
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
