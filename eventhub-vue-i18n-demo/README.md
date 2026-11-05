# EventHub – Vue I18n Premium Concert Demo

Responsive Hochschul-Live-Demo zur Internationalisierung mit **Vue 3, TypeScript (Strict Mode), Vite, Vue I18n (Composition API), Lucide und Vitest**. Design: Full-Viewport, Dark Mode, Asphalt-Grau und Neon-Orange.

Die reale Vorlage ist Don Tolivers **NITROUS — OCTANE World Tour Leg 2** am **02.11.2026** in der **Uber Arena, Berlin**. Die Veranstaltung ist bereits vorbei. Die komplette EventHub-Oberfläche, die Beispielnutzerin Mia und sämtliche Buchungen sind **rein fiktiv**. **Es werden weder echte Tickets angeboten noch Reservierungen vorgenommen.**

## Schnellstart

Voraussetzung: Node.js >= 22.12 (oder >= 20.19) und npm.

```bash
npm install
npm run photo                   # empfohlen; benötigt Internet, lädt lizenziertes Foto und aktiviert es
npm run dev
```

Aufrufen: http://127.0.0.1:5173

```bash
npm run typecheck
npm run test
npm run build
npm run preview
```

> **Status der Übergabe:** Die Projektdateien sind implementiert. In der Erstellungsumgebung waren weder die npm-Registry noch Wikimedia-Bildserver erreichbar. Deshalb konnte `npm install` dort nicht erfolgreich abgeschlossen werden; Build, Vue-I18n-Laufzeittests und echte Browser-UI-Prüfung konnten **nicht** nachgewiesen werden. Bitte nach dem Installieren lokal ausführen. Ohne Foto funktioniert der abstrakte Hero-Fallback (ohne fehlgeschlagene Bildanfrage).

## Projektaufbau

```text
src/
  i18n.ts                         zentrale Konfiguration, Formatvorlagen, TS-Schema
  locales/de-DE.json               deutsche Nachrichten, Vorlage
  locales/en-US.json               englische Nachrichten
  data/concert.ts                  reale Veranstaltungsdaten + Demo-Kategorien
  components/
    AppHeader.vue / LanguageSwitcher.vue
    ConcertHero.vue / ConcertOverview.vue
    TicketSelector.vue / BookingSummary.vue
    BookingConfirmation.vue / EventDetails.vue
  styles/tokens.css / global.css
  App.vue / main.ts
tests/concert.test.ts / i18n.test.ts
scripts/fetch-artist-photo.mjs
docs/SLIDES-TRACEABILITY.md
docs/LIVE-DEMO-5MIN.md
docs/TYPESCRIPT-CHECK.md
```

## Was die Demo zeigt

- **`t()`**: `concerts.title` → „Konzerte“ / „Concerts“; `t('user.welcome', { name: 'Mia' })` mit Interpolation.
- **Reaktiver Sprachwechsel**: `useI18n({ useScope: 'global' })`, `locale.value = 'en-US'`, ohne Reload; auch in offenem Dialog.
- **Pluralisierung**: `t('tickets.selected', quantity)` mit `|`-Varianten für 0 / 1 / 3 Tickets.
- **`d()`**: benannte Vorlage `short` + `Europe/Berlin`, ergibt `02.11.2026` und `11/2/2026`.
- **`n()`**: `decimal` mit `72,00` / `72.00`; `euro` mit `72,00 €` / `€72.00`, immer **EUR**.
- **Fallback**: `fallbackLocale: 'en-US'` verwendet Englisch, wenn ein Schlüssel in Deutsch fehlt; **keine automatische Übersetzung**.
- **TypeScript**: `type MessageSchema = typeof de`, generisches `createI18n` und explizite Formprüfung `const englishMessages: MessageSchema = en`. Ein absichtlicher Fehler wird ausschließlich nach Anleitung in `docs/TYPESCRIPT-CHECK.md` erzeugt.
- **Demo-Checkout**: Standard 72 EUR, Club 201 89 EUR, Premium Seat 169 EUR. Menge 0–5, reaktive Summe, deaktivierter Checkout bei 0, Sprachwechsel im Bestätigungsdialog, Reset. Rein lokal im Browser; kein Backend, keine Zahlungs-API, kein persistierter Buchungsvorgang.

## Quellen, Bildnachweise und Rechte

- **Veranstaltung, Einlass, Beginn und Preisangaben:** [Uber Arena](https://www.uber-arena.de/events/tickets/detail/don-toliver/2026-11-02-2000/), abgerufen zur Erstellung am 05.11.2026. Der Veranstalter ist nicht mit EventHub verbunden.
- **Foto bei erfolgreichem optionalen Download:** Sanchez Productions, [„Don Toliver by Sanchez Productions.jpg“](https://commons.wikimedia.org/wiki/File:Don_Toliver_by_Sanchez_Productions.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Auftritt am 12.09.2021 in San Diego, **nicht** Bild des Berliner Konzerts. CSS-Ausschnitt und Dark-Overlay. Foto-Adaptionen unter CC BY-SA 4.0 weitergeben; Attribution im Footer und in `public/images/README.md`.
- **Kein Foto in der ZIP:** Die Downloadumgebung war offline. Lizenz und Bildpfad sind vorbereitet; bei fehlender Datei bleibt das Design eine abstrakte Konzertgrafik. Das Bild wird erst mit `VITE_PHOTO_ENABLED=true` (durch `npm run photo` automatisch in `.env.local`) eingeblendet. Keine generierte Ersatzperson.
- Google Fonts (Barlow Condensed, DM Sans) können optional bei Internetverbindung geladen werden; bei Offline-Nutzung greifen systemseitige Fallback-Schriften.

## Demo-Drehbuch und Folienabgleich

- [Ablauf 5 Minuten](docs/LIVE-DEMO-5MIN.md)
- [Abgleich aller Folien und Abweichungen](docs/SLIDES-TRACEABILITY.md)
- [TypeScript-Fehler demonstrieren](docs/TYPESCRIPT-CHECK.md)

## Git / GitHub

Das Verzeichnis enthält eine `.gitignore`. Ein öffentliches GitHub-Repository wurde nicht automatisch angelegt. So veröffentlichst du es nach der Prüfung:

```bash
git init
git add .
git commit -m "Build EventHub Vue I18n demo"
gh repo create eventhub-vue-i18n-demo --private --source=. --remote=origin --push
```

Zuerst privat belassen; vor einem öffentlichen Push Bildlizenz, Referenzen und Quellennachweise prüfen. Keine persönlichen Daten oder Zugangsdaten ins Repository aufnehmen.
