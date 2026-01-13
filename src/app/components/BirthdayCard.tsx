import { motion, AnimatePresence } from "motion/react";
import { Cake, PartyPopper, Sparkles, Gift, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface BirthdayCardProps {
  name: string;
}

const MESSAGES = [
  {
    title: "Happy Birthday 🎂",
    subtitle: "Wishing you endless joy, love, and magical moments ✨",
  },
  {
    title: "Make a Wish ✨",
    subtitle: "May every dream you hold close come true",
  },
  {
    title: "Celebrate Big 🎉",
    subtitle: "Today is all about YOU — enjoy every second!",
  },
  {
    title: "Have the Most Beautiful Year 🌸",
    subtitle: "You bring sunshine wherever you go, my love",
  },
  {
    title: "Cutie Pie Was Born Today 🥰",
    subtitle: "Mirror, mirror on the wall — my baby is the cutest of them all",
  },
  {
    title: "To My Priyee 💖",
    subtitle: "May this year bring you abundance, success, and happiness",
  },
  {
    title: "Big Day, My Panda 🐼",
    subtitle: "Live fully, love deeply, and enjoy every single moment",
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

  const title = MESSAGES[index].title;
  const textOnly = title.replace(
    /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
    ""
  ).trim();
  const emoji = title.match(
    /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu
  )?.[0];

  return (
    <motion.div
      className="relative max-w-3xl w-full mx-4 rounded-[2.5rem]
                 p-8 sm:p-10 md:p-14
                 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-50
                 shadow-[0_25px_80px_rgba(236,72,153,0.28)]
                 overflow-visible"
      initial={{ scale: 0.75, rotate: -6, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
    >
      {/* Corner decorations */}
      <motion.div
        className="absolute -top-7 -left-7 text-yellow-400"
        animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <PartyPopper size={46} />
      </motion.div>

      <motion.div
        className="absolute -top-7 -right-7 text-pink-400"
        animate={{ y: [0, -6, 0], rotate: [0, -8, 8, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        <Gift size={46} />
      </motion.div>

      {/* Main content */}
      <div className="text-center space-y-8 sm:space-y-10">
        {/* Cake */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cake
            className="mx-auto text-pink-500 drop-shadow-xl"
            size={64}
          />
        </motion.div>

        {/* Animated message */}
        <div className="relative h-36 sm:h-40 flex items-center justify-center overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4"
            >
              {/* Title with preserved emoji color */}
              <h1 className="flex items-center justify-center gap-4 text-center">
                <span
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold
                             bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400
                             bg-clip-text text-transparent leading-tight"
                >
                  {textOnly}
                </span>

                {emoji && (
                  <motion.span
                    className="text-5xl sm:text-6xl md:text-7xl leading-none"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 flex items-center gap-2 text-center">
                <Sparkles size={16} className="text-yellow-400" />
                {MESSAGES[index].subtitle}
                <Sparkles size={16} className="text-yellow-400" />
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Name */}
        {name && (
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl
                       font-black text-purple-600
                       flex items-center justify-center gap-3"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {name}
            <Heart className="text-pink-400 fill-pink-400" size={32} />
          </motion.h2>
        )}
      </div>

      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 opacity-70"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{ y: [0, -10, 0], scale: [0.6, 1, 0.6] }}
          transition={{
            duration: 3 + Math.random(),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={16} />
        </motion.div>
      ))}
    </motion.div>
  );
}
