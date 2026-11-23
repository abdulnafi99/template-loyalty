# Bahan Jualan Gumroad — Template Loyalti & Pesanan Kafe

> Fail ini untuk penjual sahaja. Ia **tidak** dimasukkan dalam ZIP pembeli. Salin bahagian di bawah ke halaman produk Gumroad.

---

## Nama produk
**Template Loyalti & Pesanan Kafe — PWA, 9 Reka Bentuk termasuk Template Spesial (Demo, Lesen 1 Kedai)**

## Ringkasan (Summary)
Template app kad loyalti dan pesanan untuk kafe & F&B. Ada kad cap digital, point, ganjaran, menu dengan add-on, pickup & pre-order, bayaran DuitNow dan dashboard admin. Satu template dengan 9 reka bentuk, termasuk template spesial Sage Curve, yang boleh ditukar dengan satu tekan.

## Penerangan

Nak tunjuk kepada client kafe macam mana rupa app loyalti mereka sendiri, tanpa bina dari kosong?

**Template Loyalti & Pesanan Kafe** ialah app web (PWA) yang boleh dipasang di skrin utama telefon macam app sebenar. Ia ditulis dalam HTML, CSS dan JavaScript asli, tanpa framework dan tanpa langkah build. Muat naik ke Vercel atau Netlify, dan app terus jalan.

### ✦ Untuk pelanggan kedai
- **Kad cap digital**: setiap item = 1 cap. Kad penuh, tebus minuman percuma.
- **Point & tahap ahli**: Silver, Gold, Platinum.
- **Ganjaran**: tebus dengan point, dapat kod baucar bertempoh 10 minit.
- **Kod QR ahli** untuk diimbas di kaunter (berfungsi luar talian).
- **Menu dengan add-on**:
  - pilih saiz, gula, kuah (pilih satu)
  - topping dengan **had kuantiti setiap pilihan** (contoh: Fucuk maks 1, Fish ball maks 3)
- **Pickup & pre-order**: ambil secepat mungkin, atau pilih slot masa untuk hari ini atau beberapa hari ke depan.
- **Bayar di kaunter atau DuitNow QR**, dengan muat naik bukti bayaran.
- **Splash screen beranimasi** dengan logo kedai.

### ✦ Untuk pemilik kedai (dashboard admin)
- Ringkasan jualan, carta pembelian dan ahli teratas.
- **Kaunter staf**: imbas QR ahli dengan kamera, rekod pembelian, tebus ganjaran, sahkan baucar.
- **Pesanan masuk**: status Baru → Disediakan → Siap diambil → Selesai, label pre-order, semak dan sahkan bukti DuitNow.
- **Urus menu & add-on**: harga, had kuantiti, aktif/sembunyi.
- **Tetapan**:
  - point berasingan untuk walk-in dan order online
  - waktu buka/tutup, masa penyediaan, slot pickup
  - pre-order
  - QR DuitNow

### ✦ 9 reka bentuk dalam satu template
**★ Sage Curve (template spesial)**: panel hijau melengkung, tab kategori menegak, dan lukisan minuman pada kad menu.

Bento Glass Frost · Bento Grid · Bento Glass Noir · Aurora Night · Caramel Latte · Indigo Ramen · Matcha Zen · Ruby Glass

Setiap reka bentuk ada warna, fon, gaya cap, gaya kad menu dan navigasi sendiri. Client boleh cuba semua reka bentuk terus dalam app, atau anda hantar pautan pratonton.

### ✦ Apa yang anda dapat
- Fail template lengkap: app pelanggan, dashboard admin, menu & tetapan kedai, ikon, PWA.
- **Panduan pemasangan Bahasa Melayu**: cara online-kan, tukar logo, warna, menu dan reka bentuk.
- Lesen 1 kedai.

