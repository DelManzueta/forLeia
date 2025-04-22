import React from 'react';
import { Sun, ArrowRight } from 'lucide-react';

interface DailyAffirmationsProps {
  affirmations: string[];
  currentIndex: number;
  onNext: () => void;
}

function DailyAffirmations({ affirmations, currentIndex, onNext }: DailyAffirmationsProps) {
  return (
    <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 shadow-lg h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <Sun className="w-8 h-8 text-white animate-spin-slow" />
          <h2 className="text-2xl font-bold text-white">Today's Affirmation</h2>
        </div>
        <p className="text-3xl font-bold text-white mb-8 leading-relaxed">
          {affirmations[currentIndex]}
        </p>
        <button 
          onClick={onNext}
          className="group px-6 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm text-white flex items-center gap-2"
        >
          Next Affirmation
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default DailyAffirmations;