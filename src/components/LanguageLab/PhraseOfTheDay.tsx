import React from 'react';
import { Volume2, Sparkles, Book } from 'lucide-react';
import { languageLabData } from '../../data/languageLabData';

function PhraseOfTheDay() {
  const { daily_word } = languageLabData;

  const playAudio = () => {
    const audio = new Audio(`/audio/${daily_word.audio}`);
    audio.play().catch(error => console.error('Error playing audio:', error));
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6" />
        <h2 className="text-xl font-bold">Palabra del Día</h2>
      </div>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold">{daily_word.word}</p>
        <p className="text-lg opacity-90">{daily_word.translation}</p>
        <p className="text-sm opacity-80 italic">{daily_word.example}</p>
        <button 
          onClick={playAudio}
          className="mt-2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default PhraseOfTheDay;