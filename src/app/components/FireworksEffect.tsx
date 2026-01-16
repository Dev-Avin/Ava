import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const COLORS = [
  "#FF4ECD",
  "#7C3AED",
  "#22D3EE",
  "#FACC15",
  "#F97316",
  "#34D399",
  "#F472B6",
];

const FIREWORKS_COUNT = 6;
const PARTICLES_PER_FIREWORK = 28;

export function FireworksEffect() {
  const fireworks = useMemo(
    () =>
      Array.from({ length: FIREWORKS_COUNT }).map(() => ({
        left: Math.random() * 100,
        peak: 60 + Math.random() * 25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {fireworks.map((fw, i) => (
        <Rocket key={i} {...fw} />
      ))}
    </div>
  );
}

/* ------------------------------------ */
/* 🚀 ROCKET (HIDDEN BEFORE BURST) */
/* ------------------------------------ */

function Rocket({
  left,
  peak,
  delay,
  color,
}: {
  left: number;
  peak: number;
  delay: number;
  color: string;
}) {
  const [explode, setExplode] = useState(false);
  const [visible, setVisible] = useState(true);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const explodeTimer = setTimeout(() => {
      setVisible(false); // 🚫 hide rocket
      setExplode(true);  // 💥 explode
    }, delay * 1000 + 1300);

    const resetTimer = setTimeout(() => {
      setExplode(false);
      setVisible(true);
      setCycle((c) => c + 1);
    }, delay * 1000 + 3600);

    return () => {
      clearTimeout(explodeTimer);
      clearTimeout(resetTimer);
    };
  }, [cycle, delay]);

  return (
    <motion.div
      key={cycle}
      className="absolute bottom-0"
      style={{ left: `${left}%` }}
      initial={{ y: "0vh" }}
      animate={{ y: `-${peak}vh` }}
      transition={{
        duration: 1.3,
        delay,
        ease: "easeOut",
      }}
    >
      {/* 🚀 Rocket trail */}
      {visible && (
        <motion.div
          className="h-6 w-[2px] rounded-full"
          style={{ background: color }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      )}

      {/* 💥 Explosion */}
      {explode && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <Explosion color={color} />
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------ */
/* 💥 EXPLOSION */
/* ------------------------------------ */

function Explosion({ color }: { color: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES_PER_FIREWORK }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 160;

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: 6 + Math.random() * 8,
          duration: 2.2 + Math.random() * 1,
        };
      }),
    []
  );

  return (
    <div className="relative">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #fff, ${color})`,
            filter: "blur(0.6px)",
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0.4,
          }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: 2.6, 
          }}
          transition={{
            duration: p.duration,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
