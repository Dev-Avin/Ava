import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface AccordionItem {
  title: string;
  subtitle: string;
  image: string;
  gradient: string;
}

const ITEMS: AccordionItem[] = [
  {
    title: "You are loved 💖",
    subtitle: "More than you’ll ever know",
    image: "🎀",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    title: "You are special ✨",
    subtitle: "One of a kind, always",
    image: "🌸",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    title: "You are safe 🫶",
    subtitle: "I’ve always got you",
    image: "🧸",
    gradient: "from-yellow-400 to-pink-400",
  },
  {
    title: "You are magic 💫",
    subtitle: "Never forget that",
    image: "🦋",
    gradient: "from-blue-400 to-purple-400",
  },
];

export function CuteAccordion() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ITEMS.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const item = ITEMS[index];

  return (
    <div className="relative w-full max-w-xl mx-auto mt-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={`relative rounded-3xl p-8 text-center text-white
                      bg-gradient-to-br ${item.gradient}
                      shadow-xl overflow-hidden`}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Floating emoji */}
          <motion.div
            className="absolute top-2 right-2 text-6xl"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {item.image}
          </motion.div>

          {/* Main text */}
          <motion.h2
            className="text-4xl font-black mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {item.title}
          </motion.h2>

          {/* Sub text */}
          <motion.p
            className="text-lg opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {item.subtitle}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
