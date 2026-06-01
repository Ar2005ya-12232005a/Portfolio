import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const DEFAULT_PROJECTS = [
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    title: 'Project One',
    description: 'A short description of what this project does and the tech behind it.',
    link: '#',
    buttonText: 'View Project',
  },
  {
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    title: 'Project Two',
    description: 'Another cool project with a brief description of its purpose.',
    link: '#',
    buttonText: 'View Project',
  },
  {
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    title: 'Project Three',
    description: 'A third project showcasing your skills and creativity.',
    link: '#',
    buttonText: 'View Project',
  },
  {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    title: 'Project Four',
    description: 'Yet another project with something interesting to show.',
    link: '#',
    buttonText: 'View Project',
  },
  {
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    title: 'Project Five',
    description: 'A final showcase project with a compelling description.',
    link: '#',
    buttonText: 'View Project',
  },
]

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

function TiltCard({ children, isActive, cardSize, style, ...rest }) {
  const ref = useRef(null)
  const frameRef = useRef(null)
  const targetTilt = useRef({ x: 0, y: 0 })
  const currentTilt = useRef({ x: 0, y: 0 })

  const MAX_TILT = isActive ? 12 : 7

  const handleMouseMove = useCallback(e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    targetTilt.current = {
      x: clamp(-dy * MAX_TILT, -MAX_TILT, MAX_TILT),
      y: clamp(dx * MAX_TILT, -MAX_TILT, MAX_TILT),
    }
  }, [MAX_TILT])

  const handleMouseLeave = useCallback(() => {
    targetTilt.current = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    let running = true
    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      if (!running) return
      const el = ref.current
      if (el) {
        currentTilt.current.x = lerp(currentTilt.current.x, targetTilt.current.x, 0.1)
        currentTilt.current.y = lerp(currentTilt.current.y, targetTilt.current.y, 0.1)
        el.style.transform = `rotateX(${currentTilt.current.x}deg) rotateY(${currentTilt.current.y}deg)`
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <motion.div
      {...rest}
      style={{ ...style, perspective: 800 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          borderRadius: 'inherit',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default function Projects({ theme = 'dark', projects = DEFAULT_PROJECTS }) {
  const containerRef = useRef(null)
  const carouselRef = useRef(null)
  const [frameWidth, setFrameWidth] = useState(1200)
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2))

  // Watch the carousel strip — fires when the CARDS are in view, not the heading
  const carouselInView = useInView(carouselRef, { once: true, amount: 0.5 })

  const textColor = theme === 'dark' ? '#fff' : '#111'

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setFrameWidth(el.getBoundingClientRect().width))
    ro.observe(el)
    setFrameWidth(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  const isMobile = frameWidth < 640
  const isTablet = frameWidth >= 640 && frameWidth < 1024

  const cardSize = React.useMemo(() => {
    if (isMobile) return clamp(frameWidth * 0.78, 220, 340)
    if (isTablet) return clamp(frameWidth * 0.42, 260, 340)
    return clamp(frameWidth * 0.32, 300, 400)
  }, [frameWidth, isMobile, isTablet])

  const spacing = isMobile ? cardSize * 0.88 : 200

  const goTo = useCallback(i => setActiveIndex(clamp(i, 0, projects.length - 1)), [projects.length])
  const prev = useCallback(() => setActiveIndex(c => c === 0 ? projects.length - 1 : c - 1), [projects.length])
  const next = useCallback(() => setActiveIndex(c => c === projects.length - 1 ? 0 : c + 1), [projects.length])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const handleDragEnd = useCallback((_, info) => {
    const threshold = isMobile ? 36 : 56
    if (info.offset.x > threshold) prev()
    else if (info.offset.x < -threshold) next()
  }, [isMobile, prev, next])

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '80px 0 60px' : '100px 0 60px',
        boxSizing: 'border-box',
        gap: '48px',
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <p style={{ color: textColor, opacity: 0.5, fontSize: '0.82rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 10px' }}>
          MY WORK
        </p>
        <h2 style={{ color: textColor, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, margin: 0, letterSpacing: '-1px', lineHeight: 1 }}>
          PROJECTS
        </h2>
      </div>

      {/* Cards strip — this ref is what triggers the animation */}
      <div
        ref={carouselRef}
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? cardSize + 60 : cardSize + 80,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={handleDragEnd}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'visible',
                touchAction: 'pan-y',
              }}
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex
                const distance = index - activeIndex
                const absDistance = Math.abs(distance)
                const x = distance * spacing
                const scale = isActive ? 1 : 0.86

                return (
                  <TiltCard
                    key={index}
                    isActive={isActive}
                    cardSize={cardSize}
                    onClick={() => { if (!isActive) goTo(index) }}
                    animate={{ x, scale, opacity: absDistance > 2 ? 0.4 : 1 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: cardSize,
                      height: cardSize,
                      marginLeft: -cardSize / 2,
                      marginTop: -cardSize / 2,
                      borderRadius: 24,
                      overflow: 'hidden',
                      zIndex: isActive ? 50 : 50 - absDistance,
                      cursor: isActive ? 'default' : 'pointer',
                      border: isActive
                        ? '6px solid rgba(255,255,255,0.6)'
                        : '3px solid rgba(255,255,255,0.2)',
                      boxShadow: isActive
                        ? '0 32px 80px rgba(0,0,0,0.4), 0 10px 28px rgba(0,0,0,0.25)'
                        : '0 6px 18px rgba(0,0,0,0.15)',
                      boxSizing: 'border-box',
                      background: '#222',
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable={false}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        userSelect: 'none',
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                        opacity: isActive ? 1 : 0.6,
                        transition: 'opacity 0.5s ease',
                      }}
                    />

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          padding: isMobile ? '20px' : '28px',
                          textAlign: 'center',
                          boxSizing: 'border-box',
                          gap: isMobile ? 12 : 16,
                          pointerEvents: 'none',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 6 : 10 }}>
                          <h3
                            style={{
                              color: '#fff',
                              margin: 0,
                              fontSize: isMobile ? 'clamp(1.1rem, 5vw, 1.5rem)' : 'clamp(1.2rem, 2.5vw, 1.8rem)',
                              fontWeight: 700,
                              letterSpacing: '-0.02em',
                              lineHeight: 1.1,
                            }}
                          >
                            {project.title}
                          </h3>
                          <p
                            style={{
                              color: 'rgba(255,255,255,0.8)',
                              margin: 0,
                              fontSize: isMobile ? '0.78rem' : '0.88rem',
                              lineHeight: 1.5,
                              maxWidth: '86%',
                              alignSelf: 'center',
                            }}
                          >
                            {project.description}
                          </p>
                        </div>

                        <a
                          href={project.link}
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: isMobile ? '9px 22px' : '11px 28px',
                            borderRadius: 999,
                            background: '#fff',
                            color: '#000',
                            fontWeight: 600,
                            fontSize: isMobile ? '0.78rem' : '0.85rem',
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            pointerEvents: 'auto',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {project.buttonText}
                        </a>
                      </motion.div>
                    )}
                  </TiltCard>
                )
              })}
            </motion.div>

            {!isMobile && (
              <>
                <button
                  onClick={prev}
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 100,
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  style={{
                    position: 'absolute',
                    right: '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 100,
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, zIndex: 2 }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === activeIndex ? 20 : 7,
              height: 7,
              border: 'none',
              borderRadius: 999,
              padding: 0,
              background: textColor,
              opacity: i === activeIndex ? 1 : 0.28,
              cursor: 'pointer',
              transition: 'width 0.4s ease, opacity 0.4s ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}