import { motion } from 'motion/react';
import { MoodCard } from './MoodCard';
import { Smile, Users, Frown, Zap, TrendingDown, HeartHandshake, Battery, Star, Coffee } from 'lucide-react';

interface MoodPageProps {
  onMoodSelect: (mood: string, gradient: string) => void;
}

export function MoodPage({ onMoodSelect }: MoodPageProps) {
  const moods = [
    {
      mood: 'happy',
      icon: Smile,
      emoji: '😊',
      gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      color: '#FEC601',
      description: 'Feeling joyful and positive about everything!',
    },
    {
      mood: 'lonely',
      icon: Users,
      emoji: '😔',
      gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
      color: '#4ECDC4',
      description: 'Missing connection and companionship.',
    },
    {
      mood: 'sad',
      icon: Frown,
      emoji: '😢',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      color: '#95A5A6',
      description: 'Feeling down and need some comfort.',
    },
    {
      mood: 'frustrated',
      icon: Zap,
      emoji: '😤',
      gradient: 'bg-gradient-to-br from-red-400 to-red-600',
      color: '#E74C3C',
      description: 'Things aren\'t going the way you want.',
    },
    {
      mood: 'demotivated',
      icon: TrendingDown,
      emoji: '😞',
      gradient: 'bg-gradient-to-br from-purple-400 to-purple-600',
      color: '#9B59B6',
      description: 'Lacking energy and drive right now.',
    },
    {
      mood: 'lovey dovey',
      icon: HeartHandshake,
      emoji: '🥰',
      gradient: 'bg-gradient-to-br from-pink-400 to-rose-500',
      color: '#FF6B9D',
      description: 'Full of love and affection!',
    },
    {
      mood: 'energetic',
      icon: Battery,
      emoji: '⚡',
      gradient: 'bg-gradient-to-br from-green-400 to-emerald-600',
      color: '#2ECC71',
      description: 'Ready to take on the world!',
    },
    {
      mood: 'excited',
      icon: Star,
      emoji: '🤩',
      gradient: 'bg-gradient-to-br from-yellow-300 to-pink-400',
      color: '#FFD700',
      description: 'Can’t wait for what’s coming next!',
    },
    {
      mood: 'relaxed',
      icon: Coffee,
      emoji: '😌',
      gradient: 'bg-gradient-to-br from-teal-300 to-blue-400',
      color: '#3ABEFF',
      description: 'Chill vibes, calm and cozy.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-24 pb-12 px-4 overflow-hidden">
      
      {/* Floating emojis in background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 text-2xl"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1, 0.9],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {['✨','💖','🌸','💫'][Math.floor(Math.random()*4)]}
        </motion.div>
      ))}

      <motion.div className="max-w-7xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            How are you feeling?
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Select your current mood and let's make it even better! ✨
          </p>
        </motion.div>

        {/* Mood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.mood}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index, type: 'spring', stiffness: 180 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <MoodCard
                mood={mood.mood}
                icon={mood.icon}
                emoji={mood.emoji}
                gradient={mood.gradient}
                color={mood.color}
                description={mood.description}
                index={index}
                onClick={() => onMoodSelect(mood.mood, mood.gradient)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-500 text-sm flex justify-center items-center gap-2">
            Remember: It's okay to feel whatever you're feeling. Every emotion is valid. 
            <motion.span animate={{ scale: [1,1.2,1] }} transition={{ repeat: Infinity, duration: 1 }}>❤️</motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
