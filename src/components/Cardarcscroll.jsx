import { useRef, useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ── Success quotes by great people ──────────────────────────────
const QUOTES = [
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
];

// ── Color palette for accents — cycles through cards ────────────
const ACCENTS_DARK  = ["#e8a87c", "#9fc5e8", "#c9a0dc", "#7fc7a3", "#e88c8c", "#a8c97f", "#d6a8e8", "#7ce0d3", "#e8c97f"];
const ACCENTS_LIGHT = ["#d9534f", "#3b6fa0", "#7a4fa0", "#3f8f6a", "#c0394f", "#5a7d2e", "#8a3f9c", "#1e8a78", "#b8860b"];

const getFinalRot = (i, total) => -60 + i * (360 / total);

function computeStackedOffset(initialAngleDeg, cardW, cardH) {
  const θ = (initialAngleDeg * Math.PI) / 180;
  const cx = cardW / 2;
  const cy = -cardH / 2;
  return {
    stackedX: -(cx * Math.cos(θ) - cy * Math.sin(θ)),
    stackedY: -(cx * Math.sin(θ) + cy * Math.cos(θ)),
  };
}

const FANNED_X = 0;
const FANNED_Y = 0;

// ── Single quote card ────────────────────────────────────────
function CardItem({ quote, index, total, progress, initialAngle, cardW, cardH, cardRadius, theme }) {
  const isDark = theme === "dark";
  const rotate = useTransform(progress, [0, 1], [initialAngle, getFinalRot(index, total)]);

  const accent   = isDark ? ACCENTS_DARK[index % ACCENTS_DARK.length] : ACCENTS_LIGHT[index % ACCENTS_LIGHT.length];
  const cardBg   = isDark ? "#1c1c1c" : "#f3ece9";
  const textCol  = isDark ? "#e8e6e3" : "#2b2b2b";
  const subCol   = isDark ? "rgba(232,230,227,0.45)" : "rgba(43,43,43,0.45)";
  const border   = isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.05)";

  // scale font/padding relative to card size so it stays readable at any responsive scale
  const scaleFactor = cardW / 240;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: cardW,
        height: cardH,
        left: 0,
        bottom: 0,
        transformOrigin: "left bottom",
        zIndex: total - index,
        borderRadius: cardRadius,
        backgroundColor: cardBg,
        border,
        overflow: "hidden",
        rotate,
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.35)"
          : "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: `${14 * scaleFactor}px ${16 * scaleFactor}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Quote mark */}
        <span
          style={{
            fontSize: `${30 * scaleFactor}px`,
            fontWeight: 900,
            color: accent,
            lineHeight: 0.6,
            fontFamily: "Georgia, serif",
          }}
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <p
          style={{
            margin: 0,
            color: accent,
            fontWeight: 700,
            fontSize: `${Math.max(9, 12.5 * scaleFactor)}px`,
            lineHeight: 1.32,
            letterSpacing: "-0.01em",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {quote.text}
        </p>

        {/* Author */}
        <span
          style={{
            fontSize: `${Math.max(6, 7.5 * scaleFactor)}px`,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: subCol,
          }}
        >
          @{quote.author.replace(/\s+/g, "").toLowerCase()}
        </span>
      </div>

      {/* subtle glass glare to match original card style */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 42%, transparent 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 42%, transparent 100%)",
          borderRadius: cardRadius,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function CardArcScroll({
  quotes = QUOTES,
  theme = "dark",
  initialAngle = 0,
  cardWidth = 240,
  cardHeight = 151,
  cardScale = 1,
  cardRadius = 14,
  backgroundColor = "transparent",
}) {
  const containerRef = useRef(null);
  const scrollRef    = useRef(null);
  const total        = quotes.length;

  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [isDesktop, setIsDesktop]         = useState(typeof window !== "undefined" ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerSize({ w: width || el.offsetWidth, h: height || el.offsetHeight });
    });
    ro.observe(el);
    setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const fanRadius = Math.sqrt(cardWidth * cardWidth + cardHeight * cardHeight);
  const scale =
    (containerSize.w === 0 && containerSize.h === 0
      ? 1
      : Math.min(
          (containerSize.w * 0.9) / (fanRadius * 2),
          (containerSize.h * 0.9) / (fanRadius * 2),
          1.5
        )) * cardScale;

  const responsiveCardW = cardWidth  * scale;
  const responsiveCardH = cardHeight * scale;

  const { stackedX, stackedY } = useMemo(
    () => computeStackedOffset(initialAngle, responsiveCardW, responsiveCardH),
    [initialAngle, responsiveCardW, responsiveCardH]
  );

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 1 });

  const groupX = useTransform(progress, [0, 1], [stackedX, FANNED_X]);
  const groupY = useTransform(progress, [0, 1], [stackedY, FANNED_Y]);

  if (!isDesktop) return null;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        background: backgroundColor,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`.cf-scroll::-webkit-scrollbar { display: none; }`}</style>

      <div
        ref={scrollRef}
        className="cf-scroll"
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "scroll",
          zIndex: 10,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div style={{ height: "300%", width: "100%" }} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            position: "relative",
            width: 0,
            height: 0,
            x: groupX,
            y: groupY,
          }}
        >
          {quotes.map((quote, index) => (
            <CardItem
              key={index}
              quote={quote}
              index={index}
              total={total}
              progress={progress}
              initialAngle={initialAngle}
              cardW={responsiveCardW}
              cardH={responsiveCardH}
              cardRadius={cardRadius}
              theme={theme}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}