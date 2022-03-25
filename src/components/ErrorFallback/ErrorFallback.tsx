import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

import { isDev } from "../../utils";

export interface ErrorFallbackProps {
  error: Error;
  errorType?: "api" | "app";
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({
  error,
  errorType = "api",
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const errorTitle =
    errorType === "api" ? "Problems loading the data" : "There was an issue";

  const errorDescription =
    errorType === "api"
      ? `If the problem persists, try to refresh the page or wait a few minutes and try again.`
      : `If the problem persists, try to refresh the page or wait a few minutes and try again.`;

  const showButton = errorType === "api";
  const showDebugError = isDev();

  const debugComponent = showDebugError ? (
    <Box bg="tomato" w="100%" p={2} color="white" m={4} mt={6}>
      <AlertDescription width="400px" maxWidth="xxl" background="blue">
        <Text fontWeight={600}>Error-message</Text>
        <Text>{error.message}</Text>
      </AlertDescription>
    </Box>
  ) : null;

  return (
    <Flex alignItems="center" justifyContent="center" width="100%">
      <Alert
        status="error"
        variant="left-accent"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        p="8"
      >
        <Flex
          direction="row"
          padding={2}
          alignItems="center"
          justifyContent="center"
        >
          <AlertTitle fontSize="lg">{errorTitle}</AlertTitle>
          <AlertIcon mr={0} />
        </Flex>

        <AlertDescription>{errorDescription}</AlertDescription>

        {debugComponent}

        {showButton ? (
          <Button marginTop={5} onClick={resetErrorBoundary}>
            Try again
          </Button>
        ) : null}
      </Alert>
    </Flex>
  );
}
