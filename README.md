# Farha Rewards — Template Loyalty PWA

Kad loyalti digital (cap + point + ganjaran) dalam gaya **Bento Glass Frost**, tema **merah & putih Farha**.
Ditulis sepenuhnya dalam **HTML, CSS dan JavaScript vanilla**, dalam satu fail `index.html`. Tiada framework dan tiada langkah build.

## Ciri-ciri
- **Splash screen beranimasi**: huruf "f" muncul, zoom, kemudian logo penuh **farha** terbuka dengan percikan dari cawan.
- **4 skrin**: Home · Cap & Point · Ganjaran · Profil, dengan bottom nav berbentuk pil.
- **Kod QR ahli yang boleh diimbas betul-betul**, dijana dalam JS tanpa library (format: `FARHA:<memberId>`).
- **Kad cap 10 petak**: bila penuh, petak hadiah boleh ditekan untuk tebus minuman percuma.
- **Tebus ganjaran**: point ditolak, keluar kod baucar 6 aksara dengan pemasa 10 minit, dan animasi konfeti.
- **Tahap ahli** (Silver / Gold / Platinum) ikut jumlah point terkumpul.
- **PWA**: boleh dipasang ke skrin utama (Android & iOS) dan dibuka luar talian melalui service worker.
- **Mod demo**: butang "Simulasi pembelian" dan "Set semula data". Data disimpan dalam `localStorage`.

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
vercel.json            ← laluan /admin
manifest.webmanifest   ← maklumat PWA (nama, warna, ikon)
sw.js                  ← service worker (cache luar talian)
icons/                 ← ikon app + logo Farha (PNG)
```

## Jalankan
Service worker hanya berfungsi melalui `http://localhost` atau `https://`:
```bash
python3 -m http.server 8080
# buka http://localhost:8080
```
Untuk deploy, muat naik folder ini ke mana-mana hosting statik (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Jadikan untuk kedai lain (template)
1. **Warna**: ubah pemboleh ubah `:root` di bahagian atas `<style>` (`--brand`, `--brand-2`, `--brand-deep`, `--blob-*`).
2. **Data & ganjaran**: ubah objek `CONFIG` di bahagian atas `<script>`, termasuk nama brand, sasaran cap, senarai ganjaran, tahap ahli dan pengguna demo.
3. **Logo**: ganti `data:image/png;base64,...` pada `<img class="wm">` dalam splash dengan wordmark putih (PNG lutsinar) anda, dan ganti fail dalam `icons/`.
   - Animasi splash memaparkan ~16% bahagian kiri logo dahulu (huruf pertama). Laraskan `clip-path:inset(0 84% 0 0)` dan `translateX(42%)` dalam `.sp-slide` jika huruf pertama logo anda lebih lebar atau lebih sempit.
4. **Manifest**: kemas kini `name`, `short_name` dan `theme_color` dalam `manifest.webmanifest`.
5. Naikkan `VERSION` dalam `sw.js` setiap kali anda deploy versi baru.

## Sambung ke backend
Template ini menyimpan data secara tempatan sahaja. Untuk produksi, gantikan fungsi `load()`, `save()`, `doRedeem()` dan `demoBuy()` dengan panggilan API ke backend anda (contohnya Firebase atau Supabase), dan buang bahagian "mod demo" di skrin Profil.
