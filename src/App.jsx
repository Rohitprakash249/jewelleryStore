import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = [
  "Collections",
  "Gold",
  "Silver",
  "Diamonds",
  "About",
  "Contact",
];

const HERO_SLIDES = [
  {
    title: "Timeless Gold",
    subtitle: "Crafted for Eternity",
    desc: "Discover our handcrafted 18K and 24K gold collections — each piece a testament to American artisanship.",
    img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1400&q=90",
    accent: "#C9A84C",
  },
  {
    title: "Pure Silver",
    subtitle: "Sterling Elegance",
    desc: "Sterling silver reimagined — from delicate chains to bold statement rings.",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1400&q=90",
    accent: "#A8B8C8",
  },
  {
    title: "Rare Diamonds",
    subtitle: "Light in Every Facet",
    desc: "Ethically sourced diamonds set in breathtaking designs. Forever yours.",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=90",
    accent: "#D4E8F0",
  },
];

const COLLECTIONS = [
  {
    name: "Gold Rings",
    price: "From $1,299",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    cat: "Gold",
  },
  {
    name: "Diamond Necklace",
    price: "From $3,499",
    tag: "New Arrival",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85",
    cat: "Diamonds",
  },
  {
    name: "Silver Bracelet",
    price: "From $299",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85",
    cat: "Silver",
  },
  {
    name: "Gold Earrings",
    price: "From $799",
    tag: "Exclusive",
    img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=85",
    cat: "Gold",
  },
  {
    name: "Diamond Ring",
    price: "From $5,999",
    tag: "Signature",
    img: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=85",
    cat: "Diamonds",
  },
  {
    name: "Gold Rings",
    price: "From $1,299",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    cat: "Gold",
  },
  // {
  //   name: "Silver Necklace",
  //   price: "From $199",
  //   tag: "Classic",
  //   img: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=85",
  //   cat: "Silver",
  // },
  // {
  //   name: "Gold Bracelet",
  //   price: "From $1,099",
  //   tag: "Limited",
  //   img: "https://images.unsplash.com/photo-1625823958673-3e14d67a9cff?w=600&q=85",
  //   cat: "Gold",
  // },
  {
    name: "Silver Bracelet",
    price: "From $299",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85",
    cat: "Silver",
  },
  {
    name: "Diamond Earrings",
    price: "From $2,199",
    tag: "Luxe",
    img: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=85",
    cat: "Diamonds",
  },
];

const CATEGORIES = [
  {
    name: "Gold",
    desc: "18K & 24K Collections",
    img: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=800&q=85",
    color: "#C9A84C",
  },
  {
    name: "Silver",
    desc: "Sterling & Fine Silver",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    color: "#8A9BAB",
  },
  {
    name: "Diamonds",
    desc: "GIA Certified Stones",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&q=85",
    color: "#5B8FA8",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    loc: "New York, NY",
    text: "The diamond engagement ring I ordered was absolutely breathtaking. The craftsmanship is unparalleled and the service was impeccable.",
    stars: 5,
    avatar: "SM",
  },
  {
    name: "James Thornton",
    loc: "Beverly Hills, CA",
    text: "I've bought from many luxury jewelers, but LUXE AURA is truly in a class of its own. My wife's gold necklace still gets compliments years later.",
    stars: 5,
    avatar: "JT",
  },
  {
    name: "Amelia Chen",
    loc: "Chicago, IL",
    text: "Stunning silver bracelet — arrived beautifully packaged. The quality exceeds the price by far. I'll be a lifelong customer.",
    stars: 5,
    avatar: "AC",
  },
];

const STATS = [
  { label: "Years of Excellence", value: "32+" },
  { label: "Unique Designs", value: "1,200+" },
  { label: "Happy Clients", value: "50K+" },
  { label: "Countries Served", value: "40+" },
];

