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

async function handler() {
  try {
    await db.connect();

    const result = await db.query(`
      SELECT id, vin, production_year, mileage_km, price_pln, status, image_object_key
      FROM cars
      ORDER BY id
    `);

    const cars = await Promise.all(
      result.rows.map(async (car) => {
        let imageUrl = null;
        if (car.image_object_key) {
          const command = new GetObjectCommand({
            Bucket: process.env.STORAGE_BUCKET,
            Key: car.image_object_key
          });
          imageUrl = await getSignedUrl(storage, command, { expiresIn: 300 });
        }
        return { ...car, image_url: imageUrl };
      })
    );

    console.log(JSON.stringify(cars, null, 2));

  } catch (err) {
    console.error("Błąd API:", err);
  } finally {
    await db.end();
  }
}

handler();