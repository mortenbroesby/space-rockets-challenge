import { DateTime } from "luxon";

export interface TimezoneOptions {
  keepUserTimezone: boolean;
}

function formatInputDate({
  targetDate,
  formatOptions,
  options,
}: {
  targetDate: string;
  formatOptions: Intl.DateTimeFormatOptions;
  options?: TimezoneOptions;
}): string {
  const { keepUserTimezone = false } = options ?? {};

  const dateWithTimezone = DateTime.fromISO(targetDate, {
    setZone: keepUserTimezone,
  });

  const targetLocale = "en-US";

  const formattedDate = dateWithTimezone
    .setLocale(targetLocale)
    .toLocaleString(formatOptions);

  const dateToString = formattedDate.toString().toLowerCase();

  const isInvalidDate = dateToString.includes("invalid");
  if (isInvalidDate) {
    return "";
  }

  return formattedDate;
}

export function formatDate(
  targetDate: string,
  options?: TimezoneOptions
): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return formatInputDate({ targetDate, formatOptions, options });
}

export function formatDateTime(
  targetDate: string,
  options?: TimezoneOptions
): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  return formatInputDate({ targetDate, formatOptions, options });
}