export default function App() {
  const [slide, setSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionsRef = useRef({});

  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisibleSections((prev) => ({ ...prev, [e.target.id]: true }));
        });
      },
      { threshold: 0.12 },
    );
    Object.values(sectionsRef.current).forEach(
      (el) => el && observer.observe(el),
    );
    return () => observer.disconnect();
  }, []);

  const registerSection = (id) => (el) => {
    sectionsRef.current[id] = el;
  };

  const filters = ["All", "Gold", "Silver", "Diamonds"];
  const filtered =
    activeFilter === "All"
      ? COLLECTIONS
      : COLLECTIONS.filter((c) => c.cat === activeFilter);

  const tagColor = (tag) => {
    const map = {
      Bestseller: { bg: "#FFF8E7", color: "#B8860B", border: "#E8C84A" },
      "New Arrival": { bg: "#F0F8F0", color: "#2D7A3A", border: "#6DBF7E" },
      Popular: { bg: "#F0F4FF", color: "#3A5CBF", border: "#7B9FE8" },
      Exclusive: { bg: "#FFF0F8", color: "#A0305A", border: "#E87BBF" },
      Signature: { bg: "#F8F0FF", color: "#6A35A8", border: "#B07BE8" },
      Classic: { bg: "#F5F5F5", color: "#555", border: "#BBB" },
      Limited: { bg: "#FFF3F0", color: "#C0401A", border: "#E8957B" },
      Luxe: { bg: "#FFFBF0", color: "#9A7B1A", border: "#D4A84C" },
    };
    return map[tag] || { bg: "#F5F5F5", color: "#555", border: "#BBB" };
  };

  return (
    <>
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; background: #FAFAF8; color: #1A1A18; overflow-x: hidden; }

        .serif { font-family: 'Cormorant Garamond', serif; }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.4s; }
        .fade-up.d5 { transition-delay: 0.5s; }

        .card-hover {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.12);
        }

        .img-zoom img {
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .img-zoom:hover img { transform: scale(1.07); }

        .gold-btn {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C84A 50%, #C9A84C 100%);
          color: #1A1A18;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
          transition: all 0.3s ease;
          background-size: 200% 100%;
          background-position: 0% 0%;
        }
        .gold-btn:hover {
          background-position: 100% 0%;
          box-shadow: 0 8px 30px rgba(201,168,76,0.4);
          transform: translateY(-1px);
        }

        .outline-btn {
          background: transparent;
          color: #1A1A18;
          border: 1px solid #C9A84C;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 12px;
          transition: all 0.3s ease;
        }
        .outline-btn:hover {
          background: #C9A84C;
          color: #1A1A18;
        }

        .divider-gold {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          margin: 0 auto;
        }

        .hero-slide { position: absolute; inset: 0; transition: opacity 0.9s ease; }

        .filter-btn {
          background: transparent;
          border: 1px solid #DDD;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.25s ease;
          color: #666;
        }
        .filter-btn.active, .filter-btn:hover {
          background: #1A1A18;
          border-color: #1A1A18;
          color: #FFF;
        }

        .star { color: #C9A84C; }

        .newsletter-input {
          font-family: 'Jost', sans-serif;
          border: 1px solid #DDD;
          outline: none;
          background: #FFF;
          color: #1A1A18;
          transition: border-color 0.25s;
        }
        .newsletter-input:focus { border-color: #C9A84C; }

        .nav-link {
          color: inherit;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 400;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0; right: 0;
          height: 1px;
          background: #C9A84C;
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link:hover { color: #C9A84C; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F8F8F6; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 3px; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-title { font-size: 3.5rem !important; }
          .collection-grid { grid-template-columns: repeat(2,1fr) !important; }
          .cat-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style> */}

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "14px 48px" : "22px 48px",
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <div>
          <div
            className="serif"
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: scrolled ? "#1A1A18" : "#FFF",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Luxe Aura
          </div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A84C",
              fontWeight: 300,
              marginTop: 2,
              // marginRight: 50,
            }}
          >
            Fine Jewelry • Est. 1992
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "36px" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="nav-link"
              style={{ color: scrolled ? "#1A1A18" : "rgba(255,255,255,0.9)" }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Icons */}
        <div
          className=" lg:hidden"
          // style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <button
            className="hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setCartCount((c) => c + 1)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={scrolled ? "#1A1A18" : "#FFF"}
              strokeWidth="1.5"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "#C9A84C",
                  color: "#FFF",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  fontSize: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            className=" mobile-menu-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: 4,
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  background: scrolled ? "#1A1A18" : "#FFF",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="serif"
              style={{
                fontSize: "28px",
                color: "#1A1A18",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className="hero-slide"
            style={{
              opacity: i === slide ? 1 : 0,
              pointerEvents: i === slide ? "all" : "none",
            }}
          >
            <img
              src={s.img}
              alt={s.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.45)",
              }}
            />
          </div>
        ))}

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#C9A84C",
              fontWeight: 400,
              marginBottom: "16px",
              animation: "fadeInUp 0.8s ease both",
            }}
          >
            {HERO_SLIDES[slide].subtitle}
          </div>
          <h1
            className="serif hero-title"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              fontWeight: 300,
              color: "#FFF",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              marginBottom: "24px",
              animation: "fadeInUp 0.9s 0.1s ease both",
            }}
          >
            {HERO_SLIDES[slide].title}
          </h1>
          <div className="divider-gold" style={{ marginBottom: "24px" }} />
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "15px",
              fontWeight: 300,
              maxWidth: "520px",
              lineHeight: 1.8,
              marginBottom: "40px",
              letterSpacing: "0.02em",
              animation: "fadeInUp 1s 0.2s ease both",
            }}
          >
            {HERO_SLIDES[slide].desc}
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              className="gold-btn"
              style={{ padding: "15px 44px", borderRadius: "2px" }}
            >
              Explore Collection
            </button>
            <button
              className="outline-btn"
              style={{
                padding: "15px 44px",
                borderRadius: "2px",
                color: "#FFF",
                borderColor: "rgba(255,255,255,0.5)",
              }}
            >
              Book Consultation
            </button>
          </div>
        </div>

        {/* Slide Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
          }}
        >
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? 32 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: i === slide ? "#C9A84C" : "rgba(255,255,255,0.4)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div
        style={{
          background: "#1A1A18",
          padding: "14px 0",
          overflow: "hidden",
          borderTop: "1px solid #333",
          borderBottom: "1px solid #333",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "60px",
            whiteSpace: "nowrap",
            animation: "marquee 22s linear infinite",
          }}
        >
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 300,
                  display: "flex",
                  alignItems: "center",
                  gap: "60px",
                }}
              >
                <span>✦ Handcrafted Gold</span>
                <span>✦ GIA Certified Diamonds</span>
                <span>✦ Sterling Silver</span>
                <span>✦ Free US Shipping</span>
                <span>✦ Lifetime Warranty</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section
        id="cats"
        ref={registerSection("cats")}
        style={{ padding: "100px 48px" }}
      >
        <div
          className={`fade-up ${visibleSections.cats ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "12px",
            }}
          >
            Our Materials
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            Three Precious Worlds
          </h2>
          <div className="divider-gold" style={{ marginTop: "20px" }} />
        </div>

        <div
          className="cat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {CATEGORIES.map((c, i) => (
            <div
              key={c.name}
              className={`fade-up d${i + 1} ${visibleSections.cats ? "visible" : ""} card-hover img-zoom`}
              style={{
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: "3/4",
                cursor: "pointer",
              }}
            >
              <img
                src={c.img}
                alt={c.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(10,10,8,0.85) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "36px 32px",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 1,
                    background: c.color,
                    marginBottom: "14px",
                  }}
                />
                <h3
                  className="serif"
                  style={{
                    fontSize: "2rem",
                    color: "#FFF",
                    fontWeight: 400,
                    marginBottom: "6px",
                  }}
                >
                  {c.name}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.desc}
                </p>
                <div
                  style={{
                    marginTop: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: c.color,
                    fontWeight: 400,
                  }}
                >
                  Explore <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section
        id="collections"
        ref={registerSection("collections")}
        style={{ padding: "20px 48px 100px", background: "#F8F7F5" }}
      >
        <div
          className={`fade-up ${visibleSections.collections ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "12px",
            }}
          >
            Curated Selection
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            Featured Pieces
          </h2>
          <div
            className="divider-gold"
            style={{ marginTop: "20px", marginBottom: "36px" }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
                style={{ padding: "10px 24px", borderRadius: "2px" }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div
          // className="collection-grid"
          // className=" grid grid-cols-2 grid-rows-2"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
          style={{
            display: "grid",
            // gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          {filtered.map((item, i) => {
            const tc = tagColor(item.tag);
            const isWished = wishlist.includes(item.name);
            return (
              <div
                key={item.name + i}
                className={`fade-up d${(i % 4) + 1} ${visibleSections.collections ? "visible" : ""} card-hover`}
                style={{
                  background: "#FFF",
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {/* Image */}
                <div
                  className="img-zoom"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "1/1.1",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      background: tc.bg,
                      color: tc.color,
                      border: `1px solid ${tc.border}`,
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "2px",
                      fontWeight: 500,
                    }}
                  >
                    {item.tag}
                  </div>
                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWishlist((w) =>
                        isWished
                          ? w.filter((n) => n !== item.name)
                          : [...w, item.name],
                      );
                    }}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: 34,
                      height: 34,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={isWished ? "#C9A84C" : "none"}
                      stroke={isWished ? "#C9A84C" : "#666"}
                      strokeWidth="1.5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div style={{ padding: "18px 20px 20px" }}>
                  <div
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      marginBottom: "6px",
                    }}
                  >
                    {item.cat}
                  </div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      marginBottom: "8px",
                      color: "#1A1A18",
                    }}
                  >
                    {item.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#888",
                        fontWeight: 300,
                      }}
                    >
                      {item.price}
                    </span>
                    <button
                      className="gold-btn"
                      style={{
                        padding: "8px 18px",
                        borderRadius: "2px",
                        fontSize: "10px",
                      }}
                      onClick={() => setCartCount((c) => c + 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURE BANNER ── */}
      <section
        style={{
          position: "relative",
          padding: "120px 48px",
          background: "#1A1A18",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "20px",
            }}
          >
            The Luxe Aura Promise
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#FFF",
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: "28px",
            }}
          >
            Every piece is a<br />
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>
              story worth telling
            </em>
          </h2>
          <div className="divider-gold" style={{ marginBottom: "28px" }} />
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.9,
              fontSize: "15px",
              fontWeight: 300,
              marginBottom: "44px",
            }}
          >
            We source only the finest metals and gemstones, working with master
            artisans across America to create jewelry that transcends
            generations. Each piece is crafted with intention, precision, and
            love.
          </p>
          <div
            style={{
              display: "flex",
              gap: "48px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "✦", label: "GIA Certified" },
              { icon: "✦", label: "Lifetime Warranty" },
              { icon: "✦", label: "Free Returns" },
              { icon: "✦", label: "Secure Checkout" },
            ].map((f) => (
              <div key={f.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: "#C9A84C",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                  }}
                >
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        id="stats"
        ref={registerSection("stats")}
        style={{ padding: "80px 48px", background: "#FFF" }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            maxWidth: "1000px",
            margin: "0 auto",
            gap: "40px",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`fade-up d${i + 1} ${visibleSections.stats ? "visible" : ""}`}
              style={{ textAlign: "center" }}
            >
              <div
                className="serif"
                style={{
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#C9A84C",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  width: 30,
                  height: 1,
                  background: "#C9A84C",
                  margin: "12px auto",
                }}
              />
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL FEATURE ── */}
      <section
        id="editorial"
        ref={registerSection("editorial")}
        style={{ padding: "80px 48px 100px", background: "#FAFAF8" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <div
            className={`fade-up ${visibleSections.editorial ? "visible" : ""}`}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: "16px",
              }}
            >
              Our Craft
            </p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.3,
                marginBottom: "24px",
              }}
            >
              Handcrafted with Generations of Expertise
            </h2>
            <div
              style={{
                width: 50,
                height: 1,
                background: "#C9A84C",
                marginBottom: "24px",
              }}
            />
            <p
              style={{
                color: "#666",
                lineHeight: 1.9,
                fontSize: "15px",
                fontWeight: 300,
                marginBottom: "20px",
              }}
            >
              Founded in New York City in 1992, Luxe Aura has spent three
              decades perfecting the art of fine jewelry. Our master jewelers
              hand-select every gemstone and pour meticulous care into each
              setting.
            </p>
            <p
              style={{
                color: "#666",
                lineHeight: 1.9,
                fontSize: "15px",
                fontWeight: 300,
                marginBottom: "36px",
              }}
            >
              Whether it's a diamond engagement ring or a delicate silver chain,
              every Luxe Aura piece carries a promise: enduring quality,
              extraordinary beauty, and a lifetime of memories.
            </p>
            <button
              className="gold-btn"
              style={{ padding: "15px 44px", borderRadius: "2px" }}
            >
              Our Story
            </button>
          </div>

          <div
            className={`fade-up d2 ${visibleSections.editorial ? "visible" : ""}`}
            style={{ position: "relative" }}
          >
            <div
              className="img-zoom"
              style={{ borderRadius: "4px", overflow: "hidden" }}
            >
              <img
                src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=85"
                alt="Jewelry crafting"
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                left: "-24px",
                background: "#C9A84C",
                padding: "28px 32px",
                borderRadius: "4px",
              }}
            >
              <div
                className="serif"
                style={{
                  fontSize: "2.2rem",
                  color: "#1A1A18",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                32
              </div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.7)",
                  marginTop: "4px",
                }}
              >
                Years of Craft
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="testimonials"
        ref={registerSection("testimonials")}
        style={{ padding: "100px 48px", background: "#1A1A18" }}
      >
        <div
          className={`fade-up ${visibleSections.testimonials ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "12px",
            }}
          >
            Client Stories
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: "#FFF",
              letterSpacing: "0.03em",
            }}
          >
            Voices of Joy
          </h2>
          <div className="divider-gold" style={{ marginTop: "20px" }} />
        </div>

        <div
          className="testimonial-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "28px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`fade-up d${i + 1} ${visibleSections.testimonials ? "visible" : ""}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "4px",
                padding: "36px",
              }}
            >
              <div
                style={{ display: "flex", gap: "3px", marginBottom: "20px" }}
              >
                {Array(t.stars)
                  .fill(0)
                  .map((_, j) => (
                    <span key={j} className="star" style={{ fontSize: "14px" }}>
                      ★
                    </span>
                  ))}
              </div>
              <p
                className="serif"
                style={{
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  marginBottom: "28px",
                  fontWeight: 300,
                }}
              >
                "{t.text}"
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "#C9A84C",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{ fontSize: "13px", color: "#FFF", fontWeight: 500 }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {t.loc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOOKBOOK GRID ── */}
      <section
        id="lookbook"
        ref={registerSection("lookbook")}
        style={{ padding: "100px 48px", background: "#FFF" }}
      >
        <div
          className={`fade-up ${visibleSections.lookbook ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "12px",
            }}
          >
            Visual Journal
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            The Lookbook
          </h2>
          <div className="divider-gold" style={{ marginTop: "20px" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "280px 280px",
            gap: "12px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {[
            {
              img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85",
              span: "2/2",
              rowspan: "1/3",
              label: "Gold & Diamond",
            },
            {
              img: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&q=85",
              label: "Bridal Rings",
            },
            {
              img: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&q=85",
              label: "Layered Necklaces",
            },
            {
              img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85",
              label: "Silver Bracelets",
            },
            {
              img: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=600&q=85",
              label: "Diamond Studs",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`fade-up d${i + 1} ${visibleSections.lookbook ? "visible" : ""} img-zoom`}
              style={{
                gridColumn: i === 0 ? item.span : undefined,
                gridRow: i === 0 ? item.rowspan : undefined,
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(10,10,8,0.7) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#FFF",
                  fontWeight: 400,
                  opacity: 0,
                  transition: "opacity 0.3s",
                  pointerEvents: "none",
                }}
                id={`lb-label-${i}`}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section
        style={{
          padding: "100px 48px",
          background:
            "linear-gradient(135deg, #F8F4EC 0%, #FFF8EE 50%, #F8F4EC 100%)",
        }}
      >
        <div
          style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "16px",
            }}
          >
            Stay Connected
          </p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 300,
              marginBottom: "16px",
            }}
          >
            Join the Inner Circle
          </h2>
          <div className="divider-gold" style={{ marginBottom: "20px" }} />
          <p
            style={{
              color: "#888",
              fontSize: "14px",
              lineHeight: 1.8,
              marginBottom: "36px",
              fontWeight: 300,
            }}
          >
            Be the first to know about new collections, exclusive events, and
            private sales. Members receive 10% off their first order.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0",
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              style={{
                flex: 1,
                padding: "16px 20px",
                fontSize: "13px",
                borderRadius: "2px 0 0 2px",
                borderRight: "none",
                outline: "none",
              }}
            />
            <button
              className="gold-btn"
              style={{
                padding: "16px 28px",
                borderRadius: "0 2px 2px 0",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </div>
          <p style={{ fontSize: "11px", color: "#BBB", marginTop: "14px" }}>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111110", padding: "72px 48px 36px" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "60px",
            maxWidth: "1200px",
            margin: "0 auto",
            paddingBottom: "60px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <div
              className="serif"
              style={{
                fontSize: "24px",
                color: "#FFF",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Luxe Aura
            </div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.35em",
                color: "#C9A84C",
                marginBottom: "20px",
              }}
            >
              Fine Jewelry • Est. 1992
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "13px",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "260px",
              }}
            >
              America's premier fine jewelry destination. Crafting beauty since
              1992 from our New York City atelier.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "28px" }}>
              {["IG", "FB", "PT", "TW"].map((s) => (
                <button
                  key={s}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "10px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#C9A84C";
                    e.currentTarget.style.color = "#1A1A18";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Collections",
              links: [
                "Gold Jewelry",
                "Silver Jewelry",
                "Diamonds",
                "Bridal",
                "Men's",
                "Custom Design",
              ],
            },
            {
              title: "Services",
              links: [
                "Custom Engraving",
                "Jewelry Repair",
                "Resizing",
                "Appraisals",
                "Gift Wrapping",
                "Consultations",
              ],
            },
            {
              title: "Company",
              links: [
                "Our Story",
                "Craftsmanship",
                "Sustainability",
                "Careers",
                "Press",
                "Contact Us",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: "20px",
                  fontWeight: 500,
                }}
              >
                {col.title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "13px",
                        textDecoration: "none",
                        fontWeight: 300,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#FFF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "32px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
            © 2024 Luxe Aura Fine Jewelry. All rights reserved. New York City,
            USA.
          </p>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "11px",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                }
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
