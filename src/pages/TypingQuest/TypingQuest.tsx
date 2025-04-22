import React, { useState, useEffect } from 'react';
import { Keyboard, Star, Trophy, Timer, RefreshCw, ArrowRight, Brain, Target } from 'lucide-react';

// Difficulty levels with progressively harder texts
const difficultyLevels = {
  beginner: [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!"
  ],
  intermediate: [
    "The five boxing wizards jump quickly. The job requires extra pluck and zeal from every young wage earner.",
    "Two driven jocks help fax my big quiz. The quick onyx goblin jumps over the lazy dwarf.",
    "Sphinx of black quartz, judge my vow. Waltz, nymph, for quick jigs vex Bud."
  ],
  advanced: [
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
    "We promptly judged antique ivory buckles for the next prize. Sixty zippers were quickly picked from the woven jute bag. Heavy boxes perform quick waltzes and jigs.",
    "The job requires extra pluck and zeal from every young wage earner. The wizard quickly jinxed the gnomes before they vaporized. A quivering Texas zombie fought republic linked jewelry."
  ],
  expert: [
    `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are sentences that contain every letter of the alphabet. They are often used to display font samples and test keyboards and printers.

    The five boxing wizards jump quickly. This shorter pangram uses each letter of the alphabet at least once, while maintaining reasonable syntax and grammar. It's particularly useful for testing typing speed and accuracy.
    
    Pack my box with five dozen liquor jugs. Another concise pangram that incorporates all twenty-six letters of the English alphabet. These sentences help typists practice their skills while ensuring they can accurately type every letter.`,
    // Add more paragraphs...
  ]
};

interface Stats {
  wpm: number;
  accuracy: number;
  time: number;
}

interface TypingHistory {
  date: string;
  wpm: number;
  accuracy: number;
  difficulty: string;
}

