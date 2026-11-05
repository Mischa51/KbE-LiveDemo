# Künstlerfoto

`don-toliver-licensed.jpg` ist absichtlich nicht in dieser Übergabe enthalten, weil der Dateidownload in der Entwicklungsumgebung technisch nicht möglich war. Der Hero zeigt bis dahin eine eigenständig gestaltete, abstrakte Konzertbühnen-Atmosphäre ohne falsches Künstlerbild.

Das originale Foto **„Don Toliver by Sanchez Productions.jpg“** zeigt Don Toliver bei einem Auftritt am 12.09.2021 (Fluxx San Diego).

- Fotograf / Rechteinhaber: **Sanchez Productions**
- Quelle: https://commons.wikimedia.org/wiki/File:Don_Toliver_by_Sanchez_Productions.jpg
- Lizenz: **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**
- Lizenztext: https://creativecommons.org/licenses/by-sa/4.0/
- Bearbeitung in der Anwendung: CSS-Overlay, responsiver Bildausschnitt; Originaldatei bleibt unverändert.
- Hinweis: Der Künstler/die Agentur unterstützt EventHub nicht; Nutzung als Lehrdemo.

Lokal herunterladen (benötigt Internet):

```bash
node scripts/fetch-artist-photo.mjs
```

Alternativ das Foto von der Wikimedia-Quellseite herunterladen, mit der genannten Lizenz verwenden und unter `public/images/don-toliver-licensed.jpg` speichern. Bei Änderung/Veröffentlichung gelten die Bedingungen der CC BY-SA 4.0 für die Foto-Adaption; Quellenhinweis im Footer beibehalten.

Das Skript setzt zugleich `VITE_PHOTO_ENABLED=true` in `.env.local`. Bei manuellem Download die gleiche Einstellung selbst anlegen und den Dev-Server neu starten. Dadurch wird bei fehlendem Foto keine 404-Anfrage erzeugt.
