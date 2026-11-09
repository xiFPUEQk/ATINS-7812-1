import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config({ path: '../.env.local' });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await client.connect();
    console.log("Połączono pomyślnie, dodaję kolumnę image_object_key...");
    
    await client.query(`
      ALTER TABLE cars
      ADD COLUMN IF NOT EXISTS image_object_key text;
    `);
    
    console.log("Gotowe! Sprawdzam schemat tabeli:");
    
    const res = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'cars' AND column_name = 'image_object_key';
    `);
    
    console.table(res.rows);
  } catch (err) {
    console.error("Wystąpił błąd:", err);
  } finally {
    await client.end();
    console.log("Połączenie zamknięte.");
  }
}

main();