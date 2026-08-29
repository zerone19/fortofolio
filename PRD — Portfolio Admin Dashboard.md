# PRODUCT REQUIREMENTS DOCUMENT
## Portfolio Admin Dashboard — ASCJUL NUR HIDAYAH

**Version:** 1.0  
**Status:** Draft  
**Product:** Personal Portfolio Admin Dashboard  
**Owner:** ASCJUL NUR HIDAYAH  
**Architecture:** Web Application  
**Frontend:** Admin Dashboard  
**Backend:** Supabase  
**Database:** PostgreSQL  
**Authentication:** Supabase Auth  
**Storage:** Supabase Storage  

---

# 1. Product Overview

Portfolio Admin Dashboard adalah aplikasi internal yang digunakan oleh ASCJUL NUR HIDAYAH untuk mengelola konten pada personal portfolio.

Admin memungkinkan pengguna yang memiliki akses untuk:

- Menambahkan project.
- Mengedit project.
- Menghapus project.
- Mengatur project yang ditampilkan.
- Mengupload gambar project.
- Menambahkan sertifikat.
- Mengedit sertifikat.
- Menghapus sertifikat.
- Mengupload file/gambar sertifikat.

Data yang dikelola admin akan digunakan oleh **Public Portfolio**.

---

# 2. Product Architecture

Sistem terdiri dari dua aplikasi utama:

```text
                    ┌─────────────────────┐
                    │   PUBLIC PORTFOLIO  │
                    │                     │
                    │  Read-only content  │
                    └──────────┬──────────┘
                               │
                               │ Read
                               ▼
                    ┌─────────────────────┐
                    │      SUPABASE       │
                    │                     │
                    │ PostgreSQL          │
                    │ Storage             │
                    │ Auth                │
                    │ RLS                 │
                    └──────────┬──────────┘
                               ▲
                               │ CRUD
                               │
                    ┌──────────┴──────────┐
                    │    ADMIN DASHBOARD  │
                    │                     │
                    │ Authentication      │
                    │ Projects            │
                    │ Certificates        │
                    └─────────────────────┘
```

---

# 3. Goals

## Primary Goals

1. Mempermudah pengelolaan project portfolio.
2. Mempermudah pengelolaan sertifikat.
3. Menghilangkan kebutuhan mengubah source code ketika menambah data.
4. Menyediakan upload gambar/file melalui dashboard.
5. Menggunakan authentication untuk membatasi akses admin.
6. Menjaga public portfolio tetap sederhana.
7. Menyediakan fondasi untuk pengembangan CMS portfolio di masa depan.

---

# 4. Non-Goals

Versi awal tidak mencakup:

- Multi-user management.
- Role management kompleks.
- Public registration.
- Blog CMS.
- Comment system.
- Analytics dashboard.
- Contact management.
- Newsletter.
- E-commerce.
- Social media management.
- AI content generation.

Fitur tersebut dapat ditambahkan pada fase berikutnya.

---

# 5. Target User

### Admin

Pemilik portfolio:

**ASCJUL NUR HIDAYAH**

Admin memiliki akses untuk mengelola seluruh data portfolio yang tersedia dalam dashboard.

Tidak ada public user yang dapat masuk ke dashboard.

---

# 6. Authentication

Admin menggunakan:

**Supabase Authentication**

Metode MVP:

- Email.
- Password.

Flow:

```text
/admin
   │
   ▼
Login
   │
   ├── Invalid → Error
   │
   └── Valid
        │
        ▼
     Dashboard
```

Admin yang belum login tidak dapat mengakses halaman dashboard.

Jika session expired:

```text
Dashboard
   │
   ▼
Session expired
   │
   ▼
Login
```

---

# 7. Dashboard

Dashboard menjadi halaman utama setelah login.

Menampilkan summary:

```text
PROJECTS
12

CERTIFICATES
8

FEATURED PROJECTS
4
```

Angka tersebut harus berasal dari database dan bukan hardcoded.

Dashboard juga menyediakan quick actions:

```text
+ ADD PROJECT
+ ADD CERTIFICATE
```

---

# 8. Project Management

## Project List

Admin dapat melihat daftar project.

Setiap item menampilkan:

- Thumbnail.
- Project name.
- Status.
- Featured status.
- Technology.
- Updated date.
- Action.

Action:

```text
VIEW
EDIT
DELETE
```

---

# 9. Create Project

Form project:

### Required

- Project name.
- Description.
- Thumbnail.
- Technology stack.

### Optional

- Slug.
- GitHub URL.
- Live demo URL.
- Status.
- Featured.
- Project date.
- Sort order.

---

# 10. Project Fields

Database structure:

```text
projects

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

### Status

Gunakan:

```text
PLANNED
IN_PROGRESS
COMPLETED
ARCHIVED
```

---

# 11. Project Editing

Admin dapat mengubah seluruh data project.

Perubahan harus langsung tersimpan ke Supabase setelah validasi berhasil.

---

# 12. Project Deletion

Admin dapat menghapus project.

Karena deletion bersifat destructive, tampilkan confirmation dialog:

```text
Delete this project?

This action cannot be undone.

