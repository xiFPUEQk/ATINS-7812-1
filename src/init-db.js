import 'dotenv/config';
import pg from 'pg';
import { readFile } from 'fs/promises';

if (process.env.CONFIRM_DB_INIT !== 'YES') {
    console.error('Inicjalizacja zablokowana. Ustaw CONFIRM_DB_INIT=YES.');
    process.exit(1);
}

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

async function initDb() {
    try {
        await client.connect();
        console.log('Połączono z bazą. Odczytywanie pliku komis.sql...');

        const sql = await readFile(
            new URL('../database/komis.sql', import.meta.url),
            'utf8'
        );

        console.log('Wysyłanie instrukcji SQL do Neon PostgreSQL...');
        await client.query(sql);
        
        console.log('Schemat komisu został zainicjalizowany.');
    } catch (error) {
        console.error('Błąd:', error.message);
    } finally {
        await client.end();
    }
}

initDb();