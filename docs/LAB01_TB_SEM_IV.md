# LAB 1 — Technologie backendowe (semestr IV, 3 h)

**Temat karty:** Podstawy programowania backendowego. Serwery, bazy danych,
języki backendowe (Node.js, Java).

Cel: umieć wskazać, co działa lokalnie, co w Neon, jak Node.js uzyskuje
dostęp do PostgreSQL i jakie dane faktycznie zapisano w bazie.

## Zadania
1. Otwórz starter i wykonaj audyt. Zanotuj rolę `package.json`, `jsconfig.json`,
   `src/check-db.js`, `.env.example`, `komis.sql`.
2. Przeczytaj `komis.sql`. Zidentyfikuj tabele, klucze główne, obce,
   `UNIQUE`, `CHECK`, indeksy.
3. Utwórz projekt PostgreSQL w Neon. Wykonaj `komis.sql`, potem `verify.sql`.
4. Skonfiguruj `.env` bez ujawniania hasła. Uzupełnij TODO w `src/check-db.js`.
5. Pokaż działające zapytanie SELECT wykonane z Node.js.
6. Wyjaśnij: czym jest backend? jak różni się lokalny proces Node.js
   od zewnętrznej bazy? skąd bierze się `DATABASE_URL`?

## Dowód
- struktura tabel i wynik `verify.sql`;
- własny działający test Node.js → Neon;
- opis jednego błędu i jego diagnozy.

Nie buduj dziś kompletnego REST API ani frontendów React/Vue.
To tematy rozwijane później.

[⚠ WYMAGA WERYFIKACJI PROWADZĄCEGO]
