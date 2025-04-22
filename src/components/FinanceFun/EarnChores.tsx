import React, { useState, useEffect } from 'react';
import { Star, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

interface Chore {
  id: string;
  title: string;
  description?: string;
  coins: number;
  completed: boolean;
  category: 'daily' | 'weekly';
}

interface EarnChoresProps {
  onEarn: (amount: number) => void;
}

function EarnChores({ onEarn }: EarnChoresProps) {
  const [chores, setChores] = useState<Chore[]>(() => {
    const saved = localStorage.getItem('chores');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', 
        title: 'Make Bed & Tidy Bedroom', 
        description: 'Make your bed and put away toys/clothes',
        coins: 2, 
        completed: false, 
        category: 'daily'
      },
      { 
        id: '2', 
        title: 'Feed Pet', 
        description: 'Feed pets and refill water bowl',
        coins: 1, 
        completed: false, 
        category: 'daily'
      },
      { 
        id: '3', 
        title: 'Set the Table', 
        description: 'Set out plates, utensils, and cups',
        coins: 1, 
        completed: false, 
        category: 'daily'
      },
      { 
        id: '4', 
        title: 'Clear Table & Help with Dishes', 
        description: 'Clear dishes and help load/wash them',
        coins: 1, 
        completed: false, 
        category: 'daily'
      },
      { 
        id: '5', 
        title: 'Tidy Living Room', 
        description: 'Put away toys, books, and clutter',
        coins: 1, 
        completed: false, 
        category: 'daily'
      },
      { 
        id: '6', 
        title: 'Water Indoor Plants', 
        description: 'Check and water plants as needed',
        coins: 1, 
        completed: false, 
        category: 'daily'
      },
      { 
        id: '7', 
        title: 'Vacuum/Sweep Floors', 
        description: 'Vacuum or sweep bedroom and living areas',
        coins: 2, 
        completed: false, 
        category: 'weekly'
      },
      { 
        id: '8', 
        title: 'Dust Furniture', 
        description: 'Dust shelves, tables, and surfaces',
        coins: 2, 
        completed: false, 
        category: 'weekly'
      },
      { 
        id: '9', 
        title: 'Take Out Trash & Recycling', 
        description: 'Collect and take bins to curb',
        coins: 2, 
        completed: false, 
        category: 'weekly'
      },
      { 
        id: '10', 
        title: 'Laundry Helper', 
        description: 'Help fold and put away clean clothes',
        coins: 2, 
        completed: false, 
        category: 'weekly'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(chores));
  }, [chores]);

  const completeChore = (id: string) => {
    setChores(prevChores => {
      const newChores = prevChores.map(chore =>
        chore.id === id ? { ...chore, completed: true } : chore
      );
      localStorage.setItem('chores', JSON.stringify(newChores));
      return newChores;
    });

    const chore = chores.find(c => c.id === id);
    if (chore && !chore.completed) {
      onEarn(chore.coins);
    }
  };

  const resetDailyChores = () => {
    setChores(prevChores => {
      const newChores = prevChores.map(chore =>
        chore.category === 'daily' ? { ...chore, completed: false } : chore
      );
      localStorage.setItem('chores', JSON.stringify(newChores));
      return newChores;
    });
  };

  const resetWeeklyChores = () => {
    setChores(prevChores => {
      const newChores = prevChores.map(chore =>
        chore.category === 'weekly' ? { ...chore, completed: false } : chore
      );
      localStorage.setItem('chores', JSON.stringify(newChores));
      return newChores;
    });
  };

  return (
    <div className="space-y-8">
      {/* Daily Tasks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-900">Daily Tasks</h2>
          </div>
          <button
            onClick={resetDailyChores}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Reset Daily Tasks
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chores
            .filter(chore => chore.category === 'daily')
            .map(chore => (
              <div
                key={chore.id}
                className={`group relative overflow-hidden rounded-2xl p-4 transition-all ${
                  chore.completed
                    ? 'bg-emerald-50'
                    : 'bg-white hover:shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => completeChore(chore.id)}
                    disabled={chore.completed}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      chore.completed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-100 text-emerald-500 hover:bg-emerald-200'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      chore.completed ? 'text-emerald-600' : 'text-gray-900'
                    }`}>
                      {chore.title}
                    </h3>
                    <p className="text-sm text-gray-500">{chore.description}</p>
                    <div className="flex items-center gap-1 text-sm mt-1">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className={chore.completed ? 'text-emerald-600' : 'text-amber-600'}>
                        {chore.coins} stars
                      </span>
                    </div>
                  </div>
                  {!chore.completed && (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Weekly Goals */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">Weekly Goals</h2>
          </div>
          <button
            onClick={resetWeeklyChores}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            Reset Weekly Tasks
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chores
            .filter(chore => chore.category === 'weekly')
            .map(chore => (
              <div
                key={chore.id}
                className={`group relative overflow-hidden rounded-2xl p-4 transition-all ${
                  chore.completed
                    ? 'bg-purple-50'
                    : 'bg-white hover:shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => completeChore(chore.id)}
                    disabled={chore.completed}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      chore.completed
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-100 text-purple-500 hover:bg-purple-200'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      chore.completed ? 'text-purple-600' : 'text-gray-900'
                    }`}>
                      {chore.title}
                    </h3>
                    <p className="text-sm text-gray-500">{chore.description}</p>
                    <div className="flex items-center gap-1 text-sm mt-1">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className={chore.completed ? 'text-purple-600' : 'text-amber-600'}>
                        {chore.coins} stars
                      </span>
                    </div>
                  </div>
                  {!chore.completed && (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default EarnChores;