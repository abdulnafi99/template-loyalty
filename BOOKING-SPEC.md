# Spesifikasi — Template Sistem Tempahan (Booking) · 10 Reka Bentuk · Versi Demo

> Dokumen ini menerangkan cara menukar **Template Loyalti & Pesanan Kafe** kepada **Template Sistem Tempahan** untuk perniagaan servis: salun, barber, spa, klinik, studio foto atau gelanggang sukan.
>
> Yang **dikekalkan**:
> - 10 reka bentuk
> - PWA
> - splash beranimasi
> - kad cap & point
> - dashboard admin
> - mod **akaun demo** (data dalam pelayar, PIN 1234)
>
> Yang **ditukar**: menu & troli kepada **servis, staf, tarikh dan slot masa**.

---

## 1. Ringkasan produk

| | Template Kafe (sekarang) | Template Booking (baharu) |
|---|---|---|
| Jenama demo | Kafe Demo (`kafé`) | **Studio Demo** (`studio.`). Contoh: salun/barber, boleh ditukar |
| Item | Menu + add-on | **Servis** + pilihan tambahan (cth. cuci rambut, rawatan) |
| Aliran | Troli → pickup/pre-order → bayar | **Pilih servis → staf → tarikh → slot → sahkan → deposit** |
| Status | Baru → Disediakan → Siap diambil | **Menunggu → Disahkan → Hadir → Selesai** (atau Batal / Tidak hadir) |
| Loyalti | 1 item = 1 cap | **1 temujanji selesai = 1 cap**, point ikut RM |
| Admin | Kaunter, pesanan, menu | **Jadual hari ini, kalendar, tempahan, servis & staf, waktu operasi** |
| Data | localStorage | localStorage (sama, versi demo) |
| Reka bentuk | 10 tema | **10 tema yang sama** (token CSS dikekalkan) |

Teknologi tidak berubah:
- HTML, CSS dan JavaScript asli, tanpa framework dan tanpa build
- satu fail `index.html` dan satu fail `admin.html`
- data kedai dalam `services.js`

---

## 2. Struktur fail

```
index.html            app pelanggan (PWA)
admin.html            dashboard admin + kaunter
services.js           ← ganti menu.js: SHOP_SERVICES, SHOP_STAFF, SHOP_SETTINGS, SHOP_THEMES
promo.js              dikekalkan (banner promosi untuk tema Promo Carousel)
sw.js                 VERSION baharu: "booking-v1.0.0", SHELL termasuk services.js
manifest.webmanifest  nama: "Studio Demo", short_name: "Studio"
vercel.json           /admin → admin.html (sama)
icons/                ikon & wordmark "studio." (putih lutsinar)
PANDUAN.md · LESEN.md · CHANGELOG.md
```

---

## 3. Data (`services.js`)

```js
window.SHOP_SERVICES = [
  { id:"cut",   cat:"Rambut",  name:"Potong Rambut",      desc:"Potong & gaya",            price:35,  dur:45,  icon:"scissors", popular:true, tag:"PALING LARIS",
    staff:["aina","faris"],                      // kosong = semua staf boleh
    extras:[ {id:"wash", name:"Cuci rambut", price:10, dur:15},
             {id:"tonic",name:"Tonik kulit kepala", price:15, dur:10} ] },
  { id:"color", cat:"Rambut",  name:"Warna Rambut",       desc:"Warna penuh, termasuk cuci", price:150, dur:120, icon:"drop", deposit:50 },
  { id:"beard", cat:"Grooming",name:"Trim Janggut",       desc:"Trim & bentuk",            price:20,  dur:20,  icon:"razor" },
  { id:"facial",cat:"Spa",     name:"Facial Asas",        desc:"Cuci, scrub, masker",      price:90,  dur:60,  icon:"leaf", tag:"BARU" },
  { id:"mani",  cat:"Kuku",    name:"Manicure",           desc:"Bentuk, cuticle, warna",   price:45,  dur:40,  icon:"sparkle" },
];

window.SHOP_STAFF = [
  { id:"aina",  name:"Aina",  role:"Senior Stylist", color:"#F472B6", off:[0] },   // off: hari cuti (0=Ahad)
  { id:"faris", name:"Faris", role:"Barber",         color:"#38BDF8", off:[1] },
  { id:"mei",   name:"Mei",   role:"Terapis Spa",    color:"#A3E635", off:[] },
];

window.SHOP_SETTINGS = {
  hours: { 0:null, 1:["10:00","20:00"], 2:["10:00","20:00"], 3:["10:00","20:00"],
           4:["10:00","20:00"], 5:["10:00","22:00"], 6:["09:00","22:00"] },  // null = tutup
  slotStep: 15,           // grid slot (minit)
  buffer: 10,             // rehat antara temujanji (minit)
  leadMin: 60,            // tempahan paling awal = sekarang + 60 minit
  maxDays: 30,            // boleh tempah sehingga 30 hari ke depan
  cancelHours: 24,        // batal percuma sebelum X jam
  anyStaff: true,         // pilihan "Mana-mana staf"
  depositMode: "service", // "none" | "service" (ikut deposit servis) | "percent"
  depositPercent: 20,
  payCounter: true, payDuitnow: true, duitnowName: "STUDIO DEMO ENTERPRISE", duitnowQR: "",
  stampTarget: 8,         // 8 temujanji = 1 servis percuma
  pointsPerRM: 1,
  holidays: ["2026-12-25"],
  theme: "frost", themePicker: true, promoInterval: 4,
};

window.SHOP_THEMES = [ /* sama seperti sekarang: promo★, sage★, frost, grid, noir, aurora, clay, indigo, matcha, ruby */ ];
```

