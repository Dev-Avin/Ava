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

  // Set your birthday here (month is 0-indexed, so Jan = 0)
  const birthday = new Date(2026, 0, 17); // Example: Jan 20, 2026
  const today = new Date();

  const isBirthdayPassed = today >= birthday;

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
    if (page === 'moods' && !isBirthdayPassed) {
      alert("🎉 The Moods page unlocks on your birthday!");
      return; // Don't navigate
    }
    setCurrentPage(page);
    if (page === 'birthday') {
      setSelectedMood(null);
    }
  };

  return (
    <>
      <Navigation currentPage={currentPage === 'letters' ? 'moods' : currentPage} onNavigate={handleNavigate} />

      {currentPage === 'birthday' && <BirthdayPage />}
      
      {currentPage === 'moods' && (
        isBirthdayPassed
          ? <MoodPage onMoodSelect={handleMoodSelect} />
          : (
            <div className="flex items-center justify-center h-screen text-center px-4">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-red-500">
                  🎁 Moods Page Locked!
                </h2>
                <p className="text-gray-700 text-lg">
                  The moods and letters will unlock on your birthday ({birthday.toDateString()}). 
                  Stay excited! 🎉
                </p>
              </div>
            </div>
          )
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
