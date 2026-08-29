# Product Requirements Document (PRD)

## Personal Developer Portfolio

**Version:** 1.0
**Status:** Draft
**Product Type:** Personal Portfolio Website
**Target:** Developer / Programmer
**Architecture:** Static / Frontend-only
**Backend:** None
**Database:** None
**Authentication:** None
**Deployment:** Static hosting / Docker

---

## 1. Product Overview

Personal Developer Portfolio adalah website pribadi yang digunakan untuk memperkenalkan identitas, kemampuan, pengalaman, project, sertifikat, serta pencapaian sebagai developer.

Website dirancang sebagai portfolio modern, profesional, responsive, ringan, dan mudah dikembangkan.

Seluruh data portfolio disimpan di dalam repository sebagai static data sehingga tidak membutuhkan backend atau database.

---

## 2. Goals

### Primary Goals

1. Menampilkan identitas profesional developer.
2. Menampilkan kemampuan dan teknologi yang dikuasai.
3. Menampilkan project yang pernah dibuat.
4. Menampilkan sertifikat dan pencapaian.
5. Menyediakan informasi pengalaman dan pendidikan.
6. Menyediakan link GitHub dan platform profesional lainnya.
7. Membuat portfolio yang responsive pada desktop, tablet, dan mobile.
8. Memiliki performa yang baik dan struktur kode yang mudah dipelihara.

### Secondary Goals

* Menjadi personal branding.
* Menjadi showcase kemampuan programming.
* Menjadi landing page untuk recruiter/client.
* Menjadi pusat informasi seluruh project pribadi.

---

## 3. Non-Goals

Project ini **tidak** mencakup:

* Admin dashboard.
* CMS.
* User authentication.
* Database.
* Upload file melalui website.
* Backend API.
* Sistem komentar.
* Sistem login visitor.
* Sistem analytics kompleks.
* E-commerce.

Perubahan data dilakukan melalui source code dan Git repository.

---

## 4. Target Users

### Primary User

Recruiter atau perusahaan yang ingin mengetahui kemampuan developer.

### Secondary Users

* Client.
* Developer lain.
* Teman / komunitas programmer.
* Pengunjung umum.

---

## 5. User Experience

Pengunjung membuka portfolio dan langsung mendapatkan gambaran:

> Siapa saya → Apa yang saya kuasai → Apa yang saya buat → Apa pencapaian saya → Bagaimana menghubungi saya.

Navigasi harus sederhana dan tidak membuat pengunjung mencari informasi terlalu lama.

---

# 6. Website Structure

## Home

Berisi:

* Nama.
* Professional title.
* Short introduction.
* Profile image / avatar.
* CTA menuju Projects.
* CTA menuju Contact.
* Social links.

Contoh positioning:

> Developer & Programmer building practical software and exploring modern technologies.

---

## About

Berisi:

* Personal introduction.
* Background.
* Developer journey.
* Interests.
* Working philosophy.

---

## Skills

Menampilkan teknologi berdasarkan kategori.

### Programming

* Java
* Python
* JavaScript / TypeScript
* PHP
* Dart

### Web

* React
* Next.js
* Laravel
* HTML
* CSS

### Database

* MySQL
* PostgreSQL

### Tools

* Git
* Docker
* Linux
* VS Code
* IntelliJ IDEA

Daftar teknologi dapat disesuaikan dengan skill aktual.

---

## Projects

Project merupakan salah satu bagian utama portfolio.

Setiap project memiliki:

* Project name.
* Description.
* Screenshot / thumbnail.
* Technology stack.
* Status.
* GitHub repository.
* Live demo jika tersedia.
* Highlight / key features.

Project dapat memiliki kategori:

* Web
* Desktop
* Mobile
* Backend
* AI
* Open Source
* Other

---

## Experience

Menampilkan:

* Position.
* Organization.
* Start date.
* End date.
* Description.
* Responsibilities.
* Technologies.

Jika belum memiliki pengalaman profesional, section dapat digunakan untuk:

* Freelance.
* Personal project.
* Community project.
* Internship.
* Open source contribution.

---

## Education

Menampilkan:

* Institution.
* Program / major.
* Period.
* Description.

---

## Certificates

Menampilkan:

* Certificate name.
* Issuer.
* Date.
* Credential ID jika ada.
* Certificate image / preview.
* Verification URL jika tersedia.

---

## Achievements

Menampilkan:

* Achievement name.
* Organization.
* Date.
* Description.
* Image / proof jika tersedia.

---

## Contact

Menyediakan cara untuk menghubungi developer.

Minimal:

* Email.
* GitHub.
* LinkedIn.
* Discord / social media jika diperlukan.

Tidak menggunakan contact form pada MVP untuk menghindari backend.

CTA:

> Let's build something together.

---

# 7. Functional Requirements

## Navigation

* Navbar tersedia pada desktop.
* Mobile menggunakan mobile navigation.
* Navigasi menuju setiap section.
* Smooth scrolling.
* Active section indicator jika diperlukan.

## Theme

Minimal:

* Dark mode.

Opsional:

* Light mode.
* System theme detection.

## Responsive

Website harus mendukung:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

## Projects

Project data harus dapat dikelola melalui file static.

Contoh:

```text
src/data/projects.ts
```

Menambahkan project baru tidak membutuhkan perubahan pada component utama.

## Certificates

Certificate image disimpan dalam repository.

Contoh:

```text
public/
└── certificates/
    ├── certificate-01.webp
    ├── certificate-02.webp
    └── certificate-03.webp
```

## SEO

Website harus memiliki:

* Page title.
* Meta description.
* Open Graph metadata.
* Favicon.
* Semantic HTML.
* Proper heading hierarchy.

---

# 8. Technical Requirements

## Architecture

Frontend-only static architecture.

```text
Visitor
   │
   ▼
Portfolio Frontend
   │
   ├── Static Pages
   ├── Components
   ├── Static Data
   └── Assets
        │
        ▼
   Git Repository
        │
        ▼
     Deployment
```

## Data Architecture

Data dipisahkan dari UI.

```text
src/
├── data/
│   ├── profile.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── certificates.ts
│   └── achievements.ts
```

## Asset Architecture

```text
public/
├── images/
├── projects/
├── certificates/
├── achievements/
└── favicon/
```

---

# 9. Performance Requirements

Target:

* Fast initial load.
* Optimized images.
* Lazy loading untuk gambar non-critical.
* Minimal JavaScript.
* Tidak menggunakan dependency yang tidak diperlukan.
* Responsive image handling.

Target Lighthouse:

* Performance: ≥ 90
* Accessibility: ≥ 90
* Best Practices: ≥ 90
* SEO: ≥ 90

Target tersebut merupakan objective, bukan jaminan untuk setiap deployment.

---

# 10. Security Requirements

Karena tidak ada backend:

* Tidak menyimpan API key di frontend.
* Tidak menyimpan credential pribadi di repository.
* Tidak menggunakan secret pada client-side code.
* External links menggunakan HTTPS.
* Dependency harus diperbarui secara berkala.

---

# 11. Deployment

Project harus dapat dijalankan dengan:

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

Docker:

```bash
docker compose up -d
```

Deployment dapat diarahkan ke static hosting seperti:

* Vercel.
* Netlify.
* Cloudflare Pages.
* GitHub Pages jika framework mendukung kebutuhan tersebut.

---

# 12. Success Metrics

Portfolio dianggap berhasil apabila:

* Pengunjung memahami identitas developer dalam ≤ 10 detik.
* Project mudah ditemukan.
* Semua halaman responsive.
* Semua link utama berfungsi.
* Tidak ada broken image.
* Lighthouse score berada pada target.
* Portfolio dapat di-deploy tanpa backend.
* Developer dapat menambahkan project baru dengan mudah.

---

# 13. Future Roadmap

Fitur berikut tidak masuk MVP tetapi dapat ditambahkan:

### Phase 2

* Blog.
* Project filtering.
* Search.
* GitHub API integration.
* GitHub contribution graph.
* Download CV.

### Phase 3

* Headless CMS.
* Supabase backend.
* Admin dashboard.
* Analytics.
* Contact form backend.
* Dynamic content management.

---

# 14. Definition of Done

PRD dianggap terealisasi apabila:

* Semua section utama tersedia.
* Portfolio responsive.
* Project dapat ditampilkan dari static data.
* Certificate dapat ditampilkan.
* Social links berfungsi.
* SEO dasar tersedia.
* Docker dapat menjalankan project.
* Production build berhasil.
* Tidak ada error kritis pada browser console.
* Website dapat di-deploy.
