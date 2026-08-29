# Supabase Setup - Quick Reference

## Database Schema Summary

### Tables Created

#### `projects`
- Primary table for portfolio projects
- RLS enabled
- Auto-generates slug from title
- Auto-updates timestamp on changes

#### `certificates`
- Primary table for certificates and credentials
- RLS enabled
- Auto-updates timestamp on changes

---

## Migration Files

1. **`001_initial_schema.sql`**
   - Creates `projects` and `certificates` tables
   - Adds indexes for performance
   - Creates triggers for slug generation and timestamp updates

2. **`002_rls_policies.sql`**
   - Enables Row Level Security
   - Public: SELECT only (read-only for portfolio)
   - Authenticated: Full CRUD access (admin)

3. **`seed.sql`** (optional)
   - Sample data for testing
   - Placeholder projects and certificates

---

## Storage Structure

```
portfolio-assets/
├── projects/
│   ├── project-slug-1/
│   │   ├── thumbnail.webp
│   │   └── screenshot-1.jpg
│   └── project-slug-2/
│       └── thumbnail.jpg
└── certificates/
    ├── certificate-1.pdf
    ├── certificate-1-preview.jpg
    └── certificate-2.jpg
```

---

## API Endpoints (via Supabase Client)

### Projects

```javascript
// Get all projects
const { data } = await supabase.from('projects').select('*')

// Get featured projects
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('featured', true)

// Insert project (admin only)
const { data } = await supabase
  .from('projects')
  .insert({
    title: 'My Project',
    description: 'Description',
    thumbnail_url: 'url',
    tech_stack: ['React', 'Node.js']
  })

// Update project (admin only)
const { data } = await supabase
  .from('projects')
  .update({ featured: true })
  .eq('id', projectId)

// Delete project (admin only)
const { data } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId)
```

### Certificates

```javascript
// Get all certificates
const { data } = await supabase.from('certificates').select('*')

// Insert certificate (admin only)
const { data } = await supabase
  .from('certificates')
  .insert({
    title: 'Certificate Title',
    issuer: 'Issuer Name',
    issue_date: '2026-08-22',
    image_url: 'url'
  })
```

### Storage

```javascript
// Upload file
const { data, error } = await supabase.storage
  .from('portfolio-assets')
  .upload('projects/my-project/thumbnail.jpg', file)

// Get public URL
const { data } = supabase.storage
  .from('portfolio-assets')
  .getPublicUrl('projects/my-project/thumbnail.jpg')

// Delete file
const { data, error } = await supabase.storage
  .from('portfolio-assets')
  .remove(['projects/my-project/thumbnail.jpg'])
```

---

## Environment Variables Template

### Admin Dashboard `.env`
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Public Portfolio `.env` (if needed)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Never use service_role key in frontend!**

---

## Security Notes

- **anon key:** Safe to expose in frontend, respects RLS
- **service_role key:** Backend only, bypasses RLS
- **RLS policies:** Enforce security at database level
- **Storage policies:** Control file access permissions

---

## Status: Phase 1 Complete ✅

- [x] Database schema created
- [x] Migrations written
- [x] RLS policies defined
- [x] Storage structure documented
- [x] Setup guide created

**Next: Phase 2 - Build Admin Dashboard**
