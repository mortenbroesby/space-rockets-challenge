import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import {
  Breadcrumbs,
  LoadMoreButton,
  FavoriteButton,
  PageFallback,
} from "../../components";
import { useSpaceXPaginated, noop } from "../../utils";
import { LaunchPad, useFavoriteContext } from "../../infrastructure";

const PAGE_SIZE = 12;

interface LaunchPadBaseProps {
  launchPad: LaunchPad;
}

export function LaunchPadsPage() {
  const {
    data,
    error,
    isValidating,
    size = 0,
    setSize = noop,
  } = useSpaceXPaginated<LaunchPad[]>("/launchpads", {
    limit: PAGE_SIZE,
  });

  const safeData: LaunchPad[] = Array.isArray(data) ? data : [];
  const gridContent = safeData
    .flat()
    .map((launchPad) => (
      <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
    ));

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />

      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <PageFallback error={error} />}
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

function LaunchPadItem({ launchPad }: LaunchPadBaseProps) {
  const { isFavorited, addToFavorites, removeFromFavorites } =
    useFavoriteContext();

  const { site_id } = launchPad;

  const siteId = String(site_id);
  const isPadFavorited = isFavorited(siteId);

  const setFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    siteId: string,
    isFavorited: boolean
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavorited) {
      return removeFromFavorites({
        id: siteId,
        type: "LaunchPad",
      });
    } else {
      return addToFavorites({
        id: siteId,
        type: "LaunchPad",
        payload: launchPad,
      });
    }
  };

  return (
    <Box
      as={Link}
      to={`/launch-pads/${siteId}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box position="absolute" top="5" right="5">
        <FavoriteButton
          isFavorited={isPadFavorited}
          onClick={(event) => {
            setFavorite(event, siteId, isPadFavorited);
          }}
        />
      </Box>

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launchPad.status === "active" ? (
            <Badge px="2" variant="solid" colorScheme="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" colorScheme="red">
              Retired
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
            {launchPad.attempted_launches} attempted &bull;{" "}
            {launchPad.successful_launches} succeeded
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launchPad.name}
        </Box>

        <Text color="gray.500" fontSize="sm">
          {launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
    </Box>
  );
}
