import { createI18n } from 'vue-i18n'
import de from './locales/de-DE.json'
import en from './locales/en-US.json'

export type SupportedLocale = 'de-DE' | 'en-US'
type MessageSchema = typeof de

// Explicit assignment checks the complete English resource structure against German.
// Changing 'concerts.title' to 'concerts.titel' in en-US.json raises a TypeScript error.
const englishMessages: MessageSchema = en

// Date/time remains tied to Europe/Berlin, regardless of the visitor's time zone.
const datetimeFormats = {
  'de-DE': {
    short: { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' },
    time: { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Berlin' },
  },
  'en-US': {
    short: { month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'Europe/Berlin' },
    time: { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Europe/Berlin' },
  },
} satisfies Record<SupportedLocale, Record<string, Intl.DateTimeFormatOptions>>

const numberFormats = {
  'de-DE': {
    decimal: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
    euro: { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  },
  'en-US': {
    decimal: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
    euro: { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  },
} satisfies Record<SupportedLocale, Record<string, Intl.NumberFormatOptions>>

export const i18n = createI18n<[MessageSchema], SupportedLocale, false>({
  legacy: false,
  globalInjection: false,
  locale: 'de-DE',
  // A missing translation in the active locale falls back to English.
  // This provides resilience; it does not translate content automatically.
  fallbackLocale: 'en-US',
  messages: {
    'de-DE': de,
    'en-US': englishMessages,
  },
  datetimeFormats,
  numberFormats,
  missingWarn: false,
  fallbackWarn: false,
})

export { datetimeFormats, numberFormats }
