# Portfolio Akademik · Hairul Umam, S.Si., M.Si.

Portfolio personal Dosen Tetap Teknik Informatika STMIK Tazkia.
**Live:** https://hairulumam.github.io/

---

## 📁 Struktur Folder

```
hairul-portfolio/
├── index.html              ← Struktur halaman (jarang diedit)
├── README.md               ← File ini
│
├── assets/
│   ├── styles.css          ← Semua styling/tampilan
│   ├── script.js           ← Logic & animasi (jangan diedit)
│   └── photo.png           ← Foto profil
│
├── data/                   ← ⭐ EDIT FILE-FILE DI SINI UNTUK UPDATE KONTEN
│   ├── profile.json        ← Bio, kontak, link sosial, metrics
│   ├── theses.json         ← Skripsi & tesis
│   ├── publications.json   ← Daftar publikasi ilmiah
│   ├── haki.json           ← Daftar HAKI / Karya Cipta
│   ├── services.json       ← 3 kartu Pengabdian Masyarakat
│   ├── courses.json        ← Mata kuliah per semester
│   ├── journey.json        ← Timeline karier & pendidikan
│   └── achievements.json   ← Daftar pencapaian
│
└── proofs/                 ← ⭐ TARUH PDF BUKTI DOKUMEN DI SINI
    ├── publications/       ← PDF publikasi ilmiah
    ├── haki/               ← Sertifikat HAKI
    ├── achievements/       ← Sertifikat seminar, undangan, foto
    ├── journey/            ← SK pengangkatan, ijazah, transkrip
    └── services/           ← Dokumentasi kegiatan pengabdian
```

---

## ✏️ Cara Edit Konten (Tanpa Coding!)

Semua konten yang sering berubah ada di folder **`data/`** dalam bentuk file JSON.
Anda **tidak perlu mengerti coding** — cukup edit teks di dalam tanda kutip.

### Contoh: Menambah Publikasi Baru

Buka `data/publications.json`. Tambahkan blok baru di atas (paling baru di atas):

```json
[
  {
    "year": "2026",
    "title": "Judul Publikasi Baru Anda",
    "journal": "Nama Jurnal",
    "journal_em": "Vol. 1, No. 2",
    "authors": "H Umam, Penulis Lain"
  },
  ... (publikasi yang sudah ada di bawahnya)
]
```

**Aturan dasar JSON:**
- Setiap entri dipisah dengan koma `,`
- Entri terakhir TIDAK pakai koma di akhir
- Pakai tanda kutip `"..."` untuk teks
- Jika nilai kosong/tidak ada, tulis `null` (tanpa kutip)

### Contoh: Mengubah Jumlah Subscriber

Buka `data/profile.json`, cari bagian `metrics`, ubah angka `value`:

```json
"metrics": [
  { "value": 30000, "suffix": "+", "label": "Subscriber", ... }
]
```

### Contoh: Mengubah Mata Kuliah Semester Berjalan

Buka `data/courses.json`:

```json
{
  "id": "2025-2026-ganjil",
  "label": "2025/2026 Ganjil",
  "active": true,
  "mataKuliah": [
    { "kode": "TIK25", "nama": "Mata Kuliah Baru", "sks": 3 }
  ]
}
```

---

## 📎 Pasang Bukti Dokumen (Sertifikat, Ijazah, dll)

Portfolio ini punya fitur **bukti dokumen** — setiap publikasi, achievement, HAKI, atau entri timeline bisa dilengkapi link ke PDF bukti. Saat ada bukti, kartu di website akan menampilkan **icon `↗` kecil di pojok** dan **garis emas tipis di sisi kiri** sebagai indikator profesional.

### Cara Kerja

1. **Letakkan PDF** di folder `proofs/[kategori]/` (lihat README di setiap subfolder untuk konvensi penamaan)
2. **Buka file JSON** yang relevan di folder `data/`
3. **Ganti `"proof_url": null`** dengan path ke file PDF

### Contoh — Achievement

File `data/achievements.json`:
```json
{
  "icon": "🏅",
  "title": "Best Social Activist · Gadjah Mada Award III",
  "institutions": [...],
  "year": "2015",
  "proof_url": "proofs/achievements/2015-ugm-best-social-activist.pdf"
}
```

### Pilihan Penyimpanan Bukti

**A) GitHub (rekomendasi untuk dokumen kecil):**
- Upload PDF langsung ke folder `proofs/`
- Link otomatis `https://hairulumam.github.io/proofs/...`
- Pro: self-contained, link permanen, domain sendiri
- Con: Max 100MB per file, bukan untuk dokumen sensitif

**B) Google Drive (untuk file besar atau yang sering diupdate):**
- Upload ke Google Drive **pribadi** (jangan kampus, agar tidak hilang saat resign)
- Set sharing: **"Anyone with the link → Viewer"**
- Copy link, paste ke field `proof_url`:
  ```json
  "proof_url": "https://drive.google.com/file/d/XXXXXX/view"
  ```
- Pro: bisa file besar, mudah update
- Con: link bergantung Google Drive aktif

### Mana yang Sebaiknya Dipakai?

| Jenis Bukti | Rekomendasi |
|---|---|
| Sertifikat resmi (PDF kecil < 5MB) | **GitHub** (`proofs/...`) |
| Foto kegiatan resolusi tinggi | **Google Drive** |
| Video testimoni / rekaman | **Google Drive** atau **YouTube** |
| Folder berisi banyak file | **Google Drive** (1 link folder) |
| Dokumen sensitif (KTP, NIDN lengkap) | **JANGAN dipublikasikan**, atau Google Drive private |

### Catatan Privasi

🚨 **JANGAN upload dokumen** yang mengandung:
- Nomor identitas lengkap (KTP, NIK, NIDN full)
- Tanda tangan basah scan resolusi tinggi
- Data keluarga / akademis siswa
- Email pribadi orang lain

---

## 🌐 Deploy ke GitHub Pages

### Pertama Kali (Setup)

1. **Buat repository baru di GitHub:**
   - Nama: `hairulumam.github.io` (PERSIS seperti ini, dengan username Anda)
   - Set: **Public**
   - Jangan inisialisasi dengan README

2. **Upload semua file:**
   - Klik tombol **"uploading an existing file"** di halaman repository kosong
   - Drag semua file & folder dari komputer (index.html, README.md, folder assets/, folder data/)
   - Scroll ke bawah, klik **"Commit changes"**

3. **Aktifkan GitHub Pages:**
   - Buka tab **Settings** repository
   - Sidebar kiri pilih **Pages**
   - Source: pilih **Deploy from a branch**
   - Branch: pilih **main** / **(root)**
   - Klik **Save**

4. **Tunggu 1-2 menit**, kemudian buka: **https://hairulumam.github.io/**

### Update Berikutnya

Setelah setup pertama, untuk update konten:

**Cara 1 — Edit langsung di GitHub (gampang, dari browser/HP):**
1. Buka file yang mau diedit (misal `data/publications.json`)
2. Klik ikon **pensil ✏️** di kanan atas
3. Edit teks
4. Scroll bawah, tulis catatan singkat (misal: "Tambah publikasi 2026")
5. Klik **Commit changes**
6. Tunggu ~1 menit, website otomatis update

**Cara 2 — Edit di komputer (untuk perubahan besar):**
1. Edit file di komputer pakai text editor (VS Code, Notepad++, dll)
2. Buka GitHub repository di browser
3. Drag file yang sudah diedit ke halaman repository
4. Commit

---

## 🔍 Preview di Komputer Sebelum Upload

Karena situs ini memuat data JSON, **tidak bisa dibuka langsung dengan double-click `index.html`** (browser memblokir).
Anda perlu menjalankan local server kecil. Pilih salah satu cara:

### Cara A — VS Code + Live Server (Paling Mudah)

1. Install **VS Code** (gratis): https://code.visualstudio.com
2. Buka VS Code → tab **Extensions** (kiri) → cari **"Live Server"** → Install
3. Buka folder portfolio di VS Code (File → Open Folder)
4. Klik kanan pada `index.html` → **"Open with Live Server"**
5. Browser otomatis terbuka dengan preview real-time

### Cara B — Python (Jika sudah ada Python)

Buka Terminal/Command Prompt di folder portfolio, lalu jalankan:

```bash
python3 -m http.server 8000
```

Buka browser ke: http://localhost:8000

---

## 🆘 Troubleshooting

**Saat dibuka di GitHub Pages, isinya kosong / loading terus**
- Tunggu 2-3 menit setelah commit (GitHub butuh waktu deploy)
- Refresh dengan Ctrl+Shift+R (hard refresh)
- Cek di browser console (F12) apakah ada error fetch JSON

**Saat dibuka double-click di komputer, muncul error**
- Itu wajar. Lihat bagian "Preview di Komputer" di atas — gunakan Live Server atau Python server.

**Format JSON saya salah**
- Pakai validator online: https://jsonlint.com — copy-paste isi file JSON, klik Validate

---

## 📞 Kontak

- Surel: hairul@stmik.tazkia.ac.id
- LinkedIn: https://www.linkedin.com/in/hairulumam-/
- Google Scholar: https://scholar.google.com/citations?user=34JuTe4AAAAJ

---

© 2026 Hairul Umam. NIDN · 0407019403
