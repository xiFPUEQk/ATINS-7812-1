/**
 * Oblicza cenę samochodu po rabacie.
 *
 * @param {number} pricePln - Cena początkowa.
 * @param {number} discountPercent - Rabat procentowy.
 * @returns {number} Cena po rabacie.
 */

export function calculatePrice(pricePln, discountPercent) {
if (!Number.isFinite(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100) {
  throw new RangeError('Rabat musi mieścić się w zakresie 0–100%.');
}
  return pricePln * (1 - discountPercent / 100);
}

// Celowo niepoprawne wywołanie do diagnozy:
// calculatePrice(79900, 10);
