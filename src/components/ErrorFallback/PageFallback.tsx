import { ErrorFallback, ErrorFallbackProps } from "./ErrorFallback";

export function PageFallback(properties: ErrorFallbackProps) {
  return <ErrorFallback errorType="app" {...properties} />;
}
