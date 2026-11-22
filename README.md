# Kafe Demo — Template Loyalty PWA

Template kad loyalti digital + pesanan (cap, point, menu, pickup, ganjaran) untuk kafe. Logo contoh **"kafé"** (Kafe Demo) dan **8 reka bentuk** yang boleh ditukar.
Ditulis sepenuhnya dalam **HTML, CSS dan JavaScript vanilla**, dalam satu fail `index.html`. Tiada framework dan tiada langkah build.

## Ciri-ciri
- **Splash screen beranimasi**: huruf pertama logo muncul, zoom, kemudian logo penuh terbuka.
- **8 reka bentuk (tema)**: Bento Glass Frost, Bento Grid, Bento Glass Noir, Aurora Night, Caramel Latte (clay), Indigo Ramen, Matcha Moya dan Ruby Glass. Setiap tema ada warna, fon, gaya cap, gaya kad menu dan navigasi sendiri.
- **4 skrin**: Home · Cap & Point · Ganjaran · Profil, dengan bottom nav berbentuk pil.
- **Kod QR ahli yang boleh diimbas betul-betul**, dijana dalam JS tanpa library (format: `<NAMA KEDAI>:<memberId>`).
- **Kad cap 10 petak**: bila penuh, petak hadiah boleh ditekan untuk tebus minuman percuma.
- **Tebus ganjaran**: point ditolak, keluar kod baucar 6 aksara dengan pemasa 10 minit, dan animasi konfeti.
- **Tahap ahli** (Silver / Gold / Platinum) ikut jumlah point terkumpul.
- **PWA**: boleh dipasang ke skrin utama (Android & iOS) dan dibuka luar talian melalui service worker.
- **Mod demo**: butang "Simulasi pembelian" dan "Set semula data". Data disimpan dalam `localStorage`.

## Reka bentuk (tema)
- Pelanggan/client boleh cuba semua reka bentuk melalui butang **palet** di Home, atau **Profil → Reka bentuk app**. Pilihan itu disimpan dalam peranti sahaja.
- Admin pilih reka bentuk rasmi kedai di **Tetapan → Reka bentuk app pelanggan**, dan boleh matikan butang palet bila app sudah dilancarkan.
- Pautan pratonton terus: `index.html?tema=aurora` (frost, grid, noir, aurora, clay, indigo, matcha, ruby). Sesuai untuk hantar kepada client.
- Senarai tema ada dalam `menu.js` (`SHOP_THEMES`). CSS setiap tema ada dalam `index.html` di bahagian **TEMA** (`:root[data-theme="..."]`).

## Menu, add-on & troli
- **App pelanggan → Menu**: kategori, produk, add-on dan troli. Setiap item dalam pesanan beri **1 cap** dan point ikut tetapan.
- **Add-on "pilih banyak + kuantiti"**: setiap pilihan ada **had kuantiti per item** (contohnya Fucuk maks 1, Fish ball maks 3), dan kumpulan boleh ada had jumlah (contohnya 6 cucuk). Bila had dicapai, pelanggan diberitahu untuk tambah item yang sama ke troli sekali lagi.
- **Add-on "pilih satu"**: radio, boleh jadi wajib (contohnya Saiz, Gula, Kuah).
- **Admin → Menu & add-on**: tambah atau edit produk, kumpulan add-on, harga tambahan, had kuantiti, dan aktif/sembunyi.
- **Admin → Pesanan**: pesanan masuk secara langsung, dengan status Baru → Disediakan → Siap diambil → Selesai. Pelanggan dapat notis bila pesanan siap.
- **Halaman item** ada butang **Kembali**. Harga item dan harga add-on dipaparkan berasingan, dalam halaman item, troli, pesanan dan admin.
- **Waktu pickup & pre-order**: pelanggan pilih "Secepat mungkin" atau slot waktu hari ini/hari lain (pre-order). Admin set waktu buka/tutup, masa penyediaan, selang slot dan bilangan hari pre-order.
- **Bayaran**: bayar di kaunter, atau DuitNow QR dengan muat naik bukti bayaran (gambar dimampatkan dalam peranti). Admin semak bukti dan tekan Sahkan atau Tolak, dan pelanggan dapat notis.
- **Point berasingan**: point walk-in (kaunter) dan point order online (app) diset sendiri di Tetapan.
- **Menu asal setiap kedai ada dalam `menu.js`.** Itu satu-satunya tempat untuk ubah menu bila sediakan kedai baru.

