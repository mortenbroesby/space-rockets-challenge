import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { ChevronsRight } from "react-feather";

interface BreadcrumbItem {
  label: string;
  to: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs(properties: BreadcrumbsProps) {
  const { items } = properties;

  const ChakraBreadcrumbLink: any = BreadcrumbLink; // TODO: Fix types

  return (
    <Breadcrumb
      m="6"
      spacing="1"
      separator={<Box size="1em" as={ChevronsRight} color="gray.300" />}
    >
      {items.map((item, index) => {
        const isCurrentPage = items.length === index + 1;
        return (
          <BreadcrumbItem isCurrentPage={isCurrentPage} key={item.label}>
            <ChakraBreadcrumbLink
              as={!isCurrentPage ? Link : undefined}
              to={!isCurrentPage ? item.to : undefined}
            >
              {item.label}
            </ChakraBreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