### Kunci localStorage

Gunakan awalan baharu supaya tidak bertembung dengan template kafe:

| Kunci | Kandungan |
|---|---|
| `bk-member-v1` | profil ahli: nama, telefon, point, cap, tahap, sejarah |
| `bk-bookings-v1` | semua temujanji (dikongsi app ↔ admin, segerak melalui event `storage`) |
| `bk-services-v1` · `bk-staff-v1` · `bk-settings-v1` | suntingan admin (menindih `services.js`) |
| `bk-rewards-v1` · `bk-vouchers-v1` | ganjaran & baucar |
| `bk-promos-v1` · `bk-promo-stats-v1` | promosi |
| `bk-blocks-v1` | slot disekat admin (rehat, cuti staf, acara) |
| `bk-theme-preview` · `bk-admin-tabs-hidden` | pilihan UI |

### Objek temujanji

```js
{ id:"B1024", code:"7KQ2", memberId:"m1", name:"Aisyah", phone:"012-3456789",
  serviceId:"cut", extras:["wash"], staffId:"aina",          // atau "any" → ditetapkan semasa simpan
  date:"2026-11-25", start:"14:30", end:"15:30",              // end = start + dur + extras
  price:45, deposit:0, pay:"counter"|"duitnow", proof:"data:image/...", payStatus:"none|pending|verified",
  status:"pending|confirmed|arrived|done|cancelled|noshow",
  note:"Nak gaya pendek", createdAt: 1764050000000, source:"app"|"walkin" }
```

---

## 4. Logik slot (fungsi teras)

`availableSlots(date, serviceId, extras, staffId)` → senarai `"HH:MM"`:

1. Hari tutup, `holidays`, atau hari cuti staf → `[]`.
2. Tempoh = `service.dur + Σ extras.dur`.
3. Jana calon slot dari `open` hingga `close - tempoh`, setiap `slotStep`.
4. Buang calon sebelum `now + leadMin` (untuk hari ini).
5. Untuk staf tertentu, buang calon yang bertindih dengan:
   - temujanji staf itu (status bukan `cancelled`/`noshow`), ditambah `buffer`
   - `bk-blocks-v1`
6. `"any"` → slot sah jika **sekurang-kurangnya seorang** staf yang layak untuk servis itu bebas. Semasa simpan, pilih staf bebas yang paling sedikit temujanji hari itu.
7. Semak semula ketersediaan sejurus sebelum simpan, untuk mengelak tempahan berganda bila dua tab dibuka.

---

## 5. App pelanggan (`index.html`)

Nav bawah: **Home · Servis · Temujanji · Cap & Point · Profil**. Ganjaran masuk dalam Cap & Point, atau jadi tab ke-6 untuk tema yang ada ruang.

### 5.1 Splash
Sama seperti sekarang: huruf pertama logo muncul dahulu, kemudian zoom kepada logo penuh `studio.`.

