import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const experiences = [
  { id:1, role:'CONTRIBUTOR', company:'GIRLSCRIPT SUMMER OF CODE', type:'PART-TIME · 2 MOS', period:'MAY 2026 – PRESENT', skills:['OPEN SOURCE','GIT','COLLABORATION'], active:true },
  { id:2, role:'AIML INTERN', company:'KELTRON KNOWLEDGE CENTER', type:'INTERNSHIP · 2 MOS', period:'MAY 2026 – PRESENT', skills:['MACHINE LEARNING','PYTHON','AI'], active:true },
  { id:3, role:'CO-LEAD, DESIGN TEAM', company:'DATA SCIENCE CLUB, VIT BHOPAL', type:'CLUB · 10 MOS', period:'SEP 2025 – PRESENT', skills:['UI/UX','FIGMA','CANVA','PHOTOSHOP','TEAM LEADERSHIP'], active:true },
  { id:4, role:'ENGINEERING STUDENT', company:'VIT BHOPAL UNIVERSITY', type:'FULL-TIME · 1 YR 10 MOS', period:'SEP 2024 – PRESENT', skills:['MATLAB','PYTHON','DSA','DBMS','CN','OS'], active:true },
  { id:5, role:'CORE MEMBER - CONTENT TEAM', company:'UX CLUB', type:'CLUB · 9 MOS', period:'SEP 2025 – MAY 2026', skills:['CONTENT STRATEGY','UX WRITING','DESIGN'], active:false },
  { id:6, role:'FRONTEND DEVELOPER', company:'CODEALPHA', type:'INTERNSHIP · 2 MOS', period:'FEB 2025 – MAR 2025', skills:['HTML','CSS','JAVASCRIPT'], active:false },
  { id:7, role:'PYTHON DEVELOPER', company:'YBI FOUNDATION', type:'INTERNSHIP · 1 MOS', period:'FEB 2025', skills:['PYTHON','DATA SCIENCE'], active:false },
]

