import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toDiscordian, fromString, fromISO, fromYMD, toGregorian, toISO, randomFutureDate, dayOfDeath } from './converter';

describe('Discordian Date Converter', () => {
  describe('toDiscordian', () => {
    it('should convert January 1st to Chaos 1', () => {
      const date = new Date('2024-01-01');
      const result = toDiscordian(date);

      assert.strictEqual(result.year, 3190);
      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 1);
      assert.strictEqual(result.weekday, 'Sweetmorn');
      assert.strictEqual(result.isStTibsDay, false);
    });

    it('should convert January 5th to Chaos 5 (Mungday)', () => {
      const date = new Date('2024-01-05');
      const result = toDiscordian(date);

      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 5);
      assert.strictEqual(result.holyday, 'Mungday');
    });

    it('should convert February 19th (day 50 of Chaos) to Chaoflux', () => {
      const date = new Date('2024-02-19');
      const result = toDiscordian(date);

      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 50);
      assert.strictEqual(result.holyday, 'Chaoflux');
    });

    it('should handle St. Tibs Day (Feb 29) in leap years', () => {
      const date = new Date('2024-02-29');
      const result = toDiscordian(date);

      assert.strictEqual(result.isStTibsDay, true);
      assert.strictEqual(result.weekday, null);
      assert.strictEqual(result.season, 'Chaos');
    });

    it('should not have St. Tibs Day in non-leap years', () => {
      const date = new Date('2023-03-01');
      const result = toDiscordian(date);

      assert.strictEqual(result.isStTibsDay, false);
    });

    it('should convert to Discord season (days 74-146)', () => {
      const date = new Date('2024-03-15'); // First day of Discord in leap year
      const result = toDiscordian(date);

      assert.strictEqual(result.season, 'Discord');
      assert.strictEqual(result.dayOfSeason, 1);
    });

    it('should convert to Confusion season (days 147-219)', () => {
      const date = new Date('2024-05-27'); // First day of Confusion in leap year
      const result = toDiscordian(date);

      assert.strictEqual(result.season, 'Confusion');
      assert.strictEqual(result.dayOfSeason, 1);
    });

    it('should convert to Bureaucracy season (days 220-292)', () => {
      const date = new Date('2024-08-08'); // First day of Bureaucracy in leap year
      const result = toDiscordian(date);

      assert.strictEqual(result.season, 'Bureaucracy');
      assert.strictEqual(result.dayOfSeason, 1);
    });

    it('should convert to The Aftermath season (days 293-365)', () => {
      const date = new Date('2024-10-20'); // First day of The Aftermath in leap year
      const result = toDiscordian(date);

      assert.strictEqual(result.season, 'The Aftermath');
      assert.strictEqual(result.dayOfSeason, 1);
    });

    it('should handle December 31st correctly', () => {
      const date = new Date('2024-12-31');
      const result = toDiscordian(date);

      assert.strictEqual(result.season, 'The Aftermath');
      assert.strictEqual(result.dayOfSeason, 73);
    });

    it('should cycle weekdays correctly', () => {
      const weekdays = ['Sweetmorn', 'Boomtime', 'Pungenday', 'Prickle-Prickle', 'Setting Orange'];
      const date = new Date('2024-01-01');

      for (let i = 0; i < 10; i++) {
        const result = toDiscordian(new Date(2024, 0, i + 1));
        assert.strictEqual(result.weekday, weekdays[i % 5]);
      }
    });

    it('should calculate YOLD correctly', () => {
      const date2024 = toDiscordian(new Date('2024-01-01'));
      assert.strictEqual(date2024.year, 3190); // 2024 + 1166

      const date2000 = toDiscordian(new Date('2000-01-01'));
      assert.strictEqual(date2000.year, 3166); // 2000 + 1166
    });
  });

  describe('fromString', () => {
    it('should convert from ISO date string', () => {
      const result = fromString('2024-01-05');

      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 5);
      assert.strictEqual(result.holyday, 'Mungday');
    });

    it('should handle various date string formats', () => {
      const result = fromString('January 5, 2024');

      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 5);
    });
  });

  describe('fromISO', () => {
    it('should convert from ISO 8601 date string', () => {
      const result = fromISO('2024-01-05');

      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 5);
      assert.strictEqual(result.holyday, 'Mungday');
    });

    it('should handle ISO date with time', () => {
      const result = fromISO('2024-01-05T12:00:00.000Z');

      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 5);
    });

    it('should handle leap year Feb 29', () => {
      const result = fromISO('2024-02-29');

      assert.strictEqual(result.isStTibsDay, true);
    });
  });

  describe('fromYMD', () => {
    it('should convert from year, month, day', () => {
      const result = fromYMD(2024, 1, 5);

      assert.strictEqual(result.season, 'Chaos');
      assert.strictEqual(result.dayOfSeason, 5);
      assert.strictEqual(result.holyday, 'Mungday');
    });

    it('should handle leap year Feb 29', () => {
      const result = fromYMD(2024, 2, 29);

      assert.strictEqual(result.isStTibsDay, true);
    });
  });

  describe('toGregorian', () => {
    it('should convert Discordian date back to Gregorian', () => {
      const original = new Date('2024-01-05');
      const discDate = toDiscordian(original);
      const gregorian = toGregorian(discDate);

      assert.strictEqual(gregorian.getFullYear(), 2024);
      assert.strictEqual(gregorian.getMonth(), 0); // January
      assert.strictEqual(gregorian.getDate(), 5);
    });

    it('should handle St. Tibs Day conversion', () => {
      const discDate = toDiscordian(new Date('2024-02-29'));
      const gregorian = toGregorian(discDate);

      assert.strictEqual(gregorian.getFullYear(), 2024);
      assert.strictEqual(gregorian.getMonth(), 1); // February
      assert.strictEqual(gregorian.getDate(), 29);
    });

    it('should handle end of year', () => {
      const original = new Date('2024-12-31');
      const discDate = toDiscordian(original);
      const gregorian = toGregorian(discDate);

      assert.strictEqual(gregorian.getFullYear(), 2024);
      assert.strictEqual(gregorian.getMonth(), 11); // December
      assert.strictEqual(gregorian.getDate(), 31);
    });

    it('should handle all seasons correctly', () => {
      const testDates = [
        '2024-01-01', // Chaos
        '2024-03-15', // Discord
        '2024-05-27', // Confusion
        '2024-08-08', // Bureaucracy
        '2024-10-20'  // The Aftermath
      ];

      testDates.forEach(dateStr => {
        const original = new Date(dateStr);
        const discDate = toDiscordian(original);
        const gregorian = toGregorian(discDate);

        assert.strictEqual(gregorian.getFullYear(), original.getFullYear());
        assert.strictEqual(gregorian.getMonth(), original.getMonth());
        assert.strictEqual(gregorian.getDate(), original.getDate());
      });
    });
  });

  describe('toISO', () => {
    it('should convert Discordian date to ISO string', () => {
      const discDate = toDiscordian(new Date('2024-01-05'));
      const iso = toISO(discDate);

      assert.strictEqual(iso, '2024-01-05');
    });

    it('should handle St. Tibs Day', () => {
      const discDate = toDiscordian(new Date('2024-02-29'));
      const iso = toISO(discDate);

      assert.strictEqual(iso, '2024-02-29');
    });

    it('should handle end of year', () => {
      const discDate = toDiscordian(new Date('2024-12-31'));
      const iso = toISO(discDate);

      assert.strictEqual(iso, '2024-12-31');
    });

    it('should round-trip with fromISO', () => {
      const original = '2024-01-05';
      const discDate = fromISO(original);
      const iso = toISO(discDate);

      assert.strictEqual(iso, original);
    });
  });

  describe('randomFutureDate', () => {
    it('should return a date at least 5 years in the future', () => {
      const today = new Date();
      const fiveYearsFromNow = new Date(today.getFullYear() + 5, 0, 1);

      // Test multiple times since it's random
      for (let i = 0; i < 10; i++) {
        const futureDiscDate = randomFutureDate();
        const futureGregorian = toGregorian(futureDiscDate);

        assert.ok(futureGregorian >= fiveYearsFromNow,
          `Date ${futureGregorian.toISOString()} should be at least 5 years in the future`);
      }
    });

    it('should return a date within 55 years from now', () => {
      const today = new Date();
      const fiftyFiveYearsFromNow = new Date(today.getFullYear() + 56, 0, 1);

      // Test multiple times since it's random
      for (let i = 0; i < 10; i++) {
        const futureDiscDate = randomFutureDate();
        const futureGregorian = toGregorian(futureDiscDate);

        assert.ok(futureGregorian < fiftyFiveYearsFromNow,
          `Date ${futureGregorian.toISOString()} should be within 55 years from now`);
      }
    });

    it('should return a valid Discordian date', () => {
      const futureDate = randomFutureDate();

      assert.ok(futureDate.year > 0);
      assert.ok(['Chaos', 'Discord', 'Confusion', 'Bureaucracy', 'The Aftermath'].includes(futureDate.season));
      assert.ok(futureDate.dayOfSeason >= 1 && futureDate.dayOfSeason <= 73);

      if (!futureDate.isStTibsDay) {
        assert.ok(futureDate.weekday !== null);
      }
    });

    it('should generate different dates on multiple calls', () => {
      // Generate 20 random dates and check they're not all the same
      const dates = Array.from({ length: 20 }, () => randomFutureDate());
      const uniqueDates = new Set(dates.map(d => toISO(d)));

      // Very unlikely to get only 1 unique date in 20 tries
      assert.ok(uniqueDates.size > 1, 'Should generate different random dates');
    });
  });

  describe('dayOfDeath', () => {
    it('should be an alias for randomFutureDate', () => {
      const deathDate = dayOfDeath();

      // Should have all the same properties as randomFutureDate
      assert.ok(deathDate.year > 0);
      assert.ok(['Chaos', 'Discord', 'Confusion', 'Bureaucracy', 'The Aftermath'].includes(deathDate.season));
      assert.ok(deathDate.dayOfSeason >= 1 && deathDate.dayOfSeason <= 73);
    });

    it('should return a date at least 5 years in the future', () => {
      const today = new Date();
      const fiveYearsFromNow = new Date(today.getFullYear() + 5, 0, 1);

      const deathDate = dayOfDeath();
      const gregorian = toGregorian(deathDate);

      assert.ok(gregorian >= fiveYearsFromNow,
        'Day of death should be at least 5 years in the future');
    });

    it('should work with format function', () => {
      const deathDate = dayOfDeath();
      const formatted = require('./formatter').format(deathDate);

      // Should produce a valid formatted string
      assert.ok(typeof formatted === 'string');
      assert.ok(formatted.length > 0);
      assert.ok(formatted.includes('YOLD'));
    });
  });

  describe('All Holydays', () => {
    it('should identify all Apostle Holydays', () => {
      const holydays = [
        { date: '2024-01-05', holyday: 'Mungday', season: 'Chaos' },
        { date: '2024-03-19', holyday: 'Mojoday', season: 'Discord' },
        { date: '2024-05-31', holyday: 'Syaday', season: 'Confusion' },
        { date: '2024-08-12', holyday: 'Zaraday', season: 'Bureaucracy' },
        { date: '2024-10-24', holyday: 'Maladay', season: 'The Aftermath' }
      ];

      holydays.forEach(({ date, holyday, season }) => {
        const result = fromString(date);
        assert.strictEqual(result.holyday, holyday, `Failed for ${date}`);
        assert.strictEqual(result.season, season, `Wrong season for ${date}`);
        assert.strictEqual(result.dayOfSeason, 5, `Should be day 5 for ${holyday}`);
      });
    });

    it('should identify all Season Holydays', () => {
      const holydays = [
        { date: '2024-02-19', holyday: 'Chaoflux', season: 'Chaos' },
        { date: '2024-05-03', holyday: 'Discoflux', season: 'Discord' },
        { date: '2024-07-15', holyday: 'Confuflux', season: 'Confusion' },
        { date: '2024-09-26', holyday: 'Bureflux', season: 'Bureaucracy' },
        { date: '2024-12-08', holyday: 'Afflux', season: 'The Aftermath' }
      ];

      holydays.forEach(({ date, holyday, season }) => {
        const result = fromString(date);
        assert.strictEqual(result.holyday, holyday, `Failed for ${date}`);
        assert.strictEqual(result.season, season, `Wrong season for ${date}`);
        assert.strictEqual(result.dayOfSeason, 50, `Should be day 50 for ${holyday}`);
      });
    });
  });
});
