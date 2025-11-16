import { DiscordianDate, Season, Weekday, Holyday } from './types';

// Constants for performance
const DAYS_PER_SEASON = 73;
const SEASONS_PER_YEAR = 5;
const DAYS_PER_WEEK = 5;
const YOLD_OFFSET = 1166;

const SEASONS: Season[] = ['Chaos', 'Discord', 'Confusion', 'Bureaucracy', 'The Aftermath'];
const WEEKDAYS: Weekday[] = ['Sweetmorn', 'Boomtime', 'Pungenday', 'Prickle-Prickle', 'Setting Orange'];

// Apostle Holydays (day 5 of each season)
const APOSTLE_HOLYDAYS: Holyday[] = ['Mungday', 'Mojoday', 'Syaday', 'Zaraday', 'Maladay'];

// Season Holydays (day 50 of each season)
const SEASON_HOLYDAYS: Holyday[] = ['Chaoflux', 'Discoflux', 'Confuflux', 'Bureflux', 'Afflux'];

/**
 * Check if a year is a leap year in the Gregorian calendar
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Get the day of year (1-365 or 1-366 for leap years)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Convert a Gregorian date to a Discordian date
 *
 * @param date - The Gregorian date to convert (defaults to current date)
 * @returns The Discordian date representation
 */
export function toDiscordian(date: Date = new Date()): DiscordianDate {
  const year = date.getFullYear() + YOLD_OFFSET;
  const dayOfYear = getDayOfYear(date);
  const isLeap = isLeapYear(date.getFullYear());

  // St. Tib's Day is February 29 (day 60 of the year)
  if (isLeap && dayOfYear === 60) {
    return {
      year,
      season: 'Chaos',
      dayOfSeason: 60, // Between Chaos 59 and Chaos 60
      weekday: null,
      holyday: null,
      isStTibsDay: true
    };
  }

  // Adjust day of year for leap years after St. Tib's Day
  let adjustedDay = dayOfYear;
  if (isLeap && dayOfYear > 60) {
    adjustedDay = dayOfYear - 1;
  }

  // Calculate season and day within season
  const seasonIndex = Math.floor((adjustedDay - 1) / DAYS_PER_SEASON);
  const dayOfSeason = ((adjustedDay - 1) % DAYS_PER_SEASON) + 1;
  const season = SEASONS[seasonIndex];

  // Calculate weekday
  const weekdayIndex = (adjustedDay - 1) % DAYS_PER_WEEK;
  const weekday = WEEKDAYS[weekdayIndex];

  // Determine holyday
  let holyday: Holyday | null = null;
  if (dayOfSeason === 5) {
    holyday = APOSTLE_HOLYDAYS[seasonIndex];
  } else if (dayOfSeason === 50) {
    holyday = SEASON_HOLYDAYS[seasonIndex];
  }

  return {
    year,
    season,
    dayOfSeason,
    weekday,
    holyday,
    isStTibsDay: false
  };
}

/**
 * Convert a Gregorian date string to a Discordian date
 *
 * @param dateString - ISO 8601 date string or any valid date string
 * @returns The Discordian date representation
 */
export function fromString(dateString: string): DiscordianDate {
  return toDiscordian(new Date(dateString));
}

/**
 * Convert year, month, day to Discordian date
 *
 * @param year - Gregorian year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @returns The Discordian date representation
 */
export function fromYMD(year: number, month: number, day: number): DiscordianDate {
  return toDiscordian(new Date(year, month - 1, day));
}
