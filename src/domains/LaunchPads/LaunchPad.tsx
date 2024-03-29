import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Navigation } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Stack,
  AspectRatio,
} from "@chakra-ui/react";

import {
  LaunchPad,
  Launch,
  Location,
  useFavoriteContext,
  useSpaceX,
} from "../../infrastructure";
import { randomColor } from "../../utils";
import { PageFallback, Breadcrumbs, FavoriteButton } from "../../components";
import { LaunchItem } from "../Launches";

interface LaunchPadBaseProps {
  launchPad: LaunchPad;
}

export function LaunchPadPage() {
  let { launchPadId } = useParams();

  const { data: launchPad, error } = useSpaceX<LaunchPad>(
    `/launchpads/${launchPadId}`
  );

  const { data: launches } = useSpaceX<Launch>(
    launchPad ? "/launches/past" : null,
    {
      limit: 3,
      order: "desc",
      sort: "launch_date_utc",
      site_id: launchPad?.site_id,
    }
  );

  const safeLaunches: Launch[] = Array.isArray(launches) ? launches : [];

  if (error) {
    return <PageFallback error={error} />;
  }

  if (!launchPad) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launch Pads", to: "/launch-pads" },
          { label: launchPad.name },
        ]}
      />

      <Header launchPad={launchPad} />

      <Box m={[3, 6]}>
        <LocationAndVehicles launchPad={launchPad} />

        <Text fontSize={["md", null, "lg"]} my="8">
          {launchPad.details}
        </Text>

        <Map location={launchPad.location} />

        <RecentLaunches launches={safeLaunches} />
      </Box>
    </div>
  );
}

function Header({ launchPad }: LaunchPadBaseProps) {
  const { isFavorited, addToFavorites, removeFromFavorites } =
    useFavoriteContext();

  const { site_id } = launchPad;

  const siteId = String(site_id);
  const isPadFavorited = isFavorited(siteId);

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
        type: "LaunchPad",
      });
    } else {
      return addToFavorites({
        id: flightNumberId,
        type: "LaunchPad",
        payload: launchPad,
      });
    }
  };

  return (
    <Flex
      background={`linear-gradient(${randomColor()}, ${randomColor()})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="15vh"
      position="relative"
      flexDirection={["column", "row"]}
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Box position="absolute" top="5" right="5">
        <FavoriteButton
          isFavorited={isPadFavorited}
          onClick={(event) => setFavorite(event, siteId, isPadFavorited)}
        />
      </Box>

      <Heading
        color="gray.900"
        display="inline"
        mx={[2, 4]}
        my="2"
        fontSize={["md", "3xl"]}
        borderRadius="lg"
      >
        {launchPad.site_name_long}
      </Heading>

      <Stack isInline spacing="3">
        <Badge colorScheme="purple" fontSize={["sm", "md"]}>
          {launchPad.successful_launches}/{launchPad.attempted_launches}{" "}
          successful
        </Badge>

        {launchPad.status === "active" ? (
          <Badge colorScheme="green" fontSize={["sm", "md"]}>
            Active
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize={["sm", "md"]}>
            Retired
          </Badge>
        )}
      </Stack>
    </Flex>
  );
}

function LocationAndVehicles({ launchPad }: LaunchPadBaseProps) {
  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Location
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">{launchPad.location.name}</StatNumber>
        <StatHelpText>{launchPad.location.region}</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Vehicles
          </Box>
        </StatLabel>

        <StatNumber fontSize="xl">
          {launchPad.vehicles_launched.join(", ")}
        </StatNumber>
      </Stat>
    </SimpleGrid>
  );
}

interface MapProps {
  location: Location;
}

function Map({ location }: MapProps) {
  const ChakraBox: any = Box; // TODO: fix typings related to `as` coercion

  return (
    <AspectRatio ratio={16 / 5}>
      <ChakraBox
        as="iframe"
        src={`https://maps.google.com/maps?q=${location.latitude}, ${location.longitude}&z=15&output=embed`}
        alt="demo"
      />
    </AspectRatio>
  );
}

interface RecentLaunchesProps {
  launches: Launch[];
}

function RecentLaunches({ launches }: RecentLaunchesProps) {
  if (!launches?.length) {
    return null;
  }

  return (
    <Stack my="8" spacing="3">
      <Text fontSize="xl" fontWeight="bold">
        Last launches
      </Text>

      <SimpleGrid minChildWidth="350px" spacing="4">
        {launches.map((launch) => (
          <LaunchItem launch={launch} key={launch.flight_number} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
