# Live-Demo – 5 Minuten (zu Präsentationsfolien 9–15)

**Vorbereitung:** `npm run dev`; im Browser auf http://127.0.0.1:5173 öffnen. Browserzoom 100 %, Fenster ca. 1440 × 900, Startsprache Deutsch, 0 Tickets. Für beste Optik zuerst `node scripts/fetch-artist-photo.mjs` (Internet nötig).

| Zeit | Interaktion | Gesprochener Bezug zur Theorie |
|---|---|---|
| 0:00–0:45 | EventHub zeigen, Don Toliver / Uber Arena, Buchungsstatus | „Reales Konzert, aber fiktive Demo-Oberfläche. Keine echten Tickets.“ |
| 0:45–1:45 | DE → EN → DE im Header, Begrüßung „Mia“ prüfen | Folien 8–10: `t('concerts.title')`, Interpolation und reaktive globale `locale` ohne Neuladen |
| 1:45–2:45 | Mit Plus von 0 auf 1 und 3 Tickets wechseln (zweimal auf +) | Folie 11: `t('tickets.selected', count)` mit drei durch `|` getrennten Formen |
| 2:45–3:45 | Sprachen erneut wechseln; Eventdatum, Preis und Gesamtbetrag vergleichen; ggf. unten „Formate vergleichen“ öffnen | Folien 12–13: `d(eventDate, 'short')`, `n(72, 'decimal')`, `n(72, 'euro')`; keine Währungsumrechnung |
| 3:45–4:30 | Drei Standardtickets = 216 EUR; Demo-Reservierung bestätigen; im Dialog EN ↔ DE | Kein Backend; echter UI-Zustand, reaktiv übersetzter Dialog |
| 4:30–5:00 | Editor: `src/i18n.ts`, `src/locales/de-DE.json` und `src/components/TicketSelector.vue` zeigen | Folien 7, 8, 11, 14: konkrete Konfiguration, Sprachressource und Komponentenaufruf |

**Falls etwas im Ablauf hängt:** Dialog mit Escape schließen, „Auswahl zurücksetzen“ klicken, wieder 0 Tickets. Keine Anmeldung, kein Backend, kein Router und keine externe API nötig.

**Mögliche Dozenten-Rückfragen:**
- Was passiert bei fehlender Übersetzung? → `fallbackLocale: 'en-US'`, kein automatisches Übersetzen.
- Warum `legacy: false`? → Composition-API-Modus, `useI18n()`.
- Was ist der Unterschied `n(72,'decimal')` vs. `n(72,'euro')`? → nackte Zahl vs. EUR-Währungssymbol, beide nur Darstellungsformate.
- Warum steht `Europe/Berlin` in `datetimeFormats`? → Datum ändert sich nicht je nach Zeitzone des Rechners.
- TypeScript erkennt alle Tippfehler? → Nein. Explizite Strukturprüfung schützt Ressourcenschlüssel; freie, dynamische `t()`-Aufrufe sind nicht pauschal garantiert.
