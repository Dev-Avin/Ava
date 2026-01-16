import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { BirthdayPage } from './components/BirthdayPage';
import { MoodPage } from './components/MoodPage';
import { LettersPage } from './components/LettersPage';
import { MoodType } from './data/letters';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'birthday' | 'moods' | 'letters'>('birthday');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedMoodGradient, setSelectedMoodGradient] = useState<string>('');

  // 🔒 Date lock for MoodPage
  const isMoodPageUnlocked = new Date() >= new Date('2026-01-16');

  const handleMoodSelect = (mood: string, gradient: string) => {
    if (!isMoodPageUnlocked) return;
    setSelectedMood(mood as MoodType);
    setSelectedMoodGradient(gradient);
    setCurrentPage('letters');
  };

  const handleBackToMoods = () => {
    setCurrentPage('moods');
    setSelectedMood(null);
  };

  const handleNavigate = (page: 'birthday' | 'moods') => {
    if (page === 'moods' && !isMoodPageUnlocked) {
      setCurrentPage('birthday');
      return;
    }
    setCurrentPage(page);
    if (page === 'birthday') {
      setSelectedMood(null);
    }
  };

  return (
    <>
      <Navigation
        currentPage={currentPage === 'letters' ? 'moods' : currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'birthday' && <BirthdayPage />}

      {currentPage === 'moods' && isMoodPageUnlocked && (
        <MoodPage onMoodSelect={handleMoodSelect} />
      )}

      {currentPage === 'letters' && selectedMood && (
        <LettersPage
          mood={selectedMood}
          moodGradient={selectedMoodGradient}
          onBack={handleBackToMoods}
        />
      )}
    </>
  );
}
