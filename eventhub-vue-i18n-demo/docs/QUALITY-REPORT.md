# Qualitätssicherung / Übergabestatus (05.11.2026)

## Tatsächlich ausgeführt

| Prüfung | Ergebnis | Anmerkung |
|---|---|---|
| PPTX-Analyse | **Erfolgreich** | 15 Folien mit `python-pptx` inklusive tatsächlicher Sprechernotizen ausgewertet |
| Übersetzungsstruktur | **Erfolgreich** | DE/EN haben jeweils 71 Schlüssel und dieselbe verschachtelte Struktur |
| Buchungsarithmetik | **Erfolgreich** | Standard 3 × 72 = 216; Club 3 × 89 = 267; Premium 2 × 169 = 338; Grenzen 0–5 geprüft |
| Datumsformat via JavaScript `Intl` | **Erfolgreich** | Berlin 02.11.2026; USA 11/2/2026; Eventtimestamp Berlin 20:00 |
| Dezimal- und Euroformat via `Intl` | **Erfolgreich** | `72,00` / `72.00` sowie `72,00 €` / `€72.00` |
| TypeScript-Syntaxanalyse | **Erfolgreich** | 15 `.ts`/`<script setup lang="ts">`-Einheiten mit TypeScript-Transpiler syntaktisch analysiert; keine Syntaxdiagnosen |
| `node --check scripts/fetch-artist-photo.mjs` | **Erfolgreich** | Node-Syntax okay |
| `npm install` | **Blockiert** | `EAI_AGAIN`: `registry.npmjs.org` in dieser Umgebung nicht auflösbar |
| Lizenzquellen | **Geprüft** | Offizielle Arena-Veranstaltungsseite; Wikimedia Commons CC BY-SA 4.0 |

## Erst nach Installation lokal überprüfbar

Diese Resultate werden ausdrücklich **nicht als erfolgreich ausgegeben**:

- `npm run typecheck` (vollständige Vue-/Vite-/Vue-I18n-Typen)
- `npm run test` (Vitest einschließlich echter Vue-I18n-Laufzeit)
- `npm run build`
- `npm run dev` und Browserkonsole
- Responsives Layout bei 1440 × 900 und 1920 × 1080 in tatsächlicher Vue-Anwendung
- Künstlerfoto (sicheres Offline-Asset; Download via `npm run photo` erst bei Internetverbindung)

## Empfohlene abschließende lokale Prüfung

```bash
npm install
npm run photo
npm run typecheck
npm run test
npm run build
npm run dev
```

Danach in DE/EN genau die Texte für 0, 1, 3 Tickets prüfen, Kategorie wechseln, 3 Standardtickets = 216 EUR verifizieren, Demo-Buchung aufrufen und Sprache im Dialog ändern. Der Browser sollte dabei keine relevanten Fehler melden. Bei einem TypeScript-Fehler aufgrund einer abweichenden installierten Vue-I18n-Version zuerst `src/i18n.ts` und `docs/TYPESCRIPT-CHECK.md` abgleichen.

## GitHub-Status

Git-Quellcode lokal erstellt. Keine GitHub-Remote-Verbindung vorhanden, keine erfolgreiche Veröffentlichung behauptet. Veröffentlichung nach lokalem Test und (falls zutreffend) Prüfung der Foto-Lizenzbedingungen.
