import React from "react";
import { Spinner, Flex, Button } from "@chakra-ui/react";

interface LoadMoreButtonProps {
  loadMore: () => void;
  data: any[];
  pageSize: number;
  isLoadingMore: boolean;
}

export function LoadMoreButton(properties: LoadMoreButtonProps) {
  const { loadMore, data, pageSize, isLoadingMore } = properties;

  const dataLength = data[data.length - 1]?.length;
  const isReachingEnd = data[0]?.length === 0 || dataLength < pageSize;

  return (
    <Flex justifyContent="center" my="100px">
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
