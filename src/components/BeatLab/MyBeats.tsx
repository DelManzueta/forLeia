import React, { useState, useEffect } from 'react';
import { Music, Play, Save, Plus, Trash2, Clock, History } from 'lucide-react';

interface Beat {
  id: string;
  name: string;
  sequence: string[];
  createdAt: string;
}

const drumSounds = [
  { id: 'kick', label: 'Kick', color: 'from-purple-400 to-purple-500' },
  { id: 'snare', label: 'Snare', color: 'from-blue-400 to-blue-500' },
  { id: 'hihat', label: 'Hi-Hat', color: 'from-emerald-400 to-emerald-500' },
  { id: 'clap', label: 'Clap', color: 'from-red-400 to-red-500' }
];

function MyBeats() {
  const [beats, setBeats] = useState<Beat[]>(() => {
    const saved = localStorage.getItem('beatJournal');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [beatName, setBeatName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem('beatJournal', JSON.stringify(beats));
  }, [beats]);

  const handlePadClick = (soundId: string) => {
    setCurrentSequence(prev => [...prev, soundId]);
    const audio = new Audio(`/sounds/${soundId}.mp3`);
    audio.play();
  };

  const saveBeat = () => {
    if (!beatName.trim() || currentSequence.length === 0) return;

    const newBeat: Beat = {
      id: Date.now().toString(),
      name: beatName,
      sequence: currentSequence,
      createdAt: new Date().toISOString()
    };

    setBeats(prev => [newBeat, ...prev]);
    setCurrentSequence([]);
    setBeatName('');
  };

  const deleteBeat = (id: string) => {
    setBeats(prev => prev.filter(beat => beat.id !== id));
  };

  const playSequence = async (sequence: string[]) => {
    if (isPlaying) return;
    setIsPlaying(true);

    for (const sound of sequence) {
      const audio = new Audio(`/sounds/${sound}.mp3`);
      await audio.play();
      await new Promise(resolve => setTimeout(resolve, 400)); // 400ms between sounds
    }

    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-xl">
            <History className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Beat Journal</h2>
        </div>
      </div>

      {/* Sound Pads */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {drumSounds.map(sound => (
          <button
            key={sound.id}
            onClick={() => handlePadClick(sound.id)}
            className={`relative group h-24 rounded-2xl bg-gradient-to-br ${sound.color} p-4 text-white shadow-lg transition-transform hover:scale-[1.02]`}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-2xl transition-colors" />
            <div className="h-full flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{sound.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Current Sequence */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-700">Current Sequence</h3>
          </div>
          <span className="text-sm text-gray-500">{currentSequence.length} sounds</span>
        </div>
        {currentSequence.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {currentSequence.map((sound, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium"
              >
                {sound}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Tap the pads to create a sequence!</p>
        )}
      </div>

      {/* Save Controls */}
      <div className="flex gap-4">
        <input
          type="text"
          value={beatName}
          onChange={(e) => setBeatName(e.target.value)}
          placeholder="Name your beat..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={saveBeat}
          disabled={!beatName.trim() || currentSequence.length === 0}
          className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          Save Beat
        </button>
      </div>

      {/* Saved Beats */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">Saved Beats</h3>
        </div>
        
        {beats.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-2xl">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No beats saved yet. Start creating!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {beats.map(beat => (
              <div
                key={beat.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-yellow-200 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{beat.name}</h4>
                  <p className="text-sm text-gray-500">
                    {beat.sequence.length} sounds • {new Date(beat.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playSequence(beat.sequence)}
                    disabled={isPlaying}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteBeat(beat.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBeats;