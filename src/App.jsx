import React from 'react'
import { motion } from 'framer-motion'
import LiquidEther from './components/LiquidEther'
import TiltCard from './components/TiltCard'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import AboutMe from './components/AboutMe'
import IsoSocials from './components/IsoSocials'
import TechStack from './components/TechStack'
import Contact from './components/Contact'

// Shared easing
const EASE = [0.22, 1, 0.36, 1]

// Reusable fade-up variant factory
function fadeUp(delay = 0, y = 30) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: EASE },
  }
}

const App = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)
  const [theme, setTheme] = React.useState('dark')

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const textColor = theme === 'dark' ? '#fff' : '#111'

  return (
    <div style={{ position: 'relative', width: '100%' }}>

      <LiquidEther
        theme={theme}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      <Navbar
        theme={theme}
        onToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      />

      {/* Hero */}
      <section id="home" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '0 24px' : '0 120px 0 40px',
        paddingTop: '84px',
        boxSizing: 'border-box',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '16px' : '0',
      }}>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
            <motion.p
              {...fadeUp(0.1)}
              style={{ color: textColor, fontSize: 'clamp(0.75rem, 3vw, 1rem)', fontWeight: 600, letterSpacing: 4, margin: 0, opacity: 0.7, textTransform: 'uppercase' }}
            >
              I'm Arya Sankar
            </motion.p>
            <motion.h1
              {...fadeUp(0.22)}
              style={{ color: textColor, fontSize: 'clamp(3.5rem, 18vw, 6rem)', fontWeight: 700, margin: 0, lineHeight: 1, letterSpacing: '-2px' }}
            >
              WEB
            </motion.h1>
            <motion.h1
              {...fadeUp(0.34)}
              style={{ color: textColor, fontSize: 'clamp(2rem, 10vw, 4rem)', fontWeight: 700, margin: 0, lineHeight: 1, letterSpacing: '-1px' }}
            >
              DEVELOPER
            </motion.h1>
            <motion.div {...fadeUp(0.5)} style={{ marginTop: '12px' }}>
              <IsoSocials theme={theme} />
            </motion.div>
          </div>

        ) : (
          <>
            {/* Left — "WEB" */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '24px' }}>
              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                style={{ color: textColor, fontSize: 'clamp(0.75rem, 1.3vw, 1.1rem)', fontWeight: 600, letterSpacing: 4, margin: '0 0 10px 0', textTransform: 'uppercase' }}
              >
                I'm Arya Sankar
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                style={{ color: textColor, fontSize: 'clamp(3rem, 9vw, 9rem)', fontWeight: 600, margin: 0, lineHeight: 1, letterSpacing: '-2px' }}
              >
                WEB
              </motion.h1>
            </div>

            {/* Center — Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              style={{ flexShrink: 0 }}
            >
              <TiltCard
                image={{ src: '/Me.jpg', alt: 'Arya Sankar' }}
                width={290}
                height={440}
                tiltFactor={30}
                glareEffect={true}
                hoverScale={1.05}
                borderRadius={14}
              />
            </motion.div>

            {/* Right — "DEVELOPER" + IsoSocials */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '24px' }}>
              <motion.h1
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                style={{ color: textColor, fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 600, margin: 0, lineHeight: 1, letterSpacing: '-2px' }}
              >
                DEVELOPER
              </motion.h1>
              <motion.div {...fadeUp(0.55)} style={{ marginTop: '24px' }}>
                <IsoSocials theme={theme} />
              </motion.div>
            </div>
          </>
        )}
      </section>

      {/* About */}
      <div id="about" style={{ position: 'relative', zIndex: 1, marginTop: isMobile ? '-100px' : '-60px' }}>
        <AboutMe theme={theme} />
      </div>

      {/* Projects */}
      <div style={{ marginTop: isMobile ? '-60px' : '-40px' }}>
        <Projects theme={theme} />
      </div>

      {/* Tech Stack */}
      <div id="tech-stack" style={{ position: 'relative', zIndex: 1, marginTop: isMobile ? '-60px' : '-40px' }}>
        <TechStack theme={theme} />
      </div>

      {/* Contact */}
      <div id="contact" style={{ position: 'relative', zIndex: 1, marginTop: isMobile ? '-40px' : '-20px' }}>
        <Contact theme={theme} />
      </div>

    </div>
  )
}

export default App