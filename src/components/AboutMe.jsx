import { useRef, useEffect, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

// ── Success quotes by great people ──────────────────────────────
const QUOTES = [
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
];

const getFinalRot = (i, total) => -60 + i * (360 / total);

function computeStackedOffset(initialAngleDeg, cardW, cardH) {
  const θ = (initialAngleDeg * Math.PI) / 180;
  const cx = cardW / 2;
  const cy = -cardH / 2;
  return {
    stackedX: -(cx * Math.cos(θ) - cy * Math.sin(θ)),
    stackedY: -(cx * Math.sin(θ) + cy * Math.cos(θ)),
  };
}

function CardItem({ quote, index, total, progress, initialAngle, cardW, cardH, cardRadius, theme }) {
  const isDark = theme === "dark";
  const rotate = useTransform(
    progress,
    [0, 1],
    [initialAngle, getFinalRot(index, total)]
  );

  const textColor = isDark ? "#ffffff" : "#000000";
  const cardBg  = isDark ? "#1c1c1c" : "#f3ece9";
  const subCol  = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const border  = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)";

  const scaleFactor = cardW / 240;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: cardW,
        height: cardH,
        left: 0,
        bottom: 0,
        transformOrigin: "left bottom",
        zIndex: total - index,
        borderRadius: cardRadius,
        backgroundColor: cardBg,
        border,
        overflow: "hidden",
        rotate,
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.35)"
          : "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: `${16 * scaleFactor}px ${18 * scaleFactor}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Quote mark */}
        <span
          style={{
            fontSize: `${42 * scaleFactor}px`,
            fontWeight: 900,
            color: textColor,
            lineHeight: 0.6,
            fontFamily: "Georgia, serif",
          }}
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <p
          style={{
            margin: 0,
            color: textColor,
            fontWeight: 700,
            fontSize: `${Math.max(13, 17 * scaleFactor)}px`,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {quote.text}
        </p>

        {/* Author */}
        <span
          style={{
            fontSize: `${Math.max(9, 11 * scaleFactor)}px`,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: subCol,
          }}
        >
          @{quote.author.replace(/\s+/g, "").toLowerCase()}
        </span>
      </div>

      {/* subtle glass glare */}
      <div style={{
        position: "absolute", inset: 0,
        background: isDark
          ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 42%, transparent 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 42%, transparent 100%)",
        borderRadius: cardRadius,
        pointerEvents: "none",
      }} />
    </motion.div>
  );
}

