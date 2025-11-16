import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toDiscordian, fromString, fromYMD } from './converter';

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
