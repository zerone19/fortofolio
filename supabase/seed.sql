-- ============================================================================
-- SEED DATA
-- Description: Initial seed data for testing and development
-- Note: This is optional - can be used to populate initial data
-- ============================================================================

-- ============================================================================
-- SEED PROJECTS (Example data - replace with real data or remove)
-- ============================================================================

-- Example: Portfolio Website
INSERT INTO projects (
    title,
    slug,
    description,
    thumbnail_url,
    tech_stack,
    github_url,
    demo_url,
    status,
    featured,
    project_date,
    sort_order
) VALUES (
    'Personal Developer Portfolio',
    'personal-portfolio',
    'A modern, responsive portfolio website built with HTML, Tailwind CSS, and vanilla JavaScript. Features a clean design system with blueprint aesthetics, showcasing projects, skills, and professional experience.',
    'https://placehold.co/800x600/0e0e0e/2ac7fb?text=Portfolio',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    'https://github.com/ASCJUL/portfolio',
    'https://ascjul-portfolio.vercel.app',
    'COMPLETED',
    true,
    '2026-08-22',
    1
);

-- Placeholder projects (to be replaced with real data via admin)
INSERT INTO projects (
    title,
    slug,
    description,
    thumbnail_url,
    tech_stack,
    status,
    featured,
    sort_order
) VALUES 
(
    'Project Placeholder 1',
    'project-placeholder-1',
    'This is a placeholder project. Add your real project data through the admin dashboard.',
    'https://placehold.co/800x600/0e0e0e/ffde59?text=Project+1',
    ARRAY['Pending'],
    'PLANNED',
    false,
    2
),
(
    'Project Placeholder 2',
    'project-placeholder-2',
    'This is a placeholder project. Add your real project data through the admin dashboard.',
    'https://placehold.co/800x600/0e0e0e/ffde59?text=Project+2',
    ARRAY['Pending'],
    'PLANNED',
    false,
    3
);

-- ============================================================================
-- SEED CERTIFICATES (Optional - add real certificates via admin)
-- ============================================================================

-- Placeholder certificate
INSERT INTO certificates (
    title,
    issuer,
    issue_date,
    credential_id,
    verification_url,
    description,
    image_url,
    sort_order
) VALUES (
    'Certificate Placeholder',
    'Issuer Name',
    '2026-01-01',
    'CERT-PLACEHOLDER-001',
    'https://verify.example.com/placeholder',
    'This is a placeholder certificate. Add your real certificates through the admin dashboard.',
    'https://placehold.co/800x600/0e0e0e/2ac7fb?text=Certificate',
    1
);

-- ============================================================================
-- NOTES
-- ============================================================================
-- 1. Replace placeholder URLs with real Supabase Storage URLs after upload
-- 2. Update tech_stack arrays with actual technologies used
-- 3. Add real GitHub/demo URLs when projects are deployed
-- 4. Remove or replace placeholder data with production data
