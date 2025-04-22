import React, { useState, useEffect } from 'react';
import { Apple, ArrowRight, Salad, Coffee, Droplets, Star, CheckCircle } from 'lucide-react';

interface Tip {
  id: number;
  title: string;
  message: string;
  category: 'snack' | 'hydration' | 'nutrition';
  icon: typeof Apple | typeof Droplets | typeof Salad;
  color: string;
}

const tips: Tip[] = [
  {
    id: 1,
    title: "Smart Snacking",
    message: "Try apple slices with peanut butter instead of chips. It's crunchy, sweet, and full of energy!",
    category: 'snack',
    icon: Apple,
    color: 'from-red-400 to-red-500'
  },
  {
    id: 2,
    title: "Hydration Helper",
    message: "Add a slice of lemon, cucumber, or mint to your water for a refreshing twist!",
    category: 'hydration',
    icon: Droplets,
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 3,
    title: "Rainbow Power",
    message: "Eat colorful vegetables to get different vitamins and minerals. Each color has unique benefits!",
    category: 'nutrition',
    icon: Salad,
    color: 'from-green-400 to-green-500'
  },
  {
    id: 4,
    title: "Energy Boost",
    message: "Choose whole grain snacks like popcorn or crackers for lasting energy throughout the day.",
    category: 'snack',
    icon: Apple,
    color: 'from-amber-400 to-amber-500'
  },
  {
    id: 5,
    title: "Smoothie Magic",
    message: "Blend fruits with yogurt and a handful of spinach for a nutrient-packed treat!",
    category: 'nutrition',
    icon: Salad,
    color: 'from-purple-400 to-purple-500'
  }
];

function HealthyTips() {
  const [currentTip, setCurrentTip] = useState(0);
  const [savedTips, setSavedTips] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedHealthyTips');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const toggleSaveTip = (id: number) => {
    const newSavedTips = savedTips.includes(id)
      ? savedTips.filter(tipId => tipId !== id)
      : [...savedTips, id];
    
    setSavedTips(newSavedTips);
    localStorage.setItem('savedHealthyTips', JSON.stringify(newSavedTips));
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="space-y-8">
      {/* Featured Tip */}
      <div className={`bg-gradient-to-br ${tips[currentTip].color} rounded-3xl p-8 text-white shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              {React.createElement(tips[currentTip].icon, { className: "w-6 h-6" })}
            </div>
            <h2 className="text-2xl font-bold">Healthy Tip of the Day</h2>
          </div>
          <button
            onClick={() => toggleSaveTip(tips[currentTip].id)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <Star className={`w-6 h-6 ${
              savedTips.includes(tips[currentTip].id) ? 'fill-white' : ''
            }`} />
          </button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">{tips[currentTip].title}</h3>
          <p className="text-xl opacity-90">{tips[currentTip].message}</p>
          <button
            onClick={nextTip}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            Next Tip
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Saved Tips */}
      {savedTips.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Saved Tips</h3>
          <div className="space-y-4">
            {tips
              .filter(tip => savedTips.includes(tip.id))
              .map(tip => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 group"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${tip.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{tip.title}</h4>
                      <p className="text-gray-600 text-sm">{tip.message}</p>
                    </div>
                    <button
                      onClick={() => toggleSaveTip(tip.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Quick Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Apple className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-900">Smart Snacks</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Fresh fruits with yogurt
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Mixed nuts and dried fruits
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Whole grain crackers with hummus
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-900">Stay Hydrated</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Drink water before meals
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Infuse water with fruits
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Set hydration reminders
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Salad className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-900">Nutrition Swaps</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Greek yogurt instead of sour cream
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Zucchini noodles for pasta
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Avocado instead of mayo
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HealthyTips;