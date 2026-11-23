# Arahan Pembinaan Terperinci — Template Sistem Tempahan (Booking)

> Pasangan kepada `BOOKING-SPEC.md`. Spesifikasi menerangkan **apa** yang dibina. Dokumen ini menerangkan **bagaimana**: langkah demi langkah, fungsi yang diguna semula atau ditulis semula, kod teras, dan prompt sedia-tampal untuk setiap fasa.
>
> Asas: repo `template-loyalty` (vanilla HTML/CSS/JS, `index.html` ±2000 baris, `admin.html` ±1650 baris, `menu.js`, `promo.js`, `sw.js`).

---

## 0. Persediaan

### 0.1 Cipta repo baharu
1. Di GitHub, buka `template-loyalty`, tekan **Use this template**, kemudian **Create a new repository**.
   - Nama: `template-booking`, peribadi (private).
2. Klon repo dan buat branch kerja:
   ```bash
   git clone https://github.com/<akaun>/template-booking.git
   cd template-booking
   git checkout -b booking-v1
   ```
3. Jalankan pelayan tempatan:
   ```bash
   python3 -m http.server 8765
   ```
   - App: `http://localhost:8765/`
   - Admin: `http://localhost:8765/admin.html` (PIN 1234)

### 0.2 Peraturan kerja (wajib ikut sepanjang projek)
- **Jangan tambah framework, library atau langkah build.** Semua dalam `index.html`, `admin.html` dan `services.js`.
- **Warna hanya melalui token tema** (`var(--brand)`, `var(--surface)`, `var(--ink)`...). Tiada hex keras dalam komponen baharu, kecuali warna status dan `staff.color`.
- Setiap kali ubah fail cache, naikkan `VERSION` dalam `sw.js`.
- Selepas setiap fasa:
  1. Uji 10 tema dengan `?tema=` (lihat §11).
  2. Pastikan tiada ralat konsol.
  3. Commit.
- Teks UI dalam **Bahasa Melayu**. Format masa 12 jam: "2:30 PTG", "10:00 PG".

---

## 1. Peta perubahan fungsi

### 1.1 `index.html`

| Fungsi sedia ada | Tindakan | Ganti / nota |
|---|---|---|
| `load()`, `save()`, `applyShared()` | **Ubah** | kunci `bk-*`; `applyShared()` baca `bk-services-v1`, `bk-staff-v1`, `bk-settings-v1` |
| `go()`, `moveNavInd()`, `render()` | **Kekal** | tambah skrin `book`, buang `menu` → `services` |
| `endSplash()`, `confetti()`, `toast()`, `countUp()` | **Kekal** | — |
| `openSheet()`, `closeSheet()`, `sheetTop()`, `confirmBox()` | **Kekal** | diguna untuk helaian servis & aliran tempahan |
| `applyTheme()`, `pickTheme()`, `openThemes()`, `themeFromUrl()`, `currentThemeId()` | **Kekal** | — |
| `qrSVG()`, `showQR()`, `genCode()` | **Kekal** | QR ahli + QR kod tempahan |
| `tierInfo()`, `tierRank()`, `claimStamp()`, `askRedeem()`, `doRedeem()`, `voucherSheet()`, `monthPoints()` | **Kekal** | cap/point kini diberi oleh admin semasa Selesai |
| `renderPromoHome()`, `promo*()`, `openPromo()`, `visiblePromos()`, `loadPromos()` | **Kekal** | `promoGoLink()`: pautan `menu:<id>` → `service:<id>` |
| `compressImage()` | **Kekal** | bukti DuitNow |
| `drinkArt()` | **Ubah** | `serviceArt(icon)` untuk Sage Curve (gunting, pengering, daun, titisan) |
| `renderMenu()`, `renderMenuPromo()`, `pmSections()`, `pmSetCat()` | **Tulis semula** | `renderServices()`, `renderServicesPromo()` (rel kiri dikekalkan) |
| `openProduct()`, `renderProduct()`, `pickPrice()`, `pickQty()`, `groupCount()`, `lineHTML()`, `addLine()` | **Buang** | `openService()`, `renderService()`, `toggleExtra()` |
| `openCart()`, `renderCartBar()`, `cartTotal()`, `renderCheckout()`, `onCheckoutClick()`, `resetCO()` | **Buang** | `openBooking()`, `renderBookStep()`, `bookNext()`, `bookBack()` |
| `slotsFor()`, `pickupDays()`, `pickupLabel()`, `asapOpen()`, `dayLabel()`, `dayStart()` | **Tulis semula** | enjin slot dalam §4 (`availableSlots()`, `bookableDays()`, `fmtTime()`, `fmtDay()`) |
| `placeOrder()` | **Ganti** | `saveBooking()` |
| `latestOrder()`, `renderOrderTile()`, `showOrder()` | **Ganti** | `nextBooking()`, `renderNextTile()`, `showBooking()` |
| `demoBuy()` | **Ganti** | `demoComplete()` (tandakan temujanji terakhir Selesai) |
| `editName()`, `saveName()` | **Ubah** | tambah medan telefon |

### 1.2 `admin.html`

