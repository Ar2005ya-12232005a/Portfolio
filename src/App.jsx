import React from 'react'
import { motion } from 'framer-motion'
import LiquidEther from './components/LiquidEther'
import TiltCard from './components/TiltCard'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import AboutMe from './components/AboutMe'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
]

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

function SocialLinks({ color, align = 'flex-start' }) {
  return (
    <motion.div
      {...fadeUp(0.7)}
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        justifyContent: align,
        marginTop: '20px',
      }}
    >
      {SOCIALS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{
            color,
            opacity: 0.75,
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s, transform 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = 0.75; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <div style={{ width: '100%', height: '100%' }}>{icon}</div>
        </a>
      ))}
    </motion.div>
  )
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
            <SocialLinks color={textColor} align="center" />
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
                disableScrollAnimation={true}
              />
            </motion.div>

            {/* Right — "DEVELOPER" + socials */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '24px' }}>
              <motion.h1
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                style={{ color: textColor, fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 600, margin: 0, lineHeight: 1, letterSpacing: '-2px' }}
              >
                DEVELOPER
              </motion.h1>
              <SocialLinks color={textColor} align="flex-start" />
            </div>
          </>
        )}
      </section>

      {/* About */}
      <div id="about" style={{ position: 'relative', zIndex: 1 }}>
        <AboutMe theme={theme} />
      </div>

      {/* Projects */}
      <Projects theme={theme} />

      {/* Tech Stack */}
      <section id="tech-stack" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '60px 24px' : '60px 80px',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ color: textColor, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, margin: 0 }}>
          Tech-Stack
        </h2>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '60px 24px' : '60px 80px',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ color: textColor, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, margin: 0 }}>
          Contact
        </h2>
      </section>

    </div>
  )
}

export default App