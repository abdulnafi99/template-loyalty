# Panduan Pemasangan — Template Loyalti Kafe

Terima kasih kerana membeli! Panduan ini menerangkan cara memasang, menukar jenama dan menyesuaikan template untuk kedai anda. Anda tidak perlu tahu coding yang mendalam. Cukup boleh buka fail teks dan ikut langkah.

> **Penting:** Ini **versi demo**. Data disimpan dalam pelayar peranti sahaja, dan tidak disegerakkan antara telefon pelanggan dan komputer kaunter. Sesuai untuk demo kepada client, pembentangan, prototaip dan asas pembangunan. Untuk operasi sebenar, sambungkan ke backend seperti Firebase (lihat bahagian 8).

---

## 1. Kandungan pakej

| Fail | Fungsi |
|---|---|
| `index.html` | App pelanggan (PWA): splash, Home, Menu, Cap & Point, Ganjaran, Profil |
| `admin.html` | Dashboard admin dan kaunter staf |
| `menu.js` | **Data kedai**: menu, add-on, tetapan dan senarai reka bentuk |
| `manifest.webmanifest` | Nama dan ikon app bila dipasang di telefon |
| `sw.js` | Service worker (boleh dibuka luar talian) |
| `vercel.json` | Laluan `/admin` untuk Vercel |
| `icons/` | Ikon app dan logo (`wordmark.png` = logo putih lutsinar) |
| `PANDUAN.md` | Panduan ini |
| `LESEN.md` | Syarat lesen (1 kedai) |

## 2. Cuba di komputer

App perlu dibuka melalui pelayan web, bukan dengan klik dua kali pada fail, supaya service worker dan pemasangan PWA berfungsi.

**Cara paling mudah (Python dah ada di Mac/Linux):**
```bash
cd folder-template
python3 -m http.server 8080
```
Buka `http://localhost:8080` (app pelanggan) dan `http://localhost:8080/admin.html` (admin, PIN demo **1234**).

**Atau guna VS Code:** pasang extension *Live Server*, klik kanan `index.html` → *Open with Live Server*.

## 3. Online-kan (percuma)

### Pilihan A — Vercel (disyorkan)
1. Daftar akaun di vercel.com.
2. Muat naik folder template ke repositori GitHub **peribadi** (private). Repo awam tidak dibenarkan oleh lesen.
3. Di Vercel: **Add New → Project → Import** repo tersebut → **Deploy**. Tiada tetapan build diperlukan.
4. App anda akan ada di `nama-projek.vercel.app`, dan admin di `/admin`.

### Pilihan B — Netlify Drop
1. Pergi ke app.netlify.com/drop.
2. Seret folder template ke halaman itu, dan siap.
3. Admin di `/admin.html`.

> App mesti dibuka dengan **https** (Vercel dan Netlify sudah ada) supaya boleh dipasang ke skrin utama telefon.

## 4. Tukar jenama kedai

### Nama kedai
- `index.html`: cari `brand: "Kafe Demo"` dalam `CONFIG` dan tukar ke nama kedai. Tukar juga `<title>` dan `apple-mobile-web-app-title` di bahagian atas.
- `admin.html`: cari `brand: "Kafe Demo"` dalam `ADMIN`, dan teks "Kafe Demo Admin".
- `manifest.webmanifest`: tukar `name` dan `short_name`.

### Logo
1. Sediakan logo **putih dengan latar lutsinar** (PNG, lebar ~640px).
2. Tukar ke base64. Banyak laman percuma boleh buat ini, cari "image to base64". Hasilnya bermula dengan `data:image/png;base64,`.
3. Dalam `index.html` dan `admin.html`, cari `<img class="wm" src="data:image/png;base64,...` dan gantikan nilai `src` dengan base64 logo anda.
4. **Animasi splash** memaparkan huruf pertama logo dahulu. Dalam `index.html`, cari `.sp-slide` dan laraskan dua nilai ini ikut lebar huruf pertama logo anda:
   - `clip-path:inset(0 76% 0 0)`: 76% bermaksud 24% bahagian kiri dipaparkan dahulu.
   - `transform:translateX(38%)`: anggaran = 50% tolak separuh lebar huruf pertama.
   - Tukar juga `aspect-ratio:640/250` ikut nisbah lebar/tinggi logo anda.
5. Gantikan ikon dalam `icons/`: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (logo di tengah dengan ruang tepi), `apple-touch-icon.png` (180×180) dan `logo-circle.png`.

### Nama syarikat untuk DuitNow
`menu.js` → `SHOP_SETTINGS.duitnowName`, atau tukar terus di **Admin → Tetapan → Bayaran**.

## 5. Pilih reka bentuk

Template ada **8 reka bentuk**: Bento Glass Frost, Bento Grid, Bento Glass Noir, Aurora Night, Caramel Latte, Indigo Ramen, Matcha Zen dan Ruby Glass.

