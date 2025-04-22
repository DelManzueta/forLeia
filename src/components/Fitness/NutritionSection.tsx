import React, { useState } from 'react';
import { Apple, Salad, ArrowRight, CheckCircle, Plus, RefreshCw, Trash2, Sparkles } from 'lucide-react';
import FruitNutrition from './FruitNutrition';

interface MealIdea {
  type: string;
  icon: typeof Apple | typeof Salad;
  ideas: string[];
  tips: string[];
}

const meals: MealIdea[] = [
  {
    type: "Breakfast",
    icon: Apple,
    ideas: ["Oatmeal with berries", "Scrambled eggs & toast", "Yogurt parfait"],
    tips: ["Add nuts for protein", "Choose whole grain bread", "Use fresh fruit"]
  },
  {
    type: "Lunch",
    icon: Salad,
    ideas: ["Turkey & avocado wrap", "Rainbow pasta salad", "Veggie rice bowl"],
    tips: ["Pack colorful veggies", "Include protein", "Add a fun treat"]
  }
];

const foodGroups = [
  {
    name: "Fruits & Veggies",
    color: "from-green-400 to-emerald-500",
    items: ["Apples", "Carrots", "Berries", "Broccoli"]
  },
  {
    name: "Proteins",
    color: "from-red-400 to-rose-500",
    items: ["Chicken", "Beans", "Fish", "Eggs"]
  },
  {
    name: "Grains",
    color: "from-amber-400 to-yellow-500",
    items: ["Brown rice", "Whole wheat bread", "Oats", "Quinoa"]
  },
  {
    name: "Dairy",
    color: "from-blue-400 to-sky-500",
    items: ["Milk", "Yogurt", "Cheese", "Cottage cheese"]
  }
];

const lunchboxItems = [
  { category: "Main", items: ["Sandwich", "Wrap", "Pasta", "Rice bowl"] },
  { category: "Fruit", items: ["Apple", "Banana", "Berries", "Orange"] },
  { category: "Veggie", items: ["Carrots", "Cucumber", "Cherry tomatoes", "Bell peppers"] },
  { category: "Snack", items: ["Crackers", "Granola bar", "Trail mix", "Popcorn"] },
  { category: "Drink", items: ["Water", "Milk", "Juice box", "Smoothie"] }
];

function NutritionSection() {
  const [lunchbox, setLunchbox] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const addToLunchbox = (item: string) => {
    if (lunchbox.length < 5 && !lunchbox.includes(item)) {
      setLunchbox([...lunchbox, item]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Fruit Nutrition Explorer */}
      <FruitNutrition />

      {/* Meal Ideas */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Meal Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map((meal) => (
            <div key={meal.type} className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-xl">
                  <meal.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{meal.type}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Try These:</h4>
                  <ul className="space-y-2">
                    {meal.ideas.map((idea, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Helpful Tips:</h4>
                  <ul className="space-y-2">
                    {meal.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Food Groups */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Food Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {foodGroups.map((group) => (
            <div
              key={group.name}
              className={`bg-gradient-to-br ${group.color} rounded-3xl p-6 text-white`}
            >
              <h3 className="text-xl font-bold mb-4">{group.name}</h3>
              <ul className="space-y-2">
                {group.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Lunchbox Builder */}
      <section className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Build Your Lunchbox</h2>
          {lunchbox.length > 0 && (
            <button
              onClick={() => setLunchbox([])}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item Selection */}
          <div className="space-y-4">
            {lunchboxItems.map((category) => (
              <div key={category.category}>
                <h3 className="font-medium text-gray-700 mb-2">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => addToLunchbox(item)}
                      disabled={lunchbox.includes(item)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        lunchbox.includes(item)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Plus className="w-4 h-4" />
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lunchbox Preview */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Your Lunchbox</h3>
              <span className="text-sm text-gray-500">{lunchbox.length}/5 items</span>
            </div>
            {lunchbox.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Add some items to your lunchbox!</p>
            ) : (
              <ul className="space-y-2">
                {lunchbox.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 bg-white rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </span>
                    <button
                      onClick={() => setLunchbox(lunchbox.filter((_, i) => i !== idx))}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {showSuccess && (
              <div className="mt-4 text-center text-green-600 font-medium">
                Added to your lunchbox! ✨
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NutritionSection;