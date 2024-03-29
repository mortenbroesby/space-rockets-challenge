import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Breadcrumbs,
  FavoriteButton,
  LoadMoreButton,
  PageFallback,
} from "../../components";
import {
  Launch,
  useFavoriteContext,
  useSpaceXPaginated,
} from "../../infrastructure";
import { noop, formatDate, formatTimeAgo } from "../../utils";

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
    setSize = noop,
    isValidating,
    size = 0,
  } = useSpaceXPaginated("/launches/past", fetchOptions);

  const safeData: Launch[] = Array.isArray(data) ? data : [];

  const fetchMoreData = () => {
    setSize(size + 1);
  };

  return (
    <Box
      id="scrollableDiv"
      height={[
        "calc(100vh - 60px)",
        "calc(100vh - 60px)",
        "calc(100vh - 91px)",
      ]}
      width="100vw"
      overflowX={"hidden"}
      overflowY={"auto"}
    >
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        marginBottom={false}
      />

      {error && <PageFallback error={error} />}

      <InfiniteScroll
        dataLength={safeData.length}
        next={() => fetchMoreData()}
        hasMore={true}
        loader={null}
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.9}
      >
        <SimpleGrid minChildWidth="350px" spacing="4" p={[4, null, 6]}>
          {safeData.flat().map((launch) => (
            <LaunchItem launch={launch} key={launch.flight_number} />
          ))}
        </SimpleGrid>
      </InfiniteScroll>

      <LoadMoreButton
        loadMore={() => fetchMoreData()}
        data={safeData}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </Box>
  );
}

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

      <Flex position="absolute" top="5" right="5">
        <FavoriteButton
          isFavorited={isFlightFavorited}
          onClick={(event) => {
            setFavorite(event, flightNumberId, isFlightFavorited);
          }}
        />
      </Flex>

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
              {formatTimeAgo(launch_date_utc)}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
