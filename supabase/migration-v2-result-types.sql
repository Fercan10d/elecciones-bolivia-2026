-- =============================================
-- Migración: Agregar soporte para dos versiones de resultados
-- Boca de Urna + Resultados Oficiales
-- =============================================

-- 1. Agregar columna result_type a races
ALTER TABLE races ADD COLUMN IF NOT EXISTS result_type TEXT NOT NULL DEFAULT 'oficial' CHECK (result_type IN ('boca-de-urna', 'oficial'));

-- 2. Actualizar las carreras existentes como "oficial"
UPDATE races SET result_type = 'oficial' WHERE result_type = 'oficial';

-- 3. Crear las 19 carreras para "boca-de-urna" (duplicando las existentes)
-- Gobernadores Boca de Urna
INSERT INTO races (id, department_id, type, result_type, location_name) VALUES
  ('bu-gob-la-paz', 'la-paz', 'gobernador', 'boca-de-urna', 'La Paz'),
  ('bu-gob-santa-cruz', 'santa-cruz', 'gobernador', 'boca-de-urna', 'Santa Cruz'),
  ('bu-gob-cochabamba', 'cochabamba', 'gobernador', 'boca-de-urna', 'Cochabamba'),
  ('bu-gob-oruro', 'oruro', 'gobernador', 'boca-de-urna', 'Oruro'),
  ('bu-gob-potosi', 'potosi', 'gobernador', 'boca-de-urna', 'Potosí'),
  ('bu-gob-chuquisaca', 'chuquisaca', 'gobernador', 'boca-de-urna', 'Chuquisaca'),
  ('bu-gob-tarija', 'tarija', 'gobernador', 'boca-de-urna', 'Tarija'),
  ('bu-gob-beni', 'beni', 'gobernador', 'boca-de-urna', 'Beni'),
  ('bu-gob-pando', 'pando', 'gobernador', 'boca-de-urna', 'Pando')
ON CONFLICT (id) DO NOTHING;

-- Alcaldes Boca de Urna
INSERT INTO races (id, department_id, type, result_type, location_name) VALUES
  ('bu-alc-la-paz', 'la-paz', 'alcalde', 'boca-de-urna', 'La Paz'),
  ('bu-alc-santa-cruz', 'santa-cruz', 'alcalde', 'boca-de-urna', 'Santa Cruz de la Sierra'),
  ('bu-alc-cochabamba', 'cochabamba', 'alcalde', 'boca-de-urna', 'Cochabamba'),
  ('bu-alc-oruro', 'oruro', 'alcalde', 'boca-de-urna', 'Oruro'),
  ('bu-alc-potosi', 'potosi', 'alcalde', 'boca-de-urna', 'Potosí'),
  ('bu-alc-sucre', 'chuquisaca', 'alcalde', 'boca-de-urna', 'Sucre'),
  ('bu-alc-tarija', 'tarija', 'alcalde', 'boca-de-urna', 'Tarija'),
  ('bu-alc-trinidad', 'beni', 'alcalde', 'boca-de-urna', 'Trinidad'),
  ('bu-alc-cobija', 'pando', 'alcalde', 'boca-de-urna', 'Cobija'),
  ('bu-alc-el-alto', 'la-paz', 'alcalde', 'boca-de-urna', 'El Alto')
ON CONFLICT (id) DO NOTHING;

-- 4. Actualizar el índice
CREATE INDEX IF NOT EXISTS idx_races_result_type ON races(result_type);
