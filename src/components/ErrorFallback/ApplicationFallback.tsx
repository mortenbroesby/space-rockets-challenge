import { ErrorFallback, ErrorFallbackProps } from "./ErrorFallback";

export function ApplicationFallback(properties: ErrorFallbackProps) {
  return <ErrorFallback errorType="app" {...properties} />;
}

export const defaultErrorHandler = (
  error: Error,
  info: { componentStack: string }
) => {
  console.warn("error: ", { error, info });
};
