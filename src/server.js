import http from 'node:http';
import dotenv from 'dotenv';
import pg from 'pg';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config({ path: '.env.local' });
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const storage = new S3Client({
  region: process.env.AWS_REGION || '',
  endpoint: process.env.AWS_ENDPOINT_URL_S3 || '',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

/**
 * @param {http.ServerResponse} res
 * @param {number} statusCode
 * @param {unknown} payload
 */
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(payload, null, 2));
}

async function getCarsWithImages() {
  const result = await pool.query(`
    SELECT id, vin, production_year, mileage_km, price_pln, status, image_object_key
    FROM cars
    ORDER BY id
  `);

  return Promise.all(
    result.rows.map(async (car) => {
      /** @type {string | null} */
      let imageUrl = null;

      if (car.image_object_key) {
        const command = new GetObjectCommand({
          Bucket: process.env.STORAGE_BUCKET || '',
          Key: car.image_object_key
        });
        imageUrl = await getSignedUrl(storage, command, { expiresIn: 300 });
      }

      return { ...car, image_url: imageUrl };
    })
  );
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const method = req.method || 'GET';

  if (url.pathname === '/health' && method === 'GET') {
    return sendJson(res, 200, { status: 'ok' });
  }

  if (url.pathname === '/api/cars') {
    if (method !== 'GET') {
      return sendJson(res, 405, {
        error: 'Użyj GET /api/cars.'
      });
    }

    try {
      const cars = await getCarsWithImages();
      return sendJson(res, 200, {
        count: cars.length,
        data: cars
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nieznany błąd';
      console.error('Błąd API podczas pobierania samochodów:', message);
      return sendJson(res, 500, {
        error: 'Błąd wewnętrzny serwera'
      });
    }
  }else if (url.pathname === '/api/db-check' && method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT current_database() AS database, current_user AS "user", NOW() AS now;'
      );
      return sendJson(res, 200, {
        connected: true,
        ...result.rows[0]
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nieznany błąd';
      console.error('Błąd połączenia z Neon:', message);
      return sendJson(res, 500, {
        connected: false,
        error: 'Błąd połączenia z bazą danych'
      });
    }
  }

  return sendJson(res, 404, {
    error: 'Nie znaleziono zasobu.'
  });
});

server.listen(PORT, () => {
  console.log(`REST API działa pod adresem http://localhost:${PORT}/api/cars`);
});

process.on('SIGINT', async () => {
  await pool.end();
  server.close(() => process.exit(0));
});