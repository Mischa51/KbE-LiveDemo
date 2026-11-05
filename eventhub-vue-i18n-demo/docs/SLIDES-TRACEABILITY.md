# Fachlicher Abgleich: Präsentation → EventHub

Grundlage: `Vue_I18n_Praesentation_korrigiert - Repariert.pptx`, **15 Folien inklusive Sprechernotizen**. Keine Übernahme des Foliendesigns.

| Folien | Theoretisches Beispiel / Notiz | Echte Implementierung |
|---|---|---|
| 2, 6 | `<h2>{{ t('concerts.title') }}</h2>` → „Konzerte“ | `src/components/ConcertOverview.vue` und `src/components/AppHeader.vue` |
| 3–4 | i18n technisch vorbereiten; Plugin übersetzt nicht selbst | `src/i18n.ts`, `src/locales/*.json`, `src/main.ts` |
| 5 | `t()`, `d()` und `n()` | `ConcertOverview.vue`, `ConcertHero.vue`, `EventDetails.vue` |
| 7 | `createI18n`, `legacy: false`, `locale: 'de-DE'`, `fallbackLocale: 'en-US'`, `app.use(i18n)` | `src/i18n.ts`, `src/main.ts` |
| 8 | `concerts.title`, `user.welcome`, exakt gleiche JSON-Werte aus Folie | `de-DE.json`, `en-US.json` |
| 9 | `t('user.welcome', { name: 'Mia' })` → interpolierter Name | `ConcertOverview.vue` |
| 10 | `useI18n({ useScope: 'global' })`, `locale.value = 'en-US'` | `LanguageSwitcher.vue`; übrige Komponenten binden sich an globale Locale |
| 11 | `"Kein Ticket ausgewählt | 1 Ticket ausgewählt | {n} Tickets ausgewählt"`; `t('tickets.selected', count)` | `TicketSelector.vue`, Ticketzahl 0–5 |
| 12 | `d(eventDate, 'short')`; `n(72, 'decimal')` | `ConcertHero.vue`, `EventDetails.vue`, `i18n.ts` |
| 13 | `n(72, 'euro')`, kein EUR/USD-Umtausch | `ConcertHero.vue`, `BookingSummary.vue`, `EventDetails.vue` |
| 14 | `type MessageSchema = typeof de`; `createI18n<[MessageSchema], 'de-DE' | 'en-US'>` | `src/i18n.ts` + zusätzliche explizite Ressourcenstrukturprüfung |
| 15 | Überleitung Sprachwechsel → Ticketauswahl → Pluralisierung → Formate | gesamter Demo-Ablauf, `docs/LIVE-DEMO-5MIN.md` |

## Präzisierungen und Abweichungen

1. **Folie 7 / Folie 14 zeigt nur Konfigurationsauszüge.** Für die auf Folien 12–13 demonstrierten Ausgabeformate sind `datetimeFormats` und `numberFormats` in `createI18n` notwendig. Diese sind ergänzt.
2. **Datum und Zeitzone:** Die Folien zeigen ein Datum, aber kein Speichermodell. Der Termin wird als UTC-Zeitpunkt `2026-11-02T19:00:00Z` gespeichert (Berlin 20:00 Uhr am 02.11.2026); die Anzeige wird explizit in `Europe/Berlin` formatiert. Das verhindert einen Tageswechsel durch die Zeitzone des Rechners.
3. **TypeScript:** Die gezeigte generische Typisierung wurde beibehalten und durch `const englishMessages: MessageSchema = en` ergänzt. Damit kann die Ressourcenstruktur explizit geprüft werden. Nicht jede Schreibweise eines beliebigen `t()`-Schlüssels wird von allein in jeder Bibliotheksversion statisch überprüft; dynamische Schlüssel sind besonders zu beachten. Qualität und Sprachrichtigkeit bleiben menschliche Aufgaben.
4. **Preis „ab 72 EUR“:** 72 EUR ist der *beworbene Einstiegspreis* der Veranstaltung. Für eine funktionale Auswahl sind die im offiziellen Arena-Angebot aufgeführten Kategorien Standard (ab 72 EUR), Club 201 (89 EUR), Premium Seat (169 EUR) abgebildet. Für die fiktive Demo werden diese Werte als feste Modellpreise behandelt, ohne Verfügbarkeitsaussage oder echte Transaktion.
5. **Buchungsbestätigung:** Die präsentierten Folien zeigen keine echte Buchungs-API. Deshalb ist die Bestätigung ausdrücklich eine in-memory-Demonstration ohne Server/Bezahlung. Die Sprachwahl bleibt auch im Dialog verfügbar.
6. **Foto:** Ein authentisches, frei lizenziertes Foto wurde mit Quelle und CC-BY-SA-4.0-Lizenz ausgewählt, konnte aber nicht in den Container heruntergeladen werden. Die App enthält daher einen abstrakten, nicht personenbezogenen Fallback-Hero und einen Fetch-Helfer (`scripts/fetch-artist-photo.mjs`). Das ist eine dokumentierte, temporäre visuelle Abweichung und keine fingierte Künstlerfotografie.

## Verifizierte Veranstaltungsquelle

https://www.uber-arena.de/events/tickets/detail/don-toliver/2026-11-02-2000/ (Konzert 02.11.2026, Einlass 18:30, Beginn 20:00, Standard ab 72 EUR, Club 201 89 EUR, Premium Seat 169 EUR).
