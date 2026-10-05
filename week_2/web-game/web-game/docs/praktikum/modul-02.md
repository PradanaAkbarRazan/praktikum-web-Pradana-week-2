# Dokumen Teknis Modul 2 — HTML Semantik, Tailwind CSS, dan Aksesibilitas

**Nama/NIM** : Pradana Akbar Razan 
**Repositori** : https://github.com/PradanaAkbarRazan/praktikum-web-Pradana-week-2

> Dokumen ini disusun dari implementasi `app/page.tsx`, `app/latihan-audit/page.tsx`, `app/layout.tsx`, `app/globals.css`, serta dua bukti tangkapan layar Lighthouse yang tersedia pada proyek.

## 1. Struktur Semantik

### 1.1 Halaman utama (`app/page.tsx`)

Halaman utama menggunakan struktur landmark HTML yang jelas dan berurutan:

```text
body
├── Skip link: "Lewati ke konten utama"
├── header
│   └── nav[aria-label="Navigasi utama"]
│       ├── a: RuangKuliah
│       └── ul
│           ├── li > a: Beranda
│           ├── li > a: Tugas
│           ├── li > a: Jadwal
│           └── li > a: Kontak
├── main#konten
│   ├── section#beranda[aria-labelledby="judul-utama"]
│   │   ├── p: Dashboard mahasiswa
│   │   ├── h1#judul-utama: Halo, Pradana!
│   │   └── p: ringkasan kegiatan kuliah
│   ├── section[aria-label="Ringkasan minggu ini"]
│   │   └── 3 article
│   │       ├── h2 + p: Tugas aktif
│   │       ├── h2 + p: Selesai
│   │       └── h2 + p: Kelas hari ini
│   ├── div layout utama
│   │   ├── section#tugas[aria-labelledby="judul-tugas"]
│   │   │   ├── h2#judul-tugas
│   │   │   └── ul > li...
│   │   └── section#jadwal[aria-labelledby="judul-jadwal"]
│   │       ├── h2#judul-jadwal
│   │       └── ul > li...
│   └── section#kontak[aria-labelledby="judul-kontak"]
│       ├── h2#judul-kontak
│       └── form
│           ├── label + input nama
│           ├── label + input email + bantuan
│           ├── fieldset + legend + radio
│           ├── label + textarea pesan
│           └── button submit
└── footer
```

Hierarki judul utama adalah **H1 → H2 → H2 → H2 → H2**, yaitu satu `h1` untuk identitas halaman dan `h2` untuk kelompok konten utama. `section` yang tidak memiliki heading visual tetap diberi nama aksesibel melalui `aria-label`, sehingga tetap memiliki konteks yang jelas bagi teknologi bantu.

### 1.2 Halaman latihan audit (`app/latihan-audit/page.tsx`)

Strukturnya lebih sederhana:

```text
body
└── main
    ├── h1: Katalog Alat Laboratorium
    ├── img[alt="Logo Next.js"]
    ├── p: Stok diperbarui setiap hari.
    └── form[role="search"][aria-label="Pencarian alat laboratorium"]
        ├── label[for="cari-alat"]
        ├── input#cari-alat[type="search"]
        └── button[aria-label="Cari"]
            └── svg[aria-hidden="true"]
```

Implementasi ini memperbaiki tiga hal yang sering menjadi temuan audit: kontrol input mempunyai label yang terhubung, tombol ikon memiliki nama aksesibel, dan SVG dekoratif tidak dibaca sebagai konten oleh screen reader.

### 1.3 Tangkapan layar Accessibility Tree pada DevTools

Artefak proyek yang diberikan **tidak menyertakan screenshot Accessibility Tree** secara terpisah. Namun, struktur aksesibilitasnya dapat diverifikasi langsung dari kode di atas melalui landmark, heading, accessible name, label form, dan atribut ARIA.

Untuk dokumentasi praktikum, screenshot Accessibility Tree sebaiknya diambil dari DevTools → **Elements → Accessibility** pada halaman utama dan `latihan-audit`.

---

## 2. Tata Letak Responsif

