# Personal Developer Portfolio

Portfolio website pribadi, frontend-only static, dibangun sesuai **PRD.md** & **mvp.md**.
Visual menggunakan design system **"Kinetic Blueprint Light"** dari template Stitch
(semua asset masih placeholder — ganti dengan data & gambar asli Anda).

## Struktur
```
portfolio/
├── index.html              # Halaman utama (skeleton + SEO + nav)
├── assets/
│   ├── css/
│   │   ├── input.css       # SOURCE stylesheet (Tailwind directives + motif)
│   │   └── site.css        # HASIL BUILD (jangan edit manual; di-generate npm run build)
│   └── js/
│       ├── data.js         # ← EDIT DI SINI: semua konten portfolio
│       └── main.js         # Render sections dari data.js (data & UI terpisah, PRD §8)
├── tailwind.config.js      # Token warna/font/spacing (mirror dari template Stitch)
├── package.json            # npm run dev / build / watch / preview
└── README.md
```

## Cara menjalankan
Tanpa build (langsung buka):
- Buka `index.html` di browser, **atau**
- `python -m http.server 3000` lalu buka http://localhost:3000

Dengan npm (PRD §11):
```
npm install        # install Tailwind (devDependency) — sekali saja
npm run dev        # serve di :3000 (butuh build dulu agar style lengkap)
npm run build      # generate assets/css/site.css dari input.css  ← wajib sebelum deploy
npm run watch      # rebuild otomatis saat mengubah class CSS
npm run preview    # sama dengan dev
```

> Catatan: `site.css` adalah hasil kompilasi. Setelah mengubah **class Tailwind**
> (mis. di index.html / main.js), jalankan `npm run build`. Mengubah **konten**
> di `data.js` TIDAK butuh rebuild (style sudah ada di site.css).

## Yang harus diganti (placeholder)
1. **`assets/js/data.js`** — isi `profile`, `about`, `skills`, `projects` (min 3),
   `experience`, `education`, `certificates`, `achievements`, `contact`.
   Teks dalam `[ kurung siku ]` adalah penanda untuk diisi.
2. **Gambar** — saat ini menunjuk ke URL eksternal asset template (sesuai instruksi
   "pakai asset template untuk sementara"). Bila ingin lokal: download ke
   `assets/img/`, lalu ubah path di `data.js` (`avatar`, `image`, dll) ke
   `./assets/img/nama.webp`.
3. **Brand** — ganti `brand` di `data.js` (monogram navbar/footer).
4. **SEO** — ganti `<title>`, `meta description`, `og:*`, `twitter:*` di `index.html`.
5. **Domain** — ganti `og:url` dan link social di `data.js`.

## Kepatuhan PRD / MVP
- ✅ 9 section: Home(Hero), About, Skills, Projects, Experience, Education,
  Certificates, Achievements, Contact + Footer.
- ✅ Responsive (desktop / tablet / mobile + hamburger nav).
- ✅ SEO metadata, favicon, semantic heading.
- ✅ Data dipisahkan dari UI (`data.js` → `main.js`).
- ✅ Tema: Light (sesuai aturan MVP §4 — desain Stitch = rujukan utama).
- ✅ Tanpa backend / database / auth (static).
- ✅ Production build nyata via Tailwind CLI (PRD §9/§11) — tidak lagi bergantung
  Tailwind Play CDN saat runtime, sehingga lebih ringan & Lighthouse-friendly.

## Deployment
Folder ini bisa di-deploy langsung ke Vercel / Netlify / Cloudflare Pages /
GitHub Pages (static). Jalankan `npm run build` dulu, lalu deploy isi folder
(termasuk `assets/css/site.css`). Tidak butuh Docker untuk MVP (PRD menyebut
Docker hanya sebagai opsi deployment).
