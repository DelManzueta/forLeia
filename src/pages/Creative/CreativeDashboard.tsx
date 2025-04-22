import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Code, Pencil, Music, Star, Sparkles } from 'lucide-react';

const modules = [
  { 
    path: '/art-studio',
    icon: Palette,
    label: 'Art Studio',
    color: 'from-rose-400 to-rose-500',
    description: 'Paint your dreams in colors! 🎨',
    featured: true
  },
  { 
    path: '/coding',
    icon: Code,
    label: 'Coding',
    color: 'from-blue-400 to-blue-500',
    description: 'Create digital magic ✨'
  },
  { 
    path: '/design',
    icon: Pencil,
    label: 'Design',
    color: 'from-purple-400 to-purple-500',
    description: 'Design amazing things 🎯'
  },
  { 
    path: '/music',
    icon: Music,
    label: 'Beat Lab',
    color: 'from-yellow-400 to-yellow-500',
    description: 'Make awesome music 🎵'
  }
];

function CreativeDashboard() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-rose-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
          Creative Studio ✨
        </h1>
        <p className="mt-4 text-xl text-purple-700">Unleash your creativity across different mediums!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Module */}
        <div className="md:col-span-2">
          <Link
            to="/art-studio"
            className="block bg-gradient-to-br from-rose-400 to-purple-500 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1950&q=80')] opacity-10 group-hover:scale-105 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-10 h-10 text-yellow-300 animate-spin-slow" />
                <h2 className="text-3xl font-bold">Featured: Art Studio</h2>
              </div>
              <p className="text-xl mb-6">Express yourself through colors, shapes, and digital art!</p>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm group-hover:gap-4 transition-all">
                Start Creating
                <Sparkles className="w-4 h-4" />
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Projects Created</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-600">5</div>
            <div className="text-sm text-gray-600">Skills Learned</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">8h</div>
            <div className="text-sm text-gray-600">Time Creating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreativeDashboard;