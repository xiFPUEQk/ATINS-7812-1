import 'dotenv/config';
import pg from 'pg';

// LAB 1 — dopisz kod samodzielnie. Nie wklejaj hasła do pliku.
// TODO 1: Sprawdź, czy istnieje process.env.DATABASE_URL.
// TODO 2: Utwórz konfigurację połączenia z JSDoc:
/** @type {import('pg').PoolConfig | undefined} */
let config;

// TODO 3: Utwórz Pool, wykonaj SELECT COUNT(*) FROM cars.
// TODO 4: Wyświetl wynik i zamknij pulę połączeń w finally.
// Wskazówka: `pg.Pool`, `pool.query(...)`, `pool.end()`.
// Nie uruchamiaj tego skryptu przed implementacją.

console.log('TODO: zaimplementuj test połączenia z Neon.');
