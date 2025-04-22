import React from 'react';
import { Coffee, Timer, Moon, CheckCircle, Dumbbell, Salad } from 'lucide-react';

interface WellnessTip {
  icon: typeof Coffee | typeof Timer | typeof Moon;
  tip: string;
  benefit: string;
}

interface WellnessTipsProps {
  tips: WellnessTip[];
}

function WellnessTips({ tips }: WellnessTipsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Daily Wellness Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-lg group hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-xl group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{tip.tip}</h3>
              </div>
              <p className="text-gray-600 text-sm">{tip.benefit}</p>
            </div>
          );
        })}
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Wellness Goals</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-5 h-5 text-red-500" />
              <span>30 minutes of movement</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Salad className="w-5 h-5 text-red-500" />
              <span>Eat 5 servings of vegetables</span>
            </div>
            <CheckCircle className="w-5 h-5 text-gray-300" />
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-red-500" />
              <span>8 hours of sleep</span>
            </div>
            <CheckCircle className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WellnessTips;