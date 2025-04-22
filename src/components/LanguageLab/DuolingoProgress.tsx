import React from 'react';
import { Trophy, Star, Calendar, BookOpen } from 'lucide-react';

// Temporary mock data
const mockData = {
  streak: 7,
  totalXp: 1250,
  knownWords: ['perro', 'gato', 'casa', 'agua', 'libro'],
  completedSkills: ['Basics 1', 'Greetings', 'Animals']
};

function DuolingoProgress() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockData.streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockData.totalXp}</div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockData.knownWords.length}</div>
            <div className="text-sm text-gray-600">Words Learned</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockData.completedSkills.length}</div>
            <div className="text-sm text-gray-600">Skills Mastered</div>
          </div>
        </div>
      </div>

      {/* Recent Words */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recently Learned Words</h3>
        <div className="flex flex-wrap gap-2">
          {mockData.knownWords.map((word) => (
            <span
              key={word}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Completed Skills */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Completed Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockData.completedSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
            >
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DuolingoProgress;