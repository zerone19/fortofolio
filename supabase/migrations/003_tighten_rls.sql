-- ============================================================================
-- 003_tighten_rls.sql
-- PERBAIKAN KEAMANAN: batasi akses TULIS hanya untuk admin tertentu.
-- Sebelumnya: semua user 'authenticated' bisa INSERT/UPDATE/DELETE apa pun.
-- Sekarang: hanya email yang terdaftar di tabel admin_users yang boleh tulis.
--
-- CARA PAKAI:
--   1. Jalankan di Supabase Dashboard → SQL Editor.
--   2. Ganti email di bagian ADMIN_EMAILS dengan email akun admin kamu,
--      atau insert lewat: INSERT INTO admin_users (email) VALUES ('kamu@x.com');
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) Tabel admin_users (berisi email yang boleh menulis)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    email TEXT PRIMARY KEY,
    added_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin bisa melihat daftar admin; publik tidak bisa apa-apa
CREATE POLICY "Admins can view admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));

-- ---------------------------------------------------------------------------
-- 2) Helper: apakah user saat ini adalah admin?
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_portfolio_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT auth.jwt() ->> 'email' IN (SELECT email FROM admin_users)
$$;

-- ---------------------------------------------------------------------------
-- 3) Hapus policy tulis lama yang longgar
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated users can insert projects"     ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects"     ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects"     ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can update certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can delete certificates" ON certificates;

-- ---------------------------------------------------------------------------
-- 4) Policy baru: hanya admin yang boleh menulis
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin can insert projects"
ON projects FOR INSERT TO authenticated
WITH CHECK (is_portfolio_admin());

CREATE POLICY "Admin can update projects"
ON projects FOR UPDATE TO authenticated
USING (is_portfolio_admin())
WITH CHECK (is_portfolio_admin());

CREATE POLICY "Admin can delete projects"
ON projects FOR DELETE TO authenticated
USING (is_portfolio_admin());

CREATE POLICY "Admin can insert certificates"
ON certificates FOR INSERT TO authenticated
WITH CHECK (is_portfolio_admin());

CREATE POLICY "Admin can update certificates"
ON certificates FOR UPDATE TO authenticated
USING (is_portfolio_admin())
WITH CHECK (is_portfolio_admin());

CREATE POLICY "Admin can delete certificates"
ON certificates FOR DELETE TO authenticated
USING (is_portfolio_admin());

-- Public READ tetap seperti semula (tidak diubah).
-- Pastikan masih ada:
--   "Public can view published projects" ON projects FOR SELECT USING (true);
--   "Public can view certificates"       ON certificates FOR SELECT USING (true);
