import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const CERTIFICATES = [
  {
    id: "cert_1",
    title: "MARKETING ANALYTICS",
    issuer: "NPTEL",
    date: "JAN 2026",
    image: "/Marketing.png",
    color: "#0000",
  },
  {
    id: "cert_2",
    title: "CLOUD COMPUTING",
    issuer: "NPTEL",
    date: "JAN 2025",
    image: "/Cloud.png",
    color: "#0000",
  },
  {
    id: "cert_3",
    title: "PYTHON PROGRAMMING",
    issuer: "VITYARTHI",
    date: "SEPT 2024",
    image: "/Python.png",
    color: "#0000",
  },
  {
    id: "cert_4",
    title: "LINUX",
    issuer: "VITYARTHI",
    date: "JAN 2026",
    image: "/Linux.png",
    color: "#0000",
  },
  {
    id: "cert_5",
    title: "AIML",
    issuer: "VITYARTHI",
    date: "JAN 2025",
    image: "/AIML.png",
    color: "#0000",
  },
];

function FadeSlide({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 36 : direction === "down" ? -36 : 0,
        x: direction === "left" ? 36 : direction === "right" ? -36 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function CardStack({ cards, onCycle, isDark }) {
  const bg     = isDark ? "#1c1c1c" : "#e0e0e0";
  const sh1    = isDark ? "#0d0d0d" : "#bebebe";
  const sh2    = isDark ? "#2a2a2a" : "#ffffff";
  const OFFSET = 8;
  const SCALE  = 0.06;
  const DIM    = 0.18;

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", overflow: "visible", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ul style={{ position: "relative", width: "100%", height: "100%", margin: 0, padding: 0 }}>
        {cards.map(({ id, image, title }, i) => {
          const isFront    = i === 0;
          const brightness = Math.max(0.15, 1 - i * DIM);
          const zIndex     = cards.length - i;

          return (
            <motion.li
              key={id}
              style={{
                position: "absolute", width: "100%", height: "100%",
                borderRadius: 14, listStyle: "none",
                cursor: isFront ? "grab" : "auto",
                overflow: "hidden", touchAction: "none", zIndex,
                background: bg,
                boxShadow: `8px 8px 20px ${sh1}, -8px -8px 20px ${sh2}`,
              }}
              animate={{ top: `calc(${i * -OFFSET}%)`, scale: 1 - i * SCALE, filter: `brightness(${brightness})`, zIndex }}
              transition={{ type: "spring", stiffness: 170, damping: 26 }}
              drag={isFront ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragMomentum={false}
              onDragEnd={(_, info) => { if (info.offset.y < -30 || Math.abs(info.offset.y) < 6) onCycle(); }}
              whileDrag={isFront ? { zIndex: cards.length + 1, cursor: "grabbing", scale: 1.03, rotate: 1.5 } : {}}
              whileTap={isFront ? { scale: 0.98 } : {}}
            >
              {image ? (
                <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
              ) : (
                <PlaceholderCard cert={cards[i]} isDark={isDark} />
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function PlaceholderCard({ cert, isDark }) {
  const text   = isDark ? "#e8eaf0" : "#111";
  const muted  = isDark ? "rgba(232,234,240,0.45)" : "rgba(20,20,20,0.45)";
  const lineBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(14px, 3.5%, 22px)", boxSizing: "border-box", fontFamily: "'DM Mono', monospace", position: "relative", overflow: "hidden" }}>
      {[25, 50, 75].map(p => (
        <div key={p} style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, width: 1, background: lineBg, pointerEvents: "none" }} />
      ))}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: muted }}>
          {cert.issuer}
        </span>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: cert.color, boxShadow: `0 0 8px ${cert.color}`, flexShrink: 0 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, position: "relative", zIndex: 1 }}>
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
          <circle cx="40" cy="40" r="38" stroke={text} strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="40" cy="40" r="28" stroke={text} strokeWidth="1" />
          <path d="M40 18l3.5 7.5L52 27l-6 5.5 1.5 8.5L40 37l-7.5 4 1.5-8.5L28 27l8.5-1.5L40 18z" stroke={text} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ margin: 0, fontSize: "clamp(0.72rem, 1.8vw, 0.9rem)", fontWeight: 500, color: text, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {cert.title}
        </p>
      </div>
    </div>
  );
}

function CertInfo({ cert, total, current, isDark }) {
  const text  = isDark ? "#e8eaf0" : "#111";
  const muted = isDark ? "rgba(232,234,240,0.45)" : "rgba(20,20,20,0.45)";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cert.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ fontFamily: "'DM Mono', monospace", display: "flex", flexDirection: "column", gap: 8 }}
      >
        <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: muted }}>
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <h3 style={{
          margin: 0,
          fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
          fontWeight: 500,
          color: text,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}>
          {cert.title}
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}

