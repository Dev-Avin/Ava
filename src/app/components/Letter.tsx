import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X } from 'lucide-react';

interface LetterProps {
  number: number;
  title: string;
  content: string;
  gradient: string;
  index: number;
}

export function Letter({ number, title, content, gradient, index }: LetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Letter Envelope */}
      <motion.div
        className={`relative overflow-hidden rounded-3xl p-6 shadow-lg cursor-pointer ${gradient} transition-shadow`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 140 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
      >
        {/* Pulsing gradient background */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{ zIndex: 0 }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating hearts */}
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-white/70 text-xl"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              zIndex: 1,
            }}
            animate={{
              y: [0, -5, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          >
            ✨
          </motion.span>
        ))}

        <div className="relative z-10 flex items-center gap-4">
          {/* Envelope Icon */}
          <motion.div
            className="p-4 bg-white/30 backdrop-blur-sm rounded-xl"
            animate={{ y: [0, -4, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          >
            <Mail size={32} className="text-white" />
          </motion.div>

          <div className="flex-1">
            <div className="text-white/80 text-sm font-semibold mb-1">
              Letter #{number}
            </div>
            <h3 className="text-xl font-bold text-white">
              {title}
            </h3>
          </div>

          <motion.div
            className="text-white text-2xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          >
            ✉️
          </motion.div>
        </div>

        <div className="mt-4 text-white/70 text-sm line-clamp-2 relative z-10">
          {content.substring(0, 80)}...
        </div>
      </motion.div>

      {/* Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl ${gradient}`}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 160, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              <div className="mb-6">
                <div className="text-white/80 text-sm font-semibold mb-2">
                  Letter #{number}
                </div>
                <h2 className="text-4xl font-black text-white mb-4 animate-pulse">
                  {title}
                </h2>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg relative overflow-hidden">
                {/* Sparkles in modal */}
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-yellow-300 text-xl"
                    style={{
                      top: `${Math.random() * 90}%`,
                      left: `${Math.random() * 90}%`,
                    }}
                    animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3], scale: [0.7, 1.2, 0.7] }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    ✨
                  </motion.span>
                ))}

                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line relative z-10">
                  {content}
                </p>

               <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 italic text-right text-sm">
                     With love❤️
                     <br></br> 
                     - Only Your's Avi
                   </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
