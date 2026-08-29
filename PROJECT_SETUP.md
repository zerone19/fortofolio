# Portfolio Project - Complete Setup Guide

## ASCJUL NUR HIDAYAH Portfolio + Admin Dashboard

---

## Project Overview

Complete portfolio system with:
1. **Public Portfolio** - Static frontend showcasing projects, skills, experience
2. **Admin Dashboard** - Content management system for projects & certificates
3. **Supabase Backend** - Database, authentication, and file storage

---

## Project Structure

```
C:\project saya\biodata\
├── portfolio/                  # Public portfolio website
│   ├── index.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   │   ├── data.js        # Static data (to be migrated)
│   │   │   └── main.js        # Render engine
│   │   └── img/
│   ├── package.json
│   └── README.md
│
├── admin/                      # Admin dashboard (NEW)
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                    # Config (add your Supabase keys)
│   ├── package.json
│   └── README.md
│
├── supabase/                   # Database setup (NEW)
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── 002_rls_policies.sql
│   ├── seed.sql
│   ├── README.md
│   └── QUICKREF.md
│
├── mvp.md                      # Portfolio MVP requirements
├── prd.md                      # Portfolio PRD
├── MVP__ADMIN.md               # Admin MVP requirements
└── PRD — Portfolio Admin Dashboard.md
```

---

## Setup Instructions

### Phase 1: Supabase Setup ✅ COMPLETE

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Save database password

2. **Run Migrations**
   - Open SQL Editor in Supabase dashboard
   - Run `supabase/migrations/001_initial_schema.sql`
   - Run `supabase/migrations/002_rls_policies.sql`
   - (Optional) Run `supabase/seed.sql` for test data

3. **Create Storage Bucket**
   - Name: `portfolio-assets`
   - Public: Yes
   - Create folders: `projects/`, `certificates/`

4. **Set Storage Policies** (via Supabase dashboard)
   - Public: SELECT
   - Authenticated: INSERT, UPDATE, DELETE

5. **Create Admin User**
   - Go to Authentication → Users
   - Add user: `ascjul.nurhidayah@gmail.com`
   - Set strong password
   - Auto confirm: Yes

6. **Get API Credentials**
   - Go to Settings → API
   - Copy: Project URL + Anon Key

📄 **Detailed instructions:** `supabase/README.md`

---

### Phase 2: Admin Dashboard ✅ COMPLETE

1. **Install Dependencies**
   ```bash
   cd admin
   npm install
   ```

2. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=https://xxxxx.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGc...
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
4. **Login**
   - Open http://localhost:5173
   - Login with admin credentials
   - Start managing content!

📄 **Detailed instructions:** `admin/README.md`

---

### Phase 3: Portfolio Integration ⚠️ TODO

**Current State:**
- Portfolio uses static data (`portfolio/assets/js/data.js`)
- Admin saves to Supabase database

**Migration Steps:**

1. **Update Portfolio to Fetch from Supabase**
   - Install Supabase client in portfolio
   - Update `main.js` to fetch from API instead of static data
   - Keep fallback to static data if API fails

2. **Migrate Existing Data**
   - Current data in `data.js` → Supabase database
   - Upload images → Supabase Storage
   - Update URLs in database

3. **Test End-to-End Flow**
   - Add project via admin
   - Verify appears on public portfolio
   - Test edit/delete

---

## Current Status

### ✅ Completed

**Supabase:**
- [x] Database schema created
- [x] RLS policies defined
- [x] Storage structure documented
- [x] Migration files ready
- [x] Setup documentation complete

**Admin Dashboard:**
- [x] Project structure scaffolded
- [x] Authentication (Login/Logout)
- [x] Protected routes
- [x] Dashboard page with stats
- [x] Projects CRUD (List, Create, Edit, Delete)
- [x] Certificates CRUD (List, Create, Edit, Delete)
- [x] File upload (images)
- [x] Responsive design
- [x] Delete confirmations
- [x] Featured project toggle
- [x] Documentation complete

**Portfolio:**
- [x] Static version complete
- [x] Design system implemented
- [x] 9 sections (Hero, About, Journey, Skills, Projects, Experience, Education, Certificates, Contact)
- [x] Responsive design
- [x] Data structure defined

### ⚠️ Pending

**Supabase:**
- [ ] Create actual Supabase project
- [ ] Run migrations
- [ ] Create storage bucket
- [ ] Set up admin user
- [ ] Configure `.env` with real credentials

**Portfolio Integration:**
- [ ] Install Supabase client in portfolio
- [ ] Update `main.js` to fetch from API
- [ ] Migrate static data to database
- [ ] Upload existing images to storage
- [ ] Test integration

**Deployment:**
- [ ] Deploy admin dashboard (Vercel/Netlify)
- [ ] Deploy portfolio (Vercel/Netlify)
- [ ] Configure production environment variables

---

## Quick Start Guide

### For Development (Right Now)

1. **Setup Supabase** (5-10 minutes)
   ```bash
   # Follow: supabase/README.md
   # Create project → Run migrations → Get credentials
   ```

