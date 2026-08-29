# Supabase Setup Guide

## Portfolio Admin Dashboard - Supabase Configuration

---

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in / Sign up
3. Click **"New Project"**
4. Fill in:
   - **Project Name:** `portfolio-admin` (or any name)
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to your location
5. Wait for project to be provisioned (~2 minutes)

---

## 2. Run Database Migrations

### Option A: Through Supabase Dashboard (SQL Editor)

1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New Query"**
3. Copy content from `migrations/001_initial_schema.sql`
4. Paste and click **"Run"**
5. Repeat for `migrations/002_rls_policies.sql`
6. (Optional) Run `seed.sql` for test data

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push

# (Optional) Run seed
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/seed.sql
```

---

## 3. Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click **"Create new bucket"**
3. Bucket name: `portfolio-assets`
4. **Public bucket:** Yes (enable public access)
5. Click **"Create bucket"**

### Create Folders

Inside `portfolio-assets` bucket, create:
- `projects/`
- `certificates/`

---

## 4. Set Storage Policies

Go to **Storage > Policies** for `portfolio-assets`:

### Policy 1: Public Read Access

```
Policy name: Public can view assets
Allowed operation: SELECT
Target roles: public (anon, authenticated)
USING expression: true
```

### Policy 2: Authenticated Upload

```
Policy name: Authenticated users can upload
Allowed operation: INSERT
Target roles: authenticated
WITH CHECK expression: true
```

### Policy 3: Authenticated Update

```
Policy name: Authenticated users can update
Allowed operation: UPDATE
Target roles: authenticated
USING expression: true
WITH CHECK expression: true
```

### Policy 4: Authenticated Delete

```
Policy name: Authenticated users can delete
Allowed operation: DELETE
Target roles: authenticated
USING expression: true
```

---

## 5. Enable Authentication

1. Go to **Authentication > Providers**
2. Enable **Email** provider
3. Configure email templates (optional)
4. Disable **"Confirm email"** for faster testing (re-enable in production)

---

## 6. Create Admin User

### Option A: Through Dashboard

1. Go to **Authentication > Users**
2. Click **"Add user"**
3. Fill in:
   - **Email:** `ascjul.nurhidayah@gmail.com` (or your email)
   - **Password:** (set strong password)
   - **Auto Confirm User:** Yes
4. Click **"Create user"**

### Option B: Through SQL

```sql
-- Run in SQL Editor
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    'ascjul.nurhidayah@gmail.com',
    crypt('YOUR_PASSWORD', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
);
```

---

## 7. Get API Credentials

1. Go to **Settings > API**
2. Copy and save:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **Anon (public) key:** `eyJhbGc...` (safe to expose in frontend)
   - **Service role key:** `eyJhbGc...` (⚠️ NEVER expose in frontend)

---

## 8. Environment Variables

Create `.env` file in admin dashboard project:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ **Important:**
- Only use `anon` key in frontend
- Never commit `.env` to Git
- Add `.env` to `.gitignore`

---

## 9. Verify Setup

Run these queries in SQL Editor to verify:

```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';

-- Count seed data
SELECT 'projects' as table_name, COUNT(*) as count FROM projects
UNION ALL
SELECT 'certificates', COUNT(*) FROM certificates;
```

Expected output:
- 2 tables: `projects`, `certificates`
- RLS enabled: `true` for both tables
- 8 policies total (4 per table)
- Seed data counts (if you ran seed.sql)

---

## 10. Test Connection

Create a test file `test-connection.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Test query
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .limit(5)

if (error) {
  console.error('Error:', error)
} else {
  console.log('Success! Projects:', data)
}
```

---

## Next Steps

After Supabase is configured:
1. ✅ Database schema created
2. ✅ RLS policies active
3. ✅ Storage bucket ready
4. ✅ Admin user created
5. ✅ API credentials saved

**Ready to build Admin Dashboard!** 🚀

---

## Troubleshooting

### Error: "relation does not exist"
- Re-run migrations in correct order
- Check if tables were created: `\dt` in SQL Editor

### Error: "new row violates row-level security policy"
- Check if RLS policies are created
- Verify user is authenticated
- Run `002_rls_policies.sql` again

### Error: "storage object not found"
- Check bucket name is exactly `portfolio-assets`
- Verify storage policies are set
- Check file path includes folder: `projects/file.jpg`

### Can't upload files
- Verify bucket is public
- Check storage policies allow INSERT for authenticated users
- Check file size limits (default 50MB)

---

## Security Checklist

- [x] RLS enabled on all tables
- [x] Public can only SELECT (read-only)
- [x] Admin requires authentication for CUD operations
- [x] Storage bucket public for reads, protected for writes
- [x] Service role key NOT in frontend code
- [x] Email confirmation enabled (production)
- [x] Strong password for admin user
- [x] HTTPS only in production
