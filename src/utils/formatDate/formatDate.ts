import moment from "moment";

export function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export interface FormattingOptions {
  keepTimezone: boolean;
}

export function formatDateTime(
  targetDate: string,
  options?: FormattingOptions
): string {
  const { keepTimezone = false } = options ?? {};

  const parsedDate = keepTimezone
    ? moment.parseZone(targetDate)
    : moment(targetDate);

  const formattedDate = parsedDate.format("MMMM DD, YYYY, HH:mm:ss Z");

  const dateToString = formattedDate.toString().toLowerCase();
  const isInvalidDate = dateToString.includes("invalid");
  if (isInvalidDate) {
    return "";
  }

  return formattedDate;
}
