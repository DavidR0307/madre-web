import { useState, useEffect, useRef } from "react";

/* ─── CONFIG — actualiza estos valores ─────────────────────── */
const WHATSAPP_NUMBER = "56942329405"; // sin + ni espacios
const WHATSAPP_MSG    = encodeURIComponent("Hola, me gustaría hacer un pedido de MADRE 🍞");
const INSTAGRAM       = "@madre.co"; // actualiza cuando lo tengas
const WA_URL          = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

/* ─── Paletas ───────────────────────────────────────────────── */
const PALETTES = {
  "Harina y Carbón": {
    bg:       "#F4EDE0",
    card:     "#FBF7EF",
    carbon:   "#1C110A",
    accent:   "#B84030",   // rojo terroso / barro cocido
    support:  "#3D5830",   // verde oliva profundo
    border:   "#DDD3C0",
    muted:    "#8A7A65",
    headFont: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif",
    bodyFont: "'DM Sans', system-ui, sans-serif",
    label:    "Harina y Carbón",
  },
  "Horno y Sobremesa": {
    bg:       "#F4EDE0",
    card:     "#FBF7EF",
    carbon:   "#130D05",
    accent:   "#B87020",   // ámbar profundo / dorado quemado
    support:  "#1A3D28",   // verde botella
    border:   "#DDD3C0",
    muted:    "#8A7A65",
    headFont: "'DM Sans', system-ui, sans-serif",
    bodyFont: "'DM Sans', system-ui, sans-serif",
    label:    "Horno y Sobremesa",
  },
};

/* ─── Products ─────────────────────────────────────────────── */
const PANES = [
  { id:"PAN-01", name:"Pan Blanco",           sub:"20% integral",          price:5200, desc:"La base. 80% harina de fuerza, 20% integral, fermentación en frío de 14–16 horas. Corteza viva, miga abierta, sabor limpio.", img:null },
  { id:"PAN-02", name:"Pan Multisemillas",     sub:"Girasol, linaza, zapallo, sésamo", price:5700, desc:"La misma base con 12% de semillas integradas a la masa. Textura, sabor y valor nutricional en cada tostada.", img:null },
  { id:"PAN-03", name:"Pan Nuez & Cranberry",  sub:"14% de inclusiones",    price:5900, desc:"Nuez tostada y cranberry seco al 50/50. El contraste entre el ácido de la fermentación y el dulce de las inclusiones es exactamente lo que lo hace adictivo.", img:"/pan.jpeg" },
  { id:"PAN-04", name:"Pan Chocolate Amargo",  sub:"Chocolate Sicao 58%",   price:5800, desc:"14% de chocolate negro en trozos irregulares. No es un pan dulce — es un pan con carácter oscuro. Para quien entiende el amargo.", img:null },
];
const GALLETAS = [
  { id:"GAL-01", name:"Galleta Chocolate Negro & Nuez", sub:"Callebaut 70% · Nuez tostada · Sal de mar", price:4600, packPrice:15500, packQty:4, desc:"Brown butter, masa madre, 24–48h de reposo en frío. 120g por unidad. El chocolate Callebaut 70% no es opcional — es la razón de ser de esta galleta.", img:null },
];
const BUNDLES = [
  { name:"El Domingo",    contents:"1 pan + 2 galletas",        priceMin:13500, priceMax:14500 },
  { name:"Para Llevar",   contents:"1 pan + pack × 4 galletas", priceMin:23000, priceMax:25000 },
  { name:"Madre Completa",contents:"2 panes + 2 galletas",      priceMin:28000, priceMax:32000 },
];

/* ─── Helpers ──────────────────────────────────────────────── */
const fmtCLP = (n) => "$" + Math.round(n).toLocaleString("es-CL");

