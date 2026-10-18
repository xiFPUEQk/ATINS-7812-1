# Weryfikacja projektu komis-starter

## Cel

Przed zgłoszeniem Pull Request autor zmiany powinien sprawdzić, czy pracuje na właściwej gałęzi, czy zakres zmian jest zgodny z zadaniem oraz czy do repozytorium nie trafiły przypadkowe pliki.

## Kontrola repozytorium

```powershell
git branch --show-current
git status -sb
git diff --check
```

Sprawdź nazwę gałęzi, stan katalogu roboczego oraz ewentualne problemy z formatowaniem zmian.

## Kontrola środowiska

```powershell
node --version
npm --version
```

Zapisz wersje używanych narzędzi.

## Kontrola projektu

Po zainstalowaniu zależności projektu wykonaj:

```powershell
npm run check:syntax
npm run typecheck
```

Zapisz wynik każdego polecenia. Nie deklaruj wykonania testu, którego nie uruchomiono.

## Bezpieczeństwo danych dostępowych

Nie umieszczaj haseł, tokenów ani rzeczywistego adresu `DATABASE_URL` w repozytorium, opisach Pull Request lub screenshotach. Do dokumentowania konfiguracji używaj `.env.example` z wartościami przykładowymi.

## Dowody weryfikacji

Autor Pull Request dokumentuje:

- Zakres wprowadzonych zmian.
- Wyniki rzeczywiście wykonanych kontroli.
- Napotkane błędy i ograniczenia.
- Elementy, których nie udało się zweryfikować.
