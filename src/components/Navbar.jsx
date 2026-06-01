import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar({ theme = 'dark', onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = ['Home', 'About', 'Projects', 'Contact'];

  const textColor = isDark ? '#fff' : '#111';
  const subTextColor = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)';
  const hoverBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const menuBg = isDark ? 'rgba(12,12,12,0.97)' : 'rgba(255,255,255,0.97)';
  const pillBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const pillBorder = isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.10)';

  const Toggle = () => (
    <label style={{ cursor: 'pointer', flexShrink: 0 }}>
      <input id="checkboxInput" type="checkbox" checked={!isDark} onChange={onToggle} />
      <div className="toggleSwitch" />
    </label>
  );

  return (
    <>
      <style>{`
        #checkboxInput { display: none; }
        .toggleSwitch {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 52px;
          height: 28px;
          background-color: rgb(199,199,199);
          border-radius: 14px;
          cursor: pointer;
          transition-duration: .3s;
        }
        .toggleSwitch::after {
          content: "";
          position: absolute;
          height: 28px;
          width: 28px;
          left: 0px;
          background: conic-gradient(rgb(104,104,104),white,rgb(104,104,104),white,rgb(104,104,104));
          border-radius: 50%;
          transition-duration: .3s;
          box-shadow: 5px 2px 7px rgba(8,8,8,0.308);
        }
        #checkboxInput:checked + .toggleSwitch::after {
          transform: translateX(100%);
          transition-duration: .3s;
        }
        #checkboxInput:checked + .toggleSwitch {
          background-color: rgb(30,30,30);
          transition-duration: .3s;
        }
        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 8px;
          transition: background 0.2s;
          color: ${subTextColor};
        }
        .nav-link:hover { background: ${hoverBg}; }
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .hamburger:hover { background: ${hoverBg}; }
        .hamburger span {
          display: block;
          height: 2px;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 98;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .mobile-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 10px 32px;
          border-radius: 12px;
          transition: background 0.2s;
        }
        .mobile-link:hover { background: ${hoverBg}; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav  { display: none  !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: flex  !important; }
        }
      `}</style>

      {/* Navbar pill — slides down from top on load */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        style={{
          position: 'fixed',
          top: '16px',
          left: 0,
          right: 0,
          zIndex: 99,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 16px',
          pointerEvents: 'none',
        }}
      >
        <nav style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '780px',
          height: '52px',
          padding: '0 20px',
          borderRadius: '16px',
          background: pillBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: pillBorder,
          boxSizing: 'border-box',
          transition: 'background 0.3s, border 0.3s',
        }}>

          {/* Logo */}
          <div style={{
            fontWeight: 600,
            fontSize: '0.95rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: textColor,
            transition: 'color 0.3s',
          }}>
            Portfolio
          </div>

          {/* Desktop links + toggle — each link staggers in */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {links.map((link, i) => (
              <motion.button
                key={link}
                className="nav-link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                onClick={() => {}}
              >
                {link}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
              style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}
            >
              <Toggle />
            </motion.div>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="mobile-nav">
            <Toggle />
            <button
              className="hamburger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span style={{ width: '22px', background: textColor, transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ width: '16px', background: textColor, opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: '22px', background: textColor, transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>

        </nav>
      </motion.div>

      {/* Mobile fullscreen menu — animates in/out */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            style={{ background: menuBg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute', top: 20, right: 28,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1.8rem', color: textColor, lineHeight: 1,
              }}
            >
              ×
            </button>
            {links.map((link, i) => (
              <motion.button
                key={link}
                className="mobile-link"
                style={{ color: textColor }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07, ease: EASE }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}