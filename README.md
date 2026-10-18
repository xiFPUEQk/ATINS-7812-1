# Komis — starter laboratoryjny (JavaScript)

Projekt startowy do otwarcia w Visual Studio Code. **Nie jest gotową aplikacją.**
Dwie niezależne grupy Studentów mogą rozpocząć od tego samego źródła,
ale realizują własne zadania z `docs/`.

## Co jest, a czego nie ma

**Dostarczone:** `komis.sql` (schemat i syntetyczny seed PostgreSQL),
`verify.sql`, konfiguracja JavaScript/JSDoc/typecheck, skrypt audytu,
niedokończony moduł połączenia z bazą.

**Do wykonania przez Studenta:** projekt Neon, import SQL, kontrola danych,
implementacja połączenia w `src/check-db.js`, późniejszy kod backendu/testy.
Nie ma gotowego REST API, React, Vue, Selenium, CI/CD ani wdrożenia Vercel.

## Rozpoczęcie w VS Code

1. Rozpakuj katalog `komis-starter` i otwórz go w VS Code (File → Open Folder).
2. W terminalu PowerShell: `powershell -ExecutionPolicy Bypass -File scripts/audyt.ps1`
   (albo uruchom polecenia audytu ręcznie; oceń skrypt przed uruchomieniem).
3. Sprawdź: `node --version`, `npm --version`, `git --version`, `gh --version`.
4. `npm install` — instalacja lokalnych zależności po audycie.
5. `npm run typecheck` oraz `npm run check:syntax` — kontrole przygotowania projektu.
6. W Neon utwórz **własną** bazę. W SQL Editor uruchom `database/komis.sql`.
7. W SQL Editor uruchom `database/verify.sql`; sprawdź stan tabel.
8. Skopiuj `.env.example` jako `.env` i wpisz prywatny `DATABASE_URL`.
   **Nie publikuj `.env` ani pełnego connection stringa.**
9. Dopiero teraz uzupełnij TODO w `src/check-db.js` i wykonaj `npm run check-db`.
10. Zapisz dowody i odpowiedzi zgodnie ze swoją kartą w `docs/`.

## Weryfikacja danych po pierwszym imporcie

Oczekiwane dla pustej bazy po jednym uruchomieniu źródłowego skryptu:
`brands=3`, `car_models=3`, `cars=3`, `customers=2`, `sales=0`.
Ta liczność **nie jest** odpowiedzią na pytanie, czy połączenie aplikacji działa;
to sprawdzamy osobno.

## Zasada bezpieczeństwa

Plik `.env` jest ignorowany przez Git. Screenshoty powinny pomijać hasła,
connection stringi, tokeny i dane kont.

## Ograniczenia

`komis.sql` jest dialektem PostgreSQL. Nie wgrywaj go do SQLite/D1.
Pliki zależności nie są instalowane z góry; `package-lock.json` powstanie
lokalnie po `npm install`. Interfejs Neon może się zmieniać.

[⚠ WYMAGA WERYFIKACJI PROWADZĄCEGO]
