import React from "react";
import { Spinner, Flex, Button } from "@chakra-ui/core";

interface LoadMoreButtonProps {
  loadMore: any;
  data: any;
  pageSize: any;
  isLoadingMore: any;
}

export function LoadMoreButton(properties: LoadMoreButtonProps) {
  const { loadMore, data, pageSize, isLoadingMore } = properties;

  const isReachingEnd =
    data?.[0]?.length === 0 ||
    (data && data[data.length - 1]?.length < pageSize);

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