Implementasi menggunakan pendekatan **mobile-first Tailwind CSS**. Layout dasar dibuat satu kolom terlebih dahulu, lalu diperluas pada breakpoint `sm` dan `lg`.

### 2.1 Halaman utama

| Area | Kelas utama | Fungsi | Alasan |
|---|---|---|---|
| Navigasi | `flex flex-col ... sm:flex-row sm:items-center sm:justify-between` | Stack di mobile, horizontal mulai `sm` | Mencegah navigasi dan identitas pengguna terlalu sempit pada layar kecil |
| Hero | `flex flex-col ... sm:flex-row sm:items-center` | Konten bertumpuk lalu berdampingan | Menjaga keterbacaan judul dan kartu minggu |
| Ringkasan | `grid grid-cols-1 ... sm:grid-cols-2 lg:grid-cols-3` | 1 → 2 → 3 kolom | Jumlah kartu meningkat sesuai ruang horizontal |
| Tugas + jadwal | `grid grid-cols-1 ... lg:grid-cols-[2fr_1fr]` | 1 kolom mobile, 2 kolom desktop | Daftar tugas membutuhkan ruang lebih besar daripada jadwal |
| Item tugas | `flex flex-col ... sm:flex-row sm:items-center sm:justify-between` | Stack → horizontal | Deadline tetap sejajar tanpa memaksa teks sempit |
| Form kontak | `grid grid-cols-1 ... sm:grid-cols-2` | 1 → 2 kolom | Input nama/email dapat berdampingan pada layar lebih lebar |

### 2.2 Halaman latihan audit

Halaman latihan menggunakan:

- `max-w-3xl p-6 sm:p-8` pada `<main>` untuk membatasi lebar konten dan menambah padding pada layar yang lebih besar.
- `flex max-w-lg items-end gap-2` pada form pencarian agar input dan tombol tetap sejajar.
- `flex-1 min-w-0` pada area input agar dapat menyusut tanpa menyebabkan overflow.

### 2.3 Titik breakpoint

Breakpoint yang terlihat pada source:

- **Default / mobile**: layout satu kolom, navigasi dan form lebih vertikal.
- **`sm`**: digunakan untuk beralih ke layout horizontal atau dua kolom.
- **`lg`**: digunakan untuk layout tiga kartu ringkasan dan pembagian utama tugas/jadwal `2fr : 1fr`.

### 2.4 Bukti ukuran layar

Bukti screenshot yang tersedia tidak mencakup tiga ukuran persis **360 px, 768 px, dan 1280 px**. Screenshot `ss nilai web.png` memperlihatkan DevTools dengan viewport **394 × 646 px** pada halaman `latihan-audit`, sedangkan `ss nilai web 2.png` memperlihatkan halaman utama pada tampilan desktop dengan Lighthouse terbuka.

Karena ukuran 360/768/1280 tidak tersedia pada artefak, nilai tersebut **tidak diklaim sebagai hasil screenshot** di dokumen ini. Source code menunjukkan strategi responsifnya, tetapi pengambilan bukti final tetap perlu dilakukan pada tiga ukuran yang ditentukan tugas.

---

## 3. Audit Aksesibilitas

### 3.1 Skor Lighthouse

Dua screenshot Lighthouse yang tersedia menunjukkan skor **Accessibility = 100** untuk kedua halaman pada kondisi pengujian yang ditampilkan.

| Halaman | Sebelum perbaikan | Sesudah perbaikan | Bukti yang tersedia |
|---|---:|---:|---|
| `/latihan-audit` | Tidak terdokumentasi pada artefak | **100/100** | `ss nilai web.png` |
| Halaman utama `/` / `#tugas` | Tidak terdokumentasi pada artefak | **100/100** | `ss nilai web 2.png` |

> **Catatan penting:** tidak ada screenshot atau laporan Lighthouse versi sebelum perbaikan di dalam file yang diberikan. Karena itu, angka “sebelum” tidak diisi dengan perkiraan. Skor 100 di atas adalah skor yang benar-benar terlihat pada bukti screenshot.

### 3.2 Daftar audit yang gagal, penyebab, dan perbaikannya

Tidak ada audit Accessibility otomatis yang terlihat gagal pada screenshot akhir karena keduanya menunjukkan skor **100**.

