import 'dotenv/config';
import pg from 'pg';

// TODO 1: Sprawdź, czy istnieje process.env.DATABASE_URL.
if (!process.env.DATABASE_URL) {
    console.error('Błąd: Brak zmiennej DATABASE_URL. Sprawdź plik .env!');
    process.exit(1);
}

// TODO 2: Utwórz konfigurację połączenia z JSDoc:
/** @type {import('pg').PoolConfig | undefined} */
let config = {
    connectionString: process.env.DATABASE_URL,
};

// TODO 3: Utwórz Pool
const pool = new pg.Pool(config);

async function checkConnection() {
    try {
        console.log('Nawiązywanie połączenia z bazą...');
        
        // Jeśli wykonalibyśmy COUNT(*) z TODO, dostalibyśmy błąd o braku relacji "cars".
        const result = await pool.query(`
            SELECT
                current_database() AS database_name,
                current_user AS database_user,
                NOW() AS server_time;
        `);
        
        // TODO 4: Wyświetl wynik
        console.log('Odpowiedź serwera (Krok 4):');
        console.table(result.rows);

    } catch (error) {
        // @ts-ignore
        console.error('Błąd podczas łączenia z bazą:', error.message);
    } finally {
        // TODO 4: Zamknij pulę połączeń w finally
        await pool.end();
        console.log('Pula połączeń została zamknięta.');
    }
}

checkConnection();