### ⚠️ Penting — ini VERSI DEMO
- Data (ahli, point, pesanan) disimpan **dalam pelayar peranti sahaja**. Ia **tidak disegerakkan** antara telefon pelanggan dan komputer kaunter.
- Sesuai untuk **demo kepada client, pembentangan, prototaip, dan asas pembangunan**.
- Untuk operasi sebenar, template perlu disambung ke backend seperti Firebase. Panduan menerangkan bahagian kod yang perlu diubah.
- PIN admin ialah PIN demo, bukan sistem keselamatan.

### Keperluan
- Akaun hosting statik percuma (Vercel / Netlify / mana-mana hosting web).
- Editor teks untuk ubah nama, logo dan menu.

### Lesen
**1 kedai / 1 jenama.** Boleh ubah suai sepenuhnya. Tidak boleh dijual semula atau diedar semula. Lihat `LESEN.md` dalam pakej.

---

## Soalan lazim (FAQ)

**Perlu tahu coding?**
Asas sahaja. Tukar nama, logo, warna dan menu dengan mengedit fail teks, dan panduan menerangkan setiap langkah. Menyambung ke Firebase memerlukan pengetahuan JavaScript.

**Boleh guna untuk ramai client?**
Lesen ini untuk 1 kedai. Setiap kedai tambahan perlu lesen baharu.

**Boleh pasang di iPhone & Android?**
Ya. Ia PWA: Android tekan "Pasang", iPhone guna Safari → Kongsi → "Add to Home Screen".

**Data pelanggan disimpan di mana?**
Dalam versi demo, dalam pelayar peranti. Tiada data dihantar ke mana-mana pelayan.

**Ada sokongan?**
*(Isi polisi sokongan anda, contoh: "Sokongan emel 14 hari untuk soalan pemasangan.")*

**Bayaran balik?**
*(Isi polisi anda, contoh: "Tiada bayaran balik selepas muat turun kerana ini produk digital, kecuali fail rosak.")*

---

## Tag cadangan
`loyalty` `pwa` `template` `cafe` `f&b` `malaysia` `html` `qr` `duitnow` `pickup`

## Cadangan harga (untuk penjual)
- Versi demo, lesen 1 kedai: sekitar **RM 99–199** (atau USD 25–45). Contoh: harga pelancaran RM 129, harga biasa RM 179.
- Jika kemudian ada **versi Firebase** (data sebenar): boleh dijual sebagai produk/varian berasingan pada harga lebih tinggi.
- Lesen tambahan (pemaju/agensi, ramai kedai) boleh ditambah sebagai **varian** Gumroad nanti.

## Gambar
| Fail | Kegunaan di Gumroad |
|---|---|
| `01-cover.jpg` | **Cover** (nisbah 16:9, 2560×1440) |
| `02-thumbnail.jpg` | **Thumbnail** (persegi, 1200×1200) |
| `03-galeri-reka-bentuk.jpg` | Gambar galeri / cover tambahan |
| `04-galeri-pesanan.jpg` | Gambar galeri / cover tambahan |
| `05-galeri-admin.jpg` | Gambar galeri / cover tambahan |
| `06-galeri-sage-curve.jpg` | Gambar galeri: template spesial |

## Langkah di Gumroad
1. Gumroad → **Products → New product** → pilih **Digital product**. Masukkan nama dan harga.
2. **Cover**: muat naik `01-cover.jpg`, kemudian tambah 03–06 sebagai gambar tambahan. **Thumbnail**: `02-thumbnail.jpg`.
3. **Description**: tampal bahagian *Penerangan* dan *FAQ* di atas.
4. **Content**: muat naik fail `template-loyalti-kafe-v1.1.2.zip`.
5. Isi bahagian *Summary* dan tag, kemudian **Publish**.

## Nota tentang demo langsung
Template ini fail HTML statik. Jika anda letak **pautan demo langsung** di halaman jualan, sesiapa yang tahu boleh melihat kod sumber melalui pelayar. Pilihan yang lebih selamat:
- Guna **gambar dan video rakaman skrin** sahaja dalam halaman jualan, atau
- Sediakan **versi demo yang dimampatkan (minified)** untuk pautan demo, dan simpan versi asal hanya dalam ZIP pembeli.
