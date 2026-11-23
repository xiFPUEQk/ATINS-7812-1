const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

/**
 * @param {string | null} rawUrl
 */
function redactPresignedUrl(rawUrl) {
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl);
    return `${parsed.origin}${parsed.pathname}?X-Amz-Signature=[REDACTED]`;
  } catch {
    return '[REDACTED_URL]';
  }
}

async function runTests() {
  console.log(`Testowanie: ${BASE_URL}/api/cars\n`);
  const res = await fetch(`${BASE_URL}/api/cars`);
  const contentType = res.headers.get('content-type') || '';

  if (res.status !== 200) {
    throw new Error(`Oczekiwano status 200, otrzymano: ${res.status}`);
  }
  if (!contentType.includes('application/json')) {
    throw new Error(`Zly Content-Type: ${contentType}`);
  }

  /**
   * @type {{
   *   count: number,
   *   data: Array<{
   *     id: number,
   *     vin: string,
   *     production_year: number,
   *     mileage_km: number,
   *     price_pln: string | number,
   *     status: string,
   *     image_object_key: string | null,
   *     image_url: string | null
   *   }>
   * }}
   */
  const body = await res.json();

  if (!body || !Array.isArray(body.data)) {
    throw new Error('Odpowiedź JSON nie zawiera tablicy data');
  }
  console.log(`[Sukces] GET /api/cars HTTP ${res.status} (rekordów: ${body.count})`);

  const res404 = await fetch(`${BASE_URL}/api/nie-istnieje`);
  if (res404.status !== 404) {
    throw new Error(`Oczekiwano 404, otrzymano: ${res404.status}`);
  }
  console.log(`[Sukces] GET /api/nie-istnieje HTTP ${res404.status}`);

  const res405 = await fetch(`${BASE_URL}/api/cars`, { method: 'POST' });
  if (res405.status !== 405) {
    throw new Error(`Oczekiwano 405 dla POST, otrzymano: ${res405.status}`);
  }
  console.log(`[Sukces] POST /api/cars HTTP ${res405.status}\n`);

  const sanitizedSample = {
    count: body.count,
    data: body.data.slice(0, 2).map((car) => ({
      ...car,
      image_url: redactPresignedUrl(car.image_url)
    }))
  };

  console.log('Przykładowa odpowiedź JSON: ');
  console.log(JSON.stringify(sanitizedSample, null, 2));
}

runTests().catch((err) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error('[FAIL] Test REST API nie powiódł się, ', message);
  process.exit(1);
});