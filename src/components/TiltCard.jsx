import { useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * TiltCard — 3D tilt card with glare effect + scroll-in animation
 *
 * Props:
 *   image         { src, alt }   — image to display inside the card
 *   tiltFactor    number         — max tilt degrees (default 15)
 *   perspective   number         — CSS perspective in px (default 1000)
 *   borderRadius  number         — corner radius in px (default 12)
 *   backgroundColor string       — card background color (default #ffffff)
 *   shadowColor   string         — base shadow color
 *   shadowIntensity number       — hover shadow opacity 0–1
 *   transitionDuration number    — animation speed in seconds
 *   hoverScale    number         — scale on hover (default 1.05)
 *   glareEffect   boolean        — enable glare overlay
 *   glareIntensity number        — glare opacity 0–1
 *   glareSize     number         — glare radius size %
 *   width         string|number  — card width  (default 300)
 *   height        string|number  — card height (default 400)
 *   index         number         — card index for staggered delay (default 0)
 *   slideFrom     'left'|'right' — direction to slide in from (default 'left')
 *   children                     — optional: render children instead of image
 */
export default function TiltCard({
  image = { src: '', alt: 'card image' },
  tiltFactor = 15,
  perspective = 1000,
  borderRadius = 12,
  backgroundColor = '#ffffff',
  shadowColor = 'rgba(0,0,0,0.2)',
  shadowIntensity = 0.5,
  transitionDuration = 0.2,
  hoverScale = 1.05,
  glareEffect = true,
  glareIntensity = 0.5,
  glareSize = 80,
  width = 300,
  height = 400,
  index = 0,
  slideFrom = 'left',
  disableScrollAnimation = false,
  style = {},
  className = '',
  children,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Scroll-in animation ref
  const wrapperRef = useRef(null);
  const shouldAnimate = !disableScrollAnimation;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    setMousePos({ x, y });
    setTilt({ x: -(y / 50) * tiltFactor, y: (x / 50) * tiltFactor });
  }, [isHovered, tiltFactor]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const glareX = useMemo(() => isHovered ? 50 + mousePos.x / 2 : 50, [isHovered, mousePos.x]);
  const glareY = useMemo(() => isHovered ? 50 + mousePos.y / 2 : 50, [isHovered, mousePos.y]);

  const ease = `all ${transitionDuration}s ease-out`;

  const outerStyle = {
    position: 'relative',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    perspective: `${perspective}px`,
    transformStyle: 'preserve-3d',
    cursor: 'pointer',
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    transform: `scale(${isHovered ? hoverScale : 1})`,
    transition: ease,
    ...style,
  };

  const innerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    backgroundColor,
    transformStyle: 'preserve-3d',
    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    boxShadow: isHovered
      ? `0 25px 50px -12px rgba(0,0,0,${shadowIntensity})`
      : `0 10px 30px -10px ${shadowColor}`,
    transition: ease,
  };

  const glareStyle = {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    borderRadius: `${borderRadius}px`,
    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${isHovered ? glareIntensity : 0}) 0%, rgba(255,255,255,0) ${glareSize}%)`,
    opacity: isHovered ? 1 : 0,
    transition: ease,
    pointerEvents: 'none',
  };

  const slideX = slideFrom === 'right' ? 80 : -80;

  return (
    <motion.div
      ref={wrapperRef}
      initial={shouldAnimate ? { opacity: 0, x: slideX, y: 30 } : false}
      whileInView={shouldAnimate ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.35 }}
      animate={!shouldAnimate ? {} : undefined}
      transition={shouldAnimate ? {
        duration: 0.75,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      } : {}}
      style={{ display: 'inline-block' }}
    >
      <div
        ref={cardRef}
        style={outerStyle}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={innerStyle}>
          {children ? (
            <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
              {children}
            </div>
          ) : image.src ? (
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: `${borderRadius}px`,
                position: 'relative',
                zIndex: 1,
                display: 'block',
              }}
            />
          ) : null}

          {glareEffect && <div style={glareStyle} />}
        </div>
      </div>
    </motion.div>
  );
}