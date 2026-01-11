import { motion } from 'motion/react';
import { Home, Heart } from 'lucide-react';

interface NavigationProps {
  currentPage: 'birthday' | 'moods';
  onNavigate: (page: 'birthday' | 'moods') => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎂</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Ava's Space
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('birthday')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'birthday'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-purple-100'
              }`}
            >
              <Home size={20} />
              <span className="hidden sm:inline">Birthday</span>
            </button>

            <button
              onClick={() => onNavigate('moods')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'moods'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-purple-100'
              }`}
            >
              <Heart size={20} />
              <span className="hidden sm:inline">Moods</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
