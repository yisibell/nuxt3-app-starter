export const locales = [
  'en', 'de', 'es', 'fr', 'se', 'no', 'it', 'pt', 'da', 'fi', 'ru', 'nl', 'ja', 'pl', 'tr', 'cs',
] as const

export type IAvailableLocales = typeof locales[number]

export const extendLocales = [
  'en', 'au', 'ca', 'ca-fr', 'uk', 'us-es', 'at', 'be', 'be-fr', 'mt', 'intl-es', 'cz', 'dk', 'fi', 'fr', 'de', 'de-en', 'gg', 'gl', 'hk', 'intl', 'ie', 'it', 'jp', 'ch', 'lu', 'nl', 'nl-en', 'nz', 'no', 'no-en', 'pl', 'pt', 'sg', 'es', 'se', 'se-en', 'ch-fr', 'ch-it', 'ch-en',
] as const

export type IAvailablePrefixes = typeof extendLocales[number]

export const pathLocaleLangCodeMap: Record<IAvailablePrefixes, IAvailableLocales> = {
  'en': 'en',
  'au': 'en',
  'ca': 'en',
  'ca-fr': 'fr',
  'uk': 'en',
  'us-es': 'es',
  'at': 'de',
  'be': 'nl',
  'be-fr': 'fr',
  'mt': 'en',
  'intl-es': 'es',
  'cz': 'cs',
  'dk': 'da',
  'fi': 'fi',
  'fr': 'fr',
  'de': 'de',
  'de-en': 'en',
  'gg': 'en',
  'gl': 'da',
  'hk': 'en',
  'intl': 'en',
  'ie': 'en',
  'it': 'it',
  'jp': 'ja',
  'ch': 'de',
  'lu': 'fr',
  'nl': 'nl',
  'nl-en': 'en',
  'nz': 'en',
  'no': 'no',
  'no-en': 'en',
  'pl': 'pl',
  'pt': 'pt',
  'sg': 'en',
  'es': 'es',
  'se': 'se',
  'se-en': 'en',
  'ch-fr': 'fr',
  'ch-it': 'it',
  'ch-en': 'en',
} as const
