import React, { useState, useEffect } from 'react';
import { Play, Clock, Star, CheckCircle, ArrowRight, Heart, Info } from 'lucide-react';

const poses = [
  {
    name: "Child's Pose",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=400",
    description: "Kneel and sit back on your heels, stretching arms forward.",
    duration: "Hold for 5 breaths",
    difficulty: "Beginner",
    benefits: ["Relaxes the spine", "Calms the mind", "Stretches hips and thighs"],
    instructions: [
      "Kneel on the floor with toes together",
      "Sit back on your heels",
      "Stretch arms forward on the mat",
      "Rest forehead on the ground",
      "Breathe deeply and relax"
    ]
  },
  {
    name: "Cat-Cow Stretch",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=400",
    description: "Alternate between arching and rounding your back.",
    duration: "8 slow rounds",
    difficulty: "Beginner",
    benefits: ["Improves posture", "Increases spine flexibility", "Strengthens core"],
    instructions: [
      "Start on hands and knees",
      "Inhale: Drop belly, lift chest (Cow)",
      "Exhale: Round spine, tuck chin (Cat)",
      "Move smoothly between poses",
      "Coordinate breath with movement"
    ]
  },
  {
    name: "Downward Dog",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=400",
    description: "Form an inverted V-shape with your body.",
    duration: "Hold for 5 breaths",
    difficulty: "Beginner",
    benefits: ["Stretches whole body", "Strengthens arms", "Energizes mind"],
    instructions: [
      "Start on hands and knees",
      "Lift hips toward ceiling",
      "Straighten legs (keep slight bend)",
      "Press chest toward thighs",
      "Keep head between arms"
    ]
  }
];

function DailyYoga() {
  const [currentPose, setCurrentPose] = useState(0);
  const [completedPoses, setCompletedPoses] = useState<number[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('completedPoses');
    if (stored) {
      setCompletedPoses(JSON.parse(stored));
    }
  }, []);

  const handleComplete = (index: number) => {
    const newCompleted = completedPoses.includes(index)
      ? completedPoses.filter(i => i !== index)
      : [...completedPoses, index];
    
    setCompletedPoses(newCompleted);
    localStorage.setItem('completedPoses', JSON.stringify(newCompleted));
  };

  const nextPose = () => {
    setCurrentPose((prev) => (prev + 1) % poses.length);
    setShowInstructions(false);
  };

  return (
    <div className="space-y-8">
      {/* Current Pose */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Daily Yoga Flow</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>15 min total</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={poses[currentPose].image}
              alt={poses[currentPose].name}
              className="w-full h-64 object-cover"
            />
            {completedPoses.includes(currentPose) && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{poses[currentPose].name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">{poses[currentPose].difficulty}</span>
              </div>
            </div>

            <p className="text-gray-600">{poses[currentPose].description}</p>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">Benefits:</p>
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="flex items-center gap-1 text-sm text-purple-500 hover:text-purple-600"
                >
                  <Info className="w-4 h-4" />
                  {showInstructions ? 'Show Benefits' : 'Show Instructions'}
                </button>
              </div>
              {showInstructions ? (
                <ol className="list-decimal list-inside space-y-1">
                  {poses[currentPose].instructions.map((instruction, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {instruction}
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="space-y-1">
                  {poses[currentPose].benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleComplete(currentPose)}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  completedPoses.includes(currentPose)
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                {completedPoses.includes(currentPose) ? 'Completed!' : 'Complete Pose'}
              </button>
              <button
                onClick={nextPose}
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {poses.map((pose, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border-2 transition-colors ${
              completedPoses.includes(index)
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{pose.name}</span>
              {completedPoses.includes(index) && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{pose.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyYoga;