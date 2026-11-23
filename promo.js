/* =========================================================
   PROMOSI — banner karusel untuk Home (reka bentuk "Promo Carousel").
   Dikongsi oleh index.html (pelanggan) dan admin.html.
   Admin boleh tambah/ubah promosi; perubahan disimpan dalam
   localStorage "kafe-promos-v1". Senarai di bawah ialah promosi asal.

   Medan promosi:
     id, title, desc        : tajuk & penerangan (halaman promosi)
     start, end             : "YYYY-MM-DD" (kosong = sentiasa)
     active                 : true/false
     tiers                  : "all" | "gold" (Gold & Platinum) | "platinum"
     link                   : { type:"menu", id:"<id produk>" } | { type:"rewards" } | { type:"none" }
     kind                   : "preset" (reka banner terbina) | "image" (gambar dimuat naik)
     style                  : "sunset" | "ocean" | "garden" | "candy"   (untuk kind:"preset")
     h1, h2, tag, badge     : teks pada banner preset
     cups                   : [[atas,bawah,hiasan], ...] warna lukisan minuman
     img                    : data URL gambar (untuk kind:"image")
     cta, note              : teks butang & nota kecil pada banner
   ========================================================= */
window.SHOP_PROMOS = [
  { id:"x2", title:"2X Point Hujung Minggu", desc:"Kumpul point berganda untuk setiap pembelian pada hujung minggu, di kaunter atau dalam app.",
    start:"", end:"", active:true, tiers:"all", link:{type:"menu"}, kind:"preset", style:"sunset",
    h1:"2X", h2:"POINT", tag:"SABTU & AHAD", cups:[["#E6BE8A","#5C3B22","#8A5428"]], cta:"Lihat lanjut", note:"*Tertakluk T&S" },
  { id:"b1f1", title:"Beli 1 Percuma 1 Latte Ais", desc:"Beli satu Latte Ais saiz besar, dapat satu lagi percuma. Untuk pesanan pickup dalam app.",
    start:"", end:"", active:true, tiers:"all", link:{type:"menu", id:"latte"}, kind:"preset", style:"ocean",
    tag:"LATTE AIS", h1:"BELI 1", h2:"PERCUMA 1", cups:[["#EBD3B4","#A8754A","#7A4B2E"],["#EBD3B4","#A8754A","#7A4B2E"]], cta:"Lihat lanjut", note:"*Saiz besar sahaja" },
  { id:"matcha", title:"Matcha Week -20%", desc:"Semua minuman matcha diskaun 20% sepanjang minggu. Cuba Matcha Latte dengan topping kegemaran anda.",
    start:"", end:"", active:true, tiers:"all", link:{type:"menu", id:"matcha"}, kind:"preset", style:"garden",
    h1:"MATCHA", h2:"WEEK", badge:"-20%", cups:[["#BFD39B","#5E7F3E","#4E6B33"]], cta:"Lihat lanjut", note:"*Minuman matcha sahaja" },
  { id:"sticker", title:"Stiker Percuma", desc:"Dapatkan set stiker kafé edisi terhad dengan setiap pembelian minuman bersaiz besar.",
    start:"", end:"", active:true, tiers:"all", link:{type:"rewards"}, kind:"preset", style:"candy",
    h1:"STIKER", h2:"PERCUMA", cta:"Lihat lanjut", note:"*Selagi stok ada" },
];

/* ---------- Pelukis banner (HTML) ---------- */
window.PromoBanner = (function(){
  let n = 0;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function cup(c, w, h, letter){
    const [top, bot, drz] = c || ["#E6BE8A","#5C3B22","#8A5428"], id = "pb" + (n++);
    return `<svg viewBox="0 0 92 170" width="${w}" height="${h}" aria-hidden="true" style="filter:drop-shadow(0 12px 12px rgba(0,0,0,.25))"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".55" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient><clipPath id="${id}c"><path d="M10 62h72l-8 100a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z"/></clipPath></defs>
    <rect x="44" y="0" width="5" height="40" rx="2" fill="#15192A" transform="rotate(8 46 20)"/><path d="M10 62h72l-8 100a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" fill="url(#${id})"/>
    <g clip-path="url(#${id}c)" opacity=".35"><path d="M8 95c18 8 30-8 46 2s24-4 32 0" stroke="${drz}" stroke-width="7" fill="none"/><path d="M8 130c16 6 30-6 44 2s24-2 34 0" stroke="${drz}" stroke-width="6" fill="none"/></g>
    <rect x="6" y="56" width="80" height="9" rx="4" fill="rgba(255,255,255,.92)"/><path d="M12 58c0-14 10-22 18-24 2-10 12-15 18-15s16 5 18 15c8 2 18 10 18 24z" fill="#FFF8EF"/>
    <path d="M20 46c8 4 14-4 22 0s14-4 22 0 10-2 14 2" stroke="${drz}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <circle cx="46" cy="112" r="16" fill="#15192A"/><text x="46" y="118" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="17" fill="#fff">${esc(letter)}</text></svg>`;
  }
  /* saiz huruf mengecil ikut panjang teks supaya muat satu baris (lebar reka 312px) */
  const fit = (t, base, avail = 268) => Math.max(18, Math.min(base, Math.floor(avail / (Math.max(1, String(t ?? "").length) * 0.8))));
  const coin = (x,y,s,r) => `<i class="pb-coin" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;transform:rotate(${r}deg);font-size:${s*.42}px">P</i>`;
  const leaf = (x,y,s,r,c) => `<svg class="pb-abs" style="left:${x}%;top:${y}%;transform:rotate(${r}deg)" width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" fill="${c}"/></svg>`;
  const at = (x,y,inner,r=0) => `<div class="pb-abs" style="left:${x}%;top:${y}%;transform:rotate(${r}deg)">${inner}</div>`;
  const STYLES = {
    sunset: p => ({ bg:"radial-gradient(70% 55% at 70% 70%,#FFD36B,transparent 60%),linear-gradient(160deg,#FF8A3D,#FF5E3A 60%,#E8402B)",
      art: coin(69,38,46,-12)+coin(10,64,34,18)+coin(76,77,28,8)+coin(57,24,22,0)+at(33,38,cup(p.cups&&p.cups[0],120,222,p._l)),
      text:`<div class="pb-big" style="font-size:${fit(p.h1,82)}px">${esc(p.h1)}</div><div class="pb-big" style="font-size:${fit(p.h2,44)}px">${esc(p.h2)}</div>${p.tag?`<span class="pb-pill" style="background:#15192A;color:#FFD36B">${esc(p.tag)}</span>`:""}` }),
    ocean: p => ({ bg:"radial-gradient(60% 50% at 30% 75%,#7DD3FC,transparent 65%),linear-gradient(170deg,#1E40AF,#0EA5E9)",
      art: at(13,43,cup(p.cups&&p.cups[0],110,203,p._l),-8)+at(48,38,cup(p.cups&&(p.cups[1]||p.cups[0]),120,222,p._l),7),
      text:`${p.tag?`<div class="pb-tag">${esc(p.tag)}</div>`:""}<div class="pb-big" style="font-size:${fit(p.h1,54)}px;margin-top:6px">${esc(p.h1)}</div><div class="pb-big" style="font-size:${fit(p.h2,54)}px;color:#FDE68A">${esc(p.h2)}</div>` }),
    garden: p => ({ bg:"radial-gradient(70% 60% at 50% 80%,#D9E8B8,transparent 65%),linear-gradient(170deg,#3B5B3E,#5A8158)",
      art: leaf(4,31,54,-30,"#8FB36B")+leaf(77,46,64,40,"#A9C98A")+leaf(64,23,30,10,"#C7DDA9")+leaf(10,82,40,-60,"#A9C98A")+at(31,36,cup(p.cups&&p.cups[0],126,233,p._l))
        +(p.badge?`<div class="pb-badge">${esc(p.badge)}</div>`:""),
      text:`<div class="pb-big" style="font-size:${fit(p.h1,58)}px">${esc(p.h1)}</div><div class="pb-big" style="font-size:${fit(p.h2,58)}px;color:#D9E8B8">${esc(p.h2)}</div>` }),
    candy: p => ({ bg:"radial-gradient(circle at 20% 30%,#FFD1E1 0 2px,transparent 3px) 0 0/18px 18px,linear-gradient(170deg,#FF8FB1,#F472B6)",
      art: [["kafé",14,44,-10,"#15192A","#fff",110,28],["★",64,38,12,"#FDE68A","#B45309",76,"50%"],["♥",13,77,8,"#fff","#E11D74",70,"50%"],[p._l,67,69,-14,"#0EA5E9","#fff",84,"50%"]]
        .map(([t,x,y,r,bg,c,s,br])=>`<div class="pb-stk" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;border-radius:${typeof br==="number"?br+"px":br};background:${bg};color:${c};transform:rotate(${r}deg);font-size:${t==="kafé"?30:s*.5}px">${esc(t)}</div>`).join(""),
      text:`<div class="pb-big" style="font-size:${fit(p.h1,66)}px">${esc(p.h1)}</div><div class="pb-big" style="font-size:${fit(p.h2,50)}px;color:#15192A">${esc(p.h2)}</div>` }),
  };
  /* html(promo, {brand, cta:true}) → banner 4:5 lengkap */
  function html(p, o = {}){
    p = Object.assign({}, p, { _l: ((o.brand || "K")[0] || "k").toLowerCase() });
    const cta = o.cta === false ? "" : `<span class="pb-cta">${esc(p.cta || "Lihat lanjut")}</span>`;
    const note = p.note ? `<span class="pb-note">${esc(p.note)}</span>` : "";
    if (p.kind === "image" && p.img)
      return `<div class="pb"><div class="pb-art"><img class="pb-zoom pb-img" src="${p.img}" alt="${esc(p.title)}"></div>${cta}${note}</div>`;
    const st = (STYLES[p.style] || STYLES.sunset)(p);
    return `<div class="pb"><div class="pb-art"><div class="pb-zoom" style="background:${st.bg}"></div>${st.art}</div><div class="pb-text">${st.text}</div>${cta}${note}</div>`;
  }
  /* CSS banner (sekali sahaja) */
  const CSS = `.pb{position:relative;aspect-ratio:4/5;width:100%;overflow:hidden;border-radius:inherit;color:#fff;font-family:"Plus Jakarta Sans",system-ui,sans-serif;}
.pb-art{position:absolute;inset:0;transform:translateX(calc(var(--p,0) * -26px))}
.pb-zoom{position:absolute;inset:-10px}
.pb-img{width:calc(100% + 20px);height:calc(100% + 20px);object-fit:cover}
.pb-abs{position:absolute}
.pb-text{position:absolute;left:6%;right:6%;top:5.5%;z-index:2}
.pb-big{font-family:"Archivo Black","Plus Jakarta Sans",sans-serif;line-height:.9;white-space:nowrap;letter-spacing:-.02em;text-shadow:0 4px 0 rgba(0,0,0,.1)}
.pb-tag{font-weight:800;font-size:13px;letter-spacing:.12em;opacity:.9}
.pb-pill{display:inline-block;margin-top:8px;padding:4px 10px;border-radius:99px;font-size:10.5px;font-weight:800}
.pb-badge{position:absolute;right:5%;top:30%;width:84px;height:84px;border-radius:50%;background:#F5B83D;color:#3B2410;display:grid;place-items:center;transform:rotate(12deg);font-family:"Archivo Black",sans-serif;font-size:24px;box-shadow:0 8px 16px -6px rgba(0,0,0,.35)}
.pb-coin{position:absolute;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFE58A,#F4B400 60%,#C98A00);box-shadow:inset 0 -3px 0 rgba(0,0,0,.15),0 6px 10px -4px rgba(0,0,0,.3);display:grid;place-items:center;font-weight:800;font-style:normal;color:#8A5A00}
.pb-stk{position:absolute;border:5px solid #fff;display:grid;place-items:center;font-family:Fredoka,sans-serif;font-weight:700;box-shadow:0 10px 18px -8px rgba(0,0,0,.35)}
.pb-cta{position:absolute;left:50%;bottom:4%;transform:translateX(-50%);z-index:3;padding:9px 18px;border-radius:99px;background:#fff;color:#15192A;font-size:12px;font-weight:800;white-space:nowrap;box-shadow:0 6px 14px -6px rgba(0,0,0,.35)}
.pb-note{position:absolute;right:4%;bottom:1.6%;font-size:8px;opacity:.75;z-index:3}
@media (prefers-reduced-motion:reduce){.pb-art{transform:none!important}}`;
  function ensureCSS(){ if (!document.getElementById("pb-css")){ const s = document.createElement("style"); s.id = "pb-css"; s.textContent = CSS; document.head.appendChild(s); } }
  /* Status ikut tarikh */
  function status(p, today = new Date().toISOString().slice(0,10)){
    if (p.active === false) return "off";
    if (p.start && today < p.start) return "scheduled";
    if (p.end && today > p.end) return "ended";
    return "live";
  }
  return { html, ensureCSS, status, styles: Object.keys(STYLES) };
})();
