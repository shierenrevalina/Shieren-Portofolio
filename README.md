# Web Portofolio

Template website portofolio pribadi untuk menampilkan foto profil, tentang saya (about me), skill, portofolio proyek, kontak, dan tombol unduh CV. Dibangun dengan HTML, CSS, dan JavaScript murni tanpa framework, dengan dark/light mode dan tampilan responsif.

## Fitur

- Dark theme modern (default) dengan tombol ganti ke light mode, preferensi tersimpan di browser
- Hero dengan foto profil dan tombol unduh CV
- Section About Me dengan kartu statistik
- Section Skill dengan progress bar animasi
- Portfolio dengan filter kategori
- Section Kontak (email, telepon, LinkedIn, GitHub, Instagram)
- Navigasi antar-section yang mulus + animasi muncul saat scroll
- Desain responsif untuk desktop maupun mobile

## Struktur Proyek

```
portfolio-web/
├── index.html      # Struktur halaman
├── styles.css      # Gaya tampilan dan tema
├── script.js       # Interaksi: menu, filter, skill bar, tema, scroll
└── assets/         # Foto profil, thumbnail proyek, dan CV (PDF)
```

## Cara Menyesuaikan Isi

1. Buka `index.html`, ganti semua teks dalam tanda kurung siku seperti `[Nama Kamu]`, `[Judul Proyek 1]`, dll.
2. Ganti nama skill dan persentase di `<section id="skill">`.
3. Ganti email, telepon, dan link sosial media di `<section id="kontak">`.
4. Ganti file di folder `assets/` (lihat `assets/README.txt` untuk nama file yang dipakai).

## Menjalankan Secara Lokal

Buka `index.html` langsung di browser, atau gunakan server statis:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Deployment

Situs statis, bisa langsung di-deploy ke Vercel / GitHub Pages / Netlify tanpa build command.
