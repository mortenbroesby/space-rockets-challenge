import { ErrorFallback, ErrorFallbackProps } from "./ErrorFallback";

export function ApplicationFallback(properties: ErrorFallbackProps) {
  return <ErrorFallback errorType="app" {...properties} />;
}
