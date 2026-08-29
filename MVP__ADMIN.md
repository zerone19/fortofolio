# MVP

## Portfolio Admin Dashboard — ASCJUL NUR HIDAYAH

**Version:** 1.0
**Status:** MVP

---

# 1. MVP Objective

Membangun admin dashboard sederhana yang memungkinkan ASCJUL NUR HIDAYAH mengelola:

1. Project.
2. Certificate.

Tanpa perlu mengubah source code portfolio public setiap kali ada data baru.

---

# 2. MVP Scope

## P0 — Authentication

### Login

Admin dapat login menggunakan:

* Email.
* Password.

Flow:

```text
/admin
   ↓
Login
   ↓
Supabase Auth
   ↓
Dashboard
```

### Logout

Admin dapat logout.

### Protected Route

Route berikut hanya dapat diakses setelah login:

```text
/admin/dashboard
/admin/projects
/admin/certificates
```

---

# 3. P0 — Dashboard

Dashboard menampilkan:

```text
Portfolio Admin

Projects       Certificates
   12               8
```

Quick actions:

```text
+ Add Project
+ Add Certificate
```

Tidak perlu analytics kompleks.

---

# 4. P0 — Project Management

## Project List

Tampilkan:

| Project | Status | Featured | Updated | Action |
| ------- | ------ | -------- | ------- | ------ |

Action:

```text
Edit
Delete
```

---

# 5. P0 — Add Project

Form:

```text
Project Name *
Description *
Thumbnail *
Tech Stack *

GitHub URL
Live Demo URL
Status
Featured
Project Date
```

Required:

* Project Name.
* Description.
* Thumbnail.
* Tech Stack.

---

# 6. P0 — Edit Project

Admin dapat mengubah data project yang sudah ada.

Form edit menggunakan form yang sama dengan create.

---

# 7. P0 — Delete Project

Saat delete:

```text
Are you sure?

[Cancel]
[Delete]
```

Project tidak boleh langsung dihapus tanpa confirmation.

---

# 8. P0 — Featured Project

Admin dapat mengaktifkan:

```text
Featured: ON/OFF
```

Public portfolio menggunakan status tersebut untuk menentukan project utama.

---

# 9. P0 — Certificate Management

Certificate list:

```text
Certificate
Issuer
Issue Date
Credential
Action
```

Action:

```text
Edit
Delete
```

---

# 10. P0 — Add Certificate

Form:

```text
Certificate Name *
Issuer *
Issue Date *
Certificate Image *

Credential ID
Verification URL
Description
```

Required:

* Name.
* Issuer.
* Issue date.
* Image/file.

---

# 11. P0 — Edit Certificate

Admin dapat mengubah data sertifikat.

Image dapat diganti.

---

# 12. P0 — Delete Certificate

Gunakan confirmation dialog.

```text
Delete certificate?

[Cancel]
[Delete]
```

---

# 13. P0 — Supabase Storage

Bucket:

```text
portfolio-assets
```

Folder:

```text
projects/
certificates/
```

Admin dapat upload:

```text
JPG
JPEG
PNG
WEBP
```

PDF dapat menjadi optional jika diperlukan.

---

# 14. P0 — Database

### projects

```text
id
title
slug
description
thumbnail_url
tech_stack
github_url
demo_url
status
featured
project_date
sort_order
created_at
updated_at
```

### certificates

```text
id
title
issuer
issue_date
credential_id
verification_url
description
image_url
sort_order
created_at
updated_at
```

---

# 15. P0 — Security

Gunakan:

```text
Supabase Auth
+
Row Level Security
+
Storage Policies
```

Public:

```text
READ
```

Admin:

```text
READ
CREATE
UPDATE
DELETE
```

Tidak boleh menaruh:

```text
SUPABASE_SERVICE_ROLE_KEY
```

di frontend.

---

# 16. P0 — Public Portfolio Integration

Portfolio public harus mengambil data:

