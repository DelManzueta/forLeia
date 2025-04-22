import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, Code, Globe, Pencil, Music, Coins, Keyboard, Book, 
  Mail, CheckSquare, Heart, Star, Trophy, Sparkles, ArrowRight,
  Clock, BookOpen, Timer, Target, Brain
} from 'lucide-react';
import GoalTracker from '../../components/Dashboard/GoalTracker';
import PhraseOfTheDay from '../../components/LanguageLab/PhraseOfTheDay';
import EnglishWordOfDay from '../../components/LanguageLab/EnglishWordOfDay';

const modules = [
  { 
    path: '/art-studio',
    icon: Palette,
    label: 'Art Studio',
    color: 'from-rose-400 to-rose-500',
    description: 'Paint your dreams in colors! 🎨',
    span: 'col-span-1'
  },
  { 
    path: '/coding',
    icon: Code,
    label: 'Coding',
    color: 'from-blue-400 to-blue-500',
    description: 'Create digital magic ✨',
    span: 'col-span-1'
  },
  { 
    path: '/language',
    icon: Globe,
    label: 'Language',
    color: 'from-green-400 to-green-500',
    description: 'Explore new words 🌍',
    span: 'col-span-1 md:col-span-2'
  },
  { 
    path: '/design',
    icon: Pencil,
    label: 'Design',
    color: 'from-purple-400 to-purple-500',
    description: 'Design amazing things 🎯',
    span: 'col-span-2 md:col-span-1'
  },
  { 
    path: '/music',
    icon: Music,
    label: 'Beat Lab',
    color: 'from-yellow-400 to-yellow-500',
    description: 'Make awesome music 🎵',
    span: 'col-span-1'
  },
  { 
    path: '/finance-fun',
    icon: Coins,
    label: 'CoinQuest',
    color: 'from-emerald-400 to-emerald-500',
    description: 'Earn rewards and learn! 💰',
    span: 'col-span-1'
  }
];

const recentActivities = [
  {
    id: 1,
    module: 'Language',
    activity: 'Flashcards',
    progress: '8/10 words learned',
    path: '/language?tab=flashcards',
    icon: BookOpen,
    color: 'from-green-400 to-green-500',
    timeAgo: '2 hours ago',
    reward: 5,
    completed: false,
    bgImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 2,
    module: 'Coding',
    activity: 'Quiz Challenge',
    progress: '2/3 challenges complete',
    path: '/coding?tab=challenges',
    icon: Code,
    color: 'from-blue-400 to-blue-500',
    timeAgo: '4 hours ago',
    reward: 3,
    completed: true,
    bgImage: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 3,
    module: 'Art Studio',
    activity: 'Daily Drawing',
    progress: 'In progress',
    path: '/art-studio?tab=canvas',
    icon: Palette,
    color: 'from-rose-400 to-rose-500',
    timeAgo: 'Yesterday',
    reward: 4,
    completed: false,
    bgImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1950&q=80'
  }
];

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header Grid */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Welcome and Stats */}
          <div className="space-y-6 p-8">
            {/* Welcome Section */}
            <header className="text-center p-8 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-3xl">
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Sparkles className="w-8 h-8 text-emerald-500 animate-bounce" />
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                    Welcome back, Leia!
                  </h1>
                </div>
                <p className="text-xl text-emerald-700 animate-pulse">Ready for today's creative adventure?</p>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-emerald-700">Daily Streak</span>
                </div>
                <p className="text-2xl font-bold text-emerald-800">7 Days</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-emerald-700">Goals Met</span>
                </div>
                <p className="text-2xl font-bold text-emerald-800">12/15</p>
              </div>
            </div>

            {/* Progress Trackers */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-600">Learning Progress</span>
                  </div>
                  <span className="text-purple-600 font-medium">85%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-gray-600">Stars Earned</span>
                  </div>
                  <span className="text-amber-600 font-medium">42/50</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-600">Weekly Goals</span>
                  </div>
                  <span className="text-emerald-600 font-medium">8/10</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Word of the Day */}
          <div className="border-l border-gray-100 p-8 space-y-6">
            <PhraseOfTheDay />
            <EnglishWordOfDay />
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <section className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-500 animate-spin-slow" />
            <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
          </div>
          <Timer className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex flex-col gap-4">
          {recentActivities.map((activity) => (
            <Link
              key={activity.id}
              to={activity.path}
              className="group relative block bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            >
              {/* Background Image Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundImage: `url(${activity.bgImage})` }}
              />

              <div className="relative flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.color} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{activity.module}</h3>
                    <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.activity}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-emerald-600">{activity.progress}</span>
                    <div className="flex items-center gap-2">
                      {activity.completed ? (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          <Trophy className="w-3 h-3" />
                          <span>{activity.reward} stars earned</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                          <Star className="w-3 h-3" />
                          <span>{activity.reward} stars pending</span>
                        </div>
                      )}
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Module Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[160px]">
        {modules.map(({ path, icon: Icon, label, color, description, span }) => (
          <Link
            key={path}
            to={path}
            data-module={path.replace('/', '')}
            className={`dashboard-link group relative h-full block bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${span}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300`} />
            <div className="relative h-full flex flex-col">
              <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${color} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="mt-auto">
                <h3 className="font-semibold text-gray-900 group-hover:translate-x-1 transition-transform duration-300">
                  {label}
                </h3>
                <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  {description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Dashboard;