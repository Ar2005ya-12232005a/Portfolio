/**
 * IsoSocials — isometric social icon card
 * Replicates the uiverse.io MijailVillegas card but horizontal,
 * with white/black color scheme instead of yellow.
 *
 * Props:
 *   theme  'dark' | 'light'
 */
export default function IsoSocials({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const color = isDark ? 'rgb(220, 220, 220)' : 'rgb(30, 30, 30)';
  const shadowColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)';
  const textBg = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.1)';
  const spanColor = isDark ? '#d0d0d0' : '#222';

  const socials = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: 'X',
      href: 'https://x.com/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .iso-card {
          max-width: fit-content;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          gap: 0.75rem;
          backdrop-filter: blur(15px);
          box-shadow: inset 0 0 20px ${shadowColor},
            inset 0 0 5px ${isDark ? 'rgba(255,255,255,0.274)' : 'rgba(0,0,0,0.1)'},
            0 5px 5px rgba(0,0,0,0.164);
          transition: 0.5s;
          padding: 0;
        }
        .iso-card:hover {
          background: ${isDark ? 'rgba(173,173,173,0.05)' : 'rgba(0,0,0,0.04)'};
        }
        .iso-card ul {
          padding: 0.5rem 0.75rem;
          display: flex;
          list-style: none;
          gap: 0.35rem;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          flex-direction: row;
          margin: 0;
        }
        .iso-card ul li {
          cursor: pointer;
        }
        .iso-svg {
          transition: all 0.3s;
          padding: 0.5rem;
          height: 40px;
          width: 40px;
          border-radius: 100%;
          color: ${color};
          fill: currentColor;
          box-shadow: inset 0 0 20px ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'},
            inset 0 0 5px ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.15)'},
            0 5px 5px rgba(0,0,0,0.164);
          position: relative;
        }
        .iso-text {
          opacity: 0;
          border-radius: 5px;
          padding: 3px 6px;
          transition: all 0.3s;
          color: ${color};
          background-color: ${textBg};
          position: absolute;
          z-index: 9999;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          white-space: nowrap;
          box-shadow: -5px 0 1px rgba(153,153,153,0.2),
            -10px 0 1px rgba(153,153,153,0.2),
            inset 0 0 20px ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.08)'},
            inset 0 0 5px ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.1)'},
            0 5px 5px rgba(0,0,0,0.082);
          pointer-events: none;
        }
        .iso-pro {
          transition: 0.5s;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .iso-pro:hover a > .iso-svg {
          transform: translate(15px, -15px);
          border-radius: 100%;
        }
        .iso-pro:hover .iso-text {
          opacity: 1;
          transform: translate(25px, -2px) skew(-5deg);
        }
        .iso-pro:hover .iso-svg {
          transform: translate(5px, -5px);
        }
        .iso-pro .iso-span {
          opacity: 0;
          position: absolute;
          color: ${spanColor};
          border-color: ${spanColor};
          box-shadow: inset 0 0 20px ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'},
            inset 0 0 5px ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.15)'},
            0 5px 5px rgba(0,0,0,0.164);
          border-radius: 50%;
          transition: all 0.3s;
          height: 40px;
          width: 40px;
        }
        .iso-pro:hover .iso-span { opacity: 1; }
        .iso-pro:hover .iso-span:nth-child(1) { opacity: 0.2; }
        .iso-pro:hover .iso-span:nth-child(2) { opacity: 0.4; transform: translate(5px, -5px); }
        .iso-pro:hover .iso-span:nth-child(3) { opacity: 0.6; transform: translate(10px, -10px); }
      `}</style>

      <div className="iso-card">
        <ul>
          {socials.map(({ label, href, icon }) => (
            <li key={label} className="iso-pro">
              <span className="iso-span" />
              <span className="iso-span" />
              <span className="iso-span" />
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <div className="iso-svg">{icon}</div>
              </a>
             
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}