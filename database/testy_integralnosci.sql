-- Uwaga: uruchamiaj każde zapytanie OSOBNO, nie jako jeden skrypt.
-- Oczekiwany rezultat: błąd CHECK (nie awaria Neon).
INSERT INTO cars(model_id,vin,production_year,mileage_km,price_pln,status)
SELECT id,'TEST0000000000001',2022,-1,50000,'AVAILABLE'
FROM car_models LIMIT 1;

-- Oczekiwany rezultat: błąd CHECK status.
INSERT INTO cars(model_id,vin,production_year,mileage_km,price_pln,status)
SELECT id,'TEST0000000000002',2022,1000,50000,'DAMAGED'
FROM car_models LIMIT 1;
