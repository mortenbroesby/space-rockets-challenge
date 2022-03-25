import React from "react";
import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Error, Breadcrumbs, LoadMoreButton } from "../../components";
import { useSpaceXPaginated, noop } from "../../utils";
import { LaunchPad } from "../../infrastructure";

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

function LaunchPadItem({ launchPad }: LaunchPadBaseProps) {
  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.site_id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
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