function TypingQuest() {
  const [difficulty, setDifficulty] = useState<keyof typeof difficultyLevels>('beginner');
  const [text, setText] = useState(difficultyLevels.beginner[0]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stats, setStats] = useState<Stats>({ wpm: 0, accuracy: 0, time: 0 });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [history, setHistory] = useState<TypingHistory[]>(() => {
    const saved = localStorage.getItem('typingHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    let interval: number;
    if (started && !completed) {
      interval = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started, completed]);

  useEffect(() => {
    if (started && !completed) {
      const checkCompletion = () => {
        if (input === text) {
          const endTime = Date.now();
          const timeInMinutes = (endTime - (startTime || 0)) / 60000;
          const words = text.split(' ').length;
          const wpm = Math.round(words / timeInMinutes);
          const accuracy = Math.round((text.length - getErrors()) / text.length * 100);
          
          const newStats = { wpm, accuracy, time: Math.round(timeInMinutes * 60) };
          setStats(newStats);
          setCompleted(true);
          setShowReward(true);
          
          // Save to history
          const newHistory = [{
            date: new Date().toISOString(),
            wpm,
            accuracy,
            difficulty
          }, ...history].slice(0, 10); // Keep last 10 entries
          setHistory(newHistory);
          localStorage.setItem('typingHistory', JSON.stringify(newHistory));
          
          // Award stars based on performance and difficulty
          const difficultyMultiplier = {
            beginner: 1,
            intermediate: 1.5,
            advanced: 2,
            expert: 3
          }[difficulty];
          const stars = Math.floor((wpm / 20) * difficultyMultiplier);
          const currentBalance = parseInt(localStorage.getItem('bankBalance') || '0');
          localStorage.setItem('bankBalance', (currentBalance + stars).toString());
          
          setTimeout(() => setShowReward(false), 3000);
        }
      };
      checkCompletion();
    }
  }, [input, text, started, completed, startTime, difficulty, history]);

  const getErrors = () => {
    return input.split('').reduce((errors, char, i) => {
      return errors + (char !== text[i] ? 1 : 0);
    }, 0);
  };

  const handleStart = () => {
    const texts = difficultyLevels[difficulty];
    setText(texts[Math.floor(Math.random() * texts.length)]);
    setInput('');
    setStarted(true);
    setCompleted(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const getCurrentAccuracy = () => {
    if (!input.length) return 100;
    return Math.round((input.length - getErrors()) / input.length * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHighestWPM = () => {
    if (!history.length) return 0;
    return Math.max(...history.map(h => h.wpm));
  };

  const getAverageWPM = () => {
    if (!history.length) return 0;
    return Math.round(history.reduce((sum, h) => sum + h.wpm, 0) / history.length);
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-pink-600">Typing Quest</h1>
        <p className="mt-2 text-pink-600/80">Master the keyboard! ⌨️</p>
      </header>

      {/* Difficulty Selection */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Your Challenge</h2>
        <div className="grid grid-cols-4 gap-4">
          {(Object.keys(difficultyLevels) as Array<keyof typeof difficultyLevels>).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`p-4 rounded-xl transition-colors ${
                difficulty === level
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="text-center">
                <span className="capitalize font-medium">{level}</span>
                <div className="text-xs mt-1">
                  {level === 'beginner' && 'Short sentences'}
                  {level === 'intermediate' && 'Complex sentences'}
                  {level === 'advanced' && 'Multiple sentences'}
                  {level === 'expert' && 'Full paragraphs'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-medium">Highest WPM</h3>
          </div>
          <div className="text-2xl font-bold">{getHighestWPM()}</div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Average WPM</h3>
          </div>
          <div className="text-2xl font-bold">{getAverageWPM()}</div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <h3 className="font-medium">Practice Sessions</h3>
          </div>
          <div className="text-2xl font-bold">{history.length}</div>
        </div>
      </div>

      {/* Typing Area */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="space-y-6">
          {/* Timer and Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-gray-600">
                <Timer className="w-5 h-5" />
                {formatTime(elapsedTime)}
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <Trophy className="w-5 h-5" />
                {getCurrentAccuracy()}% accuracy
              </span>
            </div>
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {started ? 'Restart' : 'Start'}
            </button>
          </div>

          {/* Text Display */}
          <div className="bg-gray-50 rounded-xl p-6 font-mono text-lg whitespace-pre-wrap">
            {text.split('').map((char, i) => (
              <span
                key={i}
                className={`${
                  i < input.length
                    ? input[i] === char
                      ? 'text-green-500'
                      : 'text-red-500'
                    : 'text-gray-900'
                }`}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Input Area */}
          <input
            type="text"
            value={input}
            onChange={(e) => {
              if (!started) {
                setStarted(true);
                setStartTime(Date.now());
              }
              setInput(e.target.value);
            }}
            disabled={completed}
            className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-500 font-mono"
            placeholder="Start typing..."
          />
        </div>
      </div>

      {/* Results */}
      {completed && (
        <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Great Job! 🎉</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{stats.wpm}</div>
              <div className="text-sm">Words per Minute</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{stats.accuracy}%</div>
              <div className="text-sm">Accuracy</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
              <div className="text-sm">Time</div>
            </div>
          </div>
          <button
            onClick={handleStart}
            className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Try Another
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Star Reward Notification */}
      {showReward && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          ⭐ {Math.floor((stats.wpm / 20) * {
            beginner: 1,
            intermediate: 1.5,
            advanced: 2,
            expert: 3
          }[difficulty])} stars earned!
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Progress</h2>
          <div className="space-y-3">
            {history.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <div className="font-medium">{new Date(entry.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500 capitalize">{entry.difficulty} level</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{entry.wpm} WPM</div>
                    <div className="text-sm text-gray-500">{entry.accuracy}% accuracy</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Proper Posture</h3>
          <p className="text-gray-600 text-sm">Keep your back straight and wrists elevated for comfortable typing.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Home Row Position</h3>
          <p className="text-gray-600 text-sm">Rest your fingers on ASDF and JKL; keys as your anchor points.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Practice Regularly</h3>
          <p className="text-gray-600 text-sm">Spend at least 15 minutes daily to improve your typing speed.</p>
        </div>
      </div>
    </div>
  );
}

export default TypingQuest;