import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

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

function PathwayNode({ exp, index, theme, isLast, showConnector }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isDark = theme === 'dark'

  // dark: white text | light: pure black for everything
  const primary    = isDark ? '#e8eaf0' : '#111111'
  const muted      = isDark ? 'rgba(232,234,240,0.5)' : '#111111'
  const accent     = isDark ? '#666665' : '#111111'
  const border     = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'
  const chipBorder = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.25)'
  const dots       = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.25)'

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.09, ease: EASE }}
        style={{ position: 'relative' }}
        className="exp-node-wrap"
      >
        <motion.div
          className="exp-node-dot"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.09 + 0.15, ease: EASE }}
        />
        <div className="exp-node-inner" style={{ borderBottom: isLast ? 'none' : `0.5px solid ${border}` }}>
          <p className="exp-node-type" style={{ color: accent }}>{exp.type}</p>
          <h3 className="exp-node-role" style={{ color: primary }}>{exp.role}</h3>
          <p className="exp-node-company" style={{ color: primary }}>{exp.company}</p>
          <p className="exp-node-period" style={{ color: muted }}>{exp.period}</p>
          <div className="exp-chips">
            {exp.skills.map((skill) => (
              <span key={skill} className="exp-chip" style={{ color: muted, border: `0.5px solid ${chipBorder}` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {showConnector && (
        <div className="exp-connector">
          <span className="exp-connector-dots" style={{ color: dots }}>· · ·</span>
        </div>
      )}
    </>
  )
}

export default function Experience({ theme = 'dark' }) {
  const isDark = theme === 'dark'
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])

  const activeExps = experiences.filter((e) => e.active)
  const pastExps   = experiences.filter((e) => !e.active)

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
        .exp-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
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
        .exp-headline {
          font-size: clamp(1.9rem, 4.5vw, 3.8rem);
          font-weight: 600;
          line-height: 1;
          margin: 0 0 clamp(20px, 3vw, 36px);
          letter-spacing: -0.02em;
        }
        .exp-headline em { color: var(--accent); font-style: normal; }
        .exp-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%);
          transform-origin: left;
          margin: 0 0 clamp(20px, 3vw, 36px);
        }
        .exp-track { position: relative; padding-left: 44px; }
        .exp-track-line {
          position: absolute;
          left: 12px; top: 0; bottom: 0;
          width: 1.5px;
          background: rgba(74,75,75,0.35);
        }
        .exp-node-wrap { position: relative; }
        .exp-node-dot {
          position: absolute;
          left: -36px; top: 16px;
          width: 12px; height: 12px;
          border: 2px solid #4a4b4b;
          background: #4a4b4b;
          border-radius: 50%;
          transition: box-shadow 0.3s, background 0.3s, transform 0.25s;
        }
        .exp-node-wrap:hover .exp-node-dot {
          background: #7a7b7b;
          box-shadow: 0 0 0 5px rgba(74,75,75,0.2), 0 0 16px 6px rgba(74,75,75,0.35);
          transform: scale(1.2);
        }
        .exp-node-inner {
          border-left: 2px solid rgba(74,75,75,0.2);
          padding: 12px 0 12px 18px;
          transition: border-left-color 0.3s;
        }
        .exp-node-wrap:hover .exp-node-inner { border-left-color: #4a4b4b; }
        .exp-node-type  { margin: 0; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; }
        .exp-node-role  { margin: 5px 0 0; font-size: clamp(1.05rem, 2.1vw, 1.28rem); font-weight: 300; line-height: 1.4; letter-spacing: 0.01em; }
        .exp-node-company { margin: 3px 0 0; font-size: clamp(1.05rem, 2.1vw, 1.28rem); font-weight: 600; line-height: 1.4; }
        .exp-node-period  { margin: 3px 0 0; font-size: 0.78rem; letter-spacing: 0.04em; font-weight: 300; }
        .exp-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 9px; }
        .exp-chip  { font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 2px 8px; font-weight: 600; }
        .exp-connector { height: 16px; display: flex; align-items: center; padding-left: 2px; }
        .exp-connector-dots { font-size: 0.5rem; letter-spacing: 3px; }
        .exp-past-divider { display: flex; align-items: center; gap: 10px; margin: 18px 0 12px; }
        .exp-past-label { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; white-space: nowrap; }
        .exp-past-line  { flex: 1; height: 0.5px; }
      `}</style>

      <section id="experience" className="exp-section" ref={sectionRef}>
        <div className="exp-inner">
          <div ref={headerRef}>
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

          <motion.div className="exp-divider" style={{ scaleX: lineScaleX }} />

          <div className="exp-track">
            <div className="exp-track-line" />

            {activeExps.map((exp, i) => (
              <PathwayNode key={exp.id} exp={exp} index={i} theme={theme} isLast={false} showConnector={i < activeExps.length - 1} />
            ))}

            <motion.div
              className="exp-past-divider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="exp-past-label" style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.4)' }}>Past</span>
              <div className="exp-past-line" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)' }} />
            </motion.div>

            {pastExps.map((exp, i) => (
              <PathwayNode key={exp.id} exp={exp} index={activeExps.length + i} theme={theme} isLast={i === pastExps.length - 1} showConnector={i < pastExps.length - 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}