- **Untuk demo kepada client:** buka app dan tekan butang **palet** di Home, atau **Profil → Reka bentuk app**. Boleh juga hantar pautan terus, contohnya `https://app-anda.vercel.app/?tema=clay`. Nilai `tema` yang sah: `frost`, `grid`, `noir`, `aurora`, `clay`, `indigo`, `matcha`, `ruby`.
- **Tetapkan reka bentuk rasmi kedai:** **Admin → Tetapan → Reka bentuk app pelanggan**, atau `menu.js` → `SHOP_SETTINGS.theme`.
- **Sembunyikan butang palet** selepas client membuat pilihan: matikan suis di Admin → Tetapan, atau set `themePicker: false` dalam `menu.js`.
- **Ubah warna tema:** dalam `index.html`, cari bahagian `TEMA` dan ubah token seperti `--brand`, `--brand-2`, `--brand-deep` dan `--brand-rgb` (nilai r,g,b bagi `--brand`) pada blok `:root[data-theme="..."]`.

## 6. Menu, add-on & tetapan kedai

Semua dalam **`menu.js`**:

- `SHOP_MENU`: produk (`name`, `desc`, `price`, `cat`, `icon`) dan kumpulan add-on:
  - `type:"single"`: pilih satu (radio). `required:true` = wajib.
  - `type:"multi"`: pilih banyak dengan kuantiti. Setiap pilihan ada `max` (had per item, contohnya Fucuk maks 1). Kumpulan ada `max` (had jumlah, 0 = tiada had).
  - Ikon yang tersedia: `cup`, `leaf`, `bowl`, `bread`, `cake`, `bean`, `sparkle`.
- `SHOP_SETTINGS`:
  - `stampTarget`: bilangan cap untuk 1 minuman percuma.
  - `pointsWalkin`, `pointsOnline`: point setiap item (kaunter / app).
  - `open`, `close`, `prep`, `slot`: waktu pickup.
  - `preorder`, `preorderDays`: pre-order.
  - `payCounter`, `payDuitnow`, `duitnowName`: cara bayaran.
  - `theme`, `themePicker`: reka bentuk.

Admin juga boleh ubah menu, ganjaran dan tetapan dari dashboard tanpa sentuh kod. Perubahan itu disimpan dalam pelayar admin.

**Ganjaran** (Minuman Percuma, Diskaun RM5, …) dan **tahap ahli** (Silver/Gold/Platinum) ada dalam `CONFIG` di `index.html`, dan `ADMIN.defaultRewards` di `admin.html`.

## 7. Admin & keselamatan

- PIN demo ialah **1234**. Tukar di `admin.html` → `ADMIN.pin`.
- **PIN ini bukan keselamatan sebenar.** Ia hanya menyembunyikan dashboard dalam demo, dan sesiapa yang faham kod boleh melihatnya. Untuk operasi sebenar, guna log masuk backend (contohnya Firebase Authentication) dengan peraturan keselamatan pangkalan data.
- Sebelum dilancarkan kepada pelanggan, buang bahagian **mod demo** di skrin Profil (Simulasi pembelian, Set semula data) dalam `index.html`.

## 8. Daripada demo ke sistem sebenar

Untuk data dikongsi antara pelanggan dan kaunter:
1. Cipta projek Firebase (Firestore + Authentication).
2. Gantikan fungsi yang membaca/menulis `localStorage` dengan panggilan Firestore:
   - `index.html`: `load()`, `save()`, `placeOrder()`, `doRedeem()` dan `applyShared()`
   - `admin.html`: `load()`, `updateMember()`, `advanceOrder()`, `setPay()`, `saveMenu()` dan `saveSettings()`
3. Simpan gambar bukti DuitNow dalam Firebase Storage, bukan dalam pesanan.
4. Tulis peraturan keselamatan Firestore supaya pelanggan tidak boleh menambah point sendiri. Hanya akaun staf boleh menulis point, cap dan status pesanan.

## 9. Selepas kemas kini

Setiap kali anda deploy perubahan, naikkan `VERSION` dalam `sw.js` (contoh `kafe-v1.4.0` → `kafe-v1.4.1`) supaya telefon pelanggan memuat versi baharu.

## 10. Soalan lazim

**App tidak boleh "Pasang" di iPhone?** Buka dalam Safari, tekan butang Kongsi → *Add to Home Screen*.

**Perubahan saya tidak muncul?** Naikkan `VERSION` dalam `sw.js`, kemudian tutup dan buka semula app atau tab.

**Data hilang bila tukar telefon?** Ini tingkah laku versi demo, kerana data disimpan dalam pelayar. Lihat bahagian 8.

**Boleh guna untuk kedai kedua?** Perlu beli lesen tambahan. Lihat `LESEN.md`.
