import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';

const EASE = [0.22, 1, 0.36, 1];

export default function TechStack({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const textColor = isDark ? '#e0e0e0' : '#222';
  const subColor  = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const fadeColor = isDark ? '#0b0b0b' : '#ffffff';

  // B&W filter: grayscale + brightness/contrast tuned per theme
  const iconFilter = isDark
    ? 'grayscale(1) brightness(0.85) contrast(1.1)'
    : 'grayscale(1) brightness(0.6) contrast(1.2)';

  const iconHoverFilter = isDark
    ? 'grayscale(1) brightness(1.1) contrast(1.1)'
    : 'grayscale(1) brightness(0.35) contrast(1.3)';

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

  // Split into two rows that scroll opposite directions for visual depth
  const half = Math.ceil(tools.length / 2);
  const rowOne = tools.slice(0, half);
  const rowTwo = tools.slice(half);

  const toLogos = list =>
    list.map(({ name, icon }) => ({
      src: icon,
      alt: name,
      title: name,
    }));

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
          padding: 80px 0;
          box-sizing: border-box;
          gap: 56px;
        }

        .ts-heading {
          margin-bottom: 8px;
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

        .ts-loops {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .tool-logo-img {
          filter: ${iconFilter};
          transition: filter 0.25s ease;
        }
        .tool-logo-img:hover {
          filter: ${iconHoverFilter};
        }

        @media (max-width: 860px) {
          .ts-section { padding: 60px 0; gap: 44px; }
        }
        @media (max-width: 480px) {
          .ts-section { padding: 48px 0; gap: 36px; }
          .ts-heading h2 { font-size: 1.6rem !important; }
        }
      `}</style>

      <section className="ts-section">

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

        <div className="ts-loops">
          <LogoLoop
            logos={toLogos(rowOne)}
            speed={80}
            direction="left"
            logoHeight={44}
            gap={56}
            fadeOut
            fadeOutColor={fadeColor}
            scaleOnHover
            pauseOnHover
            ariaLabel="Tools and technologies, row 1"
            renderItem={item => (
              <img
                className="tool-logo-img"
                src={item.src}
                alt={item.alt}
                title={item.title}
                style={{ height: 44, width: 'auto', display: 'block', objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            )}
          />

          <LogoLoop
            logos={toLogos(rowTwo)}
            speed={80}
            direction="right"
            logoHeight={44}
            gap={56}
            fadeOut
            fadeOutColor={fadeColor}
            scaleOnHover
            pauseOnHover
            ariaLabel="Tools and technologies, row 2"
            renderItem={item => (
              <img
                className="tool-logo-img"
                src={item.src}
                alt={item.alt}
                title={item.title}
                style={{ height: 44, width: 'auto', display: 'block', objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            )}
          />
        </div>

      </section>
    </>
  );
}