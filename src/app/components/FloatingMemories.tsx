import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Memory {
  id: number;
  src: string;
  size: number;
  x: number;
  delay: number;
  duration: number;
  rotate: number;
}

const IMAGES = [
  "/S1.png",
  "/S2.png",
  "/S3.png",
  "/S4.png",
  "/S5.png",
  "/S6.png",
  "/S7.png",
  "/S8.png",
  "/S9.png",
  "/S10.png",
  "/S11.png",
  "/S12.png",
  "/S13.png",
  "/S14.png",
  "/S15.png",
  "/S16.png",
];

export function FloatingMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const generate = () => {
      const id = Date.now() + Math.random();
      const img = IMAGES[Math.floor(Math.random() * IMAGES.length)];

      setMemories((prev) => [
        ...prev.slice(-12), // keep max 12 items
        {
          id,
          src: img,
          size: 60 + Math.random() * 80, // random size
          x: Math.random() * 90 + 5, // avoid edges
          delay: Math.random() * 2,
          duration: 15 + Math.random() * 10,
          rotate: Math.random() * 20 - 10,
        },
      ]);
    };

    const interval = setInterval(generate, 2000); // generate new memory every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {memories.map((m) => (
        <motion.img
          key={m.id}
          src={m.src}
          className="absolute rounded-3xl object-cover shadow-xl"
          style={{
            width: m.size,
            height: m.size,
            left: `${m.x}%`,
            bottom: -150,
            filter: "blur(0.5px)",
            opacity: 0.25,
          }}
          initial={{
            y: 0,
            scale: 0.8,
            rotate: m.rotate,
            opacity: 0,
          }}
          animate={{
            y: -window.innerHeight - 200,
            x: [
              m.x, 
              m.x + (Math.random() * 20 - 10), 
              m.x - (Math.random() * 20 - 10),
            ], // slight drift
            scale: [0.9, 1, 0.95],
            rotate: [m.rotate, m.rotate + (Math.random() * 15 - 7), m.rotate],
            opacity: [0, 0.35, 0],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
