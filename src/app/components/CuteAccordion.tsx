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
    title: "You are truly special",
    subtitle: "One of a kind — now and always ✨",
    image: "🌸",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    title: "You are safe here",
    subtitle: "I’ve always got you, no matter what 🫶",
    image: "🧸",
    gradient: "from-yellow-400 to-amber-400",
  },
  {
    title: "You are pure magic",
    subtitle: "Never forget how rare you are 💫",
    image: "🦋",
    gradient: "from-blue-400 to-purple-400",
  },
  {
    title: "Loved more than anything",
    subtitle: "The most in this whole world, mere bacchaa ❤️",
    image: "💝",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    title: "Hehehe cutuuuu",
    subtitle: "Muahhh, muahhh, muahhhh 💋",
    image: "🐻",
    gradient: "from-orange-400 to-pink-400",
  },
  {
    title: "Thank you for being born",
    subtitle: "Your parents created a masterpiece ✨",
    image: "✨",
    gradient: "from-emerald-400 to-teal-400",
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
    <div className="relative w-xl mx-auto mt-10">
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
