# discordian-date-converter

> Convert Gregorian calendar dates to Discordian calendar dates with multi-language support

[![npm version](https://img.shields.io/npm/v/discordian-date-converter.svg)](https://www.npmjs.com/package/discordian-date-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast, lightweight, and easy-to-use library for converting dates from the Gregorian calendar to the Discordian calendar. Built with TypeScript for type safety and performance.

## Features

- 🚀 **Fast & Lightweight** - Zero dependencies, optimized for performance
- 🌍 **Multi-language Support** - Built-in English and Brazilian Portuguese (pt-BR), easy to extend
- 📅 **Complete Discordian Calendar** - Full support for all seasons, weekdays, and holydays
- 🎯 **Type-Safe** - Written in TypeScript with full type definitions
- ✨ **Easy to Use** - Simple, intuitive API
- 🧪 **Well Tested** - Comprehensive test coverage

## Installation

```bash
npm install discordian-date-converter
```

## Quick Start

```javascript
const { toDiscordian, format } = require('discordian-date-converter');

// Convert current date
const today = toDiscordian();
console.log(format(today));
// Output: "Pungenday, Chaos 47, 3191 YOLD"

// Convert a specific date
const mungday = toDiscordian(new Date('2024-01-05'));
console.log(format(mungday));
// Output: "Boomtime, Chaos 5, 3190 YOLD - Mungday"

// Use Brazilian Portuguese
console.log(format(mungday, { locale: 'pt-BR' }));
// Output: "Tempobum, Caos 5, 3190 ANSD - Dia de Mung"
```

## The Discordian Calendar

The Discordian calendar is an alternative calendar used by Discordians, described in the [Principia Discordia](https://en.wikipedia.org/wiki/Principia_Discordia). It consists of:

- **5 Seasons** of 73 days each:
  - Chaos
  - Discord
  - Confusion
  - Bureaucracy
  - The Aftermath

- **5 Weekdays**:
  - Sweetmorn
  - Boomtime
  - Pungenday
  - Prickle-Prickle
  - Setting Orange

- **10 Holydays**:
  - **Apostle Holydays** (day 5 of each season): Mungday, Mojoday, Syaday, Zaraday, Maladay
  - **Season Holydays** (day 50 of each season): Chaoflux, Discoflux, Confuflux, Bureflux, Afflux

- **St. Tib's Day**: A special day that occurs on leap years (February 29), falling between Chaos 59 and Chaos 60. This day is outside the normal week cycle.

- **YOLD** (Year of Our Lady of Discord): Gregorian year + 1166

## API Reference

### Core Functions

#### `toDiscordian(date?: Date): DiscordianDate`

Convert a Gregorian date to a Discordian date.

```javascript
const discDate = toDiscordian(new Date('2024-01-05'));
// {
//   year: 3190,
//   season: 'Chaos',
//   dayOfSeason: 5,
//   weekday: 'Boomtime',
//   holyday: 'Mungday',
//   isStTibsDay: false
// }
```

#### `fromString(dateString: string): DiscordianDate`

Convert a date string to a Discordian date.

```javascript
const discDate = fromString('2024-01-05');
const discDate2 = fromString('January 5, 2024');
```

#### `fromISO(isoString: string): DiscordianDate`

Convert an ISO 8601 date string to a Discordian date.

```javascript
const discDate = fromISO('2024-01-05');
const discDate2 = fromISO('2024-01-05T12:00:00.000Z');
```

#### `fromYMD(year: number, month: number, day: number): DiscordianDate`

Convert year, month, and day to a Discordian date.

```javascript
const discDate = fromYMD(2024, 1, 5);
```

#### `toGregorian(discordianDate: DiscordianDate): Date`

Convert a Discordian date back to a Gregorian Date object.

```javascript
const discDate = toDiscordian(new Date('2024-01-05'));
const gregDate = toGregorian(discDate);
console.log(gregDate); // 2024-01-05T00:00:00.000Z
```

#### `toISO(discordianDate: DiscordianDate): string`

Convert a Discordian date to an ISO 8601 date string (YYYY-MM-DD format).

```javascript
const discDate = toDiscordian(new Date('2024-01-05'));
const iso = toISO(discDate);
console.log(iso); // "2024-01-05"
```

#### `randomFutureDate(): DiscordianDate`

Generate a random Discordian date between 5 and 55 years in the future.

```javascript
const futureDate = randomFutureDate();
console.log(format(futureDate));
// "Prickle-Prickle, Bureaucracy 23, 3205 YOLD"
```

#### `dayOfDeath(): DiscordianDate`

Alias for `randomFutureDate()` - a playful way to generate your random "day of death" in Discordian format.

```javascript
const doom = dayOfDeath();
console.log(format(doom));
// "Sweetmorn, The Aftermath 42, 3198 YOLD"

console.log(format(doom, { locale: 'pt-BR' }));
// "Docemanhã, As Consequências 42, 3198 ANSD"
```

### Formatting Functions

#### `format(date: DiscordianDate, options?: FormatOptions): string`

Format a Discordian date as a human-readable string.

**Options:**
- `locale?: string` - Language locale (default: 'en')
- `includeHolyday?: boolean` - Include holyday in output (default: true)
- `includeWeekday?: boolean` - Include weekday in output (default: true)

```javascript
const date = toDiscordian(new Date('2024-01-05'));

format(date);
// "Boomtime, Chaos 5, 3190 YOLD - Mungday"

format(date, { locale: 'pt-BR' });
// "Tempobum, Caos 5, 3190 ANSD - Dia de Mung"

format(date, { includeWeekday: false });
// "Chaos 5, 3190 YOLD - Mungday"

format(date, { includeHolyday: false });
// "Boomtime, Chaos 5, 3190 YOLD"
```

#### `shortFormat(date: DiscordianDate, locale?: string): string`

Format a Discordian date in short format (no weekday or holyday).

```javascript
const date = toDiscordian(new Date('2024-01-05'));

shortFormat(date);
// "Chaos 5, 3190 YOLD"

shortFormat(date, 'pt-BR');
// "Caos 5, 3190 ANSD"
```

### Localization

#### `getLocale(locale: string): LocalizedStrings`

Get localized strings for a specific locale. Falls back to English if locale not found.

```javascript
const { getLocale } = require('discordian-date-converter');

const ptBR = getLocale('pt-BR');
console.log(ptBR.seasons.Chaos); // "Caos"
```

Available locales:
- `en` - English (default)
- `pt-BR` - Brazilian Portuguese

## TypeScript Support

The library is written in TypeScript and includes full type definitions:

```typescript
import {
  toDiscordian,
  format,
  DiscordianDate,
  FormatOptions
} from 'discordian-date-converter';

const date: DiscordianDate = toDiscordian(new Date());
const formatted: string = format(date);
```

### Available Types

- `DiscordianDate` - Complete Discordian date representation
- `Season` - Type for season names
- `Weekday` - Type for weekday names
- `Holyday` - Type for holyday names
- `LocalizedStrings` - Type for localization strings
- `FormatOptions` - Type for formatting options

## Examples

### St. Tib's Day (Leap Day)

```javascript
const stTibs = toDiscordian(new Date('2024-02-29'));
console.log(format(stTibs));
// "St. Tib's Day, 3190 YOLD"

console.log(format(stTibs, { locale: 'pt-BR' }));
// "Dia de São Tib, 3190 ANSD"

console.log(stTibs.isStTibsDay); // true
console.log(stTibs.weekday); // null (St. Tib's Day has no weekday)
```

### All Holydays in 2024

```javascript
// Apostle Holydays (day 5 of each season)
format(fromString('2024-01-05')); // Mungday
format(fromString('2024-03-19')); // Mojoday
format(fromString('2024-05-31')); // Syaday
format(fromString('2024-08-12')); // Zaraday
format(fromString('2024-10-24')); // Maladay

// Season Holydays (day 50 of each season)
format(fromString('2024-02-19')); // Chaoflux
format(fromString('2024-05-03')); // Discoflux
format(fromString('2024-07-15')); // Confuflux
format(fromString('2024-09-26')); // Bureflux
format(fromString('2024-12-08')); // Afflux
```

### Working with ISO 8601 Strings

```javascript
const { fromISO, toISO, toGregorian } = require('discordian-date-converter');

// Parse ISO string
const discDate = fromISO('2024-01-05');
console.log(format(discDate));
// "Setting Orange, Chaos 5, 3190 YOLD - Mungday"

// Convert back to ISO
const iso = toISO(discDate);
console.log(iso); // "2024-01-05"

// Round-trip conversion
const original = '2024-02-29';
const roundTrip = toISO(fromISO(original));
console.log(original === roundTrip); // true

// Convert to Gregorian Date object
const gregDate = toGregorian(discDate);
console.log(gregDate.toDateString()); // "Fri Jan 05 2024"

// Process API dates
const apiDates = ['2024-01-05', '2024-03-19', '2024-12-31'];
apiDates.forEach(date => {
  const disc = fromISO(date);
  console.log(`${date} → ${format(disc)}`);
});
```

### Random Future Dates (Day of Death)

For those pondering mortality or just having fun with randomness:

```javascript
const { dayOfDeath, randomFutureDate, format, toISO } = require('discordian-date-converter');

// Generate a random future date
const doom = dayOfDeath();
console.log(format(doom));
// "Setting Orange, Chaos 50, 3225 YOLD - Chaoflux"

console.log(toISO(doom));
// "2059-02-19"

// In Brazilian Portuguese
console.log(format(doom, { locale: 'pt-BR' }));
// "Laranja Poente, Caos 50, 3225 ANSD - Fluxo do Caos"

// Generate multiple random dates
for (let i = 0; i < 5; i++) {
  const future = randomFutureDate();
  console.log(format(future));
}

// Maybe you'll get lucky and land on a holyday!
let date;
do {
  date = randomFutureDate();
} while (!date.holyday);
console.log(`You might meet your end on ${date.holyday}!`);
```

### Adding Custom Locale

```javascript
const { locales } = require('discordian-date-converter');

// Add Spanish locale
locales['es'] = {
  seasons: {
    'Chaos': 'Caos',
    'Discord': 'Discordia',
    'Confusion': 'Confusión',
    'Bureaucracy': 'Burocracia',
    'The Aftermath': 'Las Consecuencias'
  },
  weekdays: {
    'Sweetmorn': 'Dulcemañana',
    'Boomtime': 'Tiempobum',
    'Pungenday': 'Pungente',
    'Prickle-Prickle': 'Pincho-Pincho',
    'Setting Orange': 'Naranja Poniente'
  },
  // ... add holydays
  stTibsDay: 'Día de San Tib',
  yold: 'ANSD'
};

const date = toDiscordian(new Date('2024-01-05'));
console.log(format(date, { locale: 'es' }));
```

## Performance

This library is optimized for performance:
- Zero dependencies
- Pure JavaScript calculations (no date parsing libraries)
- Efficient algorithms with O(1) complexity
- Small bundle size (~3KB minified)

## Contributing

Contributions are welcome! Especially for adding new language localizations.

To add a new locale:
1. Create a new file in `src/locales/` (e.g., `es.ts`)
2. Export a `LocalizedStrings` object with all translations
3. Add it to `src/locales/index.ts`
4. Submit a pull request

## License

MIT © [Ibrahim Cesar](https://github.com/ibrahimcesar)

## References

- [Discordian Calendar - Wikipedia](https://en.wikipedia.org/wiki/Discordian_calendar)
- [Principia Discordia](https://en.wikipedia.org/wiki/Principia_Discordia)
- [Rosetta Code - Discordian Date](https://rosettacode.org/wiki/Discordian_date)

## Acknowledgments

Based on the Discordian calendar specification from the Principia Discordia and Rosetta Code.