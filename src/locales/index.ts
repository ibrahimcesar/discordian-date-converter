import { LocalizedStrings } from '../types';
import { en } from './en';
import { ptBR } from './pt-BR';

export const locales: Record<string, LocalizedStrings> = {
  'en': en,
  'pt-BR': ptBR
};

export function getLocale(locale: string = 'en'): LocalizedStrings {
  return locales[locale] || locales['en'];
}

export { en, ptBR };
