-- =============================================
-- Schema para Elecciones Subnacionales Bolivia 2026
-- El Post
-- =============================================

-- Tabla de departamentos
CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  capital TEXT NOT NULL,
  display_order INT NOT NULL
);

-- Tabla de carreras electorales
CREATE TABLE IF NOT EXISTS races (
  id TEXT PRIMARY KEY,
  department_id TEXT NOT NULL REFERENCES departments(id),
  type TEXT NOT NULL CHECK (type IN ('gobernador', 'alcalde')),
  location_name TEXT NOT NULL,
  votes_counted INT DEFAULT 0,
  total_eligible INT DEFAULT 0,
  actas_counted INT DEFAULT 0,
  actas_total INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de candidatos
CREATE TABLE IF NOT EXISTS candidates (
  id SERIAL PRIMARY KEY,
  race_id TEXT NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  candidate_name TEXT NOT NULL,
  party_name TEXT NOT NULL,
  party_acronym TEXT,
  party_color TEXT NOT NULL DEFAULT '#888888',
  photo_url TEXT,
  votes INT DEFAULT 0,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_races_department ON races(department_id);
CREATE INDEX IF NOT EXISTS idx_races_type ON races(type);
CREATE INDEX IF NOT EXISTS idx_candidates_race ON candidates(race_id);

-- =============================================
-- Row Level Security
-- =============================================

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE races ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Lectura pública para todos
CREATE POLICY "Public read departments" ON departments FOR SELECT USING (true);
CREATE POLICY "Public read races" ON races FOR SELECT USING (true);
CREATE POLICY "Public read candidates" ON candidates FOR SELECT USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Admin write races" ON races FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update races" ON races FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete races" ON races FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin write candidates" ON candidates FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update candidates" ON candidates FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete candidates" ON candidates FOR DELETE TO authenticated USING (true);

-- =============================================
-- Función para actualizar updated_at automáticamente
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER races_updated_at
  BEFORE UPDATE ON races
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Datos iniciales: 9 departamentos
-- =============================================

INSERT INTO departments (id, name, capital, display_order) VALUES
  ('la-paz', 'La Paz', 'La Paz', 1),
  ('santa-cruz', 'Santa Cruz', 'Santa Cruz de la Sierra', 2),
  ('cochabamba', 'Cochabamba', 'Cochabamba', 3),
  ('oruro', 'Oruro', 'Oruro', 4),
  ('potosi', 'Potosí', 'Potosí', 5),
  ('chuquisaca', 'Chuquisaca', 'Sucre', 6),
  ('tarija', 'Tarija', 'Tarija', 7),
  ('beni', 'Beni', 'Trinidad', 8),
  ('pando', 'Pando', 'Cobija', 9)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- Datos iniciales: 19 carreras electorales
-- =============================================

-- 9 Gobernadores
INSERT INTO races (id, department_id, type, location_name) VALUES
  ('gob-la-paz', 'la-paz', 'gobernador', 'La Paz'),
  ('gob-santa-cruz', 'santa-cruz', 'gobernador', 'Santa Cruz'),
  ('gob-cochabamba', 'cochabamba', 'gobernador', 'Cochabamba'),
  ('gob-oruro', 'oruro', 'gobernador', 'Oruro'),
  ('gob-potosi', 'potosi', 'gobernador', 'Potosí'),
  ('gob-chuquisaca', 'chuquisaca', 'gobernador', 'Chuquisaca'),
  ('gob-tarija', 'tarija', 'gobernador', 'Tarija'),
  ('gob-beni', 'beni', 'gobernador', 'Beni'),
  ('gob-pando', 'pando', 'gobernador', 'Pando')
ON CONFLICT (id) DO NOTHING;

-- 10 Alcaldes (9 capitales + El Alto)
INSERT INTO races (id, department_id, type, location_name) VALUES
  ('alc-la-paz', 'la-paz', 'alcalde', 'La Paz'),
  ('alc-santa-cruz', 'santa-cruz', 'alcalde', 'Santa Cruz de la Sierra'),
  ('alc-cochabamba', 'cochabamba', 'alcalde', 'Cochabamba'),
  ('alc-oruro', 'oruro', 'alcalde', 'Oruro'),
  ('alc-potosi', 'potosi', 'alcalde', 'Potosí'),
  ('alc-sucre', 'chuquisaca', 'alcalde', 'Sucre'),
  ('alc-tarija', 'tarija', 'alcalde', 'Tarija'),
  ('alc-trinidad', 'beni', 'alcalde', 'Trinidad'),
  ('alc-cobija', 'pando', 'alcalde', 'Cobija'),
  ('alc-el-alto', 'la-paz', 'alcalde', 'El Alto')
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- Habilitar Realtime para las tablas
-- =============================================

ALTER PUBLICATION supabase_realtime ADD TABLE races;
ALTER PUBLICATION supabase_realtime ADD TABLE candidates;
