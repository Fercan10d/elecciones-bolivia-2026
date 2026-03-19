-- =============================================
-- Migración: Tabla de configuración global
-- =============================================

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Admin write settings" ON settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update settings" ON settings FOR UPDATE TO authenticated USING (true);

-- Valor inicial del porcentaje oficial
INSERT INTO settings (key, value) VALUES
  ('oficial_percentage', '0')
ON CONFLICT (key) DO NOTHING;

-- Habilitar realtime
ALTER PUBLICATION supabase_realtime ADD TABLE settings;
