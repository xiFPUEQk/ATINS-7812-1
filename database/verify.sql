-- Uruchom po wykonaniu komis.sql.
SELECT table_name FROM information_schema.tables
WHERE table_schema='public' ORDER BY table_name;

SELECT 'brands' AS tabela, COUNT(*) AS rekordy FROM brands
UNION ALL SELECT 'car_models', COUNT(*) FROM car_models
UNION ALL SELECT 'cars', COUNT(*) FROM cars
UNION ALL SELECT 'customers', COUNT(*) FROM customers
UNION ALL SELECT 'sales', COUNT(*) FROM sales;

SELECT c.id, b.name AS marka, m.name AS model, c.vin, c.price_pln, c.status
FROM cars c
JOIN car_models m ON m.id=c.model_id
JOIN brands b ON b.id=m.brand_id
ORDER BY c.id;
