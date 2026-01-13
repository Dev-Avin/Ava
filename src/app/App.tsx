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

  const handleMoodSelect = (mood: string, gradient: string) => {
    setSelectedMood(mood as MoodType);
    setSelectedMoodGradient(gradient);
    setCurrentPage('letters');
  };

  const handleBackToMoods = () => {
    setCurrentPage('moods');
    setSelectedMood(null);
  };

  const handleNavigate = (page: 'birthday' | 'moods') => {
    setCurrentPage(page);
    if (page === 'birthday') {
      setSelectedMood(null);
    }
  };

  return (
    <>
      <Navigation currentPage={currentPage === 'letters' ? 'moods' : currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'birthday' && <BirthdayPage />}
      {currentPage === 'moods' && <MoodPage onMoodSelect={handleMoodSelect} />}
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