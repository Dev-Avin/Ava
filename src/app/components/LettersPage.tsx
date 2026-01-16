import { motion } from 'motion/react';
import { Letter } from './Letter';
import { ArrowLeft, Heart } from 'lucide-react';
import { moodLetters, MoodType } from '../data/letters';

interface LettersPageProps {
  mood: MoodType;
  moodGradient: string;
  onBack: () => void;
}

export function LettersPage({ mood, moodGradient, onBack }: LettersPageProps) {
  const letters = moodLetters[mood];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-24 pb-12 px-4 overflow-hidden">
      {/* Floating sparkles in background */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-200"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, Math.random() * 6 - 3, 0],
            scale: [0.7, 1, 0.7],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Heart size={16 + Math.random() * 8} className="text-pink-300" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="font-semibold text-purple-600">Back to Moods</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Love Filled Letters
          </motion.h1>
          <p className="text-gray-600 text-lg">
            5 heartfelt messages just for you 💌
          </p>
        </motion.div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index, type: 'spring', stiffness: 180 }}
            >
              <Letter
                number={index + 1}
                title={letter.title}
                content={letter.content}
                gradient={moodGradient}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          className="text-center mt-12 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm flex justify-center items-center gap-2">
            Each letter was written with care <span className="animate-pulse">💜</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
