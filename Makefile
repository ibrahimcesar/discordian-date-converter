.PHONY: help new-locale

# Default target
help:
	@echo "Discordian Date Converter - Makefile"
	@echo ""
	@echo "Available targets:"
	@echo "  make new-locale    Bootstrap a new locale file for translations"
	@echo "  make help          Show this help message"

# Bootstrap a new locale file
new-locale:
	@echo "🌍 Creating a new locale for Discordian Date Converter"
	@echo ""
	@echo "Language codes should follow ISO 639-1 (2-letter codes) or BCP 47 format."
	@echo "Examples: en, pt-BR, es, fr, de, ja, zh-CN"
	@echo "Reference: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"
	@echo ""
	@read -p "Enter language code (e.g., 'es', 'pt-BR'): " LOCALE_CODE; \
	read -p "Enter language name (e.g., 'Spanish', 'French'): " LOCALE_NAME; \
	\
	if [ -z "$$LOCALE_CODE" ]; then \
		echo "❌ Error: Language code cannot be empty"; \
		exit 1; \
	fi; \
	\
	if [ -z "$$LOCALE_NAME" ]; then \
		echo "❌ Error: Language name cannot be empty"; \
		exit 1; \
	fi; \
	\
	if ! echo "$$LOCALE_CODE" | grep -qE '^[a-z]{2}(-[A-Z]{2})?$$'; then \
		echo "❌ Error: Invalid language code format"; \
		echo "   Expected: 2 lowercase letters (e.g., 'en') or"; \
		echo "   2 lowercase letters + dash + 2 uppercase letters (e.g., 'pt-BR')"; \
		exit 1; \
	fi; \
	\
	SAFE_CODE=$$(echo "$$LOCALE_CODE" | sed 's/-//g'); \
	CAMEL_CASE=$$(echo "$$SAFE_CODE" | sed 's/-\(.\)/\U\1/g'); \
	FILE_NAME="src/locales/$$LOCALE_CODE.ts"; \
	\
	if [ -f "$$FILE_NAME" ]; then \
		echo "❌ Error: Locale file '$$FILE_NAME' already exists"; \
		exit 1; \
	fi; \
	\
	echo "📝 Creating locale file: $$FILE_NAME"; \
	echo "import { LocalizedStrings } from '../types';" > "$$FILE_NAME"; \
	echo "" >> "$$FILE_NAME"; \
	echo "export const $$CAMEL_CASE: LocalizedStrings = {" >> "$$FILE_NAME"; \
	echo "  seasons: {" >> "$$FILE_NAME"; \
	echo "    'Chaos': ''," >> "$$FILE_NAME"; \
	echo "    'Discord': ''," >> "$$FILE_NAME"; \
	echo "    'Confusion': ''," >> "$$FILE_NAME"; \
	echo "    'Bureaucracy': ''," >> "$$FILE_NAME"; \
	echo "    'The Aftermath': ''" >> "$$FILE_NAME"; \
	echo "  }," >> "$$FILE_NAME"; \
	echo "  weekdays: {" >> "$$FILE_NAME"; \
	echo "    'Sweetmorn': ''," >> "$$FILE_NAME"; \
	echo "    'Boomtime': ''," >> "$$FILE_NAME"; \
	echo "    'Pungenday': ''," >> "$$FILE_NAME"; \
	echo "    'Prickle-Prickle': ''," >> "$$FILE_NAME"; \
	echo "    'Setting Orange': ''" >> "$$FILE_NAME"; \
	echo "  }," >> "$$FILE_NAME"; \
	echo "  holydays: {" >> "$$FILE_NAME"; \
	echo "    // Apostle Holydays (day 5 of each season)" >> "$$FILE_NAME"; \
	echo "    'Mungday': ''," >> "$$FILE_NAME"; \
	echo "    'Mojoday': ''," >> "$$FILE_NAME"; \
	echo "    'Syaday': ''," >> "$$FILE_NAME"; \
	echo "    'Zaraday': ''," >> "$$FILE_NAME"; \
	echo "    'Maladay': ''," >> "$$FILE_NAME"; \
	echo "    // Season Holydays (day 50 of each season)" >> "$$FILE_NAME"; \
	echo "    'Chaoflux': ''," >> "$$FILE_NAME"; \
	echo "    'Discoflux': ''," >> "$$FILE_NAME"; \
	echo "    'Confuflux': ''," >> "$$FILE_NAME"; \
	echo "    'Bureflux': ''," >> "$$FILE_NAME"; \
	echo "    'Afflux': ''" >> "$$FILE_NAME"; \
	echo "  }," >> "$$FILE_NAME"; \
	echo "  stTibsDay: ''," >> "$$FILE_NAME"; \
	echo "  yold: ''" >> "$$FILE_NAME"; \
	echo "};" >> "$$FILE_NAME"; \
	echo "" >> "$$FILE_NAME"; \
	echo "✅ Created $$FILE_NAME"; \
	\
	echo "📝 Updating src/locales/index.ts"; \
	if ! grep -q "import { $$CAMEL_CASE } from './$$LOCALE_CODE';" src/locales/index.ts; then \
		awk -v camel="$$CAMEL_CASE" -v code="$$LOCALE_CODE" \
			'/^import { ptBR } from/ {print; print "import { " camel " } from '\''./" code "'\'';"; next} 1' \
			src/locales/index.ts > src/locales/index.ts.tmp && mv src/locales/index.ts.tmp src/locales/index.ts; \
	fi; \
	\
	if ! grep -q "'$$LOCALE_CODE': $$CAMEL_CASE" src/locales/index.ts; then \
		awk -v camel="$$CAMEL_CASE" -v code="$$LOCALE_CODE" \
			'/^  '\''pt-BR'\'': ptBR$$/ {print $$0 ","; print "  '\''" code "'\'': " camel; next} 1' \
			src/locales/index.ts > src/locales/index.ts.tmp && mv src/locales/index.ts.tmp src/locales/index.ts; \
	fi; \
	\
	if ! grep "^export { .* $$CAMEL_CASE" src/locales/index.ts > /dev/null 2>&1; then \
		awk -v camel="$$CAMEL_CASE" \
			'/^export { en, ptBR };$$/ {gsub(/ptBR/, "ptBR, " camel)} 1' \
			src/locales/index.ts > src/locales/index.ts.tmp && mv src/locales/index.ts.tmp src/locales/index.ts; \
	fi; \
	echo "✅ Updated src/locales/index.ts"; \
	\
	echo "📝 Updating src/index.ts"; \
	if ! grep "$$CAMEL_CASE" src/index.ts > /dev/null 2>&1; then \
		awk -v camel="$$CAMEL_CASE" \
			'/^export { getLocale, locales, .* } from/ {gsub(/ptBR/, "ptBR, " camel)} 1' \
			src/index.ts > src/index.ts.tmp && mv src/index.ts.tmp src/index.ts; \
	fi; \
	echo "✅ Updated src/index.ts"; \
	\
	echo ""; \
	echo "🎉 Locale '$$LOCALE_CODE' ($$LOCALE_NAME) has been bootstrapped!"; \
	echo ""; \
	echo "Next steps:"; \
	echo "  1. Edit $$FILE_NAME and fill in the empty strings with translations"; \
	echo "  2. Run 'npm test' to ensure everything works"; \
	echo "  3. Submit a pull request with your translations"; \
	echo ""; \
	echo "Translation guide:"; \
	echo "  - seasons: 5 season names (Chaos, Discord, Confusion, Bureaucracy, The Aftermath)"; \
	echo "  - weekdays: 5 weekday names (Sweetmorn, Boomtime, Pungenday, Prickle-Prickle, Setting Orange)"; \
	echo "  - holydays: 10 holyday names (5 Apostle + 5 Season holydays)"; \
	echo "  - stTibsDay: Translation for 'St. Tib's Day' (leap day)"; \
	echo "  - yold: Translation/abbreviation for 'Year of Our Lady of Discord'"; \
	echo ""
