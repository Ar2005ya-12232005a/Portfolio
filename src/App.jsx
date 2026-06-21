import React from 'react'
import { motion } from 'framer-motion'
import LiquidEther from './components/LiquidEther'
import TiltCard from './components/TiltCard'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import AboutMe from './components/AboutMe'
import IsoSocials from './components/IsoSocials'
import TechStack from './components/TechStack'
import Certificates from './components/Certificates'
import Experience from './components/Experience'
import Contact from './components/Contact'

const EASE = [0.22, 1, 0.36, 1]

function fadeUp(delay = 0, y = 30) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: EASE },
  }
}

function ScrollReveal({ children, delay = 0 }) {
  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.06 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const App = () => {
  const [width, setWidth] = React.useState(window.innerWidth)
  const [theme, setTheme] = React.useState('dark')

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024
  const textColor = theme === 'dark' ? '#fff' : '#111'

  // ── Even, consistent spacing between every section ──
  const gap = {
    heroToAbout:     isMobile ? '-60px' : isTablet ? '-50px' : '-60px',
    aboutToProjects: isMobile ? '-60px' : isTablet ? '-50px' : '-60px',
    between:         isMobile ? '-60px' : isTablet ? '-50px' : '-60px',
    toCertificates:  isMobile ? '20px'  : isTablet ? '30px'  : '40px',
    toExperience:    isMobile ? '24px' : isTablet ? '0px' : '-60px',
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>

      {/* ── Global mobile overrides — shrink internal section padding ── */}
      <style>{`
        @media (max-width: 639px) {
          .about-section   { padding-top: 48px !important; padding-bottom: 48px !important; min-height: unset !important; }
          #projects        { min-height: unset !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          #tech-stack .ts-section { padding-top: 48px !important; padding-bottom: 48px !important; min-height: unset !important; }
          .exp-section     { padding-top: 48px !important; padding-bottom: 48px !important; }
          .contact-section { padding-top: 48px !important; padding-bottom: 48px !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .about-section   { padding-top: 64px !important; padding-bottom: 64px !important; min-height: unset !important; }
          #projects        { min-height: unset !important; padding-top: 64px !important; padding-bottom: 64px !important; }
          #tech-stack .ts-section { padding-top: 64px !important; padding-bottom: 64px !important; min-height: unset !important; }
          .exp-section     { padding-top: 64px !important; padding-bottom: 64px !important; }
          .contact-section { padding-top: 64px !important; padding-bottom: 64px !important; }
        }
      `}</style>

      <LiquidEther
        theme={theme}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      <Navbar
        theme={theme}
        onToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      />

      {/* ── Hero ── */}
      <section id="home" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '84px 20px 40px' : isTablet ? '84px 40px 40px' : '0 100px 0 40px',
        paddingTop: '84px',
        boxSizing: 'border-box',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '12px' : '0',
      }}>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
            <motion.p {...fadeUp(0.1)} style={{ color: textColor, fontSize: 'clamp(0.7rem, 3.5vw, 0.95rem)', fontWeight: 600, letterSpacing: 4, margin: 0, opacity: 0.7, textTransform: 'uppercase' }}>
              I'm Arya Sankar
            </motion.p>
            <motion.h1 {...fadeUp(0.22)} style={{ color: textColor, fontSize: 'clamp(3.8rem, 20vw, 6rem)', fontWeight: 700, margin: 0, lineHeight: 0.95, letterSpacing: '-3px' }}>
              WEB
            </motion.h1>
            <motion.h1 {...fadeUp(0.34)} style={{ color: textColor, fontSize: 'clamp(1.8rem, 10vw, 3.5rem)', fontWeight: 700, margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>
              DEVELOPER
            </motion.h1>
            <motion.div {...fadeUp(0.5)} style={{ marginTop: '10px' }}>
              <IsoSocials theme={theme} />
            </motion.div>
          </div>

        ) : isTablet ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px', width: '100%' }}>
            <motion.p {...fadeUp(0.1)} style={{ color: textColor, fontSize: '0.85rem', fontWeight: 600, letterSpacing: 4, margin: 0, opacity: 0.7, textTransform: 'uppercase' }}>
              I'm Arya Sankar
            </motion.p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ color: textColor, fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 700, margin: 0, lineHeight: 1, letterSpacing: '-3px' }}>
                WEB
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
                <TiltCard image={{ src: '/Me.jpg', alt: 'Arya Sankar' }} width={180} height={270} tiltFactor={20} glareEffect={true} hoverScale={1.04} borderRadius={12} />
              </motion.div>
              <motion.h1 initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ color: textColor, fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 700, margin: 0, lineHeight: 1, letterSpacing: '-2px' }}>
                DEV
              </motion.h1>
            </div>
            <motion.div {...fadeUp(0.55)} style={{ marginTop: '16px' }}>
              <IsoSocials theme={theme} />
            </motion.div>
          </div>

        ) : (
          <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '24px' }}>
              <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 0.7, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} style={{ color: textColor, fontSize: 'clamp(0.75rem, 1.3vw, 1.1rem)', fontWeight: 600, letterSpacing: 4, margin: '0 0 10px', textTransform: 'uppercase' }}>
                I'm Arya Sankar
              </motion.p>
              <motion.h1 initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ color: textColor, fontSize: 'clamp(3rem, 9vw, 9rem)', fontWeight: 600, margin: 0, lineHeight: 1, letterSpacing: '-2px' }}>
                WEB
              </motion.h1>
            </div>

            <motion.div initial={{ opacity: 0, y: 50, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }} style={{ flexShrink: 0 }}>
              <TiltCard image={{ src: '/Me.jpg', alt: 'Arya Sankar' }} width={290} height={440} tiltFactor={30} glareEffect={true} hoverScale={1.05} borderRadius={14} />
            </motion.div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '24px' }}>
              <motion.h1 initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ color: textColor, fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 600, margin: 0, lineHeight: 1, letterSpacing: '-2px' }}>
                DEVELOPER
              </motion.h1>
              <motion.div {...fadeUp(0.55)} style={{ marginTop: '24px' }}>
                <IsoSocials theme={theme} />
              </motion.div>
            </div>
          </>
        )}
      </section>

      {/* ── About ── */}
      <div id="about" style={{ position: 'relative', zIndex: 1, marginTop: gap.heroToAbout }}>
        <AboutMe theme={theme} />
      </div>

      {/* ── Projects ── */}
      <div id="projects" style={{ position: 'relative', zIndex: 1, marginTop: gap.aboutToProjects }}>
        <Projects theme={theme} />
      </div>

      {/* ── Tech Stack ── */}
      <div id="tech-stack" style={{ position: 'relative', zIndex: 1, marginTop: gap.between }}>
        <TechStack theme={theme} />
      </div>

      {/* ── Certificates — slightly more breathing room before this one ── */}
      <ScrollReveal>
        <div id="certificates" style={{ position: 'relative', zIndex: 1, marginTop: gap.toCertificates }}>
          <Certificates theme={theme} />
        </div>
      </ScrollReveal>

      {/* ── Experience ── */}
      <ScrollReveal delay={0.05}>
        <div id="experience" style={{ position: 'relative', zIndex: 1, marginTop: gap.toExperience }}>
          <Experience theme={theme} />
        </div>
      </ScrollReveal>

      {/* ── Contact ── */}
      <div id="contact" style={{ position: 'relative', zIndex: 1, marginTop: gap.between }}>
        <Contact theme={theme} />
      </div>

    </div>
  )
}

export default App