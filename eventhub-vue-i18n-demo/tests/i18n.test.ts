import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import { i18n } from '../src/i18n'
import { concert } from '../src/data/concert'

function normalizeSpaces(text: string) {
  return text.replace(/[\u00a0\u202f]/g, ' ')
}

describe('Vue I18n — translations, interpolation and pluralization', () => {
  it('uses stable slide-8 keys for both locales', () => {
    i18n.global.locale.value = 'de-DE'
    expect(i18n.global.t('concerts.title')).toBe('Konzerte')
    expect(i18n.global.t('user.welcome', { name: 'Mia' })).toBe('Willkommen zurück, Mia!')
    i18n.global.locale.value = 'en-US'
    expect(i18n.global.t('concerts.title')).toBe('Concerts')
    expect(i18n.global.t('user.welcome', { name: 'Mia' })).toBe('Welcome back, Mia!')
  })

  it.each([
    ['de-DE', ['Kein Ticket ausgewählt', '1 Ticket ausgewählt', '3 Tickets ausgewählt']],
    ['en-US', ['No tickets selected', '1 ticket selected', '3 tickets selected']],
  ] as const)('pluralizes 0, 1 and 3 for %s', (locale, messages) => {
    i18n.global.locale.value = locale
    expect(i18n.global.t('tickets.selected', 0)).toBe(messages[0])
    expect(i18n.global.t('tickets.selected', 1)).toBe(messages[1])
    expect(i18n.global.t('tickets.selected', 3)).toBe(messages[2])
  })
})

describe('Vue I18n — actual regional formatting without currency conversion', () => {
  it('uses explicit short and decimal formats', () => {
    i18n.global.locale.value = 'de-DE'
    expect(i18n.global.d(concert.start, 'short')).toBe('02.11.2026')
    expect(i18n.global.n(72, 'decimal')).toBe('72,00')
    expect(normalizeSpaces(i18n.global.n(72, 'euro'))).toBe('72,00 €')

    i18n.global.locale.value = 'en-US'
    expect(i18n.global.d(concert.start, 'short')).toBe('11/2/2026')
    expect(i18n.global.n(72, 'decimal')).toBe('72.00')
    expect(normalizeSpaces(i18n.global.n(72, 'euro'))).toBe('€72.00')
  })

  it('keeps 20:00 Berlin time regardless of machine timezone', () => {
    i18n.global.locale.value = 'de-DE'
    expect(i18n.global.d(concert.start, 'time')).toBe('20:00')
    expect(i18n.global.d(concert.doors, 'time')).toBe('18:30')
    i18n.global.locale.value = 'en-US'
    expect(i18n.global.d(concert.start, 'time')).toBe('8:00 PM')
  })

  it('falls back to English when a translation is not present in German', () => {
    const fallbackExample = createI18n({
      legacy: false,
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      messages: {
        'de-DE': { example: { present: 'Vorhanden' } },
        'en-US': { example: { present: 'Present', onlyEnglish: 'English fallback works' } },
      },
    })
    expect(fallbackExample.global.t('example.onlyEnglish')).toBe('English fallback works')
  })
})