[Cancel] [Delete]
```

Jika project memiliki asset pada Storage, asset terkait harus ditangani agar tidak meninggalkan orphan files.

---

# 13. Featured Project

Admin dapat menentukan project sebagai:

**Featured**

Featured project digunakan oleh Public Portfolio untuk menampilkan project utama.

Contoh:

```text
featured = true
```

Portfolio public kemudian dapat mengambil project tersebut.

---

# 14. Certificate Management

Admin dapat melihat daftar sertifikat.

Setiap item:

- Certificate image.
- Certificate title.
- Issuer.
- Issue date.
- Credential ID.
- Verification status.
- Updated date.

Action:

```text
VIEW
EDIT
DELETE
```

---

# 15. Create Certificate

Form:

### Required

- Certificate title.
- Issuer.
- Issue date.
- Certificate image/file.

### Optional

- Credential ID.
- Verification URL.
- Description.
- Sort order.

---

# 16. Certificate Fields

```text
certificates

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

# 17. File Storage

Gunakan:

**Supabase Storage**

Bucket:

```text
portfolio-assets
```

Struktur:

```text
portfolio-assets/
├── projects/
│   ├── project-01/
│   ├── project-02/
│   └── ...
│
└── certificates/
    ├── certificate-01/
    ├── certificate-02/
    └── ...
```

Admin dapat upload asset melalui dashboard.

---

# 18. File Requirements

Supported:

- JPG.
- JPEG.
- PNG.
- WebP.

Opsional:

- PDF untuk certificate.

Ukuran file harus dibatasi.

UI harus menampilkan error jika:

- Format tidak didukung.
- File terlalu besar.
- Upload gagal.

---

# 19. Database

Gunakan PostgreSQL melalui Supabase.

Initial tables:

```text
profiles
projects
certificates
```

Untuk MVP, `profiles` dapat digunakan hanya untuk kebutuhan identitas/admin jika diperlukan.

---

# 20. Row Level Security

RLS wajib digunakan.

### Public

Public portfolio:

```text
SELECT
```

### Admin

Admin:

```text
SELECT
INSERT
UPDATE
DELETE
```

Public tidak boleh:

```text
INSERT
UPDATE
DELETE
```

---

# 21. Data Flow

## Create Project

```text
Admin
 ↓
Project Form
 ↓
Validation
 ↓
Upload Image
 ↓
Supabase Storage
 ↓
Get Public URL
 ↓
Insert PostgreSQL
 ↓
Success
```

## Public Portfolio

```text
Visitor
 ↓
Portfolio
 ↓
Supabase
 ↓
SELECT published content
 ↓
Render
```

---

# 22. UI/UX

Admin tidak harus mengikuti visual blueprint public portfolio secara penuh.

Admin harus lebih mengutamakan:

- Clarity.
- Usability.
- Speed.
- Simple navigation.
- Form readability.

Visual admin boleh mengambil beberapa elemen branding portfolio:

- Cyan.
- Black.
- Yellow.
- Technical typography.

Namun dashboard tidak boleh terlalu dekoratif.

---

# 23. Admin Navigation

```text
Dashboard
Projects
Certificates
Settings
Logout
```

Settings pada MVP hanya dapat menjadi placeholder atau digunakan untuk profile admin.

---

# 24. Responsive

Admin harus dapat digunakan pada:

- Desktop.
- Laptop.
- Tablet.

Mobile support diusahakan tetapi bukan prioritas utama MVP.

---

# 25. Security

Wajib:

- Supabase Auth.
- RLS.
- Validasi form.
- Validasi file.
- HTTPS pada production.
- Tidak menyimpan password sendiri.
- Tidak menyimpan service-role key di frontend.
- Tidak mengekspos credential sensitif.

---

# 26. Error Handling

Admin harus menangani:

- Login gagal.
- Session expired.
- Upload gagal.
- Database error.
- Invalid URL.
- Invalid file type.
- File terlalu besar.
- Required field kosong.
- Delete gagal.

Error harus ditampilkan menggunakan feedback yang jelas.

---

# 27. SEO

Admin dashboard tidak perlu di-index search engine.

Gunakan:

```text
noindex
```

untuk route admin jika diperlukan.

---

# 28. Future Roadmap

## Phase 2

Tambahkan:

- Experience management.
- Education management.
- Skills management.
- Achievements management.
- Profile management.

## Phase 3

Tambahkan:

- Blog management.
- Draft/publish system.
- Content preview.
- Image library.
- Activity log.

## Phase 4

Tambahkan:

- Multiple admin.
- Roles & permissions.
- Analytics.
- Revision history.

---

# 29. Definition of Done

PRD dianggap terealisasi apabila:

- Admin dapat login.
- Unauthorized user tidak dapat mengakses dashboard.
- Admin dapat melihat dashboard.
- Admin dapat CRUD project.
- Admin dapat CRUD certificate.
- Admin dapat upload project image.
- Admin dapat upload certificate image.
- Data tersimpan di Supabase.
- RLS aktif.
- Public portfolio dapat membaca data.
- File storage berjalan.
- Error handling tersedia.
- Production build berhasil.