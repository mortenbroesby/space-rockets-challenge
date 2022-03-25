import React from "react";
import { Spinner, Flex, Button } from "@chakra-ui/react";

interface LoadMoreButtonProps<T extends any> {
  loadMore: () => void;
  data: T;
  pageSize: number;
  isLoadingMore: boolean;
}

export function LoadMoreButton<T extends any[]>(
  properties: LoadMoreButtonProps<T>
) {
  const { loadMore, data, pageSize, isLoadingMore } = properties;

  const dataLength = data[data.length - 1]?.length ?? 0;
  const isReachingEnd = data[0]?.length === 0 || dataLength < pageSize;

  return (
    <Flex justifyContent="center" mt="2" mb="4">
      <Button onClick={loadMore} isDisabled={isReachingEnd || isLoadingMore}>
        {isLoadingMore ? (
          <Spinner />
        ) : isReachingEnd ? (
          "That's all!"
        ) : (
          "Show more..."
        )}
      </Button>
    </Flex>
  );
}
