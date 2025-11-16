import { DiscordianDate, FormatOptions } from './types';
import { getLocale } from './locales';

/**
 * Format a Discordian date as a human-readable string
 *
 * @param date - The Discordian date to format
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * format(toDiscordian(new Date('2024-01-05')))
 * // "Sweetmorn, Chaos 5, 3190 YOLD - Mungday"
 *
 * format(toDiscordian(new Date('2024-01-05')), { locale: 'pt-BR' })
 * // "Docemanhã, Caos 5, 3190 ANSD - Dia de Mung"
 */
export function format(date: DiscordianDate, options: FormatOptions = {}): string {
  const {
    locale = 'en',
    includeHolyday = true,
    includeWeekday = true
  } = options;

  const strings = getLocale(locale);

  // St. Tib's Day special case
  if (date.isStTibsDay) {
    return `${strings.stTibsDay}, ${date.year} ${strings.yold}`;
  }

  const parts: string[] = [];

  // Weekday
  if (includeWeekday && date.weekday) {
    parts.push(strings.weekdays[date.weekday]);
  }

  // Season and day
  const seasonDay = `${strings.seasons[date.season]} ${date.dayOfSeason}`;
  parts.push(seasonDay);

  // Year
  parts.push(`${date.year} ${strings.yold}`);

  let result = parts.join(', ');

  // Holyday
  if (includeHolyday && date.holyday) {
    result += ` - ${strings.holydays[date.holyday]}`;
  }

  return result;
}

/**
 * Format a Discordian date in short format (no weekday)
 *
 * @param date - The Discordian date to format
 * @param locale - Language locale
 * @returns Short formatted date string
 *
 * @example
 * shortFormat(toDiscordian(new Date('2024-01-05')))
 * // "Chaos 5, 3190 YOLD"
 */
export function shortFormat(date: DiscordianDate, locale: string = 'en'): string {
  return format(date, { locale, includeWeekday: false, includeHolyday: false });
}
