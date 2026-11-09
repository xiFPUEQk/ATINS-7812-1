import dotenv from 'dotenv';
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

dotenv.config({ path: '.env.local' });

const storage = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true, // <--- TO ROZWIĄZUJE BŁĄD
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function checkObject() {
  try {
    const command = new HeadObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: "cars/123/main.jpg"
    });
    const response = await storage.send(command);
    console.log("SUKCES: Kod widzi obiekt w Storage!");
    console.log("Rozmiar pliku:", response.ContentLength, "bajtów");
  } catch (err) {
    console.error("BŁĄD:", err.name, err.message);
  }
}

checkObject();