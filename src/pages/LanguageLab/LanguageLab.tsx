import React, { useState } from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import FlashcardDeck from '../../components/LanguageLab/FlashcardDeck';
import WordChallenges from '../../components/LanguageLab/WordChallenges';
import ProgressTracker from '../../components/LanguageLab/ProgressTracker';
import PhraseOfTheDay from '../../components/LanguageLab/PhraseOfTheDay';
import DuolingoProgress from '../../components/LanguageLab/DuolingoProgress';

const tabs = [
  { id: 'duolingo', label: 'Duolingo Practice' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'challenges', label: 'Word Challenges' },
  { id: 'progress', label: 'My Progress' }
];

function LanguageLab() {
  const [activeTab, setActiveTab] = useState('duolingo');

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-green-600">Language Lab</h1>
        <p className="mt-2 text-green-600/80">¡Vamos a aprender español! 🌍</p>
      </header>

      {/* Phrase of the Day Banner */}
      <PhraseOfTheDay />

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'duolingo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="text-center space-y-4">
                <Globe className="w-12 h-12 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-gray-900">Continue Your Spanish Journey!</h2>
                <p className="text-gray-600">Practice your Spanish skills with fun, interactive lessons.</p>
                <a
                  href="https://www.duolingo.com/learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  Open Duolingo
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <DuolingoProgress />
          </div>
        )}

        {activeTab === 'flashcards' && <FlashcardDeck />}
        {activeTab === 'challenges' && <WordChallenges />}
        {activeTab === 'progress' && <ProgressTracker />}
      </div>
    </div>
  );
}

export default LanguageLab;