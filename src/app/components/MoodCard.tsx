import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface MoodCardProps {
  mood: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  emoji: string;
  description: string;
  index: number;
  onClick: () => void;
}

export function MoodCard({ mood, icon: Icon, color, gradient, emoji, description, index, onClick }: MoodCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl p-8 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow ${gradient}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="text-5xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          >
            {emoji}
          </motion.div>
          <div className={`p-3 rounded-full bg-white/30 backdrop-blur-sm`}>
            <Icon size={32} className="text-white" />
          </div>
        </div>

        <h3 className="text-3xl font-black text-white mb-2 capitalize">
          {mood}
        </h3>
        
        <p className="text-white/90 text-sm">
          {description}
        </p>
      </div>

      {/* Decorative background elements */}
      <motion.div
        className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
      />
      <motion.div
        className="absolute -left-4 top-1/2 w-20 h-20 bg-white/10 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
      />
    </motion.div>
  );
}