### 5.2 Home
- Salam dan jenama. Cip: Point · Kad cap · Tahap.
- **Kad "Temujanji seterusnya"**: servis, staf, tarikh & masa, kiraan detik ("Esok, 2:30 PTG"), dan butang *Lihat* / *Tunda* / *Tambah ke kalendar* (.ics).
- Butang besar **Tempah sekarang**, dan jubin **Tempah semula** untuk servis terakhir.
- Tema Promo Carousel: karusel promosi di atas (dikekalkan dari `promo.js`).
- Servis popular (2–4 kad).

### 5.3 Servis (ganti Menu)
- Kategori (Rambut, Grooming, Spa, Kuku). Tema Sage & Promo guna **rel kategori menegak** seperti sekarang.
- Kad servis: ikon/lukisan, nama, **tempoh (⏱ 45 min)**, harga, label (`tag`). Ketik untuk buka helaian servis.
- Helaian servis:
  - penerangan
  - pilihan tambahan (checkbox, dengan harga dan minit tambahan)
  - jumlah harga & tempoh dikira secara langsung
  - butang **Pilih masa →**

### 5.4 Aliran tempahan (helaian 4 langkah, dengan penunjuk langkah)
1. **Staf**: kad avatar (warna staf), peranan, "Mana-mana staf" (jika `anyStaff`). Staf cuti hari itu dilabel.
2. **Tarikh**: jalur 14 hari yang boleh dileret, dan kalendar bulan bila diketik. Hari tutup atau penuh dikelabukan; hari hampir penuh diberi titik oren.
3. **Masa**: grid slot dikumpul **Pagi / Petang / Malam**. Slot penuh tidak dipaparkan, atau dipaparkan dengan coret.
4. **Sahkan**:
   - ringkasan servis, tambahan, staf, tarikh/masa dan tempoh
   - nama & telefon (diisi dari profil)
   - nota
   - cara bayaran: **Di kedai** atau **DuitNow** (deposit / penuh) dengan QR + muat naik bukti
   - polisi pembatalan
   - butang **Sahkan tempahan**

Selepas berjaya:
- skrin kejayaan dengan konfeti (gaya sedia ada)
- **kod tempahan** dan QR untuk daftar masuk
- butang *Tambah ke kalendar* dan *Kongsi ke WhatsApp* (`wa.me` dengan teks ringkasan)

### 5.5 Temujanji (ganti status pesanan)
- Tab **Akan datang / Lepas**.
- Kad dengan status: Menunggu · Disahkan · Hadir · Selesai · Batal · Tidak hadir. Status bukti DuitNow dipaparkan sama seperti sekarang.
- Tindakan:
  - **Tunda**: buka langkah 2–3 semula, dengan servis dan staf dikekalkan.
  - **Batal**: percuma jika > `cancelHours`. Jika lewat, tunjuk amaran tentang deposit.
  - **Tempah semula**.
- Butiran: QR daftar masuk (kod tempahan), arah ke kedai (pautan peta), dan nombor telefon kedai.

### 5.6 Cap & Point (dikekalkan)
- Kod QR ahli (sedia ada, dijana dalam JS).
- Kad cap: **1 temujanji selesai = 1 cap**, `stampTarget` = 8. Bentuk cap ikut tema (check, cup, leaf, bowl...). Untuk booking, tambah ikon `scissors` / `star`.
- Point = RM × `pointsPerRM`, ditambah bila admin tanda **Selesai**.
- Sejarah point.

### 5.7 Ganjaran (dikekalkan)
Contoh ganjaran:

| Ganjaran | Point |
|---|---|
| Servis percuma (kad cap penuh) | — |
| Diskaun RM10 | 300 |
| Cuci rambut percuma | 200 |
| Rawatan kulit kepala | 500 |

Tebus untuk mendapat kod baucar bertempoh 10 minit (sama seperti sekarang). Baucar boleh juga dipilih semasa langkah Sahkan.

### 5.8 Profil (dikekalkan)
- Nama, telefon, tahap.
- **Reka bentuk app** (pemilih 10 tema).
- Pasang app (PWA).
- **Mod demo**:
  - *Isi data contoh*
  - *Simulasi: tandakan temujanji terakhir Selesai*
  - *Set semula data*

