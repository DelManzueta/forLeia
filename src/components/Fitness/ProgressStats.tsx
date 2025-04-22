import React from 'react';
import { Droplets, Brain, Dumbbell } from 'lucide-react';

interface ProgressStatsProps {
  waterIntake: number;
  onWaterIntakeChange: (value: number) => void;
}

function ProgressStats({ waterIntake, onWaterIntakeChange }: ProgressStatsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Today's Progress</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span>Water Intake</span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <button
                key={i}
                onClick={() => onWaterIntakeChange(i + 1)}
                className={`w-4 h-4 rounded-full transition-colors ${
                  i < waterIntake ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span>Mindfulness</span>
          </div>
          <span className="text-green-500">10 min completed</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-red-500" />
            <span>Exercise</span>
          </div>
          <span className="text-yellow-500">15/30 min</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressStats;