# TypeScript-Demo für Folie 14

In `src/i18n.ts` wird `type MessageSchema = typeof de` verwendet. Zusätzlich sorgt die Zuweisung `const englishMessages: MessageSchema = en` für eine statische Strukturprüfung.

Um den Folienfehler `concerts.titel` statt `concerts.title` **kontrolliert und reversibel** zu zeigen:

1. `src/locales/en-US.json` lokal öffnen.
2. Nur den Schlüssel `"title": "Concerts"` durch `"titel": "Concerts"` ersetzen.
3. `npm run typecheck` ausführen. Die zu `MessageSchema` inkompatible Struktur muss einen TypeScript-Fehler hervorrufen.
4. Den Tippfehler wieder korrigieren und `npm run typecheck` wiederholen.

Die produktiven Ressourcen bleiben unverändert. Das ist eine Strukturprüfung, keine Qualitätsprüfung der sprachlichen Texte. Eine statische Prüfung jedes beliebigen dynamisch erzeugten `t()`-Schlüssels wird damit **nicht** behauptet.
