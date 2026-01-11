import { motion, AnimatePresence } from "motion/react";
import { Cake, PartyPopper, Sparkles, Gift, Heart } from "lucide-react";
import { useEffect, useState } from "react";


interface BirthdayCardProps {
  name: string;
}

const MESSAGES = [
  {
    title: "Happy Birthday!",
    subtitle: "Wishing you joy, love, and magical moments ✨",
  },
  {
    title: "Make a Wish 🎂",
    subtitle: "May all your dreams come true",
  },
  {
    title: "Celebrate Big 🎉",
    subtitle: "Today is all about YOU!",
  },
];

export function BirthdayCard({ name }: BirthdayCardProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="relative max-w-2xl w-full mx-4 rounded-[2.5rem] p-12
                 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-50
                 shadow-[0_20px_60px_rgba(236,72,153,0.25)]"
      initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {/* Floating decorations */}
      <motion.div
        className="absolute -top-7 -left-7 text-yellow-400"
        animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <PartyPopper size={52} />
      </motion.div>

      <motion.div
        className="absolute -top-7 -right-7 text-pink-400"
        animate={{ y: [0, -6, 0], rotate: [0, -8, 8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Gift size={52} />
      </motion.div>

      {/* Main content */}
      <div className="text-center space-y-7 ">
        {/* Cake */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cake className="mx-auto text-pink-500 drop-shadow-lg" size={72} />
        </motion.div>

        {/* Accordion text */}
        <div className="relative h-30 flex justify-evenly">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
            >
              {/* Main title */}
              <h1
                className="text-6xl font-extrabold tracking-tight
                           bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400
                           bg-clip-text text-transparent mx-1 my-1 px-0.5 py-0.5 "
              >
                {MESSAGES[index].title}
              </h1>

              {/* Sub text */}
              <p className="text-xl text-gray-600 flex items-center gap-2 mx-1 my-1 px-0.5 py-0.5">
                <Sparkles className="text-yellow-400" size={20} />
                {MESSAGES[index].subtitle}
                <Sparkles className="text-yellow-400" size={20} />
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Name */}
        {name && (
          <motion.h2
            className="text-5xl font-black text-purple-600 flex items-center justify-center gap-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {name}
            <Heart className="text-pink-400 fill-pink-400" size={36} />
          </motion.h2>
        )}
      </div>

      {/* Floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 opacity-80"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -10, 0],
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={18} />
        </motion.div>
      ))}
    </motion.div>
  );
}
