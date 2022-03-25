import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Watch, MapPin, Navigation, Layers } from "react-feather";
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
  Image,
  Link,
  Stack,
  AspectRatio,
  StatGroup,
  Tooltip,
} from "@chakra-ui/react";

import { Launch, useFavoriteContext } from "../../infrastructure";
import { useSpaceX, formatDateTime, formatTimeAgo } from "../../utils";
import { PageFallback, Breadcrumbs, FavoriteButton } from "../../components";

interface LaunchBaseProps {
  launch: Launch;
}

export function LaunchPage() {
  let { launchId } = useParams();

  const { data: launch, error } = useSpaceX<Launch>(`/launches/${launchId}`);

  if (error) {
    return <PageFallback error={error} />;
  }

  if (!launch) {
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
          { label: "Launches", to: "/launches" },
          { label: `#${launch.flight_number}` },
        ]}
      />
      <Header launch={launch} />
      <Box m={[3, 6]}>
        <TimeAndLocation launch={launch} />

        <RocketInfo launch={launch} />

        <Text fontSize={["md", null, "lg"]} my="8">
          {launch.details}
        </Text>

        <Video launch={launch} />
        <Gallery images={launch.links.flickr_images} />
      </Box>
    </div>
  );
}

function Header({ launch }: LaunchBaseProps) {
  const { isFavorited, addToFavorites, removeFromFavorites } =
    useFavoriteContext();

  const { flight_number } = launch;

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
    <Flex
      bgImage={`url(${launch.links.flickr_images[0]})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height={["85px", "150px"]}
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box position="absolute" top="5" right="5">
        <FavoriteButton
          isFavorited={isFlightFavorited}
          onClick={(event) =>
            setFavorite(event, flightNumberId, isFlightFavorited)
          }
        />
      </Box>

      <Heading
        color="white"
        display="inline"
        backgroundColor="#718096b8"
        fontSize={["sm", "lg", "5xl"]}
        px="4"
        py="2"
        borderRadius="lg"
        mr="5"
      >
        {launch.mission_name}
      </Heading>

      <Stack isInline spacing="3" alignSelf="flex-end">
        <Badge colorScheme="purple" fontSize={["xs", "md"]}>
          #{launch.flight_number}
        </Badge>
        {launch.launch_success ? (
          <Badge colorScheme="green" fontSize={["xs", "md"]}>
            Successful
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize={["xs", "md"]}>
            Failed
          </Badge>
        )}
      </Stack>
    </Flex>
  );
}

function TimeAndLocation({ launch }: LaunchBaseProps) {
  const { launch_date_local, launch_date_utc } = launch;

  const timezoneFormattedDate = formatDateTime(launch_date_local, {
    keepUserTimezone: true,
  });

  const userFormattedDate = formatDateTime(launch_date_local, {
    keepUserTimezone: false,
  });

  const utcFormattedDate = formatDateTime(launch_date_utc, {
    keepUserTimezone: true,
  });

  const tooltipLabel = (
    <>
      <Text fontSize="xs">{userFormattedDate}</Text>
      <Text fontSize="xs">{utcFormattedDate}</Text>
    </>
  );

  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={Watch} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Date
          </Box>
        </StatLabel>

        <StatNumber fontSize={["md", "xl"]}>
          <Tooltip hasArrow label={tooltipLabel}>
            {timezoneFormattedDate}
          </Tooltip>
        </StatNumber>

        <StatHelpText>{formatTimeAgo(launch.launch_date_utc)}</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Site
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          <Link
            as={RouterLink}
            to={`/launch-pads/${launch.launch_site.site_id}`}
          >
            {launch.launch_site.site_name_long}
          </Link>
        </StatNumber>
        <StatHelpText>{launch.launch_site.site_name}</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
}

function RocketInfo({ launch }: LaunchBaseProps) {
  const cores = launch.rocket.first_stage.cores;

  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      borderWidth="1px"
      mt="4"
      p="4"
      borderRadius="md"
    >
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Rocket
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          {launch.rocket.rocket_name}
        </StatNumber>
        <StatHelpText>{launch.rocket.rocket_type}</StatHelpText>
      </Stat>

      <StatGroup>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              First Stage
            </Box>
          </StatLabel>

          <StatNumber fontSize={["md", "xl"]}>
            {cores.map((core) => core.core_serial).join(", ")}
          </StatNumber>

          <StatHelpText>
            {cores.every((core) => core.land_success)
              ? cores.length === 1
                ? "Recovered"
                : "All recovered"
              : "Lost"}
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              Second Stage
            </Box>
          </StatLabel>

          <StatNumber fontSize={["md", "xl"]}>
            Block {launch.rocket.second_stage.block}
          </StatNumber>

          <StatHelpText>
            Payload:{" "}
            {launch.rocket.second_stage.payloads
              .map((payload) => payload.payload_type)
              .join(", ")}
          </StatHelpText>
        </Stat>
      </StatGroup>
    </SimpleGrid>
  );
}

function Video({ launch }: LaunchBaseProps) {
  return (
    <AspectRatio maxH="400px" ratio={1.7}>
      <Box
        as="iframe"
        title={launch.mission_name}
        src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
        allowFullScreen
      />
    </AspectRatio>
  );
}

interface GalleryProps {
  images: string[];
}

function Gallery({ images }: GalleryProps) {
  return (
    <SimpleGrid my="6" minChildWidth="350px" spacing="4">
      {images.map((image) => (
        <a href={image} key={image}>
          <Image src={image.replace("_o.jpg", "_z.jpg")} />
        </a>
      ))}
    </SimpleGrid>
  );
}
