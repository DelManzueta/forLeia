import React from 'react';
import { Apple, Salad } from 'lucide-react';

interface MealIdea {
  meal: string;
  suggestion: string;
  image: string;
  tips: string[];
}

interface HealthyEatingProps {
  meals: MealIdea[];
}

function HealthyEating({ meals }: HealthyEatingProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Healthy Meal Ideas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 shadow-lg group hover:shadow-xl transition-all">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src={meal.image}
                alt={meal.suggestion}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{meal.meal}</h3>
                <p className="text-red-500">{meal.suggestion}</p>
              </div>
              <ul className="space-y-2">
                {meal.tips.map((tip, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Salad className="w-4 h-4 text-red-500" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthyEating;