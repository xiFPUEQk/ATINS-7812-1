import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

async function listCars() {
    try {
        console.log('Pobieranie ofert samochodów z bazy Neon...');
        
        // Krok 9
        const result = await pool.query(`
            SELECT 
                b.name AS "Marka",
                m.name AS "Model",
                c.production_year AS "Rok",
                c.price_pln || ' zł' AS "Cena"
            FROM cars c
            JOIN car_models m ON c.model_id = m.id
            JOIN brands b ON m.brand_id = b.id;
        `);
        
        console.table(result.rows);
    } catch (error) {
        console.error('Błąd podczas odczytu danych:', error.message);
    } finally {
        await pool.end();
    }
}

listCars();