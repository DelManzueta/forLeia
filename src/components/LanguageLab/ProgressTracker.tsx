import React, { useState, useEffect } from 'react';
import { Trophy, Star, Calendar, BookOpen, Lock } from 'lucide-react';
import { getUserBadges, type Badge } from '../../utils/BadgeHandler';

interface BadgeWithStatus extends Badge {
  earned: boolean;
  earnedAt?: string;
}

function ProgressTracker() {
  const [badges, setBadges] = useState<BadgeWithStatus[]>([]);
  const [stats] = useState({
    wordsLearned: 127,
    daysPracticed: 15,
    challengesWon: 8,
    totalStars: 42
  });

  useEffect(() => {
    setBadges(getUserBadges());
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 mb-4">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.wordsLearned}</div>
          <div className="text-sm text-gray-600">Words Learned</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.daysPracticed}</div>
          <div className="text-sm text-gray-600">Days Practiced</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 mb-4">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.challengesWon}</div>
          <div className="text-sm text-gray-600">Challenges Won</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 mb-4">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalStars}</div>
          <div className="text-sm text-gray-600">Total Stars</div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">My Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`relative group rounded-2xl p-4 transition-all ${
                  badge.earned
                    ? `bg-gradient-to-br ${badge.color} text-white`
                    : 'bg-gray-100'
                }`}
              >
                {!badge.earned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center text-white p-4">
                      <Lock className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm">{badge.description}</p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-xl ${
                    badge.earned ? 'bg-white/20' : 'bg-gray-200'
                  } mb-3`}>
                    <Icon className={`w-6 h-6 ${
                      badge.earned ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  <h3 className={`font-semibold ${
                    badge.earned ? 'text-white' : 'text-gray-900'
                  }`}>
                    {badge.name}
                  </h3>
                  {badge.earned && (
                    <p className="text-sm text-white/80 mt-1">
                      Earned {new Date(badge.earnedAt || '').toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;