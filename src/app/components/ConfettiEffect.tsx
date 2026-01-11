import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  sway: number;
  shape: "square" | "rect" | "circle";
}

export function ConfettiEffect() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = [
      "#FF6B9D",
      "#FEC601",
      "#4ECDC4",
      "#C44569",
      "#F8B500",
      "#95E1D3",
    ];

    const shapes: Confetti["shape"][] = ["square", "rect", "circle"];

    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 4,
      rotation: Math.random() * 720 - 360,
      sway: Math.random() * 200 - 100,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: -40,
            width:
              piece.shape === "rect" ? piece.size * 0.6 : piece.size,
            height:
              piece.shape === "rect" ? piece.size * 1.8 : piece.size,
            backgroundColor: piece.color,
            borderRadius:
              piece.shape === "circle"
                ? "50%"
                : piece.shape === "square"
                ? "4px"
                : "2px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, piece.sway, -piece.sway * 0.5],
            rotate: [0, piece.rotation],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