Walaupun demikian, source menunjukkan beberapa pola perbaikan aksesibilitas yang jelas, khususnya pada halaman latihan:

| Area | Risiko/masalah yang ditangani | Implementasi saat ini | Hasil |
|---|---|---|---|
| Gambar/logo | Gambar tanpa alternatif dapat dibaca tidak jelas oleh screen reader | `<img ... alt="Logo Next.js" />` | Ada alternative text |
| Input pencarian | Input tanpa label menyulitkan identifikasi tujuan kontrol | `<label htmlFor="cari-alat">Cari alat</label>` + `id="cari-alat"` | Label terhubung secara programatik |
| Tombol ikon | Tombol ikon saja dapat tidak mempunyai accessible name | `aria-label="Cari"` | Tombol memiliki nama aksesibel |
| SVG dekoratif | Ikon dapat dibaca sebagai elemen bermakna padahal hanya dekorasi | `aria-hidden="true" focusable="false"` | Disembunyikan dari assistive technology |
| Keyboard focus | Fokus yang tidak terlihat menyulitkan pengguna keyboard | `focus-visible:outline-2 focus-visible:outline-offset-2 ...` | Garis fokus eksplisit |
| Skip navigation | Pengguna keyboard tidak perlu melewati semua menu sebelum konten | Link `href="#konten"` + style `focus:not-sr-only` | Ada mekanisme skip ke main |
| Form utama | Kontrol form harus mempunyai label dan hubungan bantuan | `label`, `htmlFor`, `aria-describedby`, `fieldset`, `legend` | Struktur form semantik |

### 3.3 Aksesibilitas pada halaman utama

Halaman utama menerapkan aksesibilitas pada beberapa level:

1. **Landmark:** `header`, `nav`, `main`, dan `footer` membentuk struktur halaman yang mudah dinavigasi.
2. **Heading:** terdapat satu `h1` utama dan `h2` untuk kelompok konten.
3. **Navigasi:** `<nav aria-label="Navigasi utama">` memberi nama landmark navigasi.
4. **Skip link:** `href="#konten"` mengarahkan pengguna keyboard langsung ke `<main id="konten">`.
5. **Form:** setiap input memiliki `<label>`; email diberi `aria-describedby`; kelompok radio menggunakan `<fieldset>` dan `<legend>`.
6. **Focus state:** link, input, textarea, radio, dan tombol memiliki styling `focus-visible` yang jelas.
7. **Semantik data:** waktu tugas/jadwal dibungkus elemen `<time>`.

### 3.4 Pemeriksaan manual dengan papan ketik

Urutan fokus yang diharapkan pada **halaman utama**:

```text
1. Skip link "Lewati ke konten utama"
2. Link "RuangKuliah"
3. Link "Beranda"
4. Link "Tugas"
5. Link "Jadwal"
6. Link "Kontak"
7. Input "Nama lengkap"
8. Input "Alamat email"
9. Radio "Mahasiswa"
10. Radio "Dosen"
11. Textarea "Pesan"
12. Button "Kirim pesan"
```

Pada **halaman latihan audit**:

```text
1. Input "Cari alat"
2. Button "Cari"
```

Garis fokus eksplisit menggunakan pola:

```text
focus-visible:outline-2
focus-visible:outline-offset-2
```

Pada beberapa elemen warna outline-nya menggunakan token brand, sedangkan halaman latihan menggunakan `outline-blue-700`.

> Pemeriksaan manual yang benar-benar dilakukan dengan keyboard tidak direkam sebagai screenshot/video dalam artefak yang diberikan. Urutan di atas adalah urutan fokus yang dapat diturunkan dari urutan DOM dan elemen interaktif pada source.

### 3.5 Catatan terhadap indikator “1 Issue” pada screenshot

Kedua screenshot menampilkan indikator **“1 Issue”** di area bawah/sekitar DevTools. Indikator tersebut tidak dijelaskan sebagai kegagalan Accessibility oleh panel Lighthouse pada screenshot. Karena jenis issue dan detailnya tidak tersedia, indikator tersebut **tidak diperlakukan sebagai audit Accessibility yang gagal** dan tidak dikarang penyebabnya.

---

## 4. Kendala dan Penyelesaian

### Kendala 1 — Struktur halaman harus tetap sederhana tetapi semantik

**Masalah:** konten dashboard memiliki beberapa blok berbeda sehingga mudah dibuat hanya dengan `<div>`.

**Penyelesaian:** penggunaan `header`, `nav`, `main`, `section`, `article`, `ul`, `li`, `time`, `form`, `fieldset`, dan `footer` membuat struktur lebih bermakna bagi browser dan teknologi bantu.

### Kendala 2 — Layout harus responsif tanpa CSS media query manual

**Masalah:** tampilan harus tetap nyaman pada layar kecil sampai desktop.

**Penyelesaian:** menggunakan Tailwind utility dengan pola mobile-first, terutama `grid-cols-1`, `sm:*`, dan `lg:*`. Struktur tetap satu kolom pada mobile lalu berkembang menjadi layout dua/tiga kolom pada layar lebih besar.

### Kendala 3 — Kontrol visual harus tetap dapat digunakan dengan keyboard

**Masalah:** navigasi dan form harus memiliki fokus yang mudah dilihat.

**Penyelesaian:** menambahkan `focus-visible:outline-*`, `outline-offset-*`, dan skip link. Pada form latihan, tombol ikon juga diberi `aria-label` agar tetap bermakna tanpa teks visual.

### Kendala 4 — Bukti “before” dan beberapa screenshot tugas tidak tersedia

**Masalah:** artefak hanya menyediakan screenshot Lighthouse akhir dan bukan hasil audit sebelum perbaikan, Accessibility Tree, serta tiga viewport yang diminta.

**Penyelesaian dokumentasi:** hanya hasil yang dapat diverifikasi dari source dan screenshot yang dicatat. Data sebelum perbaikan dan screenshot yang tidak tersedia tidak diisi dengan asumsi.

---

## 5. Catatan Pemanfaatan AI

**Alat:** ChatGPT (AI assistant).

**Perintah utama:**

> "Observe a website from the code in `app/page.tsx` and the code from `app/latihan-audit/page.tsx`, then create a single `modul-02.md` that clearly documents the semantic HTML structure, responsive Tailwind layout, accessibility audit, keyboard navigation, constraints, and AI usage."

**Bagian yang digunakan:**

- Analisis struktur semantic HTML dari `app/page.tsx` dan `app/latihan-audit/page.tsx`.
- Identifikasi class Tailwind untuk Flexbox, Grid, dan breakpoint.
- Penyusunan struktur Accessibility Tree berbasis struktur DOM.
- Perumusan tabel audit dan penjelasan atribut aksesibilitas seperti `aria-label`, `aria-describedby`, `fieldset`, `legend`, `alt`, dan `aria-hidden`.
- Penyusunan urutan fokus keyboard berdasarkan urutan elemen interaktif pada DOM.

**Cara memverifikasi:**

1. Cocokkan setiap klaim struktur dan class Tailwind dengan source code proyek.
2. Cocokkan skor Lighthouse dengan dua screenshot yang tersedia.
3. Jalankan ulang Lighthouse pada `/latihan-audit` dan halaman utama melalui Chrome DevTools.
4. Uji navigasi dengan tombol `Tab` untuk memastikan urutan fokus dan garis fokus sesuai dokumentasi.
5. Buka panel Accessibility/Accessibility Tree pada DevTools untuk memverifikasi landmark, heading, accessible name, dan relasi label form.

---

## Ringkasan

Implementasi Modul 2 sudah menerapkan **HTML semantik, layout responsif berbasis Tailwind, dan beberapa praktik aksesibilitas utama**. Bukti Lighthouse yang tersedia menunjukkan **Accessibility 100/100** pada halaman latihan dan halaman utama. Dokumentasi ini sengaja membedakan antara hasil yang benar-benar tersedia pada artefak dan hasil yang masih perlu diuji/didokumentasikan ulang, sehingga tidak mengisi data “before”, Accessibility Tree, atau viewport 360/768/1280 dengan asumsi.
