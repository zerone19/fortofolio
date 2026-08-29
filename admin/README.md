# Portfolio Admin Dashboard

Admin dashboard for managing ASCJUL NUR HIDAYAH's portfolio content.

## Features

- ✅ **Authentication** - Login/logout with Supabase Auth
- ✅ **Projects Management** - Full CRUD for portfolio projects
- ✅ **Certificates Management** - Full CRUD for certificates
- ✅ **File Upload** - Image upload to Supabase Storage
- ✅ **Protected Routes** - Secure admin-only access
- ✅ **Responsive Design** - Works on desktop, tablet, mobile

---

## Tech Stack

- **Frontend:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth + Database + Storage)
- **Forms:** React Hook Form + Zod validation

---

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Supabase Project** (see `../supabase/README.md` for setup)
3. **Supabase credentials** (URL + Anon Key)

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env` file in this directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these credentials from:
- Supabase Dashboard → Settings → API

### 3. Supabase Setup

Make sure you've completed the Supabase setup:
1. Run database migrations
2. Create storage bucket
3. Set storage policies
4. Create admin user

See `../supabase/README.md` for detailed instructions.

---

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Default Credentials

Use the admin user you created in Supabase:
- **Email:** `ascjul.nurhidayah@gmail.com` (or your configured email)
- **Password:** (the password you set)

---

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

Preview production build:

```bash
npm run preview
```

---

## Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Main layout with sidebar
│   │   └── ProtectedRoute.jsx   # Auth guard for routes
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── lib/
│   │   └── supabase.js          # Supabase client + helpers
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Dashboard.jsx        # Dashboard overview
│   │   ├── Projects.jsx         # Projects list
│   │   ├── ProjectForm.jsx      # Add/edit project
│   │   ├── Certificates.jsx     # Certificates list
│   │   └── CertificateForm.jsx  # Add/edit certificate
│   ├── App.jsx                  # Routes configuration
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Example env file
├── package.json
├── vite.config.js
└── README.md
```

---

## Routes

### Public
- `/login` - Login page

### Protected (requires authentication)
- `/dashboard` - Dashboard overview
- `/projects` - Projects list
- `/projects/new` - Add new project
- `/projects/edit/:id` - Edit project
- `/certificates` - Certificates list
- `/certificates/new` - Add new certificate
- `/certificates/edit/:id` - Edit certificate

---

## Usage Guide

### Adding a Project

1. Go to **Projects** → **Add Project**
2. Fill in required fields:
   - Title
   - Description
   - Thumbnail image
   - Tech stack (add multiple tags)
3. Optional fields:
   - Slug (auto-generated if empty)
   - GitHub URL
   - Demo URL
   - Status (Completed, In Progress, Planned, Archived)
   - Project date
   - Featured toggle
4. Click **Create Project**

### Adding a Certificate

1. Go to **Certificates** → **Add Certificate**
2. Fill in required fields:
   - Certificate title
   - Issuer
   - Issue date
   - Certificate image
3. Optional fields:
   - Credential ID
   - Verification URL
   - Description
4. Click **Create Certificate**

### Managing Content

- **Edit:** Click "Edit" button on any item
- **Delete:** Click "Delete" → Confirm deletion
- **Featured Projects:** Toggle featured status to showcase on homepage

---

## Deployment

### Option 1: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Important:** Add environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Security Notes

⚠️ **Important Security Rules:**

1. **NEVER** commit `.env` file to Git
2. **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` in frontend
3. **ONLY** use `SUPABASE_ANON_KEY` in frontend code
4. Row Level Security (RLS) policies protect your data
5. Authentication required for all write operations

---

## Troubleshooting

### "Supabase URL or Anon Key is missing"
- Check `.env` file exists
- Verify environment variables are set correctly
- Restart dev server after changing `.env`

### "Invalid login credentials"
- Verify user exists in Supabase Auth
- Check email is confirmed
- Ensure password is correct

### "Failed to upload image"
- Check storage bucket exists (`portfolio-assets`)
- Verify storage policies allow authenticated upload
- Check file size (max 5MB recommended)

### "new row violates row-level security policy"
- Verify user is authenticated
- Check RLS policies are set correctly
- Run `002_rls_policies.sql` migration

---

## Next Steps

After admin is working:

1. **Migrate Portfolio** - Update public portfolio to fetch from Supabase
2. **Add More Features** - Experience, Education, Skills management
3. **Analytics** - Track page views and engagement
4. **Blog** - Add blog/article management

---

## Support

For issues or questions:
1. Check Supabase setup: `../supabase/README.md`
2. Verify environment variables
3. Check browser console for errors
4. Review Supabase dashboard logs

---

## License

Private - ASCJUL NUR HIDAYAH Portfolio Admin
