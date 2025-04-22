import React, { useState } from 'react';
import { Code, Trophy, Star, Lock, CheckCircle } from 'lucide-react';

const levels = [
  {
    id: 0,
    title: "Getting Started",
    description: "Learn basic logic and sequences",
    projects: [
      { name: "Animate Your Name", completed: false },
      { name: "Simple Animation", completed: false }
    ],
    unlocked: true
  },
  {
    id: 1,
    title: "Your First Games",
    description: "Create simple games with events and loops",
    projects: [
      { name: "Pong Game", completed: false },
      { name: "Quiz Game", completed: false }
    ],
    unlocked: false
  },
  {
    id: 2,
    title: "Intermediate Challenges",
    description: "Build complex games with variables and scoring",
    projects: [
      { name: "Maze Game", completed: false },
      { name: "Frogger Clone", completed: false }
    ],
    unlocked: false
  },
  {
    id: 3,
    title: "Advanced Adventures",
    description: "Master functions and game states",
    projects: [
      { name: "Multi-level Quiz", completed: false },
      { name: "Interactive Story", completed: false }
    ],
    unlocked: false
  },
  {
    id: 4,
    title: "Creative Developer",
    description: "Build full applications",
    projects: [
      { name: "Chatbot App", completed: false },
      { name: "Interactive Animation", completed: false }
    ],
    unlocked: false
  }
];

const badges = [
  { id: 'rookie', name: 'Coding Rookie', description: 'Complete Level 0', icon: Star, earned: false },
  { id: 'gamemaker', name: 'Game Maker', description: 'Create your first game', icon: Trophy, earned: false },
  { id: 'logic', name: 'Logic Master', description: 'Complete 3 logic puzzles', icon: CheckCircle, earned: false }
];

function CodingPlayground() {
  const [activeTab, setActiveTab] = useState('ide');

  return (
    <div className="pt-20 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Coding Playground</h1>
        <p className="mt-2 text-blue-600/80">Let's create something amazing with code! 💻</p>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4">
        <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
          {['ide', 'path', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'ide' ? 'Coding Area' : tab === 'path' ? 'Learning Path' : 'Achievements'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {activeTab === 'ide' && (
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                <iframe
                  src="https://scratch.mit.edu/projects/editor/embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {activeTab === 'path' && (
            <div className="space-y-4">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className={`bg-white rounded-3xl p-6 shadow-lg ${
                    !level.unlocked && 'opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-blue-600 mb-2">
                        Level {level.id}: {level.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{level.description}</p>
                      <div className="space-y-2">
                        {level.projects.map((project, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-5 h-5 rounded-full border-2 border-blue-200" />
                            {project.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    {!level.unlocked && (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`bg-white rounded-3xl p-6 shadow-lg ${
                    !badge.earned && 'opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <badge.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodingPlayground;