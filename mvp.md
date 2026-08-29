# MVP — Personal Developer Portfolio

## 1. MVP Objective

Membangun versi pertama portfolio pribadi yang sudah cukup profesional untuk dipublikasikan dan digunakan sebagai personal branding developer.

MVP harus fokus pada **konten, visual, responsiveness, dan performance**, bukan fitur kompleks.

---

# 2. MVP Scope

## P0 — Wajib

### 1. Hero Section

Menampilkan:

* Nama.
* Developer title.
* Short introduction.
* Profile image.
* CTA Projects.
* CTA Contact.
* GitHub / social link.

---

### 2. About Section

Menampilkan:

* Bio.
* Background.
* Developer journey.
* Personal interests.

---

### 3. Skills Section

Menampilkan teknologi yang dikuasai.

Minimal kategori:

```text
Languages
Frameworks
Database
Tools
```

Setiap skill memiliki:

* Nama.
* Icon.
* Optional proficiency/category.

---

### 4. Projects Section

Minimal **3 project**.

Setiap project:

```text
Project
├── Thumbnail
├── Name
├── Description
├── Tech Stack
├── GitHub
└── Live Demo
```

Jika project belum memiliki live demo, tombol dapat disembunyikan.

---

### 5. Experience Section

Minimal menampilkan pengalaman utama.

Jika belum ada pengalaman kerja:

```text
Personal Projects
Community
Freelance
Internship
```

dapat digunakan sebagai pengganti.

---

### 6. Education Section

Menampilkan pendidikan utama.

---

### 7. Certificates Section

Menampilkan sertifikat utama.

Minimal:

* Certificate title.
* Issuer.
* Date.
* Preview image.
* Verification link jika tersedia.

---

### 8. Achievements Section

Menampilkan pencapaian utama.

Contoh:

* Competition.
* Award.
* Recognition.
* Community achievement.

Section boleh disembunyikan apabila belum memiliki achievement.

---

### 9. Contact Section

Minimal:

```text
Email
GitHub
LinkedIn
Discord / Social
```

Tidak menggunakan backend contact form pada MVP.

---

### 10. Footer

Berisi:

* Nama.
* Copyright.
* Social links.
* GitHub.

---

# 3. MVP Navigation

Navbar:

```text
Home
About
Skills
Projects
Experience
Certificates
Contact
```

Pada mobile:

```text
☰ Menu
```

---

# 4. MVP Theme

Default:

**Dark futuristic developer portfolio**

Karakter visual:

* Minimal.
* Modern.
* Clean.
* Developer-oriented.
* Sedikit futuristic.
* Tidak terlalu ramai.
* Fokus pada content.

Jika desain Stitch yang sudah tersedia memiliki visual yang lebih spesifik, visual tersebut menjadi referensi utama.

---

# 5. MVP Data Structure

```text
src/
├── data/
│   ├── profile.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── certificates.ts
│   └── achievements.ts
│
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── ProjectCard
│   ├── SkillCard
│   ├── CertificateCard
│   └── SocialLinks
│
├── sections/
│   ├── Hero
│   ├── About
│   ├── Skills
│   ├── Projects
│   ├── Experience
│   ├── Education
│   ├── Certificates
│   ├── Achievements
│   └── Contact
│
└── assets/
```

---

# 6. MVP Asset Structure

```text
public/
├── profile/
│   └── profile.webp
│
├── projects/
│   ├── project-01.webp
│   ├── project-02.webp
│   └── project-03.webp
│
├── certificates/
│   ├── certificate-01.webp
│   └── certificate-02.webp
│
├── achievements/
│   └── achievement-01.webp
│
└── favicon/
    └── favicon.ico
```

---

# 7. MVP Responsive Requirements

### Desktop

* Full navbar.
* Multi-column project cards.
* Large hero.
* Timeline experience.

### Tablet

* Reduced spacing.
* 2-column project grid.

### Mobile

* Mobile navbar.
* 1-column layout.
* Touch-friendly buttons.
* Optimized images.
* No horizontal overflow.

---

# 8. MVP Docker

Minimal Docker setup.

```text
portfolio/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── src/
```

Development:

```bash
docker compose up
```

Production build:

```bash
npm run build
```

Docker digunakan sebagai environment/deployment option, bukan karena aplikasi membutuhkan backend.

---

# 9. MVP Priority

| Feature      | Priority |
| ------------ | -------- |
| Hero         | P0       |
| About        | P0       |
| Skills       | P0       |
| Projects     | P0       |
| Experience   | P0       |
| Education    | P0       |
| Certificates | P0       |
| Contact      | P0       |
| Footer       | P0       |
| Responsive   | P0       |
| SEO          | P0       |
| Dark Theme   | P0       |
| Achievements | P1       |
| Animations   | P1       |
| Light Theme  | P2       |
| Blog         | P2       |
| GitHub API   | P2       |
| CMS/Admin    | Future   |
| Supabase     | Future   |

---

# 10. MVP Completion Criteria

MVP selesai ketika:

* [ ] Hero selesai.
* [ ] About selesai.
* [ ] Skills selesai.
* [ ] Minimal 3 project ditampilkan.
* [ ] Experience selesai.
* [ ] Education selesai.
* [ ] Certificates selesai.
* [ ] Contact selesai.
* [ ] Navbar responsive.
* [ ] Mobile layout selesai.
* [ ] Semua gambar teroptimasi.
* [ ] Semua external links bekerja.
* [ ] SEO metadata tersedia.
* [ ] Favicon tersedia.
* [ ] Production build berhasil.
* [ ] Docker berhasil dijalankan.
* [ ] Tidak ada error kritis.
* [ ] Portfolio siap dipublikasikan.

---

# 11. MVP Definition

**MVP = Portfolio yang sudah layak dipamerkan kepada recruiter, client, developer lain, dan komunitas.**

Tidak perlu admin.

Tidak perlu database.

Tidak perlu authentication.

Tidak perlu API.

Cukup:

**Code → Content → Build → Deploy.**

---

# 12. Next Development Phase

Setelah MVP stabil:

```text
MVP
 │
 ├── Performance
 ├── SEO
 ├── Accessibility
 │
 ▼
Portfolio v1
 │
 ├── Blog
 ├── GitHub integration
 ├── CV download
 └── Project filtering
 │
 ▼
Portfolio v2
 │
 └── Optional CMS / Supabase
```
