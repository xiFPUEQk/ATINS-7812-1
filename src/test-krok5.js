import dotenv from 'dotenv';
import pg from 'pg';
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

dotenv.config({ path: '.env.local' });

const storage = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const db = new pg.Client({ connectionString: process.env.DATABASE_URL });

async function runTest() {
  try {
    await db.connect();

    // Celowy błąd
    try {
      const badCommand = new HeadObjectCommand({ Bucket: process.env.STORAGE_BUCKET, Key: "cars/999/main.jpg" });
      await storage.send(badCommand);
    } catch (err) {
      console.log(`Złapano oczekiwany błąd: ${err.name} - ${err.message}`);
    }

    await db.query(`UPDATE cars SET image_object_key = 'cars/123/main.jpg' WHERE id = (SELECT id FROM cars LIMIT 1)`);

    console.log("\nTEST INTEGRACJI DB + STORAGE");
    const result = await db.query(`SELECT id, vin, image_object_key FROM cars WHERE image_object_key IS NOT NULL LIMIT 1`);
    const car = result.rows[0];
    console.log(`Pobrano z DB -> ID: ${car.id}, VIN: ${car.vin}, KLUCZ: ${car.image_object_key}`);

    const goodCommand = new HeadObjectCommand({ Bucket: process.env.STORAGE_BUCKET, Key: car.image_object_key });
    const response = await storage.send(goodCommand);
    console.log(`SUKCES STORAGE: Obiekt z DB istnieje! Rozmiar: ${response.ContentLength} bajtów.`);

  } catch (err) {
    console.error("Błąd skryptu:", err);
  } finally {
    await db.end();
  }
}

runTest();