function CardArcScroll({ quotes = QUOTES, theme = "dark", initialAngle = 0, cardWidth = 380, cardHeight = 240, cardScale = 1, cardRadius = 0 }) {
  const containerRef = useRef(null);
  const scrollRef    = useRef(null);
  const total        = quotes.length;

  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerSize({ w: width || el.offsetWidth, h: height || el.offsetHeight });
    });
    ro.observe(el);
    setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const fanRadius = Math.sqrt(cardWidth * cardWidth + cardHeight * cardHeight);
  const scale =
    (containerSize.w === 0 && containerSize.h === 0
      ? 1
      : Math.min(
          (containerSize.w * 0.9) / (fanRadius * 2),
          (containerSize.h * 0.9) / (fanRadius * 2),
          1.5
        )) * cardScale;

  const responsiveCardW = cardWidth  * scale;
  const responsiveCardH = cardHeight * scale;

  const { stackedX, stackedY } = useMemo(
    () => computeStackedOffset(initialAngle, responsiveCardW, responsiveCardH),
    [initialAngle, responsiveCardW, responsiveCardH]
  );

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 1 });

  const groupX = useTransform(progress, [0, 1], [stackedX, 0]);
  const groupY = useTransform(progress, [0, 1], [stackedY, 0]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      <style>{`.cf-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        ref={scrollRef}
        className="cf-scroll"
        style={{ position: "absolute", inset: 0, overflowY: "scroll", zIndex: 10, scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div style={{ height: "300%", width: "100%" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1 }}>
        <motion.div style={{ position: "relative", width: 0, height: 0, x: groupX, y: groupY }}>
          {quotes.map((quote, index) => (
            <CardItem
              key={index}
              quote={quote}
              index={index}
              total={total}
              progress={progress}
              initialAngle={initialAngle}
              cardW={responsiveCardW}
              cardH={responsiveCardH}
              cardRadius={cardRadius}
              theme={theme}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Paragraphs ────────────────────────────────────────────────
const PARAGRAPHS = [
  "I'M A COMPUTER SCIENCE ENGINEERING STUDENT PASSIONATE ABOUT SOFTWARE DEVELOPMENT, PROBLEM-SOLVING, AND EMERGING TECHNOLOGIES. I ENJOY BUILDING WEB APPLICATIONS, EXPLORING NEW TOOLS AND FRAMEWORKS, AND APPLYING MY TECHNICAL SKILLS TO CREATE PRACTICAL SOLUTIONS. MY INTERESTS SPAN FULL-STACK DEVELOPMENT, DATA STRUCTURES AND ALGORITHMS, CLOUD COMPUTING, AND CORE COMPUTER SCIENCE SUBJECTS. I'M CONSTANTLY IMPROVING THROUGH PROJECTS, CODING CHALLENGES, AND CONTINUOUS LEARNING WHILE STRENGTHENING MY UNDERSTANDING OF SOFTWARE ENGINEERING PRINCIPLES. BEYOND ACADEMICS, I VALUE DISCIPLINE, CONSISTENCY, AND SELF-IMPROVEMENT. MY GOAL IS TO BECOME A SKILLED SOFTWARE ENGINEER, CONTRIBUTE TO IMPACTFUL TECHNOLOGY SOLUTIONS, AND BUILD PRODUCTS THAT MAKE A MEANINGFUL DIFFERENCE IN PEOPLE'S LIVES.",
];

function FadeSlide({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutMe({ theme = "dark" }) {
  const isDark = theme === "dark";
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const text  = isDark ? "#e8eaf0"               : "#111111";
  const muted = isDark ? "rgba(232,234,240,0.5)" : "rgba(20,20,20,0.55)";

  const cvBg      = isDark ? "#1e1e1e" : "#e2e2e2";
  const cvShadow1 = isDark ? "#0d0d0d" : "#bebebe";
  const cvShadow2 = isDark ? "#2e2e2e" : "#ffffff";
  const cvText    = isDark ? "#e8eaf0" : "#111111";
  const cvMuted   = isDark ? "rgba(232,234,240,0.45)" : "rgba(20,20,20,0.45)";
  const shineColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.75)";

  const vertColor    = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.28)";
  const lineTopColor = isDark
    ? "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))"
    : "linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))";
  const lineBotColor = isDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)";

  return (
    <>
      <style>{`
        .about-section {
          --accent:  #666665;
          --accent2: #4a4b4b;
          position: relative;
          overflow: hidden;
          padding: clamp(60px, 10vw, 140px) clamp(20px, 6vw, 80px);
          min-height: 100vh;
          box-sizing: border-box;
        }

        /* ── Two-column on desktop, single on mobile ── */
        .about-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Card arc panel ── */
        .about-arc {
          width: 100%;
          aspect-ratio: 1 / 1;
          position: relative;
          overflow: hidden;
        }

        .about-inner {
          position: relative;
          width: 100%;
        }

        .about-vert-text {
          position: absolute;
          left: clamp(12px, 3vw, 40px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          z-index: 2;
        }

        .about-eyebrow {
          font-size: clamp(0.95rem, 2vw, 1.3rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 800;
          color: var(--accent);
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .about-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--accent);
          flex-shrink: 0;
        }

        .about-headline {
          font-size: clamp(1.9rem, 4.5vw, 3.8rem);
          font-weight: 600;
          line-height: 1;
          margin: 0 0 clamp(20px, 3vw, 36px);
          letter-spacing: -0.02em;
        }
        .about-headline em { color: var(--accent); }

        /* ── Mobile-only image, shown after the headline ── */
        .about-mobile-img {
          display: none;
        }

        .about-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%);
          transform-origin: left;
          margin: 0 0 clamp(20px, 3vw, 36px);
        }

        .about-col { display: flex; flex-direction: column; gap: 0; }

        .about-para {
          font-size: clamp(0.8rem, 1.7vw, 1.0rem);
          line-height: 1.85;
          margin: 0;
          font-weight: 300;
        }
        .about-para strong { font-weight: 500; }

        .cv-btn {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-top: clamp(28px, 4vw, 48px);
          padding: 10px 20px;
          border-radius: 20px;
          background: ${cvBg};
          box-shadow: 6px 6px 14px ${cvShadow1}, -6px -6px 14px ${cvShadow2};
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.2s;
          border: none;
          outline: none;
        }
        .cv-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.05) 100%);
          border-radius: 10px;
          pointer-events: none;
        }
        .cv-btn::after {
          content: '';
          position: absolute;
          top: -60%; left: -70%;
          width: 55%; height: 200%;
          background: linear-gradient(105deg, transparent 20%, ${shineColor} 50%, transparent 80%);
          transform: skewX(-15deg);
          transition: left 0.55s ease;
          pointer-events: none;
        }
        .cv-btn:hover::after { left: 120%; }
        .cv-btn:hover { box-shadow: 8px 8px 20px ${cvShadow1}, -8px -8px 20px ${cvShadow2}; transform: translateY(-2px); }
        .cv-btn:active { transform: translateY(0px); box-shadow: 4px 4px 10px ${cvShadow1}, -4px -4px 10px ${cvShadow2}; }

        .cv-btn-icon {
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; width: 32px; height: 32px; border-radius: 7px;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
          position: relative; z-index: 1;
        }
        .cv-btn-icon svg { width: 16px; height: 16px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

        .cv-btn-text { display: flex; flex-direction: column; gap: 1px; position: relative; z-index: 1; text-align: left; }
        .cv-btn-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${cvMuted}; line-height: 1; }
        .cv-btn-action { font-size: 0.92rem; font-weight: 500; letter-spacing: 0.04em; color: ${cvText}; line-height: 1.3; }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .about-layout { grid-template-columns: 1fr; }
          .about-arc { display: none; }
          .about-vert-text { display: none; }
          .cv-btn { width: 100%; justify-content: center; }

          .about-mobile-img {
            display: block;
            width: clamp(160px, 50vw, 240px);
            aspect-ratio: 3 / 4;
            margin: 0 auto clamp(20px, 5vw, 32px);
            border-radius: 16px;
            overflow: hidden;
          }
          .about-mobile-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
            display: block;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .about-arc { display: none; }
          .about-layout { grid-template-columns: 1fr; max-width: 760px; }
        }
      `}</style>

      <section className="about-section" ref={sectionRef}>

        {/* Vertical decorative text */}
        <div className="about-vert-text">
          <div style={{ width: 1, height: 60, background: lineTopColor }} />
          <p style={{
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            transform: 'rotate(180deg)', margin: 0, fontSize: '0.7rem',
            fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: vertColor, whiteSpace: 'nowrap', userSelect: 'none',
          }}>
            Arya Sankar · Developer · 2025
          </p>
          <div style={{ width: 1, height: 60, background: lineBotColor }} />
        </div>

        <div className="about-layout">

          {/* ── LEFT: Card Arc Scroll ── */}
          <FadeSlide delay={0} direction="right">
            <div className="about-arc">
              <CardArcScroll theme={theme} />
            </div>
          </FadeSlide>

          {/* ── RIGHT: Text content ── */}
          <div className="about-inner">

            <FadeSlide delay={0.1}>
              <p className="about-eyebrow">About Me</p>
            </FadeSlide>

            <FadeSlide delay={0.18}>
              <h2 className="about-headline" style={{ color: text }}>
                BUILDING THINGS<br />
                THAT <em>MATTER.</em>
              </h2>
            </FadeSlide>

            {/* Mobile-only image — fades in after the headline */}
            <FadeSlide delay={0.24}>
              <div className="about-mobile-img">
                <img src="/Me.jpg" alt="Arya Sankar" />
              </div>
            </FadeSlide>

            <motion.div className="about-divider" style={{ scaleX: lineScaleX }} />

            <div className="about-col">
              {PARAGRAPHS.map((txt, i) => (
                <FadeSlide key={i} delay={0.22 + i * 0.12} direction="up">
                  <p
                    className="about-para"
                    style={{ color: muted }}
                    dangerouslySetInnerHTML={{
                      __html: txt
                        .replace(/full-stack development|web applications|software development/gi,
                          m => `<strong style="color:${text}">${m}</strong>`)
                        .replace(/data structures and algorithms|cloud computing|software engineering/gi,
                          m => `<strong style="color:${text}">${m}</strong>`)
                        .replace(/discipline, consistency, and self-improvement/gi,
                          m => `<strong style="color:${text}">${m}</strong>`)
                    }}
                  />
                </FadeSlide>
              ))}
            </div>

            <FadeSlide delay={0.46} direction="up">
              <a href="/Resume.pdf" download className="cv-btn" aria-label="Download CV">
                <span className="cv-btn-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v13M6 11l6 6 6-6" />
                    <path d="M3 20h18" strokeWidth="1.8" />
                  </svg>
                </span>
                <span className="cv-btn-text">
                  <span className="cv-btn-label">Download Resume</span>
                </span>
              </a>
            </FadeSlide>

          </div>
        </div>
      </section>
    </>
  );
}