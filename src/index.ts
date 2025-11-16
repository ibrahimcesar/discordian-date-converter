/**
 * Discordian Date Converter
 *
 * A performant library to convert Gregorian calendar dates to Discordian calendar dates
 * with multi-language support.
 *
 * @packageDocumentation
 */

export { toDiscordian, fromString, fromISO, fromYMD, toGregorian, toISO } from './converter';
export { format, shortFormat } from './formatter';
export { getLocale, locales, en, ptBR } from './locales';
export type {
  DiscordianDate,
  Season,
  Weekday,
  Holyday,
  LocalizedStrings,
  FormatOptions
} from './types';
