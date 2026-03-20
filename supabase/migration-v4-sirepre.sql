-- Migration v4: Simplificar a un solo tablero SIREPRE
-- Agregar votos blancos y nulos a las carreras

-- 1. Agregar columnas de votos blancos y nulos
ALTER TABLE races ADD COLUMN IF NOT EXISTS votos_blancos integer DEFAULT 0;
ALTER TABLE races ADD COLUMN IF NOT EXISTS votos_nulos integer DEFAULT 0;

-- 2. Eliminar las carreras de boca de urna (las que tienen prefijo bu-)
DELETE FROM candidates WHERE race_id LIKE 'bu-%';
DELETE FROM races WHERE id LIKE 'bu-%';

-- 3. Actualizar result_type de todas las carreras restantes (ya no necesitamos distinguir)
UPDATE races SET result_type = 'oficial' WHERE result_type IS NOT NULL;
