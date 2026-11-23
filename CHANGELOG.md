# Nota Versi

## v1.2.1 — Menu gaya Promo Carousel
- Skrin Menu dalam reka bentuk Promo Carousel direka semula:
  - togol **Pickup | Pre-order** dan butang carian di atas
  - baris kedai dengan status buka/tutup dan lencana troli
  - **rel kategori menegak di kiri** (ikon + label, penanda aktif)
  - banner promosi melintang
  - seksyen dengan tajuk bergaris, dan grid 2 lajur (gambar dalam bulatan, label kecil, nama, harga)
- Kategori aktif bertukar sendiri bila skrol, dan ketik kategori meluncur ke seksyennya.
- Carian menapis semua item.
- Kategori **Popular** (item bertanda `popular:true`) dan label `tag` setiap item dalam `menu.js`.
- Menu contoh kini 4 kategori (Kopi, Teh & Matcha, Coklat, Snek) dan 9 item.

## v1.2.0 — Template spesial: Promo Carousel
- Reka bentuk ke-10 bertanda **★ SPESIAL**. Home gaya app kedai kopi:
  - cip status (Point, Kad cap, Tahap)
  - **karusel promosi bergerak** (auto-slide dengan bar kemajuan, leret & snap, banner sebelah kelihatan, zoom & parallax halus, berhenti bila disentuh)
  - jubin besar Pickup / Pre-order
  - nav penuh lebar dengan label
- Halaman promosi: banner penuh, tarikh, penerangan, terma, dan butang terus ke item menu atau ganjaran.
- Admin → **Promosi**:
  - statistik paparan/ketikan/CTR
  - susun naik/turun, hidup/matikan, tempoh auto-slide
  - editor dengan pratonton langsung: 4 gaya banner terbina atau gambar sendiri, tarikh mula/tamat, sasaran tahap ahli, pautan ke menu atau ganjaran
- Fail baharu `promo.js`: promosi asal dan pelukis banner (dikongsi app & admin).

## v1.1.2 — Admin: navigasi tab bar
- Desktop: sidebar admin diganti dengan **tab bar** di atas, dengan penanda yang meluncur. Tab bar **boleh disembunyikan** (butang ⌃ atau kekunci **H**), butang "Menu" muncul untuk tunjuk semula, dan pilihan diingati.
- Telefon: **sidebar laci** dari kiri. Buka dengan butang ☰ (memaparkan nama halaman dan bilangan pesanan) atau leret dari tepi kiri. Tutup dengan memilih tab, mengetik di luar, ✕, Escape, atau leret ke kiri. Butang ☰ sembunyi bila skrol ke bawah.
- Kawasan selamat (notch/home bar) diambil kira pada tab bar dan kandungan admin.

## v1.1.1 — Sage Curve diperkemas
- Rel kategori menegak kini melekat (sticky) semasa skrol dan memanjang ke bawah skrin.
- Kad produk lebih padat (tinggi tetap, teks dipendekkan 2 baris), maklum balas sentuhan pada kad dan butang +.
- Halaman item: panel hijau melengkung dengan lukisan minuman besar.
- Navigasi: penanda yang meluncur antara ikon, dan peralihan skrin berarah (kiri/kanan ikut tab).
- Kawasan selamat: jarak tepi kiri/kanan (landskap & notch), skrol tidak "melantun" keluar.
- Prestasi: tema pejal (Sage, Grid, Caramel, Indigo, Matcha) tidak lagi guna kesan kaca (backdrop-filter).

## v1.1.0 — Template spesial: Sage Curve
- Reka bentuk ke-9 bertanda **★ SPESIAL**: panel hijau sage melengkung dengan bulatan bertindih, tab kategori menegak di tepi kiri (skrin Menu), kad produk dengan lukisan minuman yang tersembul keluar, cap berbentuk cawan, dan nav terapung dengan garis penanda.
- Lukisan minuman SVG (warna boleh ditetapkan dengan `art` dalam `menu.js`).
- Pemilih reka bentuk dan tetapan admin memaparkan lencana SPESIAL.

## v1.0.0 — Versi demo pertama
- App pelanggan PWA: splash beranimasi, Home, Menu, Cap & Point, Ganjaran, Profil.
- Kad cap digital, point, tahap ahli (Silver/Gold/Platinum), ganjaran dengan kod baucar bertempoh.
- Kod QR ahli yang boleh diimbas, dijana dalam JavaScript tanpa library.
- Menu dengan add-on: "pilih satu" (wajib/pilihan) dan "pilih banyak + kuantiti" dengan had setiap pilihan dan had jumlah.
- Troli dengan pecahan harga item dan add-on, waktu pickup (secepat mungkin atau slot), pre-order beberapa hari ke depan.
- Bayaran di kaunter atau DuitNow QR dengan muat naik bukti bayaran.
- Dashboard admin: ringkasan, kaunter (imbas QR, rekod pembelian, tebus), ahli, pesanan (status & semak bayaran), menu & add-on, ganjaran, tetapan.
- Point berasingan untuk walk-in dan order online.
- 8 reka bentuk: Bento Glass Frost, Bento Grid, Bento Glass Noir, Aurora Night, Caramel Latte, Indigo Ramen, Matcha Zen, Ruby Glass.
- Data demo disimpan dalam pelayar (localStorage).
