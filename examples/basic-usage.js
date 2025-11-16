/**
 * Basic usage examples for discordian-date-converter
 */

const { toDiscordian, format, fromString, fromYMD } = require('../dist');

console.log('=== Basic Discordian Date Converter Examples ===\n');

// Example 1: Convert current date
console.log('1. Current date:');
const now = toDiscordian();
console.log('   English:', format(now));
console.log('   Português:', format(now, { locale: 'pt-BR' }));
console.log();

// Example 2: Convert a specific date
console.log('2. January 5, 2024 (Mungday):');
const mungday = toDiscordian(new Date('2024-01-05'));
console.log('   English:', format(mungday));
console.log('   Português:', format(mungday, { locale: 'pt-BR' }));
console.log();

// Example 3: St. Tib's Day (Leap Day)
console.log("3. February 29, 2024 (St. Tib's Day):");
const stTibs = toDiscordian(new Date('2024-02-29'));
console.log('   English:', format(stTibs));
console.log('   Português:', format(stTibs, { locale: 'pt-BR' }));
console.log();

// Example 4: Using fromString
console.log('4. Using fromString with "2024-12-31":');
const endOfYear = fromString('2024-12-31');
console.log('   English:', format(endOfYear));
console.log('   Português:', format(endOfYear, { locale: 'pt-BR' }));
console.log();

// Example 5: Using fromYMD
console.log('5. Using fromYMD(2024, 2, 19) - Chaoflux:');
const chaoflux = fromYMD(2024, 2, 19);
console.log('   English:', format(chaoflux));
console.log('   Português:', format(chaoflux, { locale: 'pt-BR' }));
console.log();

// Example 6: Different format options
console.log('6. Format options:');
const date = toDiscordian(new Date('2024-01-05'));
console.log('   Full format:', format(date));
console.log('   Without weekday:', format(date, { includeWeekday: false }));
console.log('   Without holyday:', format(date, { includeHolyday: false }));
console.log('   Minimal:', format(date, { includeWeekday: false, includeHolyday: false }));
console.log();

// Example 7: All holydays
console.log('7. All Holydays in 2024:');
console.log('   Apostle Holydays (day 5 of each season):');
console.log('   -', format(fromString('2024-01-05')));  // Mungday
console.log('   -', format(fromString('2024-03-19')));  // Mojoday
console.log('   -', format(fromString('2024-05-31')));  // Syaday
console.log('   -', format(fromString('2024-08-12')));  // Zaraday
console.log('   -', format(fromString('2024-10-24'))); // Maladay
console.log();
console.log('   Season Holydays (day 50 of each season):');
console.log('   -', format(fromString('2024-02-19')));  // Chaoflux
console.log('   -', format(fromString('2024-05-03')));  // Discoflux
console.log('   -', format(fromString('2024-07-15')));  // Confuflux
console.log('   -', format(fromString('2024-09-26'))); // Bureflux
console.log('   -', format(fromString('2024-12-08'))); // Afflux
