import { DateTime } from "luxon";

export interface FormattingOptions {
  keepUserTimezone: boolean;
}

export function formatDate(
  targetDate: string,
  options?: FormattingOptions
): string {
  const { keepUserTimezone = false } = options ?? {};

  const dateWithTZ = DateTime.fromISO(targetDate, {
    setZone: keepUserTimezone,
  });

  const formattedDate = dateWithTZ.setLocale("en-US").toLocaleString({
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateToString = formattedDate.toString().toLowerCase();

  const isInvalidDate = dateToString.includes("invalid");
  if (isInvalidDate) {
    return "";
  }

  return formattedDate;
}

export function formatDateTime(
  targetDate: string,
  options?: FormattingOptions
): string {
  const { keepUserTimezone = false } = options ?? {};

  const dateWithTZ = DateTime.fromISO(targetDate, {
    setZone: keepUserTimezone,
  });

  const formattedDate = dateWithTZ.setLocale("en-US").toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  const dateToString = formattedDate.toString().toLowerCase();

  const isInvalidDate = dateToString.includes("invalid");
  if (isInvalidDate) {
    return "";
  }

  return formattedDate;
}
