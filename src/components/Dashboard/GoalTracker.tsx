import React, { useState } from 'react';
import { Target, Calendar, Plus, X, CheckCircle, Clock, Star } from 'lucide-react';

interface Goal {
  id: string;
  text: string;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly';
  completed: boolean;
}

function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const stored = localStorage.getItem('goals');
    return stored ? JSON.parse(stored) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ text: '', timeframe: 'daily' });
  const [activeTimeframe, setActiveTimeframe] = useState<Goal['timeframe']>('daily');

  const handleAddGoal = () => {
    if (!newGoal.text.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      text: newGoal.text,
      timeframe: newGoal.timeframe as Goal['timeframe'],
      completed: false
    };

    setGoals([...goals, goal]);
    setNewGoal({ text: '', timeframe: 'daily' });
    setIsAdding(false);
    localStorage.setItem('goals', JSON.stringify([...goals, goal]));
  };

  const toggleGoal = (id: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const filteredGoals = goals.filter(goal => goal.timeframe === activeTimeframe);

  const timeframes: { value: Goal['timeframe']; label: string; icon: typeof Clock }[] = [
    { value: 'daily', label: 'Today', icon: Clock },
    { value: 'weekly', label: 'This Week', icon: Calendar },
    { value: 'monthly', label: 'This Month', icon: Star },
    { value: 'yearly', label: 'This Year', icon: Target }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-semibold text-gray-900">Goal Tracker</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="text-sm px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {/* Timeframe Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {timeframes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setActiveTimeframe(value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTimeframe === value
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Add Goal Form */}
      {isAdding && (
        <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={newGoal.text}
                onChange={(e) => setNewGoal({ ...newGoal, text: e.target.value })}
                placeholder="Enter your goal..."
                className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
              />
              <select
                value={newGoal.timeframe}
                onChange={(e) => setNewGoal({ ...newGoal, timeframe: e.target.value as Goal['timeframe'] })}
                className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="daily">Daily Goal</option>
                <option value="weekly">Weekly Goal</option>
                <option value="monthly">Monthly Goal</option>
                <option value="yearly">Yearly Goal</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddGoal}
                className="px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-2">
        {filteredGoals.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No goals set for this timeframe yet.</p>
        ) : (
          filteredGoals.map(goal => (
            <div
              key={goal.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    goal.completed
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300 hover:border-emerald-500'
                  }`}
                >
                  {goal.completed && <CheckCircle className="w-4 h-4 text-white" />}
                </button>
                <span className={goal.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
                  {goal.text}
                </span>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GoalTracker;