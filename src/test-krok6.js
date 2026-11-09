import dotenv from 'dotenv';
import pg from 'pg';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

    const result = await db.query(`SELECT id, vin, image_object_key FROM cars WHERE image_object_key IS NOT NULL LIMIT 1`);
    const car = result.rows[0];

    console.log(`Pobrano auto z bazy. Klucz: ${car.image_object_key}`);

    const command = new GetObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: car.image_object_key
    });

    const imageUrl = await getSignedUrl(storage, command, { expiresIn: 300 });

    console.log("\nWygenerowany Presigned URL:");
    console.log(imageUrl);

  } catch (err) {
    console.error("Błąd skryptu:", err);
  } finally {
    await db.end();
  }
}

runTest();