---

## 6. Dashboard admin (`admin.html`)

Navigasi kekal: **tab bar boleh disembunyikan (H)** di komputer, dan **sidebar laci** di telefon. PIN demo **1234**.

| Tab | Kandungan |
|---|---|
| **Ringkasan** | Temujanji hari ini, hasil minggu ini, kadar tidak hadir, servis teratas, carta 7 hari, staf paling sibuk |
| **Hari ini** (ganti Kaunter) | Garis masa menegak mengikut staf (lajur = staf, baris = jam), dengan garis "sekarang". Kad temujanji berwarna ikut status. Ketik kad untuk **Hadir / Selesai / Tidak hadir**. Butang **Imbas QR** untuk daftar masuk (kamera, sedia ada), dan butang **+ Walk-in** untuk tempahan pantas pada slot kosong |
| **Kalendar** | Paparan Minggu / Bulan. Seret untuk pindah masa (desktop), atau ketik untuk ubah masa. Sekat slot (rehat, cuti, acara) disimpan ke `bk-blocks-v1` |
| **Tempahan** | Senarai dengan penapis (tarikh, staf, status, bayaran). Sahkan atau tolak, semak **bukti DuitNow** (sedia ada), tunda, batal, eksport CSV |
| **Pelanggan** | Ahli: point, cap, tahap, jumlah temujanji, tidak hadir, nota. Tambah point atau cap secara manual |
| **Servis & Staf** | CRUD servis (harga, tempoh, deposit, tambahan, staf layak, aktif/sembunyi) dan CRUD staf (nama, peranan, warna, hari cuti, waktu sendiri) |
| **Promosi** | Dikekalkan sepenuhnya (editor banner, tarikh, sasaran, pautan ke servis) |
| **Ganjaran** | Dikekalkan |
| **Tetapan** | Waktu operasi per hari, cuti umum, `slotStep`, `buffer`, `leadMin`, `maxDays`, polisi batal, deposit, DuitNow (nama + QR), loyalti (cap & point), **reka bentuk app pelanggan** + suis pemilih tema |

Penyegerakan app ↔ admin melalui event `storage`, sama seperti sekarang. Tempahan baharu memunculkan notifikasi toast dan lencana pada tab Tempahan.

---

## 7. 10 reka bentuk (dikekalkan)

Semua token `:root[data-theme=...]` dikekalkan (`--brand`, `--brand-2`, `--brand-deep`, `--brand-rgb`, fon, gaya kad, nav). Komponen baharu mesti guna token sahaja, tanpa warna keras:

| Komponen baharu | Token / nota |
|---|---|
| Kad servis | gaya kad menu setiap tema (bento, clay, glass, grid...) |
| Jalur tarikh & grid slot | `--brand` untuk dipilih, `--surface` untuk biasa, coret untuk penuh |
| Kad staf | bulatan avatar dengan `staff.color`, dan cincin `--brand` bila dipilih |
| Garis masa admin | warna status (tidak ikut tema) |
| Penunjuk langkah | `--brand` dan `--brand-rgb` alpha |

Penyesuaian khas:
- **★ Promo Carousel**: karusel promosi di Home, togol **Hari ini | Tarikh lain** (ganti Pickup | Pre-order), dan rel kategori kiri pada skrin Servis.
- **★ Sage Curve**: panel melengkung untuk helaian servis, tab kategori menegak, dan lukisan servis (gunting, pengering, daun) menggantikan lukisan minuman.
- **Matcha Zen** & **Indigo Ramen**: corak latar dikekalkan. Cap guna ikon `leaf` / `star`.
- Pratonton: `?tema=promo|sage|frost|grid|noir|aurora|clay|indigo|matcha|ruby` (sama).

---

## 8. Akaun demo & data contoh

Bila `bk-bookings-v1` kosong, isi automatik (fungsi `seedDemo()`):

- **Ahli demo**: Aisyah, 012-345 6789, Gold, 1,250 point, kad cap 5/8.
- **Staf**: Aina, Faris, Mei.
- **Temujanji**:
  - hari ini: 6 temujanji (campuran Disahkan / Hadir / Selesai)
  - esok: 1 milik Aisyah (*Potong Rambut + Cuci rambut, 2:30 PTG, Aina*)
  - minggu depan: 4 temujanji
  - lepas: 8 temujanji (2 Batal, 1 Tidak hadir) untuk carta