| Fungsi sedia ada | Tindakan | Ganti / nota |
|---|---|---|
| `enter()`, `go()`, `openDrawer()`, `closeDrawer()`, `moveTabInd()`, `setTabsHidden()`, `readTabsHidden()` | **Kekal** | senarai tab baharu (§7) |
| `load()`, `hydrate()`, `seedDB()`, `resetDemo()`, `rng()` | **Ubah** | `seedDemo()` dikongsi (§5) |
| `renderOverview()`, `drawBars()`, `feedRow()`, `ago()` | **Ubah** | metrik temujanji |
| `startScan()`, `stopScan()`, `renderCounterMember()`, `findMember()` | **Kekal** | QR ahli **atau** kod tempahan → daftar masuk |
| `recordBuy()` | **Ganti** | `quickWalkin()` |
| `renderOrders()`, `advanceOrder()`, `setPay()`, `viewProof()`, `orderItemHTML()`, `renderOrderBadge()`, `seedOrders()` | **Ganti** | `renderBookings()`, `setStatus()`, `setPay()` (kekal), `viewProof()` (kekal), `bookingRowHTML()`, `renderBookingBadge()` |
| `renderMenuAdmin()`, `editProduct()`, `saveProduct()`, `deleteProduct()`, `toggleProduct()` | **Ganti** | `renderServicesAdmin()`, `editService()`, `saveService()`... serta `renderStaffAdmin()`, `editStaff()`, `saveStaff()` |
| `renderMembers()`, `openMember()`, `updateMember()`, `adjust()`, `custAsMember()`, `tierOf()` | **Kekal** | tambah lajur jumlah temujanji & tidak hadir |
| `renderPromos()`, `editPromo()`... (semua promo) | **Kekal** | pautan ke servis |
| `renderRewards()`, `editReward()`... `checkVoucher()`, `useVoucher()`, `redeemFor()` | **Kekal** | — |
| `renderSettings()`, `saveSettings()`, `renderSetSwitches()`, `renderThemeGrid()`, `applyAdminTheme()`, `renderQRPrev()` | **Ubah** | waktu operasi per hari, cuti, slot, deposit (§7.9) |
| `exportCSV()` | **Ubah** | lajur temujanji |
| — | **Baharu** | `renderToday()`, `renderCalendar()`, `openBlock()`, `saveBlock()`, `rescheduleBooking()` |

---

## 2. Fasa 1 — Asas & penjenamaan

### Langkah
1. **Jenama**: cari dan ganti `Kafe Demo` dengan `Studio Demo`, dan `kafé` dengan `studio.`, dalam `index.html`, `admin.html`, `manifest.webmanifest`, `PANDUAN.md` dan `README.md`.
2. **Ikon**: hasilkan `icons/wordmark.png` (teks `studio.` putih, latar lutsinar, 640×250), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` dan `logo-circle.png`. Gantikan base64 `<img class="wm" src="data:...">` di kedua-dua fail.
3. **Splash**: laraskan `.sp-slide` (`clip-path:inset(0 X% 0 0)` dan `translateX(Y%)`) supaya huruf `s` muncul dahulu (lihat PANDUAN §4).
4. **Data**: namakan semula `menu.js` kepada `services.js`, dan isikan `SHOP_SERVICES`, `SHOP_STAFF` dan `SHOP_SETTINGS` seperti `BOOKING-SPEC.md` §3. `SHOP_THEMES` disalin tanpa ubah.
5. Tukar `<script src="menu.js">` kepada `services.js` di kedua-dua HTML.
6. **Kunci storan**: cari `kafe-` dan ganti dengan `bk-`. Tukar nama:
   - `kafe-loyalty-v1` → `bk-member-v1`
   - `kafe-orders-v1` → `bk-bookings-v1`
   - `kafe-menu-v1` → `bk-services-v1`
   - buang `kafe-cart-v1`
   - tambah `bk-staff-v1` dan `bk-blocks-v1`
7. **sw.js**: `VERSION = "booking-v1.0.0"`, dan dalam `SHELL` tukar `menu.js` kepada `services.js`.
8. **Nav bawah**: `Home · Servis · Temujanji · Cap & Point · Profil`. Ganjaran dibuka dari Cap & Point (butang "Ganjaran →") dan Profil.

### Kriteria siap
- App dan admin boleh dibuka dengan jenama baharu dan tiada ralat konsol (walaupun skrin Servis masih kosong).
- `localStorage` hanya ada kunci `bk-*`.

### Prompt sedia-tampal
```
Dalam repo ini (vanilla HTML/CSS/JS, tanpa build), laksanakan Fasa 1 dalam BOOKING-INSTRUCTIONS.md:
tukar jenama ke "Studio Demo"/"studio.", namakan menu.js -> services.js dengan data dari BOOKING-SPEC.md §3,
tukar semua kunci localStorage kafe-* ke bk-* ikut jadual, kemas kini sw.js dan manifest, dan susun nav bawah baharu.
Jangan ubah token tema. Uji ?tema= untuk 10 tema dengan Playwright, pastikan tiada ralat konsol, kemudian commit.
```

---

## 3. Fasa 2 — Skrin Servis & helaian servis

### 3.1 HTML skrin
```html
<section class="screen" id="s-services">
  <header class="sv-head">
    <h1>Servis</h1>
    <button class="icon-btn" data-action="svSearch" aria-label="Cari">…</button>
  </header>
  <div class="cats" id="svCats"></div>          <!-- cip mendatar (tema biasa) -->
  <div class="sv-list" id="svList"></div>       <!-- kad servis -->
