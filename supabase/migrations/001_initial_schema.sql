-- ============================================================================
-- PORTFOLIO ADMIN DATABASE SCHEMA
-- Migration: 001_initial_schema
-- Description: Initial database schema for portfolio admin dashboard
-- Tables: projects, certificates
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROJECTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    description TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL,
    github_url TEXT,
    demo_url TEXT,
    status TEXT CHECK (status IN ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED')) DEFAULT 'COMPLETED',
    featured BOOLEAN DEFAULT false,
    project_date DATE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- Create index on featured for filtering
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- Create index on status
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Auto-generate slug from title if not provided
CREATE OR REPLACE FUNCTION generate_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
        NEW.slug := trim(both '-' from NEW.slug);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_slug
BEFORE INSERT OR UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION generate_slug_from_title();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- CERTIFICATES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE NOT NULL,
    credential_id TEXT,
    verification_url TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on issue_date for sorting
CREATE INDEX IF NOT EXISTS idx_certificates_issue_date ON certificates(issue_date DESC);

-- Auto-update updated_at timestamp for certificates
CREATE TRIGGER trigger_certificates_updated_at
BEFORE UPDATE ON certificates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE projects IS 'Portfolio projects managed through admin dashboard';
COMMENT ON TABLE certificates IS 'Certificates and credentials managed through admin dashboard';

COMMENT ON COLUMN projects.tech_stack IS 'Array of technology tags used in the project';
COMMENT ON COLUMN projects.featured IS 'Whether this project should be featured on the portfolio homepage';
COMMENT ON COLUMN projects.sort_order IS 'Manual sort order for displaying projects';
COMMENT ON COLUMN certificates.sort_order IS 'Manual sort order for displaying certificates';
