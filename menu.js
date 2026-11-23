/* =========================================================
   DATA ASAL KEDAI — menu, tetapan & tema. Dikongsi oleh index.html (pelanggan) dan admin.html.
   Ubah fail ini untuk kedai baru. Admin boleh ubah lagi dari dashboard
   (perubahan admin disimpan dalam localStorage "kafe-menu-v1").

   Jenis kumpulan add-on:
     type:"single" → pilih satu (radio). required:true = wajib.
     type:"multi"  → pilih banyak dengan kuantiti.
                     Setiap pilihan ada `max` = had kuantiti untuk SATU item.
                     Kumpulan ada `max` = had jumlah semua pilihan (0 = tiada had).
   art:[atas, bawah, hiasan] (pilihan) = warna lukisan minuman untuk tema "Sage Curve".
     Nak lebih dari had? Pelanggan tambah item yang sama ke troli sekali lagi.
   ========================================================= */
window.SHOP_MENU = [
  { id:"sig", name:"Kopi Signature", desc:"Kopi susu gula hangus, krim lembut", price:9.90, cat:"Minuman", icon:"cup", art:["#E6BE8A","#5C3B22","#8A5428"], active:true, groups:[
    { id:"size", name:"Saiz", type:"single", required:true, options:[{id:"r",name:"Regular",price:0,active:true},{id:"l",name:"Large",price:2,active:true}] },
    { id:"ice",  name:"Ais",  type:"single", required:true, options:[{id:"n",name:"Ais normal",price:0,active:true},{id:"k",name:"Kurang ais",price:0,active:true},{id:"t",name:"Tiada ais",price:0,active:true}] },
    { id:"top",  name:"Topping", type:"multi", max:3, options:[{id:"boba",name:"Boba",price:1.5,max:2,active:true},{id:"cheese",name:"Cheese foam",price:2,max:1,active:true},{id:"jelly",name:"Jelly kelapa",price:1,max:2,active:true}] },
  ]},
  { id:"latte", name:"Latte Ais", desc:"Espresso dengan susu segar", price:8.90, cat:"Minuman", icon:"cup", art:["#EBD3B4","#A8754A","#7A4B2E"], active:true, groups:[
    { id:"size", name:"Saiz", type:"single", required:true, options:[{id:"r",name:"Regular",price:0,active:true},{id:"l",name:"Large",price:2,active:true}] },
    { id:"sugar",name:"Gula", type:"single", required:true, options:[{id:"n",name:"Gula normal",price:0,active:true},{id:"k",name:"Kurang manis",price:0,active:true},{id:"t",name:"Tanpa gula",price:0,active:true}] },
    { id:"xtra", name:"Tambahan", type:"multi", max:0, options:[{id:"shot",name:"Extra shot",price:2,max:2,active:true},{id:"van",name:"Sirap vanila",price:1,max:1,active:true},{id:"oat",name:"Tukar susu oat",price:2.5,max:1,active:true}] },
  ]},
  { id:"teh", name:"Teh Tarik Ais", desc:"Teh tarik pekat, buih tebal", price:5.50, cat:"Minuman", icon:"cup", art:["#E2B987","#9A5B2A","#7A4220"], active:true, groups:[
    { id:"sugar",name:"Gula", type:"single", required:true, options:[{id:"n",name:"Gula normal",price:0,active:true},{id:"k",name:"Kurang manis",price:0,active:true}] },
  ]},
  { id:"matcha", name:"Matcha Latte", desc:"Matcha Uji dengan susu segar", price:10.90, cat:"Minuman", icon:"leaf", art:["#BFD39B","#5E7F3E","#4E6B33"], active:true, groups:[
    { id:"size", name:"Saiz", type:"single", required:true, options:[{id:"r",name:"Regular",price:0,active:true},{id:"l",name:"Large",price:2,active:true}] },
    { id:"top",  name:"Topping", type:"multi", max:2, options:[{id:"boba",name:"Boba",price:1.5,max:2,active:true},{id:"cream",name:"Krim putar",price:1.5,max:1,active:true}] },
  ]},
  { id:"oden", name:"Oden Set", desc:"Cucuk pilihan dalam kuah panas", price:8.00, cat:"Snek", icon:"bowl", active:true, groups:[
    { id:"oden", name:"Pilihan Oden", type:"multi", max:6, options:[
      {id:"fb",name:"Fish ball",price:1,max:3,active:true},{id:"fc",name:"Fucuk",price:1.5,max:1,active:true},
      {id:"od",name:"Oden fish cake",price:2,max:1,active:true},{id:"ss",name:"Sosej",price:1.2,max:2,active:true},
      {id:"tp",name:"Telur puyuh",price:.5,max:4,active:true}] },
    { id:"kuah", name:"Kuah", type:"single", required:true, options:[{id:"o",name:"Kuah original",price:0,active:true},{id:"t",name:"Kuah tom yam",price:1,active:true},{id:"p",name:"Kuah pedas",price:.5,active:true}] },
  ]},
  { id:"roti", name:"Roti Bakar", desc:"Roti tebal dibakar rangup", price:4.50, cat:"Snek", icon:"bread", active:true, groups:[
    { id:"inti", name:"Inti", type:"single", required:true, options:[{id:"k",name:"Kaya",price:0,active:true},{id:"m",name:"Mentega kaya",price:.5,active:true},{id:"c",name:"Coklat",price:1,active:true}] },
  ]},
];

