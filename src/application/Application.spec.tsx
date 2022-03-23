import React from "react";
import { render } from "@testing-library/react";
import { Application } from "./Application";

test("Placeholder test passes", () => {
  render(<Application />);
  expect(true).toBe(true);
});
