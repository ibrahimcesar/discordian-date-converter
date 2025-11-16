/**
 * Discordian calendar types
 */

export type Season = 'Chaos' | 'Discord' | 'Confusion' | 'Bureaucracy' | 'The Aftermath';

export type Weekday = 'Sweetmorn' | 'Boomtime' | 'Pungenday' | 'Prickle-Prickle' | 'Setting Orange';

export type Holyday =
  | 'Mungday' | 'Mojoday' | 'Syaday' | 'Zaraday' | 'Maladay'  // Apostle Holydays (day 5)
  | 'Chaoflux' | 'Discoflux' | 'Confuflux' | 'Bureflux' | 'Afflux';  // Season Holydays (day 50)

export interface LocalizedStrings {
  seasons: Record<Season, string>;
  weekdays: Record<Weekday, string>;
  holydays: Record<Holyday, string>;
  stTibsDay: string;
  yold: string;
}

export interface DiscordianDate {
  /** Year of Our Lady of Discord */
  year: number;
  /** Season name */
  season: Season;
  /** Day within the season (1-73) */
  dayOfSeason: number;
  /** Day of week (null for St. Tib's Day) */
  weekday: Weekday | null;
  /** Holyday name if applicable */
  holyday: Holyday | null;
  /** True if this is St. Tib's Day */
  isStTibsDay: boolean;
}

export interface FormatOptions {
  /** Language locale (default: 'en') */
  locale?: string;
  /** Include holyday in output (default: true) */
  includeHolyday?: boolean;
  /** Include weekday in output (default: true) */
  includeWeekday?: boolean;
}