/* =========================================================
   TETAPAN ASAL KEDAI — boleh diubah oleh admin di skrin Tetapan
   (perubahan admin disimpan dalam localStorage "kafe-settings-v1").
   ========================================================= */
window.SHOP_SETTINGS = {
  stampTarget: 10,        // cap untuk 1 minuman percuma (1 item = 1 cap)
  pointsWalkin: 20,       // point setiap item bila beli di kaunter (walk-in)
  pointsOnline: 30,       // point setiap item bila pesan dalam app (order online)
  open: "08:00",          // waktu buka (pickup)
  close: "22:00",         // waktu tutup (pickup terakhir)
  prep: 15,               // masa penyediaan (minit) sebelum pesanan boleh diambil
  slot: 15,               // selang slot waktu pickup (minit)
  preorder: true,         // benarkan pre-order untuk hari lain
  preorderDays: 3,        // pre-order sehingga berapa hari ke depan
  payCounter: true,       // bayar di kaunter semasa ambil
  payDuitnow: true,       // bayar dengan DuitNow QR + muat naik bukti
  duitnowName: "KAFE DEMO ENTERPRISE",
  duitnowQR: "",          // gambar QR DuitNow kedai (admin muat naik); kosong = QR contoh
  theme: "frost",         // reka bentuk app pelanggan (lihat SHOP_THEMES di bawah)
  themePicker: true,      // tunjuk butang "Reka bentuk" dalam app (mod demo untuk client pilih)
  promoInterval: 4,       // saat setiap banner dalam karusel promosi (reka bentuk Promo Carousel)
};

/* =========================================================
   REKA BENTUK (TEMA) — setiap tema ada warna, fon & susun atur sendiri.
   CSS setiap tema ada dalam index.html: :root[data-theme="..."]
   ========================================================= */
window.SHOP_THEMES = [
  { id:"promo",  name:"Promo Carousel",    desc:"Karusel promosi bergerak · biru diraja", sw:["#FFFFFF","#0F1B4C","#1D4ED8","#F2F4FA"], meta:"#FFFFFF", stamp:"check", special:true },
  { id:"sage",   name:"Sage Curve",        desc:"Panel melengkung · hijau sage",   sw:["#FFFFFF","#5A8158","#3B5B3E","#A2B08A"], meta:"#FFFFFF", stamp:"cup", art:"drink", special:true },
  { id:"frost",  name:"Bento Glass Frost", desc:"Kaca cerah · biru langit",        sw:["#EEF2F6","#0F172A","#38BDF8","#FDBA74"], meta:"#EEF2F6", stamp:"check" },
  { id:"grid",   name:"Bento Grid",        desc:"Kelabu hangat · hitam · oren",    sw:["#F1F1EE","#111111","#FF6A1A","#FFFFFF"], meta:"#F1F1EE", stamp:"check" },
  { id:"noir",   name:"Bento Glass Noir",  desc:"Kaca gelap · oren · ungu",        sw:["#0B0B10","#FF7A2F","#8B5CF6","#EC4899"], meta:"#0B0B10", stamp:"check" },
  { id:"aurora", name:"Aurora Night",      desc:"Gelap premium · ungu & cyan",     sw:["#0E1226","#6D5BFF","#22D3EE","#F472B6"], meta:"#0E1226", stamp:"check" },
  { id:"clay",   name:"Caramel Latte",     desc:"Clay timbul · krim & karamel",    sw:["#EFE3D3","#7A4B2E","#D39A66","#F2B9A0"], meta:"#EFE3D3", stamp:"cup" },
  { id:"indigo", name:"Indigo Ramen",      desc:"Krim · biru tua · corak ombak",   sw:["#F2ECDF","#2B4A7E","#C8382E","#FBF7EE"], meta:"#2B4A7E", stamp:"bowl" },
  { id:"matcha", name:"Matcha Zen",        desc:"Hijau zaitun · krim · elegan",    sw:["#EFE8DA","#4B5A3A","#8A9A6E","#F7F2E8"], meta:"#4B5A3A", stamp:"leaf" },
  { id:"ruby",   name:"Ruby Glass",        desc:"Kaca cerah · merah & putih",      sw:["#FFF5F5","#5A0710","#BF0311","#FFC2B4"], meta:"#BF0311", stamp:"check" },
];
