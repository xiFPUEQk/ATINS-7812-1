import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

async function verifyDb() {
    try {
        console.log('Sprawdzanie tabel w bazie Neon...');
        
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        const existingTables = result.rows.map(row => row.table_name);
        const requiredTables = ['brands', 'car_models', 'cars', 'customers', 'sales'];
        
        const missingTables = requiredTables.filter(t => !existingTables.includes(t));
        
        if (missingTables.length === 0) {
            console.log('Wszystkie wymagane tabele komisu już istnieją w bazie.');
        } else {
            console.log('W bazie brakuje następujących tabel:', missingTables.join(', '));
            console.log('Wniosek: Baza wymaga inicjalizacji (Krok 7).');
        }
    } catch (error) {
        console.error('Błąd podczas weryfikacji bazy:', error.message);
    } finally {
        await pool.end();
    }
}

verifyDb();