function PathCard({ exp, index, theme, isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isDark = theme === 'dark'

  const primary    = isDark ? '#e8eaf0' : '#111111'
  const muted      = isDark ? 'rgba(232,234,240,0.5)' : 'rgba(17,17,17,0.55)'
  const accent     = isDark ? '#9a9b9b' : '#444444'
  const cardBg     = isDark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const chipBorder = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.2)'
  const dotColor   = exp.active ? (isDark ? '#e8eaf0' : '#111111') : (isDark ? '#5a5b5b' : '#999999')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 0 : 30, x: isMobile ? -20 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="exp-path-item"
    >
      {/* Node dot on the line */}
      <div className="exp-path-dot-wrap">
        <motion.div
          className="exp-path-dot"
          style={{ background: dotColor, borderColor: dotColor }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.08 + 0.15, ease: EASE }}
        />
      </div>

      {/* Card */}
      <div
        className="exp-path-card"
        style={{
          background: cardBg,
          border: `0.5px solid ${cardBorder}`,
        }}
      >
        <p className="exp-path-type" style={{ color: accent }}>{exp.type}</p>
        <h3 className="exp-path-role" style={{ color: primary }}>{exp.role}</h3>
        <p className="exp-path-company" style={{ color: primary }}>{exp.company}</p>
        <p className="exp-path-period" style={{ color: muted }}>{exp.period}</p>
        <div className="exp-path-chips">
          {exp.skills.map(skill => (
            <span key={skill} className="exp-path-chip" style={{ color: muted, border: `0.5px solid ${chipBorder}` }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience({ theme = 'dark' }) {
  const isDark = theme === 'dark'
  const headerRef = useRef(null)
  const scrollRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || isMobile) return
    updateArrows()
    el.addEventListener('scroll', updateArrows)
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [isMobile, updateArrows])

  const scrollByCard = useCallback((dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('.exp-path-item')
    const step = card ? card.getBoundingClientRect().width + 0 : 280
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }, [])

  return (
    <>
      <style>{`
        .exp-section {
          --accent: #666665;
          --accent2: #4a4b4b;
          position: relative;
          overflow: hidden;
          padding: clamp(60px, 10vw, 140px) clamp(20px, 6vw, 80px);
          box-sizing: border-box;
        }
        .exp-inner { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; }
        .exp-eyebrow {
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
        .exp-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--accent);
          flex-shrink: 0;
        }
        .exp-headline-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin: 0 0 clamp(32px, 5vw, 56px);
        }
        .exp-headline {
          font-size: clamp(1.9rem, 4.5vw, 3.8rem);
          font-weight: 600;
          line-height: 1;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .exp-headline em { color: var(--accent); font-style: normal; }

        @media (min-width: 1024px) {
          .exp-header-block {
            margin-left: clamp(40px, 8vw, 140px);
          }
        }

        /* ── Arrow nav ── */
        .exp-nav-arrows {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        .exp-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s, transform 0.2s, opacity 0.25s, border-color 0.25s;
          flex-shrink: 0;
        }
        .exp-arrow-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }
        .exp-arrow-btn:not(:disabled):hover {
          transform: scale(1.06);
        }
        .exp-arrow-btn:not(:disabled):active {
          transform: scale(0.94);
        }
        .exp-arrow-btn svg {
          width: 18px;
          height: 18px;
        }

        /* ── Horizontal path (desktop / tablet) ── */
        .exp-path-scroll {
          position: relative;
          overflow-x: auto;
          overflow-y: visible;
          padding: 8px 4px 14px;
          margin: 0 -4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .exp-path-scroll::-webkit-scrollbar { display: none; }
        .exp-path-track {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 0;
          min-width: max-content;
          padding-top: 18px;
        }
        .exp-path-line {
          position: absolute;
          left: 0; right: 0; top: 18px;
          height: 1.5px;
          background: rgba(120,120,120,0.3);
          z-index: 0;
        }
        .exp-path-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 270px;
          flex-shrink: 0;
          padding: 0 14px;
        }
        .exp-path-dot-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 18px;
        }
        .exp-path-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          border: 2px solid;
          transition: transform 0.25s, box-shadow 0.3s;
        }
        .exp-path-item:hover .exp-path-dot {
          transform: scale(1.3);
          box-shadow: 0 0 0 6px rgba(128,128,128,0.18);
        }
        .exp-path-card {
          width: 100%;
          border-radius: 4px;
          padding: 16px 16px 18px;
          box-sizing: border-box;
          transition: transform 0.3s, border-color 0.3s, background 0.3s;
        }
        .exp-path-item:hover .exp-path-card {
          transform: translateY(-4px);
        }
        .exp-path-type    { margin: 0; font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; }
        .exp-path-role    { margin: 7px 0 0; font-size: clamp(0.95rem, 1.6vw, 1.05rem); font-weight: 300; line-height: 1.35; letter-spacing: 0.01em; }
        .exp-path-company { margin: 2px 0 0; font-size: clamp(0.95rem, 1.6vw, 1.05rem); font-weight: 600; line-height: 1.35; }
        .exp-path-period  { margin: 6px 0 0; font-size: 0.72rem; letter-spacing: 0.04em; font-weight: 300; }
        .exp-path-chips   { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px; }
        .exp-path-chip    { font-size: 0.58rem; letter-spacing: 0.13em; text-transform: uppercase; padding: 2px 7px; font-weight: 600; border-radius: 2px; }

        /* ── Vertical fallback (mobile) ── */
        .exp-path-vertical { display: none; }

        @media (max-width: 767px) {
          .exp-nav-arrows { display: none; }
          .exp-path-scroll { display: none; }
          .exp-path-vertical {
            display: flex;
            flex-direction: column;
            position: relative;
            padding-left: 30px;
            gap: 22px;
          }
          .exp-path-vertical .exp-path-line-v {
            position: absolute;
            left: 6px; top: 6px; bottom: 6px;
            width: 1.5px;
            background: rgba(120,120,120,0.3);
          }
          .exp-path-vertical .exp-path-item {
            width: 100%;
            flex-direction: row;
            align-items: flex-start;
            padding: 0;
          }
          .exp-path-vertical .exp-path-item:last-child { padding-bottom: 0; }
          .exp-path-vertical .exp-path-dot-wrap {
            position: absolute;
            left: -30px;
            top: 16px;
            width: auto;
            margin-bottom: 0;
          }
          .exp-path-vertical .exp-path-card {
            width: 100%;
          }
        }
      `}</style>

      <section id="experience" className="exp-section">
        <div className="exp-inner">
          <div className="exp-headline-row">
            <div ref={headerRef} className="exp-header-block">
              <motion.p
                className="exp-eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE }}
              >
                Career Pathway
              </motion.p>
              <motion.h2
                className="exp-headline"
                style={{ color: isDark ? '#e8eaf0' : '#111111' }}
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              >
                EXPERIENCE<br /><em><i>TIMELINE.</i></em>
              </motion.h2>
            </div>

            {/* ── Forward / backward arrows (desktop / tablet only) ── */}
            {!isMobile && (
              <div className="exp-nav-arrows">
                <button
                  className="exp-arrow-btn"
                  onClick={() => scrollByCard(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Previous"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
                    color: isDark ? '#e8eaf0' : '#111111',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  className="exp-arrow-btn"
                  onClick={() => scrollByCard(1)}
                  disabled={!canScrollRight}
                  aria-label="Next"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
                    color: isDark ? '#e8eaf0' : '#111111',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* ── Horizontal path (desktop / tablet) — navigate with arrows, no visible scrollbar ── */}
          {!isMobile && (
            <div className="exp-path-scroll" ref={scrollRef}>
              <div className="exp-path-track">
                <div className="exp-path-line" />
                {experiences.map((exp, i) => (
                  <PathCard key={exp.id} exp={exp} index={i} theme={theme} isMobile={false} />
                ))}
              </div>
            </div>
          )}

          {/* ── Vertical fallback (mobile) ── */}
          {isMobile && (
            <div className="exp-path-vertical">
              <div className="exp-path-line-v" />
              {experiences.map((exp, i) => (
                <PathCard key={exp.id} exp={exp} index={i} theme={theme} isMobile={true} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}