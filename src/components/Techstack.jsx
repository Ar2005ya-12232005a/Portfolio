import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function TechStack({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const bg        = isDark ? '#1c1c1c' : '#e0e0e0';
  const shadow1   = isDark ? '#0d0d0d' : '#bebebe';
  const shadow2   = isDark ? '#2a2a2a' : '#ffffff';
  const textColor = isDark ? '#e0e0e0' : '#222';
  const subColor  = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const trackBg   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';

  const fillGradients = [
    'linear-gradient(90deg, #888 0%, #e0e0e0 50%, #aaa 100%)',
    'linear-gradient(90deg, #777 0%, #d0d0d0 50%, #999 100%)',
    'linear-gradient(90deg, #999 0%, #f0f0f0 50%, #bbb 100%)',
    'linear-gradient(90deg, #666 0%, #c8c8c8 50%, #888 100%)',
    'linear-gradient(90deg, #aaa 0%, #ffffff 50%, #ccc 100%)',
    'linear-gradient(90deg, #777 0%, #ddd 50%, #aaa 100%)',
    'linear-gradient(90deg, #555 0%, #bbb 50%, #777 100%)',
    'linear-gradient(90deg, #888 0%, #e8e8e8 50%, #aaa 100%)',
  ];

  const skills = [
    { name: 'React',          level: 85 },
    { name: 'JavaScript',     level: 80 },
    { name: 'TypeScript',     level: 65 },
    { name: 'Node.js',        level: 70 },
    { name: 'CSS / Tailwind', level: 90 },
    { name: 'Git',            level: 75 },
    { name: 'MongoDB',        level: 60 },
    { name: 'Figma',          level: 72 },
  ];

  const tools = [
    { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Next.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Firebase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Supabase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Pandas',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'NumPy',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    { name: 'PyTorch',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'Scikit',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
    { name: 'Seaborn',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
    { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'VS Code',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Express',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Vite',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'Postman',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  ];

  const cardShine = isDark
    ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)';

  return (
    <>
      <style>{`
        .ts-section {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 120px;
          box-sizing: border-box;
          gap: 60px;
        }

        .ts-row {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 48px;
          width: 100%;
          max-width: 1100px;
        }

        .ts-heading {
          margin-bottom: 24px;
          text-align: center;
        }
        .ts-heading p {
          color: ${subColor};
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 0 0 6px 0;
        }
        .ts-heading h2 {
          color: ${textColor};
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .skill-card {
          width: 100%;
          border-radius: 8px;
          background: ${bg};
          box-shadow: 6px 6px 14px ${shadow1}, -6px -6px 14px ${shadow2};
          padding: 13px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: box-shadow 0.3s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${cardShine};
          pointer-events: none;
          border-radius: 8px;
        }
        .skill-card::after {
          content: '';
          position: absolute;
          top: -60%;
          left: -60%;
          width: 60%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)'} 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .skill-card:hover::after { left: 120%; }
        .skill-card:hover {
          box-shadow: 8px 8px 20px ${shadow1}, -8px -8px 20px ${shadow2};
          transform: translateY(-1px);
        }
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .skill-name {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${textColor};
        }
        .skill-pct {
          font-size: 0.7rem;
          font-weight: 600;
          color: ${subColor};
          letter-spacing: 0.05em;
        }
        .skill-track {
          width: 100%;
          height: 3px;
          border-radius: 99px;
          background: ${trackBg};
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        .skill-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 1s cubic-bezier(0.22,1,0.36,1);
        }

        .tool-icon {
          width: 76px;
          height: 76px;
          border-radius: 16px;
          background: ${bg};
          box-shadow: 5px 5px 12px ${shadow1}, -5px -5px 12px ${shadow2};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: default;
          transition: transform 0.25s, box-shadow 0.25s;
          padding: 10px;
          box-sizing: border-box;
        }
        .tool-icon:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 8px 8px 18px ${shadow1}, -8px -8px 18px ${shadow2};
        }
        .tool-icon img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          ${isDark ? 'filter: brightness(0.9);' : ''}
        }
        .tool-icon span {
          font-size: 0.5rem;
          font-weight: 600;
          color: ${subColor};
          letter-spacing: 0.03em;
          text-align: center;
          line-height: 1;
        }
        .tool-icon.invert-dark img {
          ${isDark ? 'filter: invert(1) brightness(0.85);' : ''}
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 14px;
          justify-items: center;
        }

        @media (max-width: 860px) {
          .ts-section {
            padding: 60px 20px;
            gap: 48px;
          }
          .ts-row {
            flex-direction: column;
            align-items: center;
          }
          .ts-left,
          .ts-right {
            width: 100% !important;
            flex: unset !important;
          }
          .tools-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }
          .tool-icon {
            width: 100%;
            aspect-ratio: 1;
            height: auto;
            border-radius: 16px;
            padding: 14px;
          }
          .tool-icon img { width: 48px; height: 48px; }
          .tool-icon span { font-size: 0.55rem; }
          .skill-card { padding: 10px 14px; }
          .skill-name { font-size: 0.68rem; }
          .skill-pct  { font-size: 0.62rem; }
        }

        @media (max-width: 480px) {
          .ts-section { padding: 48px 14px; gap: 40px; }
          .tools-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }
          .tool-icon {
            border-radius: 14px;
            padding: 12px;
          }
          .tool-icon img { width: 42px; height: 42px; }
          .tool-icon span { font-size: 0.5rem; }
          .skill-name { font-size: 0.62rem; }
          .skill-pct  { font-size: 0.58rem; }
          .ts-heading h2 { font-size: 1.6rem !important; }
        }

        @media (max-width: 360px) {
          .tools-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .tool-icon img { width: 38px; height: 38px; }
        }
      `}</style>

      <section id="tech-stack" className="ts-section">

        <div className="ts-row">

          {/* ── Left: Skills ── */}
          <div className="ts-left" style={{ flex: '0 0 46%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <motion.div
              className="ts-heading"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p>WHAT I KNOW</p>
              <h2>SKILLS</h2>
            </motion.div>

            {skills.map(({ name, level }, i) => (
              <motion.div
                key={name}
                className="skill-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
              >
                <div className="skill-header">
                  <span className="skill-name">{name}</span>
                  <span className="skill-pct">{level}%</span>
                </div>
                <div className="skill-track">
                  <div
                    className="skill-fill"
                    style={{ width: `${level}%`, background: fillGradients[i] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Right: Tools ── */}
          <div className="ts-right" style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column' }}>
            <motion.div
              className="ts-heading"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p>WHAT I USE</p>
              <h2>TOOLS</h2>
            </motion.div>

            <div className="tools-grid">
              {tools.map(({ name, icon }, i) => (
                <motion.div
                  key={name}
                  className={`tool-icon${
                    name === 'GitHub' || name === 'Next.js' || name === 'Express' ? ' invert-dark' : ''
                  }`}
                  title={name}
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
                >
                  <img src={icon} alt={name} />
                  <span>{name}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}