import React, { useState } from 'react';
import { Play, Clock, Star, CheckCircle, Video, Palette, PenTool, BookOpen, Filter } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Adobe Fresco Basics',
    description: 'Learn the fundamentals of digital art with Adobe Fresco',
    duration: '20 min',
    difficulty: 'Beginner',
    completed: false,
    icon: Palette,
    platform: 'Adobe Fresco',
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/embed/GNE4YxqKscg'
  },
  {
    id: 2,
    title: 'Digital Illustration',
    description: 'Create your first digital illustration from sketch to final',
    duration: '30 min',
    difficulty: 'Intermediate',
    completed: false,
    icon: PenTool,
    platform: 'Adobe Illustrator',
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/embed/3yQ8-3xZ4xY'
  },
  {
    id: 3,
    title: 'Photo Editing Magic',
    description: 'Learn basic photo editing and enhancement techniques',
    duration: '25 min',
    difficulty: 'Beginner',
    completed: false,
    icon: Video,
    platform: 'Adobe Photoshop',
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/embed/jYbJdZ2zbDg'
  },
  {
    id: 4,
    title: 'Adobe Illustrator for Beginners',
    description: 'Master the essentials of vector graphics and logo design',
    duration: '2h 30min',
    difficulty: 'Beginner',
    completed: false,
    icon: PenTool,
    platform: 'Adobe Illustrator',
    type: 'Udemy',
    videoUrl: 'https://www.udemy.com/course/adobe-illustrator-course/'
  },
  {
    id: 5,
    title: 'Photoshop CC Essentials',
    description: 'Complete guide to photo editing and digital art',
    duration: '4h 15min',
    difficulty: 'Intermediate',
    completed: false,
    icon: Video,
    platform: 'Adobe Photoshop',
    type: 'Udemy',
    videoUrl: 'https://www.udemy.com/course/photoshop-cc-essentials-training-course/'
  },
  {
    id: 6,
    title: 'Drawing in Adobe Fresco',
    description: 'Digital painting and drawing techniques',
    duration: '3h 45min',
    difficulty: 'Intermediate',
    completed: false,
    icon: Palette,
    platform: 'Adobe Fresco',
    type: 'Udemy',
    videoUrl: 'https://www.udemy.com/course/drawing-and-painting-in-adobe-fresco/'
  }
];

function DesignTutorials() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filteredTutorials = tutorials
    .filter(tutorial => filter === 'all' || tutorial.type === filter)
    .sort((a, b) => {
      if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      if (sortBy === 'duration') {
        return parseInt(a.duration) - parseInt(b.duration);
      }
      return a.id - b.id;
    });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Platforms</option>
          <option value="YouTube">YouTube</option>
          <option value="Udemy">Udemy</option>
        </select>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="default">Sort by: Default</option>
          <option value="difficulty">Sort by: Difficulty</option>
          <option value="duration">Sort by: Duration</option>
        </select>
      </div>

      {/* Tutorials Grid */}
      <div className="space-y-6">
        {filteredTutorials.map((tutorial) => {
          const Icon = tutorial.icon;
          return (
            <div
              key={tutorial.id}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{tutorial.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tutorial.type === 'Udemy' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {tutorial.type}
                        </span>
                      </div>
                      <p className="text-gray-600">{tutorial.description}</p>
                      <p className="text-sm text-purple-500 mt-1">{tutorial.platform}</p>
                    </div>
                    {tutorial.completed && (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4" />
                      <span>{tutorial.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{tutorial.type}</span>
                    </div>
                  </div>

                  <a
                    href={tutorial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Tutorial
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DesignTutorials;