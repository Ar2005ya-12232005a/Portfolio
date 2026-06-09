import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Cubes from "./Cubes";

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

  const vertColor     = isDark ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.28)";
  const lineTopColor  = isDark
    ? "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))"
    : "linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))";
  const lineBotColor  = isDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)";

  /* ── black & white cube props ── */
  const cubeFaceColor  = isDark ? "transparent" : "transparent";
const cubeBorderStyle = isDark
  ? "2px dashed rgba(255,255,255,0.75)"
  : "2px dashed rgba(0,0,0,0.75)";
  const cubeRippleColor = isDark ? "#ffffff" : "#000000";

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

        /* ── Two-column layout: cubes left, content right ── */
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

        /* ── Cubes panel ── */
        .about-cubes {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 4px;
          overflow: hidden;
        }

        

        /* ── Content panel ── */
        .about-inner {
          position: relative;
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
          font-weight: 600;
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
        .about-headline em {
          color: var(--accent);
        }

        .about-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%);
          transform-origin: left;
          margin: 0 0 clamp(20px, 3vw, 36px);
        }

        .about-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .about-para {
          font-size: clamp(0.8rem, 1.7vw, 1.0rem);
          line-height: 1.85;
          margin: 0;
          font-weight: 300;
        }
        .about-para strong { font-weight: 500; }

        /* ── CV Button ── */
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
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.07) 0%,
            rgba(255,255,255,0.01) 50%,
            rgba(255,255,255,0.05) 100%
          );
          border-radius: 10px;
          pointer-events: none;
        }
        .cv-btn::after {
          content: '';
          position: absolute;
          top: -60%;
          left: -70%;
          width: 55%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            ${shineColor} 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
          transition: left 0.55s ease;
          pointer-events: none;
        }
        .cv-btn:hover::after { left: 120%; }
        .cv-btn:hover {
          box-shadow: 8px 8px 20px ${cvShadow1}, -8px -8px 20px ${cvShadow2};
          transform: translateY(-2px);
        }
        .cv-btn:active {
          transform: translateY(0px);
          box-shadow: 4px 4px 10px ${cvShadow1}, -4px -4px 10px ${cvShadow2};
        }

        .cv-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 7px;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
          position: relative;
          z-index: 1;
        }
        .cv-btn-icon svg {
          width: 16px;
          height: 16px;
          stroke: #fff;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .cv-btn-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          position: relative;
          z-index: 1;
          text-align: left;
        }
        .cv-btn-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${cvMuted};
          line-height: 1;
        }
        .cv-btn-action {
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: ${cvText};
          line-height: 1.3;
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .about-layout {
            grid-template-columns: 1fr;
          }
          .about-cubes {
            width: clamp(200px, 70vw, 320px);
            margin: 0 auto;
          }
          .about-vert-text {
            display: none;
          }
          .cv-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section className="about-section" ref={sectionRef}>

        {/* ── Vertical text — decorative left edge (desktop only) ── */}
        <div className="about-vert-text">
          <div style={{ width: 1, height: 60, background: lineTopColor }} />
          <p style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            margin: 0,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: vertColor,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
            Arya Sankar · Developer · 2025
          </p>
          <div style={{ width: 1, height: 60, background: lineBotColor }} />
        </div>

        <div className="about-layout">

          {/* ── LEFT: Interactive Cubes ── */}
          <FadeSlide delay={0} direction="right">
            <div className="about-cubes">
             <Cubes
  gridSize={12}
  maxAngle={50}
  radius={3}
 borderStyle={cubeBorderStyle}
  faceColor="transparent"
  rippleOnClick={false}
  autoAnimate={true}
  cellGap={{ row: 14, col: 14 }}
/>

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

            {/* ── Download CV ── */}
            <FadeSlide delay={0.46} direction="up">
              <a
                href="/STANDUP_FINAL.pdf"
                download
                className="cv-btn"
                aria-label="Download CV"
              >
                <span className="cv-btn-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v13M6 11l6 6 6-6" />
                    <path d="M3 20h18" strokeWidth="1.8" />
                  </svg>
                </span>
                <span className="cv-btn-text">
                  <span className="cv-btn-label">Download CV</span>
                </span>
              </a>
            </FadeSlide>

          </div>
        </div>
      </section>
    </>
  );
}