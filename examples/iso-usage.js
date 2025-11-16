/**
 * ISO String usage examples for discordian-date-converter
 */

const { fromISO, toISO, toGregorian, format } = require('../dist');

console.log('=== ISO String Examples ===\n');

// Example 1: Convert from ISO string
console.log('1. Convert from ISO 8601 string:');
const discDate = fromISO('2024-01-05');
console.log('   Input:', '2024-01-05');
console.log('   Output:', format(discDate));
console.log();

// Example 2: Convert with timestamp
console.log('2. Convert from ISO with timestamp:');
const discDateWithTime = fromISO('2024-01-05T12:00:00.000Z');
console.log('   Input:', '2024-01-05T12:00:00.000Z');
console.log('   Output:', format(discDateWithTime));
console.log();

// Example 3: Round-trip conversion
console.log('3. Round-trip conversion (ISO → Discordian → ISO):');
const originalISO = '2024-02-29';
const disc = fromISO(originalISO);
const backToISO = toISO(disc);
console.log('   Original:', originalISO);
console.log('   Discordian:', format(disc));
console.log('   Back to ISO:', backToISO);
console.log('   Match:', originalISO === backToISO);
console.log();

// Example 4: Convert Discordian to Gregorian Date
console.log('4. Convert Discordian date to Gregorian Date object:');
const discordianDate = fromISO('2024-12-31');
const gregorianDate = toGregorian(discordianDate);
console.log('   Discordian:', format(discordianDate));
console.log('   Gregorian Date:', gregorianDate.toDateString());
console.log('   ISO String:', toISO(discordianDate));
console.log();

// Example 5: Process array of ISO dates
console.log('5. Process multiple ISO dates:');
const isoDates = [
  '2024-01-05', // Mungday
  '2024-02-19', // Chaoflux
  '2024-02-29', // St. Tib's Day
  '2024-03-19', // Mojoday
  '2024-12-31'  // End of year
];

isoDates.forEach(iso => {
  const disc = fromISO(iso);
  console.log(`   ${iso} → ${format(disc)}`);
});
console.log();

// Example 6: API response example
console.log('6. Simulating API response transformation:');
const apiResponse = {
  events: [
    { name: 'Meeting', date: '2024-01-05' },
    { name: 'Launch', date: '2024-03-19' },
    { name: 'Review', date: '2024-12-31' }
  ]
};

console.log('   Converting API dates to Discordian:');
apiResponse.events.forEach(event => {
  const disc = fromISO(event.date);
  console.log(`   - ${event.name}: ${format(disc)}`);
});
