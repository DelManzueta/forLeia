import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Brain, Salad } from 'lucide-react';
import DailyYoga from '../../components/Fitness/DailyYoga';
import HealthyEating from '../../components/Fitness/HealthyEating';
import WellnessTips from '../../components/Fitness/WellnessTips';
import DailyAffirmations from '../../components/Fitness/DailyAffirmations';
import ProgressStats from '../../components/Fitness/ProgressStats';
import NutritionSection from '../../components/Fitness/NutritionSection';

// Data imports from the existing file
import { dailyYogaPoses, healthyMealIdeas, dailyAffirmations, wellnessTips } from './data';

function MindfulnessSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Mindfulness Practice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Daily Meditation</h3>
          </div>
          <p className="text-gray-600 mb-4">Take a moment to breathe and center yourself.</p>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            Start 5-min Session
          </button>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Gratitude Journal</h3>
          </div>
          <p className="text-gray-600 mb-4">Write down three things you're grateful for today.</p>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            Open Journal
          </button>
        </div>
      </div>
    </div>
  );
}

function Fitness() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [poses, setPoses] = useState(dailyYogaPoses);

  // Get tab from URL or default to 'yoga'
  const tab = new URLSearchParams(location.search).get('tab') || 'yoga';

  const handleTabChange = (newTab: string) => {
    navigate(`/fitness${newTab === 'yoga' ? '' : `?tab=${newTab}`}`);
  };

  const handlePoseComplete = (index: number) => {
    setPoses(poses.map((pose, i) => 
      i === index ? { ...pose, completed: !pose.completed } : pose
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Two Rows */}
        <div className="md:col-span-1 space-y-6">
          {/* Welcome Card */}
          <div className="bg-gradient-to-br from-red-400 to-orange-400 rounded-3xl p-6 shadow-lg text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Wellness Journey</h1>
              <p className="mt-2 text-white/90">Your daily path to health and happiness 💪</p>
            </div>
          </div>

          {/* Progress Stats */}
          <ProgressStats 
            waterIntake={waterIntake} 
            onWaterIntakeChange={setWaterIntake} 
          />
        </div>

        {/* Right Column - Daily Affirmation */}
        <div className="md:col-span-2">
          <DailyAffirmations
            affirmations={dailyAffirmations}
            currentIndex={currentAffirmation}
            onNext={() => setCurrentAffirmation((prev) => (prev + 1) % dailyAffirmations.length)}
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
        {[
          { id: 'yoga', label: 'Daily Yoga', icon: Heart },
          { id: 'nutrition', label: 'Nutrition', icon: Salad },
          { id: 'mindfulness', label: 'Mindfulness', icon: Brain }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              tab === id
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tab === 'yoga' && (
          <DailyYoga />
        )}
        {tab === 'nutrition' && (
          <NutritionSection />
        )}
        {tab === 'mindfulness' && (
          <MindfulnessSection />
        )}
      </div>
    </div>
  );
}

export default Fitness;