## Admin dashboard (`admin.html`, demo)
Buka `/admin` atau `admin.html` dan masukkan PIN demo **1234**.
- **Ringkasan**: KPI (ahli, pembelian hari ini, point dikeluarkan, tebusan), carta pembelian 14 hari, ganjaran popular, aktiviti terkini dan ahli teratas.
- **Kaunter**: imbas QR pelanggan dengan kamera (BarcodeDetector, atau jsQR sebagai fallback) atau taip ID ahli. Kemudian rekod pembelian (+cap, +point), tebus kad cap penuh, tebus ganjaran, dan sahkan kod baucar.
- **Ahli**: cari, tapis ikut tahap, susun. Lihat butiran dan sejarah, laraskan point, eksport CSV.
- **Ganjaran**: tambah, edit, padam, aktif/sembunyi, dan pilih ganjaran utama. Perubahan terus muncul dalam app pelanggan.
- **Tetapan**: bilangan cap untuk minuman percuma dan point setiap minuman.

**Segerak demo:** admin dan app pelanggan berkongsi `localStorage` dalam pelayar yang sama. Buka `index.html` dan `admin.html` dalam dua tab sebelah-menyebelah. Cap yang ditambah di kaunter terus muncul dalam app pelanggan, dan baucar yang disahkan staf terus bertukar jadi "✓ Telah ditebus di kaunter". Ahli lain dalam dashboard adalah data contoh. Untuk segerak antara peranti, sambung ke Firebase.

## Struktur
```
index.html             ← app pelanggan: SEMUA UI, CSS & JS (logo dibenam base64)
admin.html             ← dashboard admin & kaunter staf (satu fail, demo)
menu.js                ← menu & tetapan asal kedai (produk, add-on, point, waktu, bayaran)
vercel.json            ← laluan /admin
manifest.webmanifest   ← maklumat PWA (nama, warna, ikon)
sw.js                  ← service worker (cache luar talian)
icons/                 ← ikon app + logo Kafe Demo (PNG)
```

## Jalankan
Service worker hanya berfungsi melalui `http://localhost` atau `https://`:
```bash
python3 -m http.server 8080
# buka http://localhost:8080
```
Untuk deploy, muat naik folder ini ke mana-mana hosting statik (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Jadikan untuk kedai lain (template)
1. **Warna**: pilih tema, atau ubah token tema dalam bahagian **TEMA** di `<style>` (`--brand`, `--brand-2`, `--brand-deep`, `--brand-rgb`, `--blob-*`, …).
2. **Menu**: ubah `menu.js` (produk, harga, add-on, had kuantiti).
3. **Data & ganjaran**: ubah objek `CONFIG` di bahagian atas `<script>`, termasuk nama brand, sasaran cap, senarai ganjaran, tahap ahli dan pengguna demo.
4. **Logo**: ganti `data:image/png;base64,...` pada `<img class="wm">` dalam `index.html` dan `admin.html` dengan wordmark putih (PNG lutsinar) kedai, dan ganti fail dalam `icons/` (`wordmark.png` ialah salinan asal logo contoh).
   - Animasi splash memaparkan ~24% bahagian kiri logo dahulu (huruf pertama "k"). Laraskan `clip-path:inset(0 76% 0 0)` dan `translateX(38%)` dalam `.sp-slide` ikut lebar huruf pertama logo baru.
5. **Reka bentuk**: tetapkan `theme` dalam `SHOP_SETTINGS` (`menu.js`) atau pilih di admin.
6. **Manifest**: kemas kini `name`, `short_name` dan `theme_color` dalam `manifest.webmanifest`.
7. Naikkan `VERSION` dalam `sw.js` setiap kali anda deploy versi baru.

## Sambung ke backend
Template ini menyimpan data secara tempatan sahaja. Untuk produksi, gantikan fungsi `load()`, `save()`, `doRedeem()` dan `demoBuy()` dengan panggilan API ke backend anda (contohnya Firebase atau Supabase), dan buang bahagian "mod demo" di skrin Profil.
