/**
 * Day of Death - Random Future Date Examples
 *
 * A playful exploration of mortality through the lens of Discordianism!
 */

const { dayOfDeath, randomFutureDate, format, toISO } = require('../dist');

console.log('=== Your Random Day of Death ===\n');
console.log('Embrace the chaos! Here are some random future dates...\n');

// Example 1: Basic usage
console.log('1. Your day of reckoning:');
const doom = dayOfDeath();
console.log('   English:', format(doom));
console.log('   Português:', format(doom, { locale: 'pt-BR' }));
console.log('   Gregorian:', toISO(doom));
console.log();

// Example 2: Multiple random dates
console.log('2. Five possible futures:');
for (let i = 0; i < 5; i++) {
  const future = randomFutureDate();
  console.log(`   ${i + 1}. ${format(future)}`);
}
console.log();

// Example 3: Maybe you'll see a holyday!
console.log('3. Roll for holydays (generate until we hit one):');
let attempts = 0;
let holydayDate;
do {
  attempts++;
  holydayDate = randomFutureDate();
} while (!holydayDate.holyday && attempts < 100);

if (holydayDate.holyday) {
  console.log(`   Found after ${attempts} attempts!`);
  console.log(`   ${format(holydayDate)}`);
  console.log(`   You might meet your end on ${holydayDate.holyday}!`);
} else {
  console.log('   No holyday found in 100 tries (that\'s statistically unlikely!)');
}
console.log();

// Example 4: Maybe you'll die on St. Tib's Day!
console.log('4. Searching for St. Tib\'s Day (the non-day):');
let stTibsAttempts = 0;
let stTibsDate;
do {
  stTibsAttempts++;
  stTibsDate = randomFutureDate();
} while (!stTibsDate.isStTibsDay && stTibsAttempts < 500);

if (stTibsDate.isStTibsDay) {
  console.log(`   Amazing! Found after ${stTibsAttempts} attempts!`);
  console.log(`   ${format(stTibsDate)}`);
  console.log('   Dying on a day that doesn\'t exist - very Discordian!');
} else {
  console.log(`   No St. Tib's Day found in ${stTibsAttempts} tries`);
  console.log('   (Only ~0.27% of dates are St. Tib\'s Day)');
}
console.log();

// Example 5: Compare different locales
console.log('5. Same death, different languages:');
const death = dayOfDeath();
console.log('   🇺🇸', format(death, { locale: 'en' }));
console.log('   🇧🇷', format(death, { locale: 'pt-BR' }));
console.log();

// Example 6: Just the essential info
console.log('6. Minimal format (no weekday or holyday):');
const simple = randomFutureDate();
console.log('   ', format(simple, { includeWeekday: false, includeHolyday: false }));
console.log();

// Example 7: The statistics
console.log('7. Statistical analysis of 1000 random deaths:');
const seasons = { 'Chaos': 0, 'Discord': 0, 'Confusion': 0, 'Bureaucracy': 0, 'The Aftermath': 0 };
let stTibsCount = 0;
let holydayCount = 0;

for (let i = 0; i < 1000; i++) {
  const date = randomFutureDate();
  seasons[date.season]++;
  if (date.isStTibsDay) stTibsCount++;
  if (date.holyday) holydayCount++;
}

console.log('   Season distribution:');
Object.entries(seasons).forEach(([season, count]) => {
  console.log(`   - ${season}: ${count} (${(count/10).toFixed(1)}%)`);
});
console.log(`   St. Tib's Days: ${stTibsCount} (${(stTibsCount/10).toFixed(1)}%)`);
console.log(`   Holydays: ${holydayCount} (${(holydayCount/10).toFixed(1)}%)`);
console.log();

console.log('Remember: In Discordianism, chaos is divine and death is just another');
console.log('random event in the cosmic joke. Fnord!');
