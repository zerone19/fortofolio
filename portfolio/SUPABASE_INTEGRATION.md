# Supabase Integration for Portfolio

This directory contains the Supabase integration files for dynamic portfolio content.

## Files

- `config.js` - Supabase credentials (URL + Anon Key)
- `config.example.js` - Template for credentials
- `api.js` - Supabase client & API functions
- `main.js` - Updated render engine with Supabase integration
- `data.js` - Static data fallback

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                     PORTFOLIO                           │
│                                                         │
│  1. Check if Supabase configured in config.js          │
│  2. If YES → Fetch from Supabase API                    │
│  3. If NO or ERROR → Fallback to static data.js         │
│  4. Render UI with available data                       │
└─────────────────────────────────────────────────────────┘
```

---

## Setup Instructions

### 1. Configure Supabase Credentials

Edit `assets/js/config.js`:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://your-project-id.supabase.co',
  anonKey: 'eyJhbG…here',
}

export default SUPABASE_CONFIG
```

Get these credentials from:
- Supabase Dashboard → Settings → API

### 2. Test Locally

Run local server:

```bash
cd "C:\project saya\biodata\portfolio"
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Check browser console:
- ✅ `Supabase client initialized` - Connected successfully
- ✅ `Fetched X projects from Supabase` - Dynamic data loaded
- ⚠️ `Supabase not configured. Using static data fallback.` - Using static data

---

## Fallback Mechanism

The portfolio uses a **graceful degradation** strategy:

1. **Supabase Available:** Shows fresh data from database
2. **Supabase Unavailable/Offline:** Automatically falls back to `data.js`
3. **No Breaking Errors:** Site always loads, even if API fails

---

## Data Structure Mapping

### Projects Table → Portfolio Card

| Supabase Field | Portfolio Property | Description |
|----------------|-------------------|-------------|
| `title` | `name` | Project title |
| `description` | `description` | Project summary |
| `thumbnail_url` | `image` | Thumbnail image URL |
| `tech_stack` | `tags` | Array of technologies |
| `github_url` | `github` | Source code link |
| `demo_url` | `demo` | Live demo link |
| `status` | `status` | ACTIVE / COMPLETED / ARCHIVED |
| `featured` | `featured` | Boolean for homepage showcase |

### Certificates Table → Certificate Card

| Supabase Field | Portfolio Property | Description |
|----------------|-------------------|-------------|
| `title` | `name` | Certificate name |
| `issuer` | `issuer` | Issuing organization |
| `issue_date` | `date` | Formatted date (e.g. "Aug 2026") |
| `image_url` | `image` | Certificate image/badge |
| `credential_id` | `credentialId` | Credential ID |
| `verification_url` | `verifyUrl` | Verification link |

---

## Production Deployment

### Option 1: Vercel / Netlify

1. Upload portfolio files
2. Make sure `config.js` has your production Supabase credentials
3. Deploy!

### Security Note

⚠️ The `anonKey` is safe to expose in `config.js` because:
- Row Level Security (RLS) restricts public access to read-only (SELECT)
- Admin write operations require authentication
- Service role key is NEVER used in frontend

---

## Troubleshooting

### Console shows: "Supabase not configured"
- Check `assets/js/config.js` has valid `url` and `anonKey`
- Ensure no trailing commas or syntax errors

### Projects not showing up
- Verify projects exist in Supabase database
- Check RLS policy allows public SELECT
- Run migration `002_rls_policies.sql`

### Images not loading
- Check storage bucket `portfolio-assets` is public
- Verify image URLs are accessible in browser

---

## API Reference

### `fetchProjects()`
Fetches all projects ordered by `sort_order` and `created_at`.
Returns array of transformed projects or `null` (triggers fallback).

### `fetchCertificates()`
Fetches all certificates ordered by `sort_order` and `issue_date`.
Returns array of transformed certificates or `null` (triggers fallback).

### `isSupabaseAvailable()`
Returns `true` if Supabase is configured and ready.
