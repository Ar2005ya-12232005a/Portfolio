import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

const EASE = [0.22, 1, 0.36, 1];

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function FadeSlide({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const formRef = useRef(null);
  const cardRef = useRef(null);

  const [form, setForm]         = useState({ name: '', email: '', message: '' });
  const [status, setStatus]     = useState('idle');
  const [focused, setFocused]   = useState(null);
  const [tilt, setTilt]         = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Theme tokens
  const bg      = isDark ? '#1c1c1c' : '#e0e0e0';
  const shadow1 = isDark ? '#0d0d0d' : '#bebebe';
  const shadow2 = isDark ? '#2b2b2b' : '#ffffff';
  const text    = isDark ? '#e8eaf0' : '#111';
  const muted   = isDark ? 'rgba(232,234,240,0.4)' : 'rgba(20,20,20,0.45)';
  const accent  = '#888887';
  const inputBg = isDark ? '#161616' : '#d4d4d4';

  const borderIdle  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const borderFocus = isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)';

  const glossTop   = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.92)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)';

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const handleMouseMove = useCallback(e => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 6, y: dx * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const fieldStyle = name => ({
    width: '100%',
    boxSizing: 'border-box',
    background: inputBg,
    border: `1px solid ${focused === name ? borderFocus : borderIdle}`,
    borderRadius: '0px',
    color: text,
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.88rem',
    fontWeight: 300,
    padding: '9px 12px',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 0.25s',
    boxShadow: 'none',
    caretColor: text,
  });

  const labelStyle = {
    display: 'block',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.58rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: accent,
    marginBottom: '7px',
  };

  return (
    <>
      <style>{`
        .contact-section {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: clamp(48px, 8vw, 100px) clamp(16px, 5vw, 60px);
          box-sizing: border-box;
        }

        .contact-inner {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .contact-eyebrow {
          font-size: 1.22rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${accent};
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          
        }
        .contact-eyebrow::before {
          content: '';
          display: inline-block;
          width: 22px;
          height: 1px;
          background: ${accent};
          flex-shrink: 0;
        }

        .contact-headline {
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(22px, 4vw, 36px);
          color: ${text};
         
        }
        .contact-headline em {
          font-style: italic;
          color: #4a4b4b;
        }

        .card-wrap {
          perspective: 900px;
        }

        .contact-card {
          position: relative;
          border-radius: 0px;
          background: ${bg};
          border: 1px solid ${cardBorder};
          box-shadow:
            4px 4px 12px ${shadow1},
            -2px -2px 8px ${shadow2},
            inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)'},
            inset 0 -1px 0 ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'};
          width: min(520px, 100%);
          padding: clamp(22px, 4vw, 34px) clamp(14px, 3vw, 22px);
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 35%;
          background: linear-gradient(180deg, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'} 0%, transparent 100%);
          pointer-events: none;
        }

        .contact-card::after {
          content: '';
          position: absolute;
          top: -40%; left: -20%;
          width: 50%; height: 140%;
          background: linear-gradient(
            105deg,
            transparent 30%,
            ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.25)'} 50%,
            transparent 70%
          );
          transform: skewX(-12deg);
          pointer-events: none;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .field-wrap {
          position: relative;
        }
        .field-wrap::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: ${accent};
          opacity: 0;
          transition: opacity 0.25s;
          z-index: 2;
        }
        .field-wrap.focused::before { opacity: 0.6; }

        .send-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 28px;
          border-radius: 0px;
          border: 1px solid ${cardBorder};
          background: ${bg};
          color: ${text};
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow:
            5px 5px 14px ${shadow1},
            -3px -3px 10px ${shadow2},
            inset 0 1px 0 ${glossTop};
          transition: box-shadow 0.25s, transform 0.2s;
          overflow: hidden;
        }
        .send-btn::after {
          content: '';
          position: absolute;
          top: -60%; left: -60%;
          width: 60%; height: 200%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.6)'} 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .send-btn:hover::after { left: 120%; }
        .send-btn:hover {
          box-shadow: 7px 7px 20px ${shadow1}, -4px -4px 14px ${shadow2}, inset 0 1px 0 ${glossTop};
          transform: translateY(-1px);
        }
        .send-btn:active { transform: translateY(0); }
        .send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

        .contact-divider {
          height: 1px;
          background: linear-gradient(90deg, ${borderIdle}, transparent);
          margin: 14px 0;
          position: relative;
          z-index: 1;
        }

        .contact-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .contact-footer-text {
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          color: ${muted};
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
        }
        .contact-footer-email {
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: ${muted};
          text-decoration: none;
          transition: color 0.2s;
          font-family: 'DM Mono', monospace;
        }
        .contact-footer-email:hover { color: ${text}; }

        .error-msg {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          color: #e07070;
          letter-spacing: 0.1em;
          text-align: center;
          margin: 4px 0 0;
        }

        input::placeholder, textarea::placeholder { color: transparent; }

        @media (max-width: 420px) {
          .contact-row { grid-template-columns: 1fr; gap: 12px; }
          .send-btn { width: 100%; }
        }

        @media (min-width: 900px) {
          .contact-card {
            width: 520px;
            min-height: 520px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .contact-form {
            flex: 1;
          }
        }
      `}</style>

      <section className="contact-section" id="contact">
        <div className="contact-inner">

          <FadeSlide delay={0}>
            <p className="contact-eyebrow">GET IN TOUCH</p>
          </FadeSlide>

          <FadeSlide delay={0.08}>
            <h2 className="contact-headline">
              LET'S BUILD SOMETHING<br /><em>TOGETHER.</em>
            </h2>
          </FadeSlide>

          <FadeSlide delay={0.16}>
            <div className="card-wrap">
              <motion.div
                ref={cardRef}
                className="contact-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  scale: isHovering ? 1.012 : 1,
                }}
                transition={{
                  rotateX: { duration: isHovering ? 0.12 : 0.5, ease: isHovering ? 'linear' : EASE },
                  rotateY: { duration: isHovering ? 0.12 : 0.5, ease: isHovering ? 'linear' : EASE },
                  scale:   { duration: 0.3, ease: EASE },
                }}
              >
                {status === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    style={{ padding: '32px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}
                  >
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: text, margin: '0 0 10px', fontWeight: 500 }}>
                      Message received.
                    </p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: muted, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>
                      I'll get back to you within a day.
                    </p>
                  </motion.div>
                ) : (
                  <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>

                    <input type="hidden" name="title" value="Portfolio Contact" />

                    <div className="contact-row">
                      <div>
                        <label style={labelStyle}>Name</label>
                        <div className={`field-wrap${focused === 'name' ? ' focused' : ''}`}>
                          <input
                            type="text" name="name" required placeholder=" "
                            value={form.name} onChange={handleChange}
                            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                            style={fieldStyle('name')}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Email</label>
                        <div className={`field-wrap${focused === 'email' ? ' focused' : ''}`}>
                          <input
                            type="email" name="email" required placeholder=" "
                            value={form.email} onChange={handleChange}
                            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                            style={fieldStyle('email')}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Message</label>
                      <div className={`field-wrap${focused === 'message' ? ' focused' : ''}`}>
                        <textarea
                          name="message" required rows={4} placeholder=" "
                          value={form.message} onChange={handleChange}
                          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                          style={fieldStyle('message')}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className="error-msg">Something went wrong. Please try again or email me directly.</p>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: muted, margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        All fields required
                      </p>
                      <button type="submit" className="send-btn" disabled={status === 'sending'}>
                        {status === 'sending' ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              style={{ display: 'inline-block', width: 12, height: 12, border: `1.5px solid ${muted}`, borderTopColor: text, borderRadius: '50%' }}
                            />
                            Sending
                          </>
                        ) : (
                          <>
                            Send message
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

                <div className="contact-divider" />

                <div className="contact-footer">
                  <span className="contact-footer-text">or reach me directly</span>
                  <a href="mailto:aryasankar16@gmail.com" className="contact-footer-email">
                    aryasankar16@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </FadeSlide>

        </div>
      </section>

      <footer style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '24px clamp(16px, 5vw, 60px)',
        borderTop: `1px solid ${borderIdle}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.62rem',
        fontWeight: 400,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: muted,
      }}>
        © 2026 Arya Sankar — All Rights Reserved
      </footer>
    </>
  );
}