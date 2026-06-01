import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

const PARAGRAPHS = [
  "I'm a Computer Science Engineering student passionate about software development, problem-solving, and emerging technologies. I enjoy building web applications, exploring new tools and frameworks, and applying my technical skills to create practical solutions.",
  "My interests span full-stack development, data structures and algorithms, cloud computing, and core computer science subjects. I'm constantly improving through projects, coding challenges, and continuous learning while strengthening my understanding of software engineering principles.",
  "Beyond academics, I value discipline, consistency, and self-improvement. My goal is to become a skilled software engineer, contribute to impactful technology solutions, and build products that make a meaningful difference in people's lives.",
];

function FadeSlide({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutMe({ theme = "dark" }) {
  const isDark = theme === "dark";
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const text  = isDark ? "#e8eaf0"               : "#111111";
  const muted = isDark ? "rgba(232,234,240,0.5)" : "rgba(20,20,20,0.55)";

  return (
    <>
      <style>{`
        .about-section {
          --accent:  #666665;
          --accent2: #4a4b4b;
          --serif: 'Instrument Serif', Georgia, serif;
          --mono:  'DM Mono', monospace;

          position: relative;
          font-family: var(--mono);
          overflow: hidden;
          padding: clamp(60px, 10vw, 140px) clamp(20px, 6vw, 80px);
          min-height: 100vh;
          box-sizing: border-box;
        }

        .about-inner {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
        }

        .about-eyebrow {
          font-family: var(--mono);
          font-size: clamp(0.95rem, 2vw, 1.3rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--accent);
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .about-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--accent);
          flex-shrink: 0;
        }

        .about-headline {
          font-family: var(--serif);
          font-size: clamp(1.9rem, 4.5vw, 3.8rem);
          font-weight: 400;
          line-height: 1;
          margin: 0 0 clamp(20px, 3vw, 36px);
          letter-spacing: -0.02em;
        }
        .about-headline em {
          font-style: italic;
          color: var(--accent);
        }

        .about-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%);
          transform-origin: left;
          margin: 0 0 clamp(20px, 3vw, 36px);
        }

        .about-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .about-para {
          font-size: clamp(1.05rem, 2.1vw, 1.28rem);
          line-height: 1.85;
          margin: 0;
          font-weight: 300;
        }
        .about-para strong { font-weight: 500; }

        /* Mobile image — hidden on desktop */
        .about-mobile-img {
          display: none;
        }

        @media (max-width: 767px) {
          .about-mobile-img {
            display: block;
            width: clamp(140px, 45vw, 220px);
            aspect-ratio: 3 / 4;
            margin: 0 auto clamp(24px, 6vw, 40px);
            border-radius: 12px;
            overflow: hidden;
            flex-shrink: 0;
          }
          .about-mobile-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
            display: block;
          }
        }
      `}</style>

      <section className="about-section" ref={sectionRef}>

        <div className="about-inner">

          <FadeSlide delay={0}>
            <p className="about-eyebrow">About Me</p>
          </FadeSlide>

          {/* Image — mobile only */}
          <FadeSlide delay={0.05}>
            <div className="about-mobile-img">
              <img src="/Me.jpg" alt="Arya Sankar" />
            </div>
          </FadeSlide>

          <FadeSlide delay={0.08}>
            <h2 className="about-headline" style={{ color: text }}>
              BUILDING THINGS<br />
              THAT <em>MATTER.</em>
            </h2>
          </FadeSlide>

          <motion.div className="about-divider" style={{ scaleX: lineScaleX }} />

          <div className="about-col">
            {PARAGRAPHS.map((txt, i) => (
              <FadeSlide key={i} delay={0.1 + i * 0.12} direction="up">
                <p
                  className="about-para"
                  style={{ color: muted }}
                  dangerouslySetInnerHTML={{
                    __html: txt
                      .replace(/full-stack development|web applications|software development/gi,
                        m => `<strong style="color:${text}">${m}</strong>`)
                      .replace(/data structures and algorithms|cloud computing|software engineering/gi,
                        m => `<strong style="color:${text}">${m}</strong>`)
                      .replace(/discipline, consistency, and self-improvement/gi,
                        m => `<strong style="color:${text}">${m}</strong>`)
                  }}
                />
              </FadeSlide>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}