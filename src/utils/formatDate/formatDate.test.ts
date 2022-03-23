import { formatDateTime } from "./formatDate";

describe("formatDateTime", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  test("Parses date with users timezone by default", () => {
    const formattedDate = formatDateTime("2009-07-13T15:35:00+12:00");

    expect(formattedDate).toBe("July 13, 2009, 05:35:00 +02:00");
  });

  test("Parses date with users timezone if configured", () => {
    const formattedDate = formatDateTime("2009-07-13T15:35:00+12:00", {
      keepTimezone: false,
    });

    expect(formattedDate).toBe("July 13, 2009, 05:35:00 +02:00");
  });

  test("Parses date with existing ISO timezone if configured", () => {
    const formattedDate = formatDateTime("2009-07-13T15:35:00+12:00", {
      keepTimezone: true,
    });

    expect(formattedDate).toBe("July 13, 2009, 03:35:00 +12:00");
  });

  test("Returns empty string on invalid date", () => {
    const formattedDate = formatDateTime("invalid-date");
    expect(formattedDate).toBe("");
  });
});