2. **Configure Admin** (2 minutes)
   ```bash
   cd admin
   # Edit .env with Supabase credentials
   npm run dev
   ```

3. **Login & Test** (2 minutes)
   ```
   # Open http://localhost:5173
   # Login with admin credentials
   # Add a test project
   ```

4. **Migrate Portfolio** (30 minutes)
   ```bash
   cd portfolio
   # Update main.js to fetch from Supabase
   # Test integration
   ```

---

## Architecture Diagram

```
┌─────────────────────────┐
│   PUBLIC PORTFOLIO      │  ← Users browse projects
│   (Static/Dynamic)      │
└───────────┬─────────────┘
            │ Read (SELECT)
            ▼
┌─────────────────────────┐
│       SUPABASE          │
│   - PostgreSQL          │  ← Central data store
│   - Storage             │
│   - Auth                │
│   - RLS                 │
└───────────▲─────────────┘
            │ CRUD (authenticated)
            │
┌───────────┴─────────────┐
│   ADMIN DASHBOARD       │  ← You manage content
│   (React + Vite)        │
└─────────────────────────┘
```

---

## Features Implemented

### Admin Dashboard

✅ **Authentication**
- Login with email/password
- Session persistence
- Protected routes
- Auto-redirect

✅ **Projects Management**
- List all projects with thumbnails
- Add new project with form validation
- Edit existing project
- Delete with confirmation
- Upload project thumbnails
- Tag tech stack
- Set project status (Completed, In Progress, Planned, Archived)
- Toggle featured status
- Sort order control

✅ **Certificates Management**
- List all certificates
- Add new certificate
- Edit existing certificate
- Delete with confirmation
- Upload certificate images/PDFs
- Credential ID & verification URL
- Issue date tracking

✅ **UI/UX**
- Responsive sidebar navigation
- Mobile hamburger menu
- Stats dashboard
- Recent projects preview
- Loading states
- Error handling
- Confirmation modals

---

## Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| **Backend** | Supabase (PostgreSQL, Auth, Storage) |
| **Admin Frontend** | React 18 + Vite |
| **Admin Routing** | React Router v6 |
| **Admin Styling** | Tailwind CSS |
| **Admin Forms** | React Hook Form + Zod |
| **Portfolio Frontend** | HTML + Vanilla JS |
| **Portfolio Styling** | Tailwind CSS |
| **Deployment** | Vercel / Netlify (static) |

---

## Security Features

✅ **Row Level Security (RLS)**
- Public: Read-only access
- Authenticated: Full CRUD access
- Database-level enforcement

✅ **Authentication**
- Supabase Auth
- Protected routes
- Session management
- Auto-logout on session expiry

✅ **Storage Policies**
- Public read for portfolio
- Authenticated write for admin
- File type validation
- Size limits

✅ **Best Practices**
- No service_role key in frontend
- Environment variables for secrets
- HTTPS only in production
- Input validation

---

## Next Steps

### Immediate (Today)

1. **Create Supabase Project**
   - Sign up / login to Supabase
   - Create new project
   - Note down credentials

2. **Run Migrations**
   - Execute SQL in Supabase dashboard
   - Verify tables created
   - Check RLS enabled

3. **Configure Admin**
   - Add credentials to `.env`
   - Test login
   - Add sample project

### Short Term (This Week)

4. **Migrate Portfolio**
   - Add Supabase client
   - Update data fetching
   - Test integration

5. **Deploy**
   - Deploy admin to Vercel
   - Deploy portfolio to Vercel
   - Configure production env vars

### Long Term (Future Phases)

6. **Phase 2 Features**
   - Experience CRUD
   - Education CRUD
   - Skills CRUD
   - Achievements CRUD

7. **Phase 3 Features**
   - Blog/Articles
   - Draft/publish system
   - Content preview
   - Activity log

---

## Documentation Files

- **`supabase/README.md`** - Complete Supabase setup guide
- **`supabase/QUICKREF.md`** - Quick reference for API usage
- **`admin/README.md`** - Admin dashboard setup & usage
- **`portfolio/README.md`** - Portfolio setup (existing)
- **This file** - Complete project overview

---

## Support & Troubleshooting

### Common Issues

**"Cannot find Supabase credentials"**
→ Check `.env` file in admin directory

**"RLS policy violation"**
→ Run `002_rls_policies.sql` migration

**"Upload failed"**
→ Check storage bucket exists and policies are set

**"Login failed"**
→ Verify user exists in Supabase Auth

### Getting Help

1. Check relevant README.md
2. Review browser console errors
3. Check Supabase dashboard logs
4. Verify environment variables

---

## Project Timeline

**Phase 1:** Supabase Setup ✅ **COMPLETE**
- Database schema
- RLS policies
- Storage structure
- Documentation

**Phase 2:** Admin Dashboard ✅ **COMPLETE**
- Authentication
- Projects CRUD
- Certificates CRUD
- File upload
- UI/UX

**Phase 3:** Portfolio Integration ⚠️ **PENDING**
- API integration
- Data migration
- Testing
- Deployment

---

🐾 **Admin Dashboard is ready to use! Next step: Create Supabase project and configure credentials.**
