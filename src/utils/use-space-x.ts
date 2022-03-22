import useSWR, { useSWRInfinite } from "swr";

const fetcher = async (...args: any[]) => {
  const response = await fetch(args as any);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
};

function getSpaceXUrl(path: string, options: any) {
  const searchParams = new URLSearchParams();
  for (const property in options) {
    searchParams.append(property, options[property]);
  }

  const spaceXApiBase = process.env.REACT_APP_SPACEX_API_URL;
  return `${spaceXApiBase}${path}?${searchParams.toString()}`;
}

export function useSpaceX(path: string, options: any) {
  const endpointUrl = getSpaceXUrl(path, options);
  return useSWR(path ? endpointUrl : null, fetcher);
}

export function useSpaceXPaginated(path: string, options: any) {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }

    return getSpaceXUrl(path, {
      ...options,
      offset: options.limit * pageIndex,
    });
  }, fetcher);
}