- **Bukti DuitNow**: 1 tempahan "Menunggu semakan" untuk demo semakan bayaran.
- **Promosi**: 3 banner, contohnya "Isnin–Rabu 20% Facial", "Bawa kawan, dapat 100 point", "Pakej Pengantin".
- Admin PIN **1234**. Butang **Set semula data demo** di Tetapan (admin) dan Profil (app).

> ⚠️ Kekalkan amaran versi demo di PANDUAN dan halaman jualan: data disimpan dalam pelayar, tidak disegerakkan antara peranti, dan PIN bukan keselamatan sebenar. Untuk operasi sebenar, sambung ke Firebase (Firestore + Auth). Fungsi yang perlu ditukar: `load()`, `save()`, `saveBooking()`, `availableSlots()` (perlu transaksi untuk elak tempahan berganda), `updateStatus()` dan `saveSettings()`.

---

## 9. Pelan kerja (fasa)

1. **Asas**: salin repo, tukar jenama "Studio Demo", ikon, `services.js`, kunci localStorage, `sw.js` VERSION.
2. **Servis**: skrin Servis dan helaian servis (dengan tambahan) untuk semua 10 tema.
3. **Enjin slot**: `availableSlots()`, `seedDemo()`, dan ujian unit ringkas dalam konsol (`?test=1`).
4. **Aliran tempahan**: 4 langkah, skrin kejayaan, .ics, WhatsApp.
5. **Temujanji**: senarai, tunda, batal, QR daftar masuk.
6. **Loyalti**: cap & point bila Selesai, ganjaran, baucar dalam Sahkan.
7. **Admin**: Hari ini (garis masa), Kalendar, Tempahan, Servis & Staf, Tetapan waktu.
8. **Tema khas**: penyesuaian Promo Carousel & Sage Curve, semakan visual untuk 10 tema.
9. **Dokumentasi & jualan**: PANDUAN.md, CHANGELOG, gambar Gumroad, video promosi (HyperFrames, seperti template kafe).

---

## 10. Senarai semak ujian (Playwright)

- [ ] Splash → Home untuk 10 tema, tanpa ralat konsol.
- [ ] Tempah Potong Rambut + Cuci → Aina → esok → 14:30. Kad "Temujanji seterusnya" muncul di Home.
- [ ] Slot 14:30–15:30 Aina hilang untuk tempahan lain. Slot "Mana-mana staf" masih ada jika Faris bebas.
- [ ] Hari Ahad (tutup) dan 25 Dis (cuti) dikelabukan.
- [ ] Slot hari ini sebelum `now + leadMin` tidak dipaparkan.
- [ ] Bayaran DuitNow: muat naik bukti, admin nampak "Menunggu semakan", tekan Sahkan, dan app bertukar "Disahkan".
- [ ] Admin tanda **Selesai**: cap +1, point bertambah ikut RM, dan app dikemas kini tanpa muat semula (event `storage`).
- [ ] Batal > 24 jam: percuma. Batal < 24 jam: amaran deposit.
- [ ] Tunda: slot lama dibebaskan, slot baharu ditempah.
- [ ] Imbas QR (kod tempahan) di admin → status Hadir.
- [ ] Tetapan waktu operasi diubah di admin → grid slot di app berubah.
- [ ] Telefon 390px dan desktop 1280px: tiada skrol mendatar, kawasan selamat (notch) dihormati.
- [ ] Mod luar talian (service worker): app dibuka dan temujanji sedia ada dipaparkan.

---

## 11. Bahan jualan (cadangan)

- **Nama produk:** *Template Sistem Tempahan — PWA, 10 Reka Bentuk (Demo, Lesen 1 Kedai)*
- **Sasaran:** salun, barber, spa, klinik kecantikan, studio, gelanggang.
- **Harga cadangan:** RM 149–249 (lebih tinggi dari template kafe kerana enjin slot & kalendar admin).
- **Bundle:** Kafe + Booking dengan diskaun.
- **Video:** (1) tutorial skrin satu per satu, (2) slaid 10 reka bentuk. Guna semula komposisi HyperFrames sedia ada dengan tangkapan skrin baharu.
