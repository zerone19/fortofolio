-- ============================================================================
--  SETUP STORAGE UNTUK GAMBAR (projects & certificates)
--  Jalankan di: Supabase Dashboard → SQL Editor → Run
--  Project: qvezkwphfujebreqvrml.supabase.co
--
--  Tujuannya: buat bucket 'portfolio-assets' PUBLIC + RLS policy agar
--  gambar bisa di-upload dari Admin dan ditampilkan di Portfolio.
--  Semua perintah idempoten (aman dijalankan berulang kali).
-- ============================================================================

-- 1) Buat bucket public (abaikan kalau sudah ada)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-assets',
  'portfolio-assets',
  true,
  52428800,                                  -- batas 50 MB (video butuh lebih besar)
  ARRAY['image/png','image/jpeg','image/webp','image/gif','video/mp4','video/webm','video/ogg','application/pdf']
)
ON CONFLICT (id) DO UPDATE
  SET public = true,
      file_size_limit = 52428800,
      allowed_mime_types = ARRAY['image/png','image/jpeg','image/webp','image/gif','video/mp4','video/webm','video/ogg','application/pdf'];

-- 2) Hapus policy lama (jika ada) agar tidak duplikat
DROP POLICY IF EXISTS "Public read portfolio-assets"      ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete portfolio-assets" ON storage.objects;

-- 3) Public READ — wajib agar <img src> di portfolio bisa load tanpa login
CREATE POLICY "Public read portfolio-assets"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'portfolio-assets');

-- 4) Authenticated UPLOAD / UPDATE / DELETE (Admin login pakai anon key
--    Supabase; user yang login otomatis role 'authenticated')
CREATE POLICY "Authenticated upload portfolio-assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated update portfolio-assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-assets')
  WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated delete portfolio-assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-assets');

-- 5) Verifikasi
SELECT id, name, public FROM storage.buckets WHERE id = 'portfolio-assets';
