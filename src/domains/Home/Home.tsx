import React, { FC } from "react";
import { Flex, Box, Text, Stack, Link } from "@chakra-ui/core";
import { ArrowRight } from "react-feather";
import { Link as BrowserLink } from "react-router-dom";

export function Home() {
  return (
    <Stack m="6" spacing="6">
      <PageLink url="/launches">Browse SpaceX Launches</PageLink>
      <PageLink url="/launch-pads">Browse SpaceX Launch Pads</PageLink>
    </Stack>
  );
}

interface PageLinkProps {
  url: string;
}

const PageLink: FC<PageLinkProps> = (properties) => {
  const { url, children, ...remainingProps } = properties;

  const ChakraLink: any = Link; // TODO: Fix types
  const RouterLink: any = BrowserLink; // TODO: Fix types

  return (
    <ChakraLink as={RouterLink} to={url} {...remainingProps}>
      <Flex
        justifyContent="space-between"
        p="6"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
      >
        <Text fontSize="lg">{children}</Text>
        <Box as={ArrowRight} />
      </Flex>
    </ChakraLink>
  );
};
