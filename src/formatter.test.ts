import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toDiscordian, fromString } from './converter';
import { format, shortFormat } from './formatter';

describe('Discordian Date Formatter', () => {
  describe('format', () => {
    it('should format a regular date in English', () => {
      const date = toDiscordian(new Date('2024-01-05'));
      const result = format(date);

      assert.strictEqual(result, 'Setting Orange, Chaos 5, 3190 YOLD - Mungday');
    });

    it('should format a regular date in Brazilian Portuguese', () => {
      const date = toDiscordian(new Date('2024-01-05'));
      const result = format(date, { locale: 'pt-BR' });

      assert.strictEqual(result, 'Laranja Poente, Caos 5, 3190 ANSD - Dia de Mung');
    });

    it('should format St. Tibs Day in English', () => {
      const date = toDiscordian(new Date('2024-02-29'));
      const result = format(date);

      assert.strictEqual(result, "St. Tib's Day, 3190 YOLD");
    });

    it('should format St. Tibs Day in Brazilian Portuguese', () => {
      const date = toDiscordian(new Date('2024-02-29'));
      const result = format(date, { locale: 'pt-BR' });

      assert.strictEqual(result, 'Dia de São Tib, 3190 ANSD');
    });

    it('should format without holyday when includeHolyday is false', () => {
      const date = toDiscordian(new Date('2024-01-05'));
      const result = format(date, { includeHolyday: false });

      assert.strictEqual(result, 'Setting Orange, Chaos 5, 3190 YOLD');
    });

    it('should format without weekday when includeWeekday is false', () => {
      const date = toDiscordian(new Date('2024-01-05'));
      const result = format(date, { includeWeekday: false });

      assert.strictEqual(result, 'Chaos 5, 3190 YOLD - Mungday');
    });

    it('should format a date without holyday', () => {
      const date = toDiscordian(new Date('2024-01-10'));
      const result = format(date);

      assert.strictEqual(result, 'Setting Orange, Chaos 10, 3190 YOLD');
    });

    it('should handle all seasons in pt-BR', () => {
      const seasons = [
        { date: '2024-01-01', expected: 'Caos' },
        { date: '2024-03-15', expected: 'Discórdia' },
        { date: '2024-05-27', expected: 'Confusão' },
        { date: '2024-08-08', expected: 'Burocracia' },
        { date: '2024-10-20', expected: 'As Consequências' }
      ];

      seasons.forEach(({ date, expected }) => {
        const discDate = toDiscordian(new Date(date));
        const result = format(discDate, { locale: 'pt-BR' });
        assert.ok(result.includes(expected), `Expected "${expected}" in "${result}"`);
      });
    });

    it('should handle all weekdays in pt-BR', () => {
      const weekdays = [
        'Docemanhã',
        'Tempobum',
        'Pungente',
        'Espinho-Espinho',
        'Laranja Poente'
      ];

      for (let i = 0; i < 5; i++) {
        const date = toDiscordian(new Date(2024, 0, i + 1));
        const result = format(date, { locale: 'pt-BR' });
        assert.ok(result.includes(weekdays[i]), `Expected "${weekdays[i]}" in "${result}"`);
      }
    });
  });

  describe('shortFormat', () => {
    it('should format without weekday or holyday in English', () => {
      const date = toDiscordian(new Date('2024-01-05'));
      const result = shortFormat(date);

      assert.strictEqual(result, 'Chaos 5, 3190 YOLD');
    });

    it('should format without weekday or holyday in Portuguese', () => {
      const date = toDiscordian(new Date('2024-01-05'));
      const result = shortFormat(date, 'pt-BR');

      assert.strictEqual(result, 'Caos 5, 3190 ANSD');
    });

    it('should handle St. Tibs Day', () => {
      const date = toDiscordian(new Date('2024-02-29'));
      const result = shortFormat(date);

      assert.strictEqual(result, "St. Tib's Day, 3190 YOLD");
    });
  });

  describe('Default locale fallback', () => {
    it('should fallback to English for unknown locale', () => {
      const date = toDiscordian(new Date('2024-01-05'));
      const result = format(date, { locale: 'unknown-locale' });

      assert.strictEqual(result, 'Setting Orange, Chaos 5, 3190 YOLD - Mungday');
    });
  });
});
