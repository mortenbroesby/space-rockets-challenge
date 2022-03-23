import useSWR, { useSWRInfinite } from "swr";

const fetcher = async (...args: any[]) => {
  const response = await fetch(args as any);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
};

function getSpaceXUrl(path: string | null, options: any) {
  const searchParams = new URLSearchParams();
  for (const property in options) {
    searchParams.append(property, options[property]);
  }

  const spaceXApiBase = process.env.REACT_APP_SPACEX_API_URL;
  return `${spaceXApiBase}${path}?${searchParams.toString()}`;
}

export function useSpaceX<T extends any>(path: string | null, options?: any) {
  const endpointUrl = getSpaceXUrl(path, options);

  type SWRResponse = {
    data?: T;
    error?: any;
  };

  return useSWR(path ? endpointUrl : null, fetcher) as SWRResponse;
}

export function useSpaceXPaginated<T extends any>(path: string, options: any) {
  type SWRInfiniteResponse = {
    data?: T;
    error?: any;
    size?: number;
    isValidating: boolean;
    setSize?: (
      size: number | ((size: number) => number)
    ) => Promise<T | undefined>;
  };

  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }

    return getSpaceXUrl(path, {
      ...options,
      offset: options.limit * pageIndex,
    });
  }, fetcher) as SWRInfiniteResponse;
}
