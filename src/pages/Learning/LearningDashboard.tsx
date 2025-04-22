import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Keyboard, Book, Star, Trophy, Brain } from 'lucide-react';

const modules = [
  { 
    path: '/language',
    icon: Globe,
    label: 'Language Lab',
    color: 'from-green-400 to-green-500',
    description: 'Explore new words and cultures 🌍',
    featured: true
  },
  { 
    path: '/typing',
    icon: Keyboard,
    label: 'Typing Quest',
    color: 'from-pink-400 to-pink-500',
    description: 'Master the keyboard ⌨️'
  },
  { 
    path: '/library',
    icon: Book,
    label: 'Library',
    color: 'from-amber-400 to-amber-500',
    description: 'Discover amazing stories 📚'
  }
];

function LearningDashboard() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Learning Hub 📚
        </h1>
        <p className="mt-4 text-xl text-emerald-700">Discover, learn, and grow every day!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Module */}
        <div className="md:col-span-2">
          <Link
            to="/language"
            className="block bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1950&q=80')] opacity-10 group-hover:scale-105 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-10 h-10 text-yellow-300 animate-spin-slow" />
                <h2 className="text-3xl font-bold">Featured: Language Lab</h2>
              </div>
              <p className="text-xl mb-6">Start your language learning journey today!</p>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm group-hover:gap-4 transition-all">
                Begin Learning
                <Brain className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* Module Cards */}
        {modules.filter(m => !m.featured).map(({ path, icon: Icon, label, color, description }) => (
          <Link
            key={path}
            to={path}
            className="block bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className={`inline-block p-3 rounded-2xl bg-gradient-to-br ${color} text-white mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{label}</h3>
            <p className="text-gray-600">{description}</p>
          </Link>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Spanish Words</span>
              <span className="text-sm font-medium text-green-600">24/50</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '48%' }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Typing Speed</span>
              <span className="text-sm font-medium text-pink-600">35 WPM</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Books Read</span>
              <span className="text-sm font-medium text-amber-600">3/5</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">250</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Skills Mastered</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <Globe className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Languages</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningDashboard;