import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronsRight } from "react-feather";

interface BreadcrumbSchema {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbSchema[];
  marginBottom?: boolean;
}

export function Breadcrumbs(properties: BreadcrumbsProps) {
  const { items, marginBottom = true } = properties;

  return (
    <Breadcrumb
      m="6"
      spacing="1"
      separator={<Box size="1em" as={ChevronsRight} color="gray.300" />}
      mb={marginBottom ? "6" : "0"}
    >
      {items.map((item, index) => {
        const isCurrentPage = items.length === index + 1;
        return (
          <BreadcrumbItem isCurrentPage={isCurrentPage} key={item.label}>
            <BreadcrumbLink
              as={!isCurrentPage ? Link : undefined}
              to={!isCurrentPage ? item.to : (undefined as any)}
            >
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