function Dots({ total, current, onSelect, isDark }) {
  const active = isDark ? "#e8eaf0" : "#111";
  const rest   = isDark ? "rgba(232,234,240,0.2)" : "rgba(20,20,20,0.2)";
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to certificate ${i + 1}`}
          style={{
            width: i === current ? 20 : 7, height: 7, borderRadius: 99,
            background: i === current ? active : rest,
            border: "none", padding: 0, cursor: "pointer",
            transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.25s",
            outline: "none",
          }}
        />
      ))}
    </div>
  );
}

export default function Certificates({ theme = "dark" }) {
  const isDark = theme === "dark";
  const [cards, setCards] = useState(CERTIFICATES);

  const text  = isDark ? "#e8eaf0" : "#111";

  const currentIndex = CERTIFICATES.findIndex(c => c.id === cards[0].id);

  const cycle  = () => setCards(prev => [...prev.slice(1), prev[0]]);
  const jumpTo = (targetIndex) => {
    const certId = CERTIFICATES[targetIndex].id;
    setCards(prev => {
      const idx = prev.findIndex(c => c.id === certId);
      if (idx === 0) return prev;
      return [...prev.slice(idx), ...prev.slice(0, idx)];
    });
  };

  return (
    <>
      <style>{`
        .cert-section {
          --accent:  #666665;
          --accent2: #4a4b4b;

          position: relative;
          font-family: var(--mono);
          padding: clamp(48px, 7vw, 80px) clamp(20px, 6vw, 80px) clamp(36px, 6vw, 72px);
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }

        .cert-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          width: 80%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          /* Tighter gap so stack and heading are closer on desktop */
          gap: clamp(16px, 2.5vw, 32px);
          align-items: center;
        }

        .cert-left { display: flex; flex-direction: column; gap: clamp(16px, 2.5vw, 28px); }

        .cert-eyebrow {
          font-size: clamp(0.7rem, 1.4vw, 0.85rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--accent);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cert-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--accent);
          flex-shrink: 0;
        }

        .cert-headline {
          font-size: clamp(1.8rem, 4vw, 3.4rem);
          font-weight: 700;
          line-height: 1;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .cert-headline em {
          color: var(--accent);
        }

        .cert-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cert-stack-wrap {
          position: relative;
          /* Reduced from 18% */
          padding-bottom: 14%;
        }

        /* ── Tablet ── */
        @media (max-width: 860px) {
          .cert-section {
            /* Extra top padding so it breathes from the section above */
            padding-top: clamp(48px, 8vw, 72px);
          }
          .cert-inner {
            grid-template-columns: 1fr;
            /* Tight gap between stack and heading text on single-column */
            gap: 16px;
          }
          .cert-right { order: -1; }
          .cert-stack-wrap { padding-bottom: 18%; }
          .cert-headline { font-size: clamp(2rem, 6.5vw, 3rem); }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .cert-section {
            padding: 48px 20px 44px;
            align-items: flex-start;
          }
          .cert-inner {
            grid-template-columns: 1fr;
            gap: 0px;
          }
          .cert-right { order: -1; }
          .cert-stack-wrap { padding-bottom: 24%; }
          .cert-left { gap: 12px; }
          .cert-headline { font-size: clamp(1.8rem, 10vw, 2.6rem); }
        }

        /* ── Small phones ── */
        @media (max-width: 380px) {
          .cert-section { padding: 40px 14px 36px; }
          .cert-headline { font-size: clamp(1.6rem, 11vw, 2.2rem); }
          .cert-stack-wrap { padding-bottom: 28%; }
        }

        /* ── Wide ── */
        @media (min-width: 1400px) {
          .cert-inner { max-width: 1300px; }
        }
      `}</style>

      <section className="cert-section" id="certificates">
        <div className="cert-inner">

          <div className="cert-left">
            <FadeSlide delay={0}>
              <p className="cert-eyebrow">WHAT I'VE EARNED</p>
            </FadeSlide>

            <FadeSlide delay={0.07}>
              <h2 className="cert-headline" style={{ color: text }}>
                CERTIFI<em>CATIONS.</em>
              </h2>
            </FadeSlide>

            <FadeSlide delay={0.14}>
              <CertInfo
                cert={cards[0]}
                total={CERTIFICATES.length}
                current={currentIndex}
                isDark={isDark}
              />
            </FadeSlide>

            <FadeSlide delay={0.2}>
              <Dots
                total={CERTIFICATES.length}
                current={currentIndex}
                onSelect={jumpTo}
                isDark={isDark}
              />
            </FadeSlide>
          </div>

          <div className="cert-right">
            <FadeSlide delay={0.1} direction="left">
              <div className="cert-stack-wrap">
                <CardStack cards={cards} onCycle={cycle} isDark={isDark} />
              </div>
            </FadeSlide>
          </div>

        </div>
      </section>
    </>
  );
}