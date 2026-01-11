import { motion } from "motion/react";

interface BalloonProps {
  color: string;
  delay: number;
  x: number;
}

export function Balloon({ color, delay, x }: BalloonProps) {
  const size = 1.15 + Math.random() * 0.2;
  const drift = Math.random() * 60 - 30;
  const wobble = Math.random() * 6 - 3;
  const duration = 9 + Math.random() * 6;

  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{ left: `${x}%` }}
      initial={{ y: 0, opacity: 0, scale: size * 0.9 }}
      animate={{
        y: [-20, -900],
        opacity: [0, 1, 1, 0],
        x: [0, drift],
        rotate: [-wobble, wobble, -wobble],
        scale: [size * 0.95, size, size * 0.97],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: "easeInOut",
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Balloon body */}
        <div
          className="relative w-20 h-24 rounded-full shadow-2xl"
          style={{
            background: `radial-gradient(circle at 30% 25%, #ffffffaa, ${color})`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
        >
          {/* Highlight */}
          <div className="absolute top-4 left-5 w-4 h-8 rounded-full bg-white/40 blur-sm" />

          {/* Knot */}
          <div
            className="absolute -bottom-1 left-1/2 w-3 h-2 -translate-x-1/2 rotate-45"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Curved string (SVG) */}
        <motion.svg
          width="20"
          height="100"
          viewBox="0 0 20 100"
          className="mt-1 overflow-visible"
        >
          <motion.path
            d="M10 0 C 6 30, 14 60, 10 100"
            fill="none"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1.5"
            animate={{
              d: [
                "M10 0 C 4 30, 16 60, 10 100",
                "M10 0 C 16 30, 4 60, 10 100",
                "M10 0 C 4 30, 16 60, 10 100",
              ],
            }}
            transition={{
              duration: 2.5 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}