```text
projects
certificates
```

dari Supabase.

Flow:

```text
Admin
  │
  ▼
Supabase
  │
  ▼
Public Portfolio
```

Ketika admin menambahkan project baru:

```text
Add Project
     ↓
Save
     ↓
Supabase
     ↓
Public Portfolio
     ↓
Project muncul
```

Tidak perlu rebuild manual hanya untuk menambahkan data.

---

# 17. MVP UI

Navigation:

```text
┌─────────────────────┐
│ ASCJUL ADMIN        │
├─────────────────────┤
│ Dashboard           │
│ Projects            │
│ Certificates        │
│                     │
│ Settings            │
│ Logout              │
└─────────────────────┘
```

Dashboard:

```text
┌────────────────────────────────────┐
│ Dashboard                          │
│                                    │
│ ┌────────────┐ ┌────────────┐      │
│ │ PROJECTS   │ │ CERTIFICATE│      │
│ │    12      │ │     8      │      │
│ └────────────┘ └────────────┘      │
│                                    │
│ [+ Add Project] [+ Certificate]    │
└────────────────────────────────────┘
```

---

# 18. MVP Data Flow

## Project

```text
Admin
 ↓
Create Project
 ↓
Upload Thumbnail
 ↓
Storage
 ↓
Database
 ↓
Portfolio
```

## Certificate

```text
Admin
 ↓
Create Certificate
 ↓
Upload Certificate
 ↓
Storage
 ↓
Database
 ↓
Portfolio
```

---

# 19. MVP Project Structure

```text
portfolio/
│
├── portfolio/
│   └── public website
│
├── admin/
│   └── admin dashboard
│
├── supabase/
│   ├── migrations/
│   └── seed/
│
├── docker/
│
└── docker-compose.yml
```

Jika portfolio dan admin menggunakan framework yang sama, keduanya tetap harus dipisahkan secara logical:

```text
/public
/admin
```

---

# 20. MVP Out of Scope

Jangan implementasikan dulu:

* Blog.
* Experience CRUD.
* Education CRUD.
* Skills CRUD.
* Achievement CRUD.
* Multi-user.
* Role management.
* Analytics.
* Notifications.
* Activity log.
* Version history.
* Draft system.
* AI content generation.
* Contact management.

---

# 21. MVP Completion Checklist

* [ ] Supabase project dibuat.
* [ ] Database schema dibuat.
* [ ] RLS aktif.
* [ ] Storage bucket dibuat.
* [ ] Storage policies dibuat.
* [ ] Supabase Auth aktif.
* [ ] Login selesai.
* [ ] Logout selesai.
* [ ] Protected routes selesai.
* [ ] Dashboard selesai.
* [ ] Project CRUD selesai.
* [ ] Certificate CRUD selesai.
* [ ] Project image upload selesai.
* [ ] Certificate upload selesai.
* [ ] Delete confirmation selesai.
* [ ] Public portfolio membaca project dari Supabase.
* [ ] Public portfolio membaca certificate dari Supabase.
* [ ] Error handling selesai.
* [ ] Production build berhasil.
* [ ] Docker berhasil dijalankan.

---

# 22. MVP Definition

MVP dianggap berhasil jika ASCJUL dapat melakukan:

```text
LOGIN
  ↓
DASHBOARD
  ↓
ADD PROJECT
  ↓
UPLOAD IMAGE
  ↓
SAVE
  ↓
PROJECT MUNCUL DI PORTFOLIO
```

dan:

```text
LOGIN
  ↓
DASHBOARD
  ↓
ADD CERTIFICATE
  ↓
UPLOAD CERTIFICATE
  ↓
SAVE
  ↓
CERTIFICATE MUNCUL DI PORTFOLIO
```

Dengan demikian, portfolio tidak lagi bergantung pada perubahan source code untuk setiap penambahan project atau sertifikat.

**MVP principle:**

> Manage content from Admin, present content through Portfolio.
