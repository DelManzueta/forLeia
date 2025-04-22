import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Code, Globe, Pencil, Music, Coins, Keyboard, Book, Mail, CheckSquare, Heart, Star } from 'lucide-react';

const modules = [
  { path: '/art-studio', icon: Palette, label: 'Art Studio', color: 'from-rose-400 to-rose-500', description: 'Paint your dreams in colors! 🎨' },
  { path: '/coding', icon: Code, label: 'Coding', color: 'from-blue-400 to-blue-500', description: 'Create digital magic ✨' },
  { path: '/language', icon: Globe, label: 'Language', color: 'from-green-400 to-green-500', description: 'Explore new words 🌍' },
  { path: '/design', icon: Pencil, label: 'Design', color: 'from-purple-400 to-purple-500', description: 'Design amazing things 🎯' },
  { path: '/music', icon: Music, label: 'Beat Lab', color: 'from-yellow-400 to-yellow-500', description: 'Make awesome music 🎵' },
  { path: '/finance', icon: Coins, label: 'Finance', color: 'from-emerald-400 to-emerald-500', description: 'Learn about money 💰' },
  { path: '/typing', icon: Keyboard, label: 'Typing', color: 'from-pink-400 to-pink-500', description: 'Type like a pro ⌨️' },
  { path: '/library', icon: Book, label: 'Library', color: 'from-amber-400 to-amber-500', description: 'Discover stories 📚' },
  { path: '/email', icon: Mail, label: 'Email', color: 'from-indigo-400 to-indigo-500', description: 'Send messages 📧' },
  { path: '/tasks', icon: CheckSquare, label: 'Tasks', color: 'from-teal-400 to-teal-500', description: 'Track your goals ✅' },
  { path: '/fitness', icon: Heart, label: 'Fitness', color: 'from-red-400 to-red-500', description: 'Stay active & healthy 💪' }
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
          Welcome back, Leia! ✨
        </h1>
        <p className="mt-4 text-xl text-teal-700">Ready for today's creative adventure?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Module */}
        <div className="md:col-span-2 lg:col-span-3">
          <Link
            to="/art-studio"
            className="block bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520052205864-92d242b3a76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-10 h-10 text-yellow-300" />
                <h2 className="text-3xl font-bold">Featured Adventure: Art Studio</h2>
              </div>
              <p className="text-xl mb-6">Unleash your creativity with today's special art challenge!</p>
              <span className="inline-block bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full text-sm">
                Start Your Creative Journey →
              </span>
            </div>
          </Link>
        </div>

        {/* Module Cards */}
        {modules.map(({ path, icon: Icon, label, color, description }) => (
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
    </div>
  );
}

export default Dashboard;