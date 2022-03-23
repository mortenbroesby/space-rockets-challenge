import { formatDate, formatDateTime } from "./formatDate";

describe("formatDate", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  test("Parses date with users timezone by default", () => {
    const formattedDate = formatDate("2009-07-13T15:35:00+12:00");

    expect(formattedDate).toBe("Monday, July 13, 2009");
  });

  test("Parses date with users timezone if configured", () => {
    const formattedDate = formatDate("2009-07-13T15:35:00+12:00", {
      keepTimezone: false,
    });

    expect(formattedDate).toBe("Monday, July 13, 2009");
  });

  test("Parses date with existing ISO timezone if configured", () => {
    const formattedDate = formatDate("2009-07-13T15:35:00+12:00", {
      keepTimezone: true,
    });

    expect(formattedDate).toBe("Monday, July 13, 2009");
  });

  test("Returns empty string on invalid date", () => {
    const formattedDate = formatDate("invalid-date");
    expect(formattedDate).toBe("");
  });
});

describe("formatDateTime", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  test("Parses date with users timezone by default", () => {
    const formattedDate = formatDateTime("2009-07-13T15:35:00+12:00");

    expect(formattedDate).toBe("July 13, 2009, 5:35:00 AM GMT+2");
  });

  test("Parses date with users timezone if configured", () => {
    const formattedDate = formatDateTime("2009-07-13T15:35:00+12:00", {
      keepTimezone: false,
    });

    expect(formattedDate).toBe("July 13, 2009, 5:35:00 AM GMT+2");
  });

  test("Parses date with existing ISO timezone if configured", () => {
    const formattedDate = formatDateTime("2009-07-13T15:35:00+12:00", {
      keepTimezone: true,
    });

    expect(formattedDate).toBe("July 13, 2009, 3:35:00 PM GMT+12");
  });

  test("Returns empty string on invalid date", () => {
    const formattedDate = formatDateTime("invalid-date");
    expect(formattedDate).toBe("");
  });
});
