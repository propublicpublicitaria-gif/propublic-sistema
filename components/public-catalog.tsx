"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronUp, Filter, Menu, MessageCircle, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";

const WHATSAPP_NUMBER = "595000000000"; // Reemplazar por el número real, sin + ni espacios.

const categories = [
  { name: "Fly Banners", icon: "⚑", image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=80" },
  { name: "Banderas", icon: "⚑", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80" },
  { name: "Roll Up", icon: "▥", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80" },
  { name: "Banners", icon: "▤", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80" },
  { name: "Cartelería", icon: "▣", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80" },
  { name: "Displays", icon: "▦", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80" },
  { name: "Productos Promocionales", icon: "✦", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80" },
  { name: "Merchandising", icon: "◈", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80" },
  { name: "Material Publicitario", icon: "▰", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80" },
  { name: "Otros", icon: "＋", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80" },
];

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  featured?: boolean;
  promo?: boolean;
  priceFrom: number;
  sizes: { label: string; price: number }[];
  configs: { label: string; price: number }[];
  prints: { label: string; price: number }[];
  bases: { label: string; price: number }[];
  masts: { label: string; price: number }[];
  specs: [string, string][];
};

const products: Product[] = [
  {
    id: "fly-banner",
    name: "Fly Banner",
    category: "Fly Banners",
    description: "Elemento publicitario portátil para promociones, eventos, puntos de venta y acciones de marketing.",
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
    ],
    featured: true,
    promo: true,
    priceFrom: 185000,
    sizes: [
      { label: "60 × 160 cm", price: 0 },
      { label: "70 × 180 cm", price: 25000 },
      { label: "80 × 200 cm", price: 45000 },
      { label: "90 × 220 cm", price: 70000 },
    ],
    configs: [
      { label: "Solo bandera", price: 0 },
      { label: "Bandera + mástil", price: 75000 },
      { label: "Bandera + mástil + base", price: 125000 },
    ],
    prints: [
      { label: "Una cara", price: 0 },
      { label: "Dos caras", price: 60000 },
    ],
    bases: [
      { label: "Sin base", price: 0 },
      { label: "Base estándar", price: 50000 },
      { label: "Base premium", price: 85000 },
    ],
    masts: [
      { label: "Sin mástil", price: 0 },
      { label: "Mástil estándar", price: 75000 },
      { label: "Mástil reforzado", price: 105000 },
    ],
    specs: [
      ["Material", "Tela poliéster para uso publicitario"],
      ["Impresión", "Sublimación digital"],
      ["Caras", "Una o dos caras, según configuración"],
      ["Acabado", "Costura perimetral reforzada"],
      ["Estructura", "Mástil modular según configuración"],
      ["Producción", "Consultar plazo según cantidad"],
    ],
  },
  {
    id: "roll-up",
    name: "Roll Up Premium",
    category: "Roll Up",
    description: "Display enrollable de presentación profesional para oficinas, eventos, ferias y puntos de venta.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=85"],
    featured: true,
    priceFrom: 320000,
    sizes: [{ label: "85 × 200 cm", price: 0 }, { label: "100 × 200 cm", price: 55000 }],
    configs: [{ label: "Estructura + gráfica", price: 0 }],
    prints: [{ label: "Una cara", price: 0 }],
    bases: [{ label: "Base incluida", price: 0 }],
    masts: [{ label: "Mástil incluido", price: 0 }],
    specs: [["Material", "Lona / gráfica para display"], ["Impresión", "Alta definición"], ["Estructura", "Aluminio enrollable"], ["Uso", "Interior y eventos"], ["Producción", "Consultar"], ["Código", "PP-RU-001"]],
  },
  {
    id: "bandera-publicitaria",
    name: "Bandera Publicitaria",
    category: "Banderas",
    description: "Bandera personalizada de gran impacto visual para exteriores, accesos, promociones y eventos.",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=85"],
    featured: true,
    priceFrom: 240000,
    sizes: [{ label: "70 × 200 cm", price: 0 }, { label: "90 × 250 cm", price: 60000 }],
    configs: [{ label: "Bandera + estructura", price: 0 }, { label: "Kit completo", price: 90000 }],
    prints: [{ label: "Una cara", price: 0 }, { label: "Dos caras", price: 70000 }],
    bases: [{ label: "Base estándar", price: 0 }, { label: "Base premium", price: 45000 }],
    masts: [{ label: "Mástil estándar", price: 0 }, { label: "Mástil reforzado", price: 50000 }],
    specs: [["Material", "Tela poliéster"], ["Impresión", "Sublimación"], ["Acabado", "Costura reforzada"], ["Uso", "Exterior / interior"], ["Producción", "Consultar"], ["Código", "PP-BD-001"]],
  },
  {
    id: "display-pop",
    name: "Display POP",
    category: "Displays",
    description: "Solución de exhibición para destacar productos, marcas y promociones en puntos de venta.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85"],
    priceFrom: 450000,
    sizes: [{ label: "Medida estándar", price: 0 }, { label: "A medida", price: 120000 }],
    configs: [{ label: "Estructura + gráfica", price: 0 }],
    prints: [{ label: "Una cara", price: 0 }, { label: "Dos caras", price: 90000 }],
    bases: [{ label: "Base incluida", price: 0 }],
    masts: [{ label: "No aplica", price: 0 }],
    specs: [["Material", "Según proyecto"], ["Gráfica", "Impresión de alta definición"], ["Estructura", "Personalizable"], ["Uso", "Punto de venta"], ["Producción", "Consultar"], ["Código", "PP-DP-001"]],
  },
];

const money = (value: number) => `Gs. ${new Intl.NumberFormat("es-PY").format(value)}`;

function Logo() {
  return <div className="catalog-logo"><div className="logo-mark"><i /><b /></div><div><strong><span>Pro</span>Public</strong><small>Industria Publicitaria</small></div></div>;
}

export default function PublicCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [promoOnly, setPromoOnly] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(0);
  const [config, setConfig] = useState(0);
  const [print, setPrint] = useState(0);
  const [base, setBase] = useState(0);
  const [mast, setMast] = useState(0);
  const [sort, setSort] = useState("destacados");

  const filtered = useMemo(() => {
    let list = products.filter((p) => (category === "Todos" || p.category === category) && (!promoOnly || p.promo) && `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "precio-menor") list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "precio-mayor") list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
    return list;
  }, [query, category, promoOnly, sort]);

  const openProduct = (p: Product) => { setSelected(p); setActiveImage(0); setSize(0); setConfig(0); setPrint(0); setBase(0); setMast(0); };
  const currentPrice = selected ? selected.priceFrom + selected.sizes[size].price + selected.configs[config].price + selected.prints[print].price + selected.bases[base].price + selected.masts[mast].price : 0;
  const whatsapp = selected ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quisiera consultar por el producto: ${selected.name}.\nMedida: ${selected.sizes[size].label}\nConfiguración: ${selected.configs[config].label}\nImpresión: ${selected.prints[print].label}\nCantidad: `)}` : `https://wa.me/${WHATSAPP_NUMBER}`;

  return <div className="public-site">
    <header className="catalog-header">
      <a href="#inicio" aria-label="ProPublic inicio"><Logo /></a>
      <nav className={mobileMenu ? "mobile-open" : ""}>
        <a href="#inicio" onClick={() => setMobileMenu(false)}>Inicio</a>
        <a href="#catalogo" onClick={() => setMobileMenu(false)}>Catálogo</a>
        <a href="#categorias" onClick={() => setMobileMenu(false)}>Categorías</a>
        <a href="#promociones" onClick={() => { setPromoOnly(true); setMobileMenu(false); }}>Promociones</a>
        <a href="#contacto" onClick={() => setMobileMenu(false)}>Contacto</a>
      </nav>
      <a className="wa-head" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a>
      <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menú">{mobileMenu ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section id="inicio" className="catalog-hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15}/> Comunicación visual que se hace notar</div>
          <h1>Tu marca,<br/><em>en primer plano.</em></h1>
          <p>Productos publicitarios pensados para destacar tu empresa en eventos, puntos de venta, promociones y campañas.</p>
          <div className="hero-actions"><a href="#catalogo" className="primary-btn">Ver catálogo <ArrowRight size={18}/></a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="light-btn"><MessageCircle size={18}/> Consultar por WhatsApp</a></div>
          <div className="hero-proof"><span><strong>01</strong> Catálogo visual</span><span><strong>02</strong> Configuraciones</span><span><strong>03</strong> Atención directa</span></div>
        </div>
        <div className="hero-visual"><div className="hero-photo"/><div className="hero-card"><span>PRODUCTO DESTACADO</span><strong>Fly Banner</strong><small>Portátil · Personalizable · Alto impacto</small></div></div>
      </section>

      <section id="categorias" className="section categories-section">
        <div className="section-heading"><div><span className="section-kicker">Explorá por categoría</span><h2>Soluciones para cada campaña</h2></div><p>Una selección inicial preparada para crecer con tu catálogo.</p></div>
        <div className="category-grid">{categories.map((c) => <button key={c.name} className="category-card" onClick={() => { setCategory(c.name === "Fly Banners" || c.name === "Banderas" || c.name === "Roll Up" || c.name === "Displays" ? c.name : "Todos"); document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth"}); }}><img src={c.image} alt=""/><div className="category-overlay"><span>{c.icon}</span><strong>{c.name}</strong><small>Ver productos <ArrowRight size={14}/></small></div></button>)}</div>
      </section>

      <section id="catalogo" className="section catalog-section">
        <div className="section-heading catalog-title"><div><span className="section-kicker">Catálogo</span><h2>Productos publicitarios</h2></div><p>{filtered.length} productos visibles</p></div>
        <div className="catalog-toolbar">
          <label className="catalog-search"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto..."/><kbd>⌘ K</kbd></label>
          <div className="toolbar-right"><button className={promoOnly ? "filter-chip active" : "filter-chip"} onClick={() => setPromoOnly(!promoOnly)}><Filter size={15}/> Promociones</button><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="destacados">Ordenar: destacados</option><option value="precio-menor">Precio: menor a mayor</option><option value="precio-mayor">Precio: mayor a menor</option></select></div>
        </div>
        <div className="filter-strip"><button className={category === "Todos" ? "active" : ""} onClick={() => setCategory("Todos")}>Todos</button>{categories.map(c => <button key={c.name} className={category === c.name ? "active" : ""} onClick={() => setCategory(c.name)}>{c.name}</button>)}</div>
        <div className="product-grid">{filtered.map(p => <article className="product-card" key={p.id}>
          <button className="product-image" onClick={() => openProduct(p)}><img src={p.image} alt={p.name}/>{p.promo && <span className="promo-badge">PROMO</span>}<span className="view-overlay">Ver producto <ArrowRight size={15}/></span></button>
          <div className="product-body"><div className="product-meta"><span>{p.category}</span>{p.featured && <span className="featured-dot">Destacado</span>}</div><h3>{p.name}</h3><p>{p.description}</p><div className="product-bottom"><div><small>Desde</small><strong>{money(p.priceFrom)}</strong></div><button onClick={() => openProduct(p)}>Configurar <ArrowRight size={16}/></button></div></div>
        </article>)}</div>
        {filtered.length === 0 && <div className="empty-catalog"><SlidersHorizontal/><h3>No encontramos productos</h3><p>Probá con otra búsqueda o categoría.</p><button onClick={() => {setQuery("");setCategory("Todos");setPromoOnly(false)}}>Limpiar filtros</button></div>}
      </section>

      <section id="promociones" className="promo-section"><div className="promo-copy"><span className="section-kicker">Promociones</span><h2>Más visibilidad.<br/><em>Más impacto.</em></h2><p>Destacá campañas especiales, precios promocionales y oportunidades comerciales sin perder la estética de marca.</p><button onClick={() => {setPromoOnly(true);document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth"})}}>Ver promociones <ArrowRight size={17}/></button></div><div className="promo-product"><img src={products[0].image} alt="Fly Banner"/><div><span>DESTACADO</span><strong>Fly Banner</strong><small>Configurá medida, base, mástil e impresión.</small></div></div></section>

      <section className="featured-section section"><div className="section-heading"><div><span className="section-kicker">Cómo funciona</span><h2>Del catálogo a tu consulta</h2></div></div><div className="steps"><div><b>01</b><h3>Elegí</h3><p>Encontrá el producto ideal por categoría o búsqueda.</p></div><div><b>02</b><h3>Configurá</h3><p>Seleccioná medidas, materiales, accesorios y acabados.</p></div><div><b>03</b><h3>Consultá</h3><p>Recibí atención directa por WhatsApp con tu configuración.</p></div></div></section>

      <section id="contacto" className="contact-section"><div><span className="section-kicker">Contacto</span><h2>Hablemos de tu próxima campaña.</h2><p>Contanos qué necesitás y te ayudamos a encontrar la solución publicitaria adecuada.</p></div><div className="contact-actions"><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="primary-btn"><MessageCircle size={18}/> Consultar por WhatsApp</a><div><small>Teléfono / WhatsApp</small><strong>+595 XXX XXX XXX</strong></div><div><small>Email</small><strong>info@propublic.com.py</strong></div></div></section>
    </main>

    <footer className="catalog-footer"><Logo/><div><a href="#catalogo">Catálogo</a><a href="#categorias">Categorías</a><a href="#promociones">Promociones</a><a href="#contacto">Contacto</a></div><p>© {new Date().getFullYear()} ProPublic Industria Publicitaria. Todos los derechos reservados.</p></footer>

    {selected && <div className="product-modal-backdrop" onMouseDown={(e) => {if(e.target === e.currentTarget) setSelected(null)}}><div className="product-modal">
      <button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar"><X/></button>
      <div className="modal-gallery"><div className="modal-main-image"><img src={selected.gallery[activeImage]} alt={selected.name}/>{selected.promo && <span className="promo-badge">PROMO</span>}</div><div className="thumbs">{selected.gallery.map((g,i)=><button className={activeImage===i?"active":""} key={g} onClick={()=>setActiveImage(i)}><img src={g} alt=""/></button>)}</div></div>
      <div className="modal-info"><span className="section-kicker">{selected.category}</span><h2>{selected.name}</h2><p className="modal-description">{selected.description}</p>
        <div className="option-block"><label>Tamaño</label><div className="option-grid">{selected.sizes.map((o,i)=><button className={size===i?"selected":""} key={o.label} onClick={()=>setSize(i)}>{o.label}<Check size={15}/></button>)}</div></div>
        <div className="option-block"><label>Configuración</label><div className="option-grid">{selected.configs.map((o,i)=><button className={config===i?"selected":""} key={o.label} onClick={()=>setConfig(i)}>{o.label}<Check size={15}/></button>)}</div></div>
        <div className="option-row"><div className="option-block"><label>Impresión</label><select value={print} onChange={e=>setPrint(Number(e.target.value))}>{selected.prints.map((o,i)=><option key={o.label} value={i}>{o.label}{o.price?` (+ ${money(o.price)})`:""}</option>)}</select></div><div className="option-block"><label>Base</label><select value={base} onChange={e=>setBase(Number(e.target.value))}>{selected.bases.map((o,i)=><option key={o.label} value={i}>{o.label}{o.price?` (+ ${money(o.price)})`:""}</option>)}</select></div></div>
        <div className="option-block"><label>Mástil</label><select value={mast} onChange={e=>setMast(Number(e.target.value))}>{selected.masts.map((o,i)=><option key={o.label} value={i}>{o.label}{o.price?` (+ ${money(o.price)})`:""}</option>)}</select></div>
        <div className="price-panel"><span>Precio estimado</span><strong>{money(currentPrice)}</strong><small>Valor de demostración. Confirmar precio final según cantidad y producción.</small></div>
        <a href={whatsapp} target="_blank" rel="noreferrer" className="whatsapp-cta"><MessageCircle size={19}/> Consultar esta configuración</a>
        <div className="specs"><h3>Información técnica</h3>{selected.specs.map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>
      </div>
    </div></div>}
  </div>;
}
