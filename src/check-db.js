import 'dotenv/config';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
    console.error('Błąd: Brak zmiennej DATABASE_URL. Sprawdź plik .env!');
    process.exit(1);
}

/** @type {import('pg').PoolConfig} */
const config = {
    connectionString: process.env.DATABASE_URL,
};

const pool = new pg.Pool(config);

async function checkConnection() {
    try {
        console.log('Nawiązywanie połączenia z bazą...');
        
        const result = await pool.query(`
            SELECT
                current_database() AS database_name,
                current_user AS database_user,
                NOW() AS server_time;
        `);
        
        console.log('Odpowiedź serwera:');
        console.table(result.rows);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('Błąd podczas łączenia z bazą:', message);
    } finally {
        await pool.end();
        console.log('Pula połączeń została zamknięta.');
    }
}

checkConnection();