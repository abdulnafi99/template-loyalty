/* =========================================================
   MENU ASAL KEDAI — dikongsi oleh index.html (pelanggan) dan admin.html.
   Ubah fail ini untuk kedai baru. Admin boleh ubah lagi dari dashboard
   (perubahan admin disimpan dalam localStorage "farha-menu-v1").

   Jenis kumpulan add-on:
     type:"single" → pilih satu (radio). required:true = wajib.
     type:"multi"  → pilih banyak dengan kuantiti.
                     Setiap pilihan ada `max` = had kuantiti untuk SATU item.
                     Kumpulan ada `max` = had jumlah semua pilihan (0 = tiada had).
     Nak lebih dari had? Pelanggan tambah item yang sama ke troli sekali lagi.
   ========================================================= */
window.FARHA_MENU = [
  { id:"sig", name:"Farha Signature", desc:"Teh susu gula hangus, krim lembut", price:9.90, cat:"Minuman", icon:"cup", active:true, groups:[
    { id:"size", name:"Saiz", type:"single", required:true, options:[{id:"r",name:"Regular",price:0,active:true},{id:"l",name:"Large",price:2,active:true}] },
    { id:"ice",  name:"Ais",  type:"single", required:true, options:[{id:"n",name:"Ais normal",price:0,active:true},{id:"k",name:"Kurang ais",price:0,active:true},{id:"t",name:"Tiada ais",price:0,active:true}] },
    { id:"top",  name:"Topping", type:"multi", max:3, options:[{id:"boba",name:"Boba",price:1.5,max:2,active:true},{id:"cheese",name:"Cheese foam",price:2,max:1,active:true},{id:"jelly",name:"Jelly kelapa",price:1,max:2,active:true}] },
  ]},
  { id:"latte", name:"Latte Ais", desc:"Espresso dengan susu segar", price:8.90, cat:"Minuman", icon:"cup", active:true, groups:[
    { id:"size", name:"Saiz", type:"single", required:true, options:[{id:"r",name:"Regular",price:0,active:true},{id:"l",name:"Large",price:2,active:true}] },
    { id:"sugar",name:"Gula", type:"single", required:true, options:[{id:"n",name:"Gula normal",price:0,active:true},{id:"k",name:"Kurang manis",price:0,active:true},{id:"t",name:"Tanpa gula",price:0,active:true}] },
    { id:"xtra", name:"Tambahan", type:"multi", max:0, options:[{id:"shot",name:"Extra shot",price:2,max:2,active:true},{id:"van",name:"Sirap vanila",price:1,max:1,active:true},{id:"oat",name:"Tukar susu oat",price:2.5,max:1,active:true}] },
  ]},
  { id:"teh", name:"Teh Tarik Ais", desc:"Teh tarik pekat, buih tebal", price:5.50, cat:"Minuman", icon:"cup", active:true, groups:[
    { id:"sugar",name:"Gula", type:"single", required:true, options:[{id:"n",name:"Gula normal",price:0,active:true},{id:"k",name:"Kurang manis",price:0,active:true}] },
  ]},
  { id:"matcha", name:"Matcha Latte", desc:"Matcha Uji dengan susu segar", price:10.90, cat:"Minuman", icon:"leaf", active:true, groups:[
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