/* ══════════════════════════════════════════════════════════════ */
export default function MadreWeb() {
  const [palKey,  setPalKey]  = useState("Harina y Carbón");
  const [page,    setPage]    = useState("inicio");
  const [menuOpen,setMenuOpen]= useState(false);
  const P = PALETTES[palKey];

  useEffect(() => {
    const l1 = document.createElement("link");
    l1.rel = "stylesheet";
    l1.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(l1);
    return () => document.head.removeChild(l1);
  }, []);

  useEffect(() => { window.scrollTo(0,0); }, [page]);

  const nav = (p) => { setPage(p); setMenuOpen(false); };

  /* ── Shared styles ── */
  const navItems = [
    ["inicio","Inicio"],["productos","Productos"],
    ["nosotros","Nosotros"],["contacto","Contacto"],
  ];

  return (
    <div style={{ fontFamily: P.bodyFont, background: P.bg, color: P.carbon, minHeight:"100vh", transition:"background 0.4s, color 0.4s" }}>

      {/* ── Palette toggle ── */}
      <div style={{ position:"fixed", bottom:24, left:16, zIndex:200, display:"flex", flexDirection:"column", gap:6 }}>
        {Object.keys(PALETTES).map(k=>(
          <button key={k} onClick={()=>setPalKey(k)} style={{
            padding:"6px 12px", fontSize:10, fontWeight:600,
            fontFamily: P.bodyFont, letterSpacing:"0.05em", textTransform:"uppercase",
            background: k===palKey ? P.carbon : P.card,
            color:      k===palKey ? P.bg     : P.muted,
            border: `1px solid ${k===palKey ? P.carbon : P.border}`,
            borderRadius:20, cursor:"pointer", transition:"all 0.3s",
            whiteSpace:"nowrap",
          }}>{k}</button>
        ))}
      </div>

      {/* ── WhatsApp FAB ── */}
      <a href={WA_URL} target="_blank" rel="noreferrer" style={{
        position:"fixed", bottom:24, right:16, zIndex:200,
        width:52, height:52, borderRadius:"50%",
        background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 16px rgba(0,0,0,0.25)", textDecoration:"none",
      }}>
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── Navbar ── */}
      <header style={{
        position:"sticky", top:0, zIndex:100,
        background: P.carbon, color: P.bg,
        padding:"0 24px", borderBottom:`1px solid ${P.carbon}`,
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
          {/* Logo */}
          <button onClick={()=>nav("inicio")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <div style={{ fontFamily: P.headFont, fontSize:22, fontWeight:700, color: P.bg, letterSpacing:"0.08em", lineHeight:1 }}>
              MADRE
            </div>
            <div style={{ fontSize:9, color: P.muted, letterSpacing:"0.18em", textTransform:"uppercase", marginTop:1 }}>
              & Co · Panadería Artesanal
            </div>
          </button>

          {/* Desktop nav */}
          <nav style={{ display:"flex", gap:32, alignItems:"center" }}>
            <div style={{ display:"flex", gap:28 }}>
              {navItems.map(([p,label])=>(
                <button key={p} onClick={()=>nav(p)} style={{
                  background:"none", border:"none", cursor:"pointer",
                  fontFamily: P.bodyFont, fontSize:13, fontWeight:500,
                  color: page===p ? P.accent : P.bg,
                  letterSpacing:"0.04em", padding:0,
                  borderBottom: page===p ? `1px solid ${P.accent}` : "1px solid transparent",
                  transition:"all 0.2s",
                }}>{label}</button>
              ))}
            </div>
            <a href={WA_URL} target="_blank" rel="noreferrer" style={{
              background: P.accent, color:"#FAF7F2",
              padding:"9px 20px", borderRadius:4,
              fontSize:12, fontWeight:700, letterSpacing:"0.06em",
              textDecoration:"none", whiteSpace:"nowrap",
              textTransform:"uppercase",
            }}>Pedir por WhatsApp</a>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          INICIO
      ═══════════════════════════════════════════════════════ */}
      {page==="inicio" && (
        <main>
          {/* Hero */}
          <section style={{
            position:"relative", height:"85vh", minHeight:520,
            display:"flex", alignItems:"flex-end",
            overflow:"hidden", background: P.carbon,
          }}>
            <img src="/pan.jpeg" alt="Pan artesanal MADRE"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.55, objectPosition:"center 30%" }}/>
            <div style={{ position:"relative", zIndex:2, padding:"0 32px 56px", maxWidth:720 }}>
              <div style={{
                display:"inline-block", background: P.accent, color:"#FAF7F2",
                fontSize:10, fontWeight:700, letterSpacing:"0.16em",
                textTransform:"uppercase", padding:"5px 14px", marginBottom:20,
              }}>Santiago · Sector Oriente</div>
              <h1 style={{
                fontFamily: P.headFont, fontSize:"clamp(42px, 7vw, 80px)",
                fontWeight:700, color:"#FAF7F2", margin:"0 0 20px",
                lineHeight:1.05, letterSpacing:"-0.01em",
              }}>
                Pan hecho<br />con tiempo<br />y oficio.
              </h1>
              <p style={{ color:"#C8BFB0", fontSize:16, lineHeight:1.7, maxWidth:480, margin:"0 0 32px" }}>
                Masa madre de fermentación lenta. Ingredientes nobles. Sin nada que se sienta industrial.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button onClick={()=>nav("productos")} style={{
                  background:"#FAF7F2", color: P.carbon,
                  padding:"13px 28px", border:"none", borderRadius:4, cursor:"pointer",
                  fontSize:13, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
                  fontFamily: P.bodyFont,
                }}>Ver productos</button>
                <a href={WA_URL} target="_blank" rel="noreferrer" style={{
                  background: P.accent, color:"#FAF7F2",
                  padding:"13px 28px", border:"none", borderRadius:4,
                  fontSize:13, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
                  textDecoration:"none",
                }}>Hacer un pedido</a>
              </div>
            </div>
          </section>

          {/* Intro strip */}
          <section style={{ background: P.support, color:"#FAF7F2", padding:"24px 32px", textAlign:"center" }}>
            <p style={{ margin:0, fontSize:13, letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, opacity:0.85 }}>
              Pedidos por WhatsApp · Lo Barnechea · Vitacura · Las Condes · Providencia
            </p>
          </section>

          {/* Pilares */}
          <section style={{ maxWidth:1100, margin:"0 auto", padding:"80px 32px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:48 }}>
              {[
                ["Fermentación lenta","Bulk de 4 horas con pliegues. Frío de 14 a 16 horas. El tiempo no es un lujo — es un ingrediente."],
                ["Ingredientes nobles","Harina de fuerza San Cristóbal, masa madre viva, inclusiones seleccionadas. Nada innecesario."],
                ["Sin industrial","Cada pan se hace a mano, en cada amasada. No hay línea de producción ni procesos acortados."],
                ["Herencia real","Los abuelos del fundador fueron panaderos. Madre conecta esa herencia con un proyecto contemporáneo."],
              ].map(([title, text])=>(
                <div key={title}>
                  <div style={{ width:32, height:2, background: P.accent, marginBottom:20 }}/>
                  <h3 style={{ fontFamily: P.headFont, fontSize:22, fontWeight:600, margin:"0 0 12px", color: P.carbon }}>{title}</h3>
                  <p style={{ fontSize:14, lineHeight:1.75, color: P.muted, margin:0 }}>{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured products */}
          <section style={{ background: P.card, padding:"80px 32px" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:48, flexWrap:"wrap", gap:16 }}>
                <h2 style={{ fontFamily: P.headFont, fontSize:"clamp(28px,4vw,48px)", fontWeight:700, margin:0 }}>La línea de panes</h2>
                <button onClick={()=>nav("productos")} style={{
                  background:"none", border:`1px solid ${P.carbon}`, color: P.carbon,
                  padding:"9px 20px", fontSize:12, fontWeight:700, letterSpacing:"0.06em",
                  textTransform:"uppercase", cursor:"pointer", fontFamily: P.bodyFont,
                }}>Ver todos →</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24 }}>
                {PANES.map(p=>(
                  <ProductCard key={p.id} product={p} P={P} WA_URL={WA_URL}/>
                ))}
              </div>
            </div>
          </section>

          {/* Historia teaser */}
          <section style={{ maxWidth:1100, margin:"0 auto", padding:"80px 32px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color: P.accent, marginBottom:16 }}>Nuestra historia</div>
              <h2 style={{ fontFamily: P.headFont, fontSize:"clamp(28px,4vw,48px)", fontWeight:700, margin:"0 0 24px", lineHeight:1.1 }}>
                Tres generaciones,<br />una misma masa.
              </h2>
              <p style={{ fontSize:15, lineHeight:1.8, color: P.muted, margin:"0 0 32px" }}>
                Los abuelos del fundador fueron panaderos. Madre conecta esa herencia con un proyecto independiente y contemporáneo — sin nostalgia decorativa, sin folklore de marca. Solo oficio real aplicado con criterio moderno.
              </p>
              <button onClick={()=>nav("nosotros")} style={{
                background: P.carbon, color: P.bg,
                padding:"12px 28px", border:"none", borderRadius:4, cursor:"pointer",
                fontSize:13, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
                fontFamily: P.bodyFont,
              }}>Conocer la historia</button>
            </div>
            <div style={{
              background: P.support, height:400, borderRadius:4,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"rgba(255,255,255,0.3)", fontSize:12, letterSpacing:"0.1em",
              textTransform:"uppercase",
            }}>
              [Foto del proceso]
            </div>
          </section>
        </main>
      )}

      {/* ═══════════════════════════════════════════════════════
          PRODUCTOS
      ═══════════════════════════════════════════════════════ */}
      {page==="productos" && (
        <main style={{ maxWidth:1100, margin:"0 auto", padding:"64px 32px" }}>
          <PageHeader P={P} pre="Catálogo" title="Cada pan tiene su razón de ser." />

          <SectionDivider P={P} title="Línea de panes"/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24, marginBottom:64 }}>
            {PANES.map(p=><ProductCard key={p.id} product={p} P={P} WA_URL={WA_URL} full/>)}
          </div>

          <SectionDivider P={P} title="Galletas"/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, marginBottom:64 }}>
            {GALLETAS.map(g=>(
              <div key={g.id} style={{ background: P.card, border:`1px solid ${P.border}`, borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:200, background: P.support, display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.3)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                  {g.img ? <img src={g.img} alt={g.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : "[Foto galleta]"}
                </div>
                <div style={{ padding:24 }}>
                  <div style={{ fontSize:10, color: P.accent, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>{g.sub}</div>
                  <h3 style={{ fontFamily: P.headFont, fontSize:22, fontWeight:700, margin:"0 0 12px" }}>{g.name}</h3>
                  <p style={{ fontSize:13, lineHeight:1.7, color: P.muted, margin:"0 0 20px" }}>{g.desc}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                    <div>
                      <div style={{ fontSize:11, color: P.muted, marginBottom:2 }}>Unidad</div>
                      <div style={{ fontFamily: P.headFont, fontSize:22, fontWeight:700 }}>{fmtCLP(g.price)}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:11, color: P.muted, marginBottom:2 }}>Pack × {g.packQty}</div>
                      <div style={{ fontFamily: P.headFont, fontSize:22, fontWeight:700 }}>{fmtCLP(g.packPrice)}</div>
                    </div>
                  </div>
                  <OrderBtn P={P} WA_URL={WA_URL} name={g.name}/>
                </div>
              </div>
            ))}
          </div>

          <SectionDivider P={P} title="Bundles"/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
            {BUNDLES.map(b=>(
              <div key={b.name} style={{ background: P.card, border:`1px solid ${P.border}`, borderRadius:4, padding:28 }}>
                <h3 style={{ fontFamily: P.headFont, fontSize:22, fontWeight:700, margin:"0 0 8px" }}>{b.name}</h3>
                <p style={{ fontSize:13, color: P.muted, margin:"0 0 20px" }}>{b.contents}</p>
                <div style={{ fontFamily: P.headFont, fontSize:20, fontWeight:700, marginBottom:16 }}>
                  {fmtCLP(b.priceMin)}–{fmtCLP(b.priceMax)}
                </div>
                <OrderBtn P={P} WA_URL={WA_URL} name={b.name}/>
              </div>
            ))}
          </div>

          <div style={{ marginTop:64, background: P.carbon, color: P.bg, borderRadius:4, padding:40, textAlign:"center" }}>
            <h3 style={{ fontFamily: P.headFont, fontSize:28, fontWeight:700, margin:"0 0 12px" }}>¿Cómo hacer un pedido?</h3>
            <p style={{ color:"#C8BFB0", fontSize:14, lineHeight:1.7, margin:"0 0 28px", maxWidth:500, marginLeft:"auto", marginRight:"auto" }}>
              Todos los pedidos se coordinan por WhatsApp. Escríbenos con los productos que quieres y te confirmamos disponibilidad y fecha de entrega.
            </p>
            <a href={WA_URL} target="_blank" rel="noreferrer" style={{
              display:"inline-block", background: P.accent, color:"#FAF7F2",
              padding:"14px 32px", borderRadius:4, fontSize:14, fontWeight:700,
              letterSpacing:"0.06em", textTransform:"uppercase", textDecoration:"none",
            }}>Escribir a WhatsApp</a>
          </div>
        </main>
      )}

      {/* ═══════════════════════════════════════════════════════
          NOSOTROS
      ═══════════════════════════════════════════════════════ */}
      {page==="nosotros" && (
        <main>
          <section style={{ background: P.carbon, color:"#FAF7F2", padding:"96px 32px" }}>
            <div style={{ maxWidth:800, margin:"0 auto" }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color: P.accent, marginBottom:24 }}>La historia detrás de la masa</div>
              <h1 style={{ fontFamily: P.headFont, fontSize:"clamp(36px,6vw,72px)", fontWeight:700, margin:"0 0 32px", lineHeight:1.05 }}>
                Madre tiene tres capas de significado.
              </h1>
              <p style={{ color:"#C8BFB0", fontSize:17, lineHeight:1.8, margin:0, maxWidth:620 }}>
                Ordenadas de más íntima a más universal, las tres juntas forman la razón de ser del proyecto.
              </p>
            </div>
          </section>

          <section style={{ maxWidth:900, margin:"0 auto", padding:"80px 32px" }}>
            {[
              {
                num:"01",
                title:"La masa madre",
                color: P.accent,
                text:"El corazón técnico de la marca. La masa madre es un cultivo vivo de levaduras silvestres y bacterias lácticas que fermentan la masa lentamente. Esta fermentación no solo da sabor — también descompone el gluten de manera que el pan resulta más digestible. Es el ingrediente que exige tiempo y cuidado constante. No se puede apurar.",
              },
              {
                num:"02",
                title:"La herencia familiar",
                color: P.support,
                text:"Los abuelos del fundador fueron panaderos. Madre conecta esa herencia con un proyecto independiente y contemporáneo. No es nostalgia decorativa — es un vínculo real con el oficio, traducido a una práctica técnica contemporánea. El pan de masa madre que se hace hoy comparte con aquel pan de entonces lo esencial: tiempo, mano, ingredientes reales.",
              },
              {
                num:"03",
                title:"Lo esencial, lo honesto",
                color: P.muted,
                text:"Madre como concepto universal de cuidado, alimento real y origen. Sin nada que sea industrial, procesado o prescindible. Madre es la promesa de que lo que entra en el pan es lo que debería entrar — y nada más. Esta honestidad con el producto es la que justifica el precio y la que construye la confianza.",
              },
            ].map((item,i)=>(
              <div key={item.num} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:40, marginBottom:64, borderBottom:`1px solid ${P.border}`, paddingBottom:64, ...(i===2?{borderBottom:"none", paddingBottom:0,}:{}) }}>
                <div style={{ fontFamily: P.headFont, fontSize:48, fontWeight:700, color: P.border, lineHeight:1 }}>{item.num}</div>
                <div>
                  <div style={{ width:40, height:3, background:item.color, marginBottom:20 }}/>
                  <h2 style={{ fontFamily: P.headFont, fontSize:30, fontWeight:700, margin:"0 0 16px" }}>{item.title}</h2>
                  <p style={{ fontSize:15, lineHeight:1.85, color: P.muted, margin:0 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Proceso */}
          <section style={{ background: P.card, padding:"80px 32px" }}>
            <div style={{ maxWidth:1000, margin:"0 auto" }}>
              <h2 style={{ fontFamily: P.headFont, fontSize:"clamp(28px,4vw,48px)", fontWeight:700, textAlign:"center", margin:"0 0 56px" }}>El proceso. Sin atajos.</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:32 }}>
                {[
                  ["Día 1","Alimentación de la masa madre. El cultivo se activa y alcanza su punto óptimo. Este paso no se puede delegar ni acelerar."],
                  ["Día 2","Mezcla, autólisis y amasado. Bulk fermentation de 4 horas con pliegues cada 30 minutos. Pre-formado y formado final."],
                  ["Día 2-3","Fermentación en frío: 14 a 16 horas a 3–4°C. La masa desarrolla su sabor completo durante el reposo. Se hornea directo del frío."],
                  ["Día 3","Horneado en UNOX a temperatura exacta. Temperatura interna mínima 95°C. Enfriado completo antes de empacar."],
                ].map(([day, text])=>(
                  <div key={day}>
                    <div style={{ display:"inline-block", background: P.accent, color:"#FAF7F2", padding:"4px 12px", fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:16 }}>{day}</div>
                    <p style={{ fontSize:13, lineHeight:1.75, color: P.muted, margin:0 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vision */}
          <section style={{ maxWidth:700, margin:"0 auto", padding:"80px 32px", textAlign:"center" }}>
            <h2 style={{ fontFamily: P.headFont, fontSize:"clamp(28px,4vw,48px)", fontWeight:700, margin:"0 0 24px", lineHeight:1.1 }}>
              La visión: un lugar físico en 3–5 años.
            </h2>
            <p style={{ fontSize:15, lineHeight:1.85, color: P.muted, margin:"0 0 32px" }}>
              Madre es hoy una operación home bakery. La visión de largo plazo es un café/brunch con identidad propia — plantas, luz natural, pan de masa madre, hospitalidad genuina. Un lugar que se sienta como estar en casa.
            </p>
            <a href={WA_URL} target="_blank" rel="noreferrer" style={{
              display:"inline-block", background: P.carbon, color: P.bg,
              padding:"13px 32px", borderRadius:4, fontSize:13, fontWeight:700,
              letterSpacing:"0.06em", textTransform:"uppercase", textDecoration:"none",
            }}>Hacer un pedido hoy</a>
          </section>
        </main>
      )}

      {/* ═══════════════════════════════════════════════════════
          CONTACTO
      ═══════════════════════════════════════════════════════ */}
      {page==="contacto" && (
        <main style={{ maxWidth:800, margin:"0 auto", padding:"64px 32px" }}>
          <PageHeader P={P} pre="Contacto" title="Todo pasa por WhatsApp." />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, marginBottom:48 }}>
            <div style={{ background: P.card, border:`1px solid ${P.border}`, borderRadius:4, padding:32 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color: P.accent, marginBottom:12 }}>Pedidos</div>
              <h3 style={{ fontFamily: P.headFont, fontSize:22, fontWeight:700, margin:"0 0 12px" }}>WhatsApp</h3>
              <p style={{ fontSize:13, lineHeight:1.7, color: P.muted, margin:"0 0 24px" }}>
                Escríbenos con los productos que quieres, coordinas disponibilidad y te confirmamos fecha de entrega. Sin complicaciones.
              </p>
              <a href={WA_URL} target="_blank" rel="noreferrer" style={{
                display:"block", background: P.accent, color:"#FAF7F2",
                padding:"12px 24px", borderRadius:4, fontSize:13, fontWeight:700,
                letterSpacing:"0.06em", textTransform:"uppercase", textDecoration:"none", textAlign:"center",
              }}>Escribir a WhatsApp</a>
            </div>

            <div style={{ background: P.card, border:`1px solid ${P.border}`, borderRadius:4, padding:32 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color: P.support, marginBottom:12 }}>Instagram</div>
              <h3 style={{ fontFamily: P.headFont, fontSize:22, fontWeight:700, margin:"0 0 12px" }}>{INSTAGRAM}</h3>
              <p style={{ fontSize:13, lineHeight:1.7, color: P.muted, margin:"0 0 24px" }}>
                Seguinos para ver el proceso, los panes del día y novedades antes que nadie.
              </p>
              <div style={{ background: P.border, color: P.muted, padding:"12px 24px", borderRadius:4, fontSize:12, textAlign:"center", letterSpacing:"0.06em" }}>
                Próximamente
              </div>
            </div>
          </div>

          <div style={{ background: P.carbon, color: P.bg, borderRadius:4, padding:40, marginBottom:48 }}>
            <h3 style={{ fontFamily: P.headFont, fontSize:26, fontWeight:700, margin:"0 0 16px" }}>Zona de entrega</h3>
            <p style={{ color:"#C8BFB0", fontSize:14, lineHeight:1.7, margin:"0 0 20px" }}>
              Actualmente operamos en el sector oriente de Santiago: Lo Barnechea, Vitacura, Las Condes y Providencia. Conversamos cada pedido por WhatsApp y coordinamos según disponibilidad.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {["Lo Barnechea","Vitacura","Las Condes","Providencia"].map(b=>(
                <span key={b} style={{ background:"rgba(255,255,255,0.1)", color:"#FAF7F2", padding:"5px 14px", borderRadius:2, fontSize:12, letterSpacing:"0.06em" }}>{b}</span>
              ))}
            </div>
          </div>

          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <h3 style={{ fontFamily: P.headFont, fontSize:26, fontWeight:700, margin:"0 0 12px" }}>¿Cómo funciona?</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:24, marginTop:32, textAlign:"left" }}>
              {[
                ["01","Escríbenos","Dinos qué productos quieres y para cuándo."],
                ["02","Confirmamos","Te avisamos disponibilidad y fecha de entrega."],
                ["03","Pagas","Transferencia o efectivo. Sin plataformas intermedias."],
                ["04","Recibes","Pan del día, empacado con cuidado."],
              ].map(([n,title,text])=>(
                <div key={n} style={{ background: P.card, border:`1px solid ${P.border}`, borderRadius:4, padding:20 }}>
                  <div style={{ fontFamily: P.headFont, fontSize:32, fontWeight:700, color: P.border, marginBottom:8 }}>{n}</div>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:6 }}>{title}</div>
                  <div style={{ fontSize:12, color: P.muted, lineHeight:1.6 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ── Footer ── */}
      <footer style={{ background: P.carbon, color:"#C8BFB0", padding:"48px 32px", marginTop:80 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
          <div>
            <div style={{ fontFamily: P.headFont, fontSize:20, fontWeight:700, color:"#FAF7F2", marginBottom:4 }}>MADRE & Co</div>
            <div style={{ fontSize:12, color: P.muted }}>Panadería Artesanal · Santiago, Chile</div>
          </div>
          <div style={{ display:"flex", gap:24 }}>
            {navItems.map(([p,label])=>(
              <button key={p} onClick={()=>nav(p)} style={{ background:"none", border:"none", cursor:"pointer", color:"#C8BFB0", fontSize:12, fontFamily: P.bodyFont }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ fontSize:11, color: P.muted }}>© 2026 Madre & Co. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Shared components ────────────────────────────────────── */
function ProductCard({ product: p, P, WA_URL, full }) {
  return (
    <div style={{ background: P.card, border:`1px solid ${P.border}`, borderRadius:4, overflow:"hidden" }}>
      <div style={{
        height: full ? 220 : 180,
        background: p.img ? "transparent" : P.support,
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"rgba(255,255,255,0.3)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase",
        overflow:"hidden",
      }}>
        {p.img
          ? <img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          : "[Foto]"
        }
      </div>
      <div style={{ padding:20 }}>
        <div style={{ fontSize:10, color: P.accent, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{p.sub}</div>
        <h3 style={{ fontFamily: P.headFont, fontSize:full?22:18, fontWeight:700, margin:"0 0 8px" }}>{p.name}</h3>
        {full && <p style={{ fontSize:12, lineHeight:1.7, color: P.muted, margin:"0 0 16px" }}>{p.desc}</p>}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop: full?0:12 }}>
          <div style={{ fontFamily: P.headFont, fontSize:20, fontWeight:700 }}>{fmtCLP(p.price)}</div>
          <OrderBtn P={P} WA_URL={WA_URL} name={p.name} small/>
        </div>
      </div>
    </div>
  );
}

function OrderBtn({ P, WA_URL, name, small }) {
  const msg = encodeURIComponent(`Hola, me gustaría pedir: ${name} 🍞`);
  const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  return (
    <a href={url} target="_blank" rel="noreferrer" style={{
      display:"inline-block",
      background: P.accent, color:"#FAF7F2",
      padding: small ? "7px 14px" : "11px 22px",
      borderRadius:3, fontSize: small ? 11 : 12,
      fontWeight:700, letterSpacing:"0.06em",
      textTransform:"uppercase", textDecoration:"none",
      whiteSpace:"nowrap",
    }}>Pedir</a>
  );
}

function PageHeader({ P, pre, title }) {
  return (
    <div style={{ marginBottom:56, paddingBottom:40, borderBottom:`1px solid ${P.border}` }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color: P.accent, marginBottom:16 }}>{pre}</div>
      <h1 style={{ fontFamily: P.headFont, fontSize:"clamp(32px,5vw,60px)", fontWeight:700, margin:0, lineHeight:1.05 }}>{title}</h1>
    </div>
  );
}

function SectionDivider({ P, title }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:32 }}>
      <div style={{ width:32, height:2, background: P.accent }}/>
      <h2 style={{ fontFamily: P.headFont, fontSize:20, fontWeight:700, margin:0, color: P.carbon }}>{title}</h2>
      <div style={{ flex:1, height:1, background: P.border }}/>
    </div>
  );
}
