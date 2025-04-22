import { Trophy, Star, Calendar, BookOpen, Brain } from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy | typeof Star | typeof Calendar | typeof BookOpen | typeof Brain;
  color: string;
}

const badges: Badge[] = [
  {
    id: 'first-25',
    name: 'Word Explorer',
    description: 'Learn your first 25 Spanish words',
    icon: BookOpen,
    color: 'from-amber-400 to-amber-500'
  },
  {
    id: 'week-streak',
    name: '7-Day Streak',
    description: 'Practice Spanish for 7 days in a row',
    icon: Calendar,
    color: 'from-emerald-400 to-emerald-500'
  },
  {
    id: 'animal-master',
    name: 'Animal Master',
    description: 'Learn all animal-related vocabulary',
    icon: Trophy,
    color: 'from-indigo-400 to-indigo-500'
  },
  {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    description: 'Score 100% on three consecutive quizzes',
    icon: Brain,
    color: 'from-rose-400 to-rose-500'
  }
];

export function getUserBadges(): (Badge & { earned: boolean; earnedAt?: string })[] {
  return badges.map(badge => ({
    ...badge,
    earned: false
  }));
}

export default badges;