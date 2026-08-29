/* ============================================================================
 *  PORTFOLIO DATA  —  Single source of truth
 *  Edit everything inside this object, then reload index.html.
 *
 *  IDENTITY: ASCJUL NUR HIDAYAH — Developer & Programmer
 *  Semua nilai di bawah adalah data ASLI yang diberikan. Bagian yang belum
 *  memiliki data ditandai dengan placeholder TODO: agar mudah ditemukan
 *  dan diganti nanti (tidak ada informasi yang dikarang).
 *
 *  Catatan: object ini di-assign ke window.PORTFOLIO agar bisa dipakai
 *  oleh main.js tanpa fetch (aman dibuka via file:// maupun http).
 * ==========================================================================*/
(function () {
  "use strict";

  // --- Asset lokal (letakkan file asli di folder public/ sesuai aturan) ---
  // Jika file belum tersedia, biarkan string kosong — main.js akan menampilkan
  // monogram pengganti alih-alih gambar eksternal yang dikarang.
  var ASSET = {
    avatar: "assets/img/hero-photo.svg", // foto profil desain (Desain tanpa judul.svg)
    projectImg: "",     // TODO: ADD /projects/*.webp (screenshot project lokal)
    certificateImg: ""  // TODO: ADD /certificates/*.webp (gambar sertifikat lokal)
  };

  window.PORTFOLIO = {
    brand: "PROJECT : ARONA",                  // branding footer (revert ke template awal)
    profile: {
      name: "ASCJUL NUR HIDAYAH",
      title: "DEVELOPER // PROGRAMMER",
      tagline: "Building practical software and exploring modern technologies.",
      heroBio: "Mahasiswa Sistem & Teknologi Informasi yang sedang membangun project nyata dan mengeksplorasi software development, web technology, backend, database, serta DevOps tooling.",
      location: "KENDARI, INDONESIA",
      available: true,
      avatar: ASSET.avatar,
      status: "ACTIVE",
      field: "SOFTWARE DEVELOPMENT",
      socials: {
        github: "https://github.com/zerone19",
        linkedin: "https://www.linkedin.com/in/ascjul-nurhidayah-409705288/",
        instagram: "https://www.instagram.com/asc_nasibungkus/",
        facebook: "https://www.facebook.com/profile.php?id=100073423365731",
        email: "ascnurhidayah19@gmail.com",
        twitter: ""
      }
    },

    about: {
      background: "Saya adalah mahasiswa Program Studi Sistem & Teknologi Informasi di Universitas Muhammadiyah Kendari dengan minat besar pada pengembangan perangkat lunak. Saat ini saya sedang menempuh pendidikan sekaligus membangun berbagai project nyata untuk memperdalam kemampuan di bidang software engineering.",
      journey: "Perjalanan saya dimulai dari SMKN 6 Kendari, mengenal web development, lalu bereksplorasi ke React & Next.js, dan kini memperluas kemampuan ke backend, database, Docker, Git, serta DevOps tooling dan Linux.",
      interests: ["Web Development", "Backend", "Database", "DevOps", "Software Engineering", "Open Source"],
      philosophy: "Saya tertarik pada bagaimana teknologi dapat digunakan untuk membangun solusi yang praktis, efisien, dan dapat dikembangkan dalam jangka panjang."
    },

    // Journey / timeline belajar (adaptasi dari konsep LOGS/STAGES template)
    journey: [
      { year: "2021 — 2023", title: "SMKN 6 KENDARI", desc: "Mulai membangun fondasi teknologi dan mengenal web development." },
      { year: "EARLY DEV", title: "SCRIPTING DASAR", desc: "Memulai dari scripting sederhana dan eksplorasi komputer." },
      { year: "WEB DEV", title: "HTML · CSS · JS", desc: "Mempelajari fondasi web development front-end." },
      { year: "MODERN WEB", title: "REACT · NEXT.JS", desc: "Mulai mengeksplorasi framework modern untuk aplikasi web." },
      { year: "CURRENT", title: "BACKEND · DB · DEVOPS", desc: "Memperluas ke backend, database, Docker, Git, DevOps tooling, dan Linux." }
    ],

    skills: [
      { category: "Languages", items: [
        { name: "Java" }, { name: "Python" }, { name: "JavaScript" },
        { name: "TypeScript" }, { name: "PHP" }, { name: "Dart" }
      ]},
      { category: "Frontend", items: [
        { name: "HTML" }, { name: "CSS" }, { name: "React" }, { name: "Next.js" }
      ]},
      { category: "Backend", items: [
        { name: "Laravel" }, { name: "REST API" }
      ]},
      { category: "Database", items: [
        { name: "MySQL" }, { name: "PostgreSQL" }
      ]},
      { category: "DevOps / Tools", items: [
        { name: "Git" }, { name: "Docker" }, { name: "Linux" }
      ]}
    ],

    // Minimal 3 card agar section tidak kosong. Data project belum diberikan,
    // gunakan placeholder jelas (tidak mengarang nama/URL/screenshot).
    projects: [
      {
        name: "TODO: ADD PROJECT 1",
        description: "PROJECT DATA PENDING — tambahkan nama, deskripsi, tech stack, dan status project asli di assets/js/data.js (bagian projects).",
        tags: ["PENDING"],
        status: "PENDING",
        image: ASSET.projectImg,
        github: "#",
        demo: ""
      },
      {
        name: "TODO: ADD PROJECT 2",
        description: "PROJECT DATA PENDING — tambahkan nama, deskripsi, tech stack, dan status project asli di assets/js/data.js (bagian projects).",
        tags: ["PENDING"],
        status: "PENDING",
        image: ASSET.projectImg,
        github: "#",
        demo: ""
      },
      {
        name: "TODO: ADD PROJECT 3",
        description: "PROJECT DATA PENDING — tambahkan nama, deskripsi, tech stack, dan status project asli di assets/js/data.js (bagian projects).",
        tags: ["PENDING"],
        status: "PENDING",
        image: ASSET.projectImg,
        github: "#",
        demo: ""
      }
    ],

    experience: [
      {
        role: "MAGANG",
        org: "Badan Pusat Statistik",
        start: "2023",
        end: "2024",
        description: "Mengikuti program magang dan memperoleh pengalaman dalam lingkungan kerja profesional serta memahami proses kerja organisasi dan penggunaan teknologi dalam mendukung kebutuhan pekerjaan.",
        responsibilities: [],
        tech: []
      },
      {
        role: "ANGGOTA DIVISI DESAIN",
        org: "Unit Kegiatan Mahasiswa Pers — Universitas Muhammadiyah Kendari",
        start: "2025",
        end: "Sekarang",
        description: "Terlibat dalam kegiatan desain dan produksi kebutuhan visual organisasi.",
        responsibilities: [],
        tech: []
      },
      {
        role: "ANGGOTA",
        org: "HMPS Sistem dan Teknologi Informasi",
        start: "2025",
        end: "Sekarang",
        description: "Berpartisipasi dalam kegiatan organisasi mahasiswa di lingkungan Program Studi Sistem dan Teknologi Informasi.",
        responsibilities: [],
        tech: []
      },
      {
        role: "ANGGOTA",
        org: "KSPM — Universitas Muhammadiyah Kendari",
        start: "2026",
        end: "Sekarang",
        description: "Berpartisipasi dalam kegiatan organisasi dan pengembangan aktivitas komunitas mahasiswa.",
        responsibilities: [],
        tech: []
      },
      {
        role: "ANGGOTA BIDANG III",
        org: "HIPMI PT — Universitas Muhammadiyah Kendari",
        start: "2026",
        end: "Sekarang",
        description: "Terlibat dalam kegiatan dan program kerja organisasi pada Bidang III.",
        responsibilities: [],
        tech: []
      },
      {
        role: "EDITOR",
        org: "Career Development Center — Universitas Muhammadiyah Kendari",
        start: "2026",
        end: "Sekarang",
        description: "Terlibat dalam proses editing dan pengembangan materi yang berkaitan dengan kebutuhan Career Development Center.",
        responsibilities: [],
        tech: []
      }
    ],

    education: [
      {
        institution: "Universitas Muhammadiyah Kendari",
        program: "S1 SISTEM & TEKNOLOGI INFORMASI",
        period: "2024 — Sekarang",
        status: "CURRENT",
        gpa: "3.58",
        description: "Menempuh pendidikan di bidang Sistem dan Teknologi Informasi dengan fokus pengembangan pemahaman teknologi, sistem informasi, software development, dan penerapan teknologi dalam penyelesaian masalah."
      },
      {
        institution: "SMKN 6 Kendari",
        program: "SMK",
        period: "2021 — 2023",
        status: "",
        gpa: "",
        description: "Foundation / early development stage — membangun fondasi teknologi dan mengenal web development."
      }
    ],

    // Belum ada data sertifikat — array kosong + komponen siap pakai di main.js.
    certificates: [],

    // Belum ada data achievement — section otomatis disembunyikan jika kosong.
    achievements: [],

    contact: {
      email: "ascnurhidayah19@gmail.com",
      github: "https://github.com/zerone19",
      linkedin: "https://www.linkedin.com/in/ascjul-nurhidayah-409705288/",
      instagram: "https://www.instagram.com/asc_nasibungkus/",
      facebook: "https://www.facebook.com/profile.php?id=100073423365731",
      note: "Open for connection. Reach me through any channel below — let's build something."
    },

    _assets: ASSET
  };
})();
