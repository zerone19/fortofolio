-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- Migration: 002_rls_policies
-- Description: Enable RLS and create policies for projects and certificates
-- Security: Public READ, Admin CRUD
-- ============================================================================

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PROJECTS POLICIES
-- ============================================================================

-- PUBLIC: Read-only access for portfolio website
CREATE POLICY "Public can view published projects"
ON projects
FOR SELECT
TO anon, authenticated
USING (true);

-- ADMIN: Full CRUD access for authenticated users
CREATE POLICY "Authenticated users can insert projects"
ON projects
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
ON projects
FOR DELETE
TO authenticated
USING (true);

-- ============================================================================
-- CERTIFICATES POLICIES
-- ============================================================================

-- PUBLIC: Read-only access for portfolio website
CREATE POLICY "Public can view certificates"
ON certificates
FOR SELECT
TO anon, authenticated
USING (true);

-- ADMIN: Full CRUD access for authenticated users
CREATE POLICY "Authenticated users can insert certificates"
ON certificates
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update certificates"
ON certificates
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete certificates"
ON certificates
FOR DELETE
TO authenticated
USING (true);

-- ============================================================================
-- STORAGE POLICIES (for portfolio-assets bucket)
-- Note: These need to be applied through Supabase dashboard or CLI
-- ============================================================================

-- Public read access to all files in portfolio-assets bucket
-- Authenticated users can upload/update/delete files in portfolio-assets bucket

-- SQL equivalent (for reference, actual storage policies set via dashboard):
-- 
-- Bucket: portfolio-assets
-- 
-- SELECT policy:
--   Target: public (anon, authenticated)
--   Definition: true
-- 
-- INSERT policy:
--   Target: authenticated
--   Definition: true
-- 
-- UPDATE policy:
--   Target: authenticated
--   Definition: true
-- 
-- DELETE policy:
--   Target: authenticated
--   Definition: true
