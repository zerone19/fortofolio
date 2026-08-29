-- ============================================================================
-- STORAGE POLICIES + BUCKET SETUP
-- Migration: 003_storage_policies (idempotent version)
-- Creates the public 'portfolio-assets' bucket and its RLS policies.
-- Safe to run multiple times.
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
DROP POLICY IF EXISTS "Public read portfolio-assets" ON storage.objects;
CREATE POLICY "Public read portfolio-assets"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'portfolio-assets');

-- Authenticated upload
DROP POLICY IF EXISTS "Authenticated upload portfolio-assets" ON storage.objects;
CREATE POLICY "Authenticated upload portfolio-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

-- Authenticated update
DROP POLICY IF EXISTS "Authenticated update portfolio-assets" ON storage.objects;
CREATE POLICY "Authenticated update portfolio-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-assets')
WITH CHECK (bucket_id = 'portfolio-assets');

-- Authenticated delete
DROP POLICY IF EXISTS "Authenticated delete portfolio-assets" ON storage.objects;
CREATE POLICY "Authenticated delete portfolio-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-assets');