</section>
```
Tema `promo` dan `sage` guna susun atur rel kiri sedia ada. Salin struktur `renderMenuPromo()` dan `.pm-cats` ke `renderServicesPromo()`, dan tukar kandungan item.

### 3.2 Kad servis
```js
function serviceCard(s){
  const dur = s.dur + " min";
  return `<button class="sv-card" data-action="openService" data-id="${s.id}">
    <div class="sv-pic">${picHTMLAny(s)}</div>
    <div class="sv-body">
      ${s.tag ? `<span class="sv-tag">${esc(s.tag)}</span>` : ""}
      <b class="sv-name">${esc(s.name)}</b>
      <span class="sv-meta">⏱ ${dur} · ${s.staff?.length ? staffNames(s.staff) : "Semua staf"}</span>
      <span class="sv-price">RM ${s.price.toFixed(2)}${s.deposit ? ` <small>deposit RM${s.deposit}</small>` : ""}</span>
    </div>
  </button>`;
}
```
CSS: guna semula gaya kad menu setiap tema (`.mi`, `.pm-item` dan sebagainya). Tambah `.sv-meta{color:var(--muted);font-size:13px}`.

### 3.3 Helaian servis
- Kandungan:
  - gambar/ikon besar
  - nama, penerangan
  - **senarai tambahan** (checkbox: nama · +RM · +min)
  - ringkasan langsung "Jumlah RM 45.00 · 60 min"
  - butang **Pilih masa →**
- Keadaan sementara:
  ```js
  let draft = { serviceId, extras:[], staffId:null, date:null, start:null, pay:"counter", note:"", voucher:null }
  ```
- `toggleExtra(id)` mengemas kini `draft.extras` dan ringkasan.
- **Pilih masa →** memanggil `openBooking(draft)`.

### Kriteria siap
- 5 servis dipaparkan mengikut kategori dalam 10 tema. Rel kiri berfungsi dalam Promo & Sage (scroll-spy dan carian).
- Jumlah harga dan tempoh berubah bila tambahan ditanda.

### Prompt
```
Laksanakan Fasa 2: skrin #s-services (ganti #s-menu), serviceCard(), renderServices() dan renderServicesPromo()
(salin corak rel kiri dari renderMenuPromo), helaian servis dengan tambahan (toggleExtra) dan objek draft.
Buang openProduct/renderProduct/addLine/troli. Gaya ikut token tema. Uji 10 tema dan tangkap skrin.
```

---

## 4. Fasa 3 — Enjin slot (teras)

Letakkan di bahagian `<script>` yang **sama dalam `index.html` dan `admin.html`**. Lebih kemas: masukkan ke `services.js` di bawah `window.BK`, supaya kedua-dua fail berkongsi kod yang sama.

```js
window.BK = (function(){
  const DAY = 864e5;
  const pad = n => String(n).padStart(2,"0");
  const toMin = hhmm => { const [h,m] = hhmm.split(":").map(Number); return h*60+m; };
  const toHHMM = min => pad(Math.floor(min/60)) + ":" + pad(min%60);
  const ymd = d => d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
  const parseYMD = s => { const [y,m,d] = s.split("-").map(Number); return new Date(y, m-1, d); };

  function get(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
  function settings(){ return Object.assign({}, SHOP_SETTINGS, get("bk-settings-v1", {})); }
  function services(){ return get("bk-services-v1", null) || SHOP_SERVICES; }
  function staff(){ return get("bk-staff-v1", null) || SHOP_STAFF; }
  function bookings(){ return get("bk-bookings-v1", []); }
  function blocks(){ return get("bk-blocks-v1", []); }

  const ACTIVE = b => b.status !== "cancelled" && b.status !== "noshow";

  function duration(serviceId, extras){
    const s = services().find(x => x.id === serviceId); if(!s) return 0;
    return s.dur + (extras||[]).reduce((t,id) => t + ((s.extras||[]).find(e => e.id === id)?.dur || 0), 0);
  }
  function price(serviceId, extras){
    const s = services().find(x => x.id === serviceId); if(!s) return 0;
    return s.price + (extras||[]).reduce((t,id) => t + ((s.extras||[]).find(e => e.id === id)?.price || 0), 0);
  }
  function eligibleStaff(serviceId){
    const s = services().find(x => x.id === serviceId);
    return staff().filter(p => p.active !== false && (!s?.staff?.length || s.staff.includes(p.id)));
  }
  function hoursFor(dateStr, staffMember){
    const st = settings(), d = parseYMD(dateStr), dow = d.getDay();
    if ((st.holidays||[]).includes(dateStr)) return null;
    if (staffMember && (staffMember.off||[]).includes(dow)) return null;
    const h = (staffMember?.hours && staffMember.hours[dow] !== undefined) ? staffMember.hours[dow] : st.hours[dow];
    return h ? [toMin(h[0]), toMin(h[1])] : null;
  }
  // Selang sibuk seorang staf pada satu tarikh: [[mula, tamat], ...] dalam minit, termasuk buffer
  function busy(dateStr, staffId, ignoreId){
    const buf = settings().buffer || 0;
    const a = bookings().filter(b => b.date === dateStr && b.staffId === staffId && ACTIVE(b) && b.id !== ignoreId)
                        .map(b => [toMin(b.start), toMin(b.end) + buf]);
    const c = blocks().filter(k => k.date === dateStr && (k.staffId === staffId || k.staffId === "all"))
                      .map(k => [toMin(k.start), toMin(k.end)]);
    return a.concat(c);
  }
  const overlap = (s1,e1,s2,e2) => s1 < e2 && s2 < e1;

  function freeFor(dateStr, staffMember, startMin, dur, ignoreId){
    const h = hoursFor(dateStr, staffMember); if(!h) return false;
    if (startMin < h[0] || startMin + dur > h[1]) return false;
    return !busy(dateStr, staffMember.id, ignoreId).some(([s,e]) => overlap(startMin, startMin+dur, s, e));
  }

  /** Senarai slot "HH:MM" untuk tarikh, servis, tambahan & staf ("any" = mana-mana) */
  function availableSlots(dateStr, serviceId, extras, staffId, ignoreId){
    const st = settings(), dur = duration(serviceId, extras); if(!dur) return [];
    const pool = staffId === "any" ? eligibleStaff(serviceId) : eligibleStaff(serviceId).filter(p => p.id === staffId);
    if (!pool.length) return [];
    const now = new Date(), isToday = dateStr === ymd(now);
    const minStart = isToday ? now.getHours()*60 + now.getMinutes() + (st.leadMin||0) : 0;
    const shopH = hoursFor(dateStr, null); if(!shopH) return [];
    const out = [];
    for (let t = shopH[0]; t + dur <= shopH[1]; t += st.slotStep || 15){
      if (t < minStart) continue;
      if (pool.some(p => freeFor(dateStr, p, t, dur, ignoreId))) out.push(toHHMM(t));
    }
    return out;
  }

  /** Pilih staf untuk "any": staf bebas dengan paling sedikit temujanji hari itu */
  function assignStaff(dateStr, serviceId, extras, start, ignoreId){
    const dur = duration(serviceId, extras), t = toMin(start);
    const free = eligibleStaff(serviceId).filter(p => freeFor(dateStr, p, t, dur, ignoreId));
    if (!free.length) return null;
    const load = id => bookings().filter(b => b.date === dateStr && b.staffId === id && ACTIVE(b)).length;
    return free.sort((a,b) => load(a.id) - load(b.id))[0].id;
  }

  /** 14/30 hari boleh ditempah, dengan status: "closed" | "full" | "few" | "ok" */
  function bookableDays(serviceId, extras, staffId, n){
    const st = settings(), out = [], base = new Date(); base.setHours(0,0,0,0);
    for (let i = 0; i < Math.min(n || 14, st.maxDays || 30); i++){
      const d = new Date(base.getTime() + i*DAY), key = ymd(d);
      if (!hoursFor(key, null)) { out.push({date:key, state:"closed"}); continue; }
      const c = availableSlots(key, serviceId, extras, staffId).length;
      out.push({date:key, state: c === 0 ? "full" : c <= 3 ? "few" : "ok", count:c});
    }
    return out;
  }

  function fmtTime(hhmm){ const m = toMin(hhmm), h = Math.floor(m/60), mm = pad(m%60);
    return ((h+11)%12+1) + ":" + mm + (h < 12 ? " PG" : " PTG"); }
  const HARI = ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"];
  const BULAN = ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogo","Sep","Okt","Nov","Dis"];
  function fmtDay(dateStr){
    const d = parseYMD(dateStr), t = new Date(); t.setHours(0,0,0,0);
    const diff = Math.round((d - t)/DAY);
    if (diff === 0) return "Hari ini"; if (diff === 1) return "Esok";
    return HARI[d.getDay()] + ", " + d.getDate() + " " + BULAN[d.getMonth()];
  }
  function period(hhmm){ const h = toMin(hhmm)/60; return h < 12 ? "Pagi" : h < 18 ? "Petang" : "Malam"; }

  return { toMin, toHHMM, ymd, parseYMD, settings, services, staff, bookings, blocks, duration, price,
           eligibleStaff, availableSlots, assignStaff, bookableDays, fmtTime, fmtDay, period, ACTIVE, HARI, BULAN };
})();
```

### Ujian konsol (`?test=1`)
Tambah di hujung `index.html`. Ia hanya berjalan bila URL mengandungi `test=1`:
```js
if (/[?&]test=1/.test(location.search)) {
  const tomorrow = BK.ymd(new Date(Date.now() + 864e5));
  const s0 = BK.availableSlots(tomorrow, "cut", ["wash"], "aina");
  console.assert(s0.length > 0, "ada slot esok");
  localStorage.setItem("bk-bookings-v1", JSON.stringify([{id:"T1", date:tomorrow, staffId:"aina",
    serviceId:"cut", extras:["wash"], start:s0[0], end:BK.toHHMM(BK.toMin(s0[0]) + 60), status:"confirmed"}]));
  const s1 = BK.availableSlots(tomorrow, "cut", ["wash"], "aina");
  console.assert(!s1.includes(s0[0]), "slot yang ditempah hilang");
  console.assert(BK.availableSlots(tomorrow, "cut", ["wash"], "any").includes(s0[0]) === !!BK.assignStaff(tomorrow,"cut",["wash"],s0[0]), "any konsisten");
  console.log("BK tests selesai");
}
```

### Kriteria siap
Semua `console.assert` lulus. Hari Ahad dan `holidays` memberi `[]`, dan slot hari ini bermula selepas `now + leadMin`.

### Prompt
```
Tambah window.BK (kod penuh dalam BOOKING-INSTRUCTIONS.md §4) ke services.js supaya dikongsi app & admin.
Tambah ujian ?test=1. Jalankan dengan Playwright, laporkan output konsol, dan betulkan sehingga semua assert lulus.
```

---

## 5. Data demo — `seedDemo()`

Satu fungsi dalam `services.js` (`BK.seedDemo(force)`). Ia dipanggil oleh `load()` di app dan admin bila `bk-bookings-v1` kosong.

```js
BK.seedDemo = function(force){
  if (!force && localStorage.getItem("bk-bookings-v1")) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const D = n => BK.ymd(new Date(today.getTime() + n*864e5));
  const names = ["Aisyah","Hana","Iman","Zara","Amir","Danish","Sofia","Nurul","Haziq","Lina","Aiman","Mira"];
  const mk = (i, dayOff, staffId, serviceId, start, status, extra={}) => {
    const extras = extra.extras || [];
    const end = BK.toHHMM(BK.toMin(start) + BK.duration(serviceId, extras));
    return Object.assign({ id:"B"+(1000+i), code:Math.random().toString(36).slice(2,6).toUpperCase(),
      memberId: extra.memberId || ("c"+i), name: extra.name || names[i % names.length], phone:"01"+(2+i%7)+"-555 0"+(100+i),
      serviceId, extras, staffId, date:D(dayOff), start, end, price:BK.price(serviceId, extras), deposit:0,
      pay:"counter", payStatus:"none", status, note:"", source:"app", createdAt:Date.now() - (10-dayOff)*864e5 }, extra);
  };
  const list = [
    // lepas (untuk carta & sejarah)
    mk(1,-6,"aina","cut","11:00","done"), mk(2,-5,"faris","beard","15:00","done"),
    mk(3,-4,"mei","facial","12:00","done"), mk(4,-3,"aina","color","10:00","done"),
    mk(5,-3,"faris","cut","17:00","cancelled"), mk(6,-2,"mei","mani","14:00","noshow"),
    mk(7,-1,"aina","cut","16:00","done",{memberId:"m1",name:"Aisyah",extras:["wash"]}),
    mk(8,-1,"faris","cut","19:00","cancelled"),
    // hari ini
    mk(9,0,"aina","cut","10:00","done"), mk(10,0,"faris","beard","11:00","arrived"),
    mk(11,0,"mei","facial","13:00","confirmed"), mk(12,0,"aina","color","14:00","confirmed",{deposit:50}),
    mk(13,0,"faris","cut","16:30","confirmed"),
    mk(14,0,"mei","mani","18:00","pending",{pay:"duitnow",payStatus:"pending",proof:BK.DEMO_PROOF||""}),
    // esok: temujanji Aisyah (untuk kad "Temujanji seterusnya")
    mk(15,1,"aina","cut","14:30","confirmed",{memberId:"m1",name:"Aisyah",extras:["wash"]}),
    // minggu depan
    mk(16,3,"faris","cut","12:00","confirmed"), mk(17,4,"mei","facial","15:00","confirmed"),
    mk(18,5,"aina","color","11:00","pending"), mk(19,6,"faris","beard","18:30","confirmed"),
  ];
  localStorage.setItem("bk-bookings-v1", JSON.stringify(list));
  localStorage.setItem("bk-member-v1", JSON.stringify({ id:"m1", name:"Aisyah", phone:"012-345 6789",
    points:1250, stamps:5, tier:"Gold", joined:D(-120), history:[] }));
  localStorage.setItem("bk-blocks-v1", JSON.stringify([{id:"K1", date:D(0), staffId:"all", start:"13:00", end:"14:00", label:"Rehat makan tengah hari"}]));
};
```

> Nota: kalau slot hari ini sudah lepas waktu (demo dibuka waktu malam), status "confirmed" hari ini masih dipaparkan di admin. Itu dijangka.

---

## 6. Fasa 4 — Aliran tempahan (app)

### 6.1 Struktur helaian
```html
<div class="bk-sheet">
  <div class="bk-steps"><i class="on"></i><i></i><i></i><i></i></div>   <!-- penunjuk langkah -->
  <div class="bk-head"><button data-action="bookBack">‹</button><b id="bkTitle">Pilih staf</b></div>
  <div class="bk-body" id="bkBody"></div>
  <div class="bk-foot"><div id="bkSum"></div><button class="btn" id="bkNext" data-action="bookNext" disabled>Seterusnya</button></div>
</div>
```

### 6.2 Langkah & peraturan

| Langkah | Kandungan `#bkBody` | `bkNext` aktif bila | Nota |
|---|---|---|---|
| 1 Staf | Kad "Mana-mana staf" (jika `anyStaff`) dan kad setiap `eligibleStaff()`: avatar bulat warna `staff.color` dengan huruf awal, nama, peranan, "Cuti hari ini" jika `off` termasuk hari ini | staf dipilih | Langkau automatik jika hanya 1 staf layak |
| 2 Tarikh | Jalur mendatar `bookableDays(…, 14)`. Setiap cip: hari pendek, tarikh, titik status (`few` = oren, `full`/`closed` = kelabu dan tidak boleh ditekan). Butang "Kalendar" buka grid bulan (`maxDays`) | tarikh dipilih | Lalai: hari pertama yang `ok`/`few` |
| 3 Masa | `availableSlots()` dikumpul ikut `BK.period()` dalam 3 seksyen (Pagi/Petang/Malam). Grid 4 lajur, butang `fmtTime()` | slot dipilih | Tiada slot: "Penuh. Cuba tarikh lain" dan butang kembali |
| 4 Sahkan | Ringkasan (servis, tambahan, staf, tarikh, masa & tamat, tempoh, harga), medan nama & telefon (dari profil), nota, baucar (jika ada), bayaran (Di kedai / DuitNow + QR + muat naik bukti dengan `compressImage()`), polisi batal | nama & telefon diisi; jika DuitNow dan ada deposit, bukti dimuat naik | Butang menjadi **Sahkan tempahan** |

Animasi antara langkah: `transform: translateX(±24px)` dan `opacity`, 220 ms (sama gaya dengan peralihan skrin sedia ada).

### 6.3 `saveBooking()`
```js
function saveBooking(){
  const st = BK.settings();
  // 1) semak semula ketersediaan (elak tempahan berganda)
  const slots = BK.availableSlots(draft.date, draft.serviceId, draft.extras, draft.staffId);
  if (!slots.includes(draft.start)) { toast("Maaf, slot ini baru sahaja diambil. Pilih masa lain."); return gotoStep(3); }
  // 2) tetapkan staf jika "any"
  const staffId = draft.staffId === "any" ? BK.assignStaff(draft.date, draft.serviceId, draft.extras, draft.start) : draft.staffId;
  const svc = BK.services().find(s => s.id === draft.serviceId);
  const price = BK.price(draft.serviceId, draft.extras);
  const deposit = st.depositMode === "service" ? (svc.deposit || 0)
                : st.depositMode === "percent" ? Math.round(price * st.depositPercent) / 100 : 0;
  const b = { id:"B"+Date.now().toString().slice(-6), code:genCode(4), memberId:state.id, name:draft.name, phone:draft.phone,
    serviceId:draft.serviceId, extras:draft.extras, staffId, date:draft.date, start:draft.start,
    end:BK.toHHMM(BK.toMin(draft.start) + BK.duration(draft.serviceId, draft.extras)),
    price, deposit, pay:draft.pay, proof:draft.proof || "", payStatus: draft.pay === "duitnow" ? "pending" : "none",
    status: (draft.pay === "duitnow" || st.requireApproval) ? "pending" : "confirmed",
    note:draft.note, voucher:draft.voucher || null, source:"app", createdAt:Date.now() };
  const all = BK.bookings(); all.push(b);
  localStorage.setItem("bk-bookings-v1", JSON.stringify(all));
  if (draft.voucher) markVoucherUsed(draft.voucher);
  closeSheet(); confetti(); showBooking(b.id, true);   // true = skrin kejayaan
}
```

### 6.4 Skrin kejayaan
- Ikon tanda, "Tempahan diterima!" atau "Menunggu semakan bayaran", dan kod tempahan besar.
- QR `qrSVG("BK:" + b.id + ":" + b.code)`.
- Butang:
  - **Tambah ke kalendar**: muat turun `.ics`
  - **Kongsi ke WhatsApp**
  - **Selesai**
```js
function icsFor(b){
  const s = BK.services().find(x => x.id === b.serviceId);
  const dt = (d,t) => d.replace(/-/g,"") + "T" + t.replace(":","") + "00";
  const body = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Studio Demo//Booking//MS","BEGIN:VEVENT",
    "UID:"+b.id+"@studio-demo","DTSTART:"+dt(b.date,b.start),"DTEND:"+dt(b.date,b.end),
    "SUMMARY:"+s.name+" — "+CONFIG.brand,"DESCRIPTION:Kod tempahan "+b.code,"END:VEVENT","END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([body], {type:"text/calendar"}));
  a.download = "temujanji-"+b.code+".ics"; a.click();
}
function waShare(b){
  const s = BK.services().find(x => x.id === b.serviceId);
  const txt = `Temujanji ${CONFIG.brand}\n${s.name}\n${BK.fmtDay(b.date)}, ${BK.fmtTime(b.start)}\nKod: ${b.code}`;
  window.open("https://wa.me/?text=" + encodeURIComponent(txt), "_blank");
}
```

### Kriteria siap
Tempah *Potong Rambut + Cuci, Aina, esok, slot pertama*. Kemudian:
- kad Home bertukar
- slot itu hilang bila cuba tempah lagi
- fail `.ics` dimuat turun dan boleh dibuka

### Prompt
```
Laksanakan Fasa 4 ikut BOOKING-INSTRUCTIONS.md §6: helaian tempahan 4 langkah (staf, tarikh, masa, sahkan)
menggunakan window.BK, saveBooking() dengan semakan semula slot, skrin kejayaan dengan QR, .ics dan WhatsApp.
Guna openSheet/closeSheet/confetti/compressImage sedia ada. Uji aliran penuh dengan Playwright dalam tema frost, promo dan sage.
```

---

## 7. Fasa 5 — Skrin Temujanji, Home & loyalti (app)

### 7.1 `#s-appts`
- Tab **Akan datang** (tarikh ≥ hari ini, status aktif, susun menaik) dan **Lepas** (yang lain, susun menurun).
- Kad: jalur warna status di kiri, servis, staf, `fmtDay` + `fmtTime`, dan lencana status.

  | Status | Label | Warna |
  |---|---|---|
  | pending | Menunggu | `#F59E0B` |
  | confirmed | Disahkan | `#2563EB` |
  | arrived | Hadir | `#7C3AED` |
  | done | Selesai | `#16A34A` |
  | cancelled | Batal | `#9CA3AF` |
  | noshow | Tidak hadir | `#DC2626` |

- `showBooking(id)`: helaian dengan butiran, QR daftar masuk, dan butang.
  - **Tunda**: buka `openBooking()` di langkah 2 dengan `draft` diisi dan `ignoreId = b.id`. Bila disimpan, kemas kini rekod yang sama (bukan rekod baharu).
  - **Batal**: guna `confirmBox()`. Jika `(mula − sekarang) < cancelHours`, tunjuk amaran "Deposit tidak dikembalikan". Status menjadi `cancelled`.
  - **Tempah semula**: `openService(b.serviceId)` dengan tambahan yang sama.

### 7.2 Home
- `renderNextTile()`: `nextBooking()` = temujanji aktif paling hampir untuk `state.id`.
  - Ada temujanji: servis, staf (avatar), "Esok · 2:30 PTG", kiraan "dalam 18 jam", butang Lihat/Tunda.
  - Tiada: kad "Belum ada temujanji" dengan butang **Tempah sekarang**.
- Jubin **Tempah semula** (servis terakhir yang `done`).
- Kekalkan cip Point / Kad cap / Tahap dan karusel promo (tema promo).

### 7.3 Loyalti
- Cap dan point **tidak** diberi oleh app. Admin memberi semasa status menjadi `done` (§8.3), dan app menerima melalui event `storage`, lalu `applyShared()` dan `render()`.
- `demoComplete()` (Profil → Mod demo): cari temujanji terakhir milik `m1` yang belum selesai, tetapkan `done`, dan panggil `BK.award(b)` (fungsi sama seperti admin) supaya demo boleh dilakukan pada satu peranti.

```js
BK.award = function(b){            // dalam services.js, dikongsi
  if (b.awarded) return;
  const st = BK.settings();
  const m = JSON.parse(localStorage.getItem("bk-member-v1") || "null");
  if (m && m.id === b.memberId){
    const pts = Math.round(b.price * (st.pointsPerRM || 1));
    m.points += pts; m.stamps = Math.min((m.stamps||0) + 1, st.stampTarget);
    (m.history = m.history || []).unshift({ t:Date.now(), label:"Temujanji #"+b.id, pts });
    localStorage.setItem("bk-member-v1", JSON.stringify(m));
  }
  b.awarded = true;
};
```

### Prompt
```
Laksanakan Fasa 5 ikut §7: skrin Temujanji (tab, kad status, butiran, tunda dengan ignoreId, batal dengan polisi),
kad "Temujanji seterusnya" dan "Tempah semula" di Home, BK.award() dan demoComplete().
Pastikan app dikemas kini melalui event storage bila admin ubah status.
```

---

## 8. Fasa 6 — Dashboard admin

### 8.1 Tab
`Ringkasan · Hari ini · Kalendar · Tempahan · Pelanggan · Servis & Staf · Promosi · Ganjaran · Tetapan`

Kemas kini senarai tab dan butang drawer. Lencana nombor pada **Tempahan** = bilangan `pending`.

### 8.2 Ringkasan
- Kad metrik:
  - temujanji hari ini (selesai/jumlah)
  - hasil 7 hari (jumlah `price` yang `done`)
  - kadar tidak hadir 30 hari
  - pelanggan baharu
- `drawBars()`: 7 hari, bilangan temujanji `done`.
- Servis teratas (bilangan) dan staf paling sibuk.
- Suapan terkini (`feedRow()`): tempahan baharu, batal, bukti dimuat naik.

### 8.3 Hari ini (garis masa)
```html
<div class="tl-wrap">
  <div class="tl-hours"><!-- 10:00 … 22:00 setiap 30 min --></div>
  <div class="tl-cols"><!-- satu .tl-col per staf aktif hari ini -->
    <div class="tl-col" data-staff="aina">
      <div class="tl-head"><i style="background:#F472B6">A</i>Aina</div>
      <div class="tl-body"><!-- .tl-card position:absolute; top = (mula-buka)*PX; height = tempoh*PX --></div>
    </div>
  </div>
  <div class="tl-now"></div>  <!-- garis merah "sekarang", dikemas kini setiap 60 s -->
</div>
```
- `PX = 1.6` piksel/minit (desktop) atau 1.2 (telefon). Lajur boleh skrol mendatar di telefon.
- Kad: nama pelanggan, servis, masa, dan warna status. Blok rehat dipaparkan berjalur kelabu.
- Ketik kad untuk buka helaian tindakan:
  - **Hadir**: `arrived`
  - **Selesai**: `done` dan `BK.award(b)`
  - **Tidak hadir**: `noshow`
  - **Tunda**
  - **Batal**
  - **Hubungi** (`tel:` / `wa.me`)
- `setStatus(id, status)` menyimpan ke `bk-bookings-v1`, memanggil `renderToday()` dan `renderBookingBadge()`, dan menunjukkan `toast()`.
- **+ Walk-in** (`quickWalkin()`): pilih servis, staf, "Sekarang" atau slot terdekat, dan nama (pilihan). Simpan dengan `source:"walkin"` dan `status:"arrived"`.
- **Imbas QR** (`startScan()` sedia ada):
  - teks `BK:<id>:<code>`: cari temujanji, tunjuk kad, dan butang **Daftar masuk** (`arrived`)
  - QR ahli: tunjuk ahli dan temujanji hari ini

### 8.4 Kalendar
- Togol **Minggu / Bulan**.
  - Minggu: 7 lajur hari × jam, kad berwarna `staff.color`.
  - Bulan: grid dengan bilangan temujanji setiap hari. Ketik hari untuk paparan Hari bagi tarikh itu.
- Penapis staf (cip).
- **Pindah temujanji**:
  - desktop: seret kad (pointer events), snap ke `slotStep`
  - telefon: ketik kad → Tunda
  - sebelum simpan, semak `freeFor()` dengan `ignoreId`
- **Sekat masa**: butang "Sekat" membuka borang (tarikh, staf/semua, mula, tamat, label) dan menyimpan ke `bk-blocks-v1`.

### 8.5 Tempahan
- Penapis: julat tarikh, staf, status, bayaran (`pending` bukti).
- Jadual/kad: kod, pelanggan, servis, staf, tarikh/masa, harga/deposit, bayaran, status.
- Tindakan:
  - Sahkan / Tolak (untuk `pending`)
  - **Lihat bukti** (`viewProof()` sedia ada), lalu `setPay(id,"verified")` dan `confirmed`
  - Tunda, Batal
- `exportCSV()` dengan lajur: `id,kod,tarikh,mula,tamat,pelanggan,telefon,servis,tambahan,staf,harga,deposit,bayaran,status,sumber`.

### 8.6 Pelanggan
Kekalkan `renderMembers()`. Tambah lajur **Temujanji** (bilangan `done`), **Tidak hadir**, dan **Terakhir**. `openMember()` memaparkan sejarah temujanji.

### 8.7 Servis & Staf
- **Servis**: senarai dengan suis aktif. Borang:
  - nama, kategori, penerangan, harga, tempoh (min), deposit, label, popular, ikon
  - staf layak (checkbox)
  - tambahan (baris dinamik: nama, harga, min)
  - Simpan ke `bk-services-v1`.
- **Staf**: senarai. Borang:
  - nama, peranan, warna (8 pilihan), aktif
  - hari cuti (7 checkbox)
  - waktu sendiri (pilihan: sama seperti kedai, atau tetapan per hari)
  - Simpan ke `bk-staff-v1`.

### 8.8 Promosi & Ganjaran
Kekal. Dalam editor promosi, pilihan pautan menjadi: **Servis** (pilih servis) · **Ganjaran** · **Tiada**.

### 8.9 Tetapan
- **Waktu operasi**: 7 baris (hari | suis buka | buka | tutup).
- **Cuti umum**: senarai tarikh dengan + dan ×.
- **Slot**: `slotStep` (10/15/30), `buffer` (0–30), `leadMin` (0/30/60/120), `maxDays` (7/14/30/60).
- **Tempahan**: `anyStaff`, `requireApproval` (semua tempahan perlu disahkan admin), `cancelHours`.
- **Bayaran**: kaunter, DuitNow (nama + QR), mod deposit (tiada / ikut servis / peratus).
- **Loyalti**: `stampTarget`, `pointsPerRM`.
- **Reka bentuk app**: grid 10 tema dan suis pemilih tema (sedia ada).
- **Data demo**: **Set semula data demo**, iaitu `BK.seedDemo(true)`.

### Prompt
```
Laksanakan Fasa 6 (admin) ikut BOOKING-INSTRUCTIONS.md §8: tab baharu, Ringkasan, Hari ini (garis masa staf + walk-in + imbas QR),
Kalendar (minggu/bulan, pindah, sekat masa), Tempahan (penapis, bukti DuitNow, CSV), Servis & Staf, dan Tetapan waktu/slot/deposit.
Kekalkan tab bar boleh disembunyikan (H) dan drawer telefon. Guna window.BK untuk semua logik slot.
Uji desktop 1280px dan telefon 390px.
```

---

## 9. Fasa 7 — Penyesuaian 10 tema

| Tema | Perkara khusus |
|---|---|
| ★ promo | Home: karusel + togol **Hari ini \| Tarikh lain** (ganti Pickup \| Pre-order; "Tarikh lain" buka langkah 2). Servis: rel kategori kiri, banner promo melintang, grid 2 lajur |
| ★ sage | Helaian servis dengan panel hijau melengkung; `serviceArt()` (SVG gunting/pengering/daun/titisan, warna dari `art`); nav terapung dengan garis penanda |
| frost, noir, ruby | Kad kaca: jalur tarikh dan slot guna `backdrop-filter` seperti kad sedia ada |
| grid | Slot berbentuk kotak tajam, sempadan 2px `var(--ink)` |
| clay | Butang slot timbul (`box-shadow` clay sedia ada) |
| aurora | Slot terpilih bercahaya (`box-shadow: 0 0 0 2px var(--brand), 0 0 18px rgba(var(--brand-rgb),.5)`) |
| indigo, matcha | Corak latar dikekalkan; ikon cap `star` / `leaf`; fon tajuk tema |

Ikon cap baharu untuk booking: tambah `scissors` dan `star` dalam set ikon (`hydrateIcons()`), dan pilih ikut tema dalam `SHOP_THEMES[].stamp`.

---

## 10. Fasa 8 — PWA, dokumentasi & jualan
1. `sw.js`: naikkan `VERSION` dan pastikan `SHELL` mengandungi `services.js` dan `promo.js`.
2. `PANDUAN.md`: tukar bahagian menu kepada **Servis & Staf**, tambah bahagian **Waktu operasi & slot** dan **Deposit**, dan kemas kini senarai fungsi untuk Firebase (`saveBooking`, `availableSlots` dengan transaksi Firestore, `setStatus`, `BK.award`).
3. `CHANGELOG.md`: `v1.0.0 — Versi demo pertama Template Booking`.
4. `jualan/`: gambar Gumroad (cover, thumbnail, galeri 10 tema, aliran tempahan, admin garis masa), `bina-zip.sh`.
5. Video: guna semula komposisi HyperFrames (tutorial skrin & slaid 10 tema) dengan tangkapan skrin baharu.

---

## 11. Skrip ujian Playwright (asas)

Simpan sebagai `test/booking.spec.js` (tidak dimasukkan dalam ZIP pembeli):
```js
const { chromium } = require("playwright");
const BASE = "http://localhost:8765";
const THEMES = ["promo","sage","frost","grid","noir","aurora","clay","indigo","matcha","ruby"];
(async () => {
  const b = await chromium.launch(); const errs = [];
  const ctx = await b.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true });
  const p = await ctx.newPage(); p.on("pageerror", e => errs.push(e.message));
  // 1) semua tema dibuka
  for (const t of THEMES) {
    await p.goto(`${BASE}/?tema=${t}`); await p.waitForTimeout(1600);
    for (const s of ["home","services","appts","cap","profile"]) { await p.evaluate(s => go(s), s); await p.waitForTimeout(250); }
    await p.screenshot({ path:`test/shots/${t}.png` });
  }
  // 2) aliran tempahan
  await p.goto(`${BASE}/?tema=frost`); await p.evaluate(() => { localStorage.clear(); BK.seedDemo(true); location.reload(); });
  await p.waitForTimeout(1600);
  await p.evaluate(() => { go("services"); openService("cut"); });
  await p.click('[data-extra="wash"]'); await p.click('[data-action="openBookingFromService"]');
  await p.click('[data-staff="aina"]'); await p.click("#bkNext");
  await p.locator(".bk-day:not(.closed):not(.full)").nth(1).click(); await p.click("#bkNext");
  const first = await p.locator(".bk-slot").first().textContent(); await p.locator(".bk-slot").first().click(); await p.click("#bkNext");
  await p.click("#bkNext"); // Sahkan tempahan
  await p.waitForTimeout(800);
  const n = await p.evaluate(() => BK.bookings().length);
  console.log("tempahan:", n, "slot:", first);
  // 3) admin tanda selesai -> point app bertambah
  const a = await ctx.newPage(); await a.goto(`${BASE}/admin.html`);
  await a.locator("#pin input").first().type("1234"); await a.waitForTimeout(800);
  const before = await p.evaluate(() => JSON.parse(localStorage.getItem("bk-member-v1")).points);
  await a.evaluate(() => { const b = BK.bookings().find(x => x.memberId === "m1" && x.status === "confirmed"); setStatus(b.id, "done"); });
  await p.waitForTimeout(500);
  const after = await p.evaluate(() => JSON.parse(localStorage.getItem("bk-member-v1")).points);
  console.log("point:", before, "→", after);
  console.log(errs.length ? errs : "tiada ralat"); await b.close();
})();
```
Lulus jika:
- tiada ralat
- 10 tangkapan skrin kelihatan betul
- bilangan tempahan bertambah 1
- point bertambah ikut harga

---

## 12. Senarai semak akhir sebelum jual

- [ ] 10 tema: Home, Servis, helaian servis, 4 langkah tempahan, Temujanji, Cap & Point, Profil. Tiada teks terpotong, tiada skrol mendatar.
- [ ] Admin desktop & telefon: semua tab, garis masa, kalendar, imbas QR (kamera), CSV.
- [ ] Tiada tempahan berganda: buka 2 tab, tempah slot yang sama, tab kedua mendapat "slot baru sahaja diambil".
- [ ] Polisi batal, deposit, bukti DuitNow, baucar dalam Sahkan.
- [ ] Mod luar talian (service worker) dan pasang ke skrin utama (Android & iPhone).
- [ ] `localStorage` kosong: data demo diisi automatik. Butang *Set semula data demo* berfungsi di app & admin.
- [ ] Amaran versi demo dalam PANDUAN, README dan listing Gumroad.
- [ ] Tiada jenama pihak ketiga dalam template, ikon atau gambar jualan.
- [ ] `VERSION` dalam `sw.js` dinaikkan. ZIP dibina dengan `jualan/bina-zip.sh`.
