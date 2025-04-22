import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Mail, Coins, Star, Calendar, Clock, ArrowRight } from 'lucide-react';

const modules = [
  { 
    path: '/tasks',
    icon: CheckSquare,
    label: 'Task Master',
    color: 'from-teal-400 to-teal-500',
    description: 'Organize your goals ✅',
    featured: true
  },
  { 
    path: '/email',
    icon: Mail,
    label: 'Email Explorer',
    color: 'from-indigo-400 to-indigo-500',
    description: 'Learn to communicate 📧'
  },
  { 
    path: '/finance',
    icon: Coins,
    label: 'Finance Fun',
    color: 'from-emerald-400 to-emerald-500',
    description: 'Learn about money 💰'
  }
];

const recentTasks = [
  {
    title: 'Complete Math Homework',
    due: '2025-04-20',
    priority: 'high',
    completed: false
  },
  {
    title: 'Read Chapter 3',
    due: '2025-04-18',
    priority: 'medium',
    completed: true
  },
  {
    title: 'Practice Piano',
    due: '2025-04-19',
    priority: 'low',
    completed: false
  }
];

function OrganizationDashboard() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
          Organization Central 📋
        </h1>
        <p className="mt-4 text-xl text-teal-700">Stay organized and on track!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Module */}
        <div className="md:col-span-2">
          <Link
            to="/tasks"
            className="block bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1950&q=80')] opacity-10 group-hover:scale-105 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-10 h-10 text-yellow-300 animate-spin-slow" />
                <h2 className="text-3xl font-bold">Featured: Task Master</h2>
              </div>
              <p className="text-xl mb-6">Organize your tasks and achieve your goals!</p>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm group-hover:gap-4 transition-all">
                Get Organized
                <CheckSquare className="w-4 h-4" />
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

      {/* Recent Tasks */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
          <Link
            to="/tasks"
            className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {recentTasks.map((task, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl ${
                task.completed ? 'bg-gray-50' : 'bg-teal-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high'
                    ? 'bg-red-500'
                    : task.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`} />
                <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(task.due).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <CheckSquare className="w-8 h-8 text-teal-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <Mail className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600">Emails Sent</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <Coins className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">150</div>
            <div className="text-sm text-gray-600">Coins Earned</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">85%</div>
            <div className="text-sm text-gray-600">On-Time Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDashboard;