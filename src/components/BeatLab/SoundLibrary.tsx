import React, { useState } from 'react';
import { Search, Music, Drum, Piano, Guitar, Mic, Download, Play } from 'lucide-react';

interface Sound {
  id: string;
  name: string;
  category: string;
  duration: number;
  bpm?: number;
  key?: string;
  tags: string[];
  color: string;
  icon: typeof Music | typeof Drum | typeof Piano | typeof Guitar | typeof Mic;
}

const soundLibrary: Sound[] = [
  {
    id: '1',
    name: 'Kick Drum 1',
    category: 'Drums',
    duration: 0.5,
    bpm: 120,
    tags: ['kick', 'drum', 'bass'],
    color: '#FF6B6B',
    icon: Drum
  },
  {
    id: '2',
    name: 'Snare Hit',
    category: 'Drums',
    duration: 0.3,
    bpm: 120,
    tags: ['snare', 'drum', 'percussion'],
    color: '#4ECDC4',
    icon: Drum
  },
  {
    id: '3',
    name: 'Hi-Hat Closed',
    category: 'Drums',
    duration: 0.1,
    bpm: 120,
    tags: ['hihat', 'drum', 'percussion'],
    color: '#45B7D1',
    icon: Drum
  },
  {
    id: '4',
    name: 'Piano Chord C',
    category: 'Piano',
    duration: 2.0,
    key: 'C',
    tags: ['piano', 'chord', 'harmony'],
    color: '#96CEB4',
    icon: Piano
  },
  {
    id: '5',
    name: 'Guitar Strum',
    category: 'Guitar',
    duration: 1.5,
    key: 'G',
    tags: ['guitar', 'strum', 'acoustic'],
    color: '#FFEAA7',
    icon: Guitar
  },
  {
    id: '6',
    name: 'Bass Line',
    category: 'Bass',
    duration: 4.0,
    bpm: 120,
    key: 'A',
    tags: ['bass', 'line', 'groove'],
    color: '#DDA0DD',
    icon: Music
  },
  {
    id: '7',
    name: 'Vocal Ah',
    category: 'Vocals',
    duration: 1.0,
    key: 'C',
    tags: ['vocal', 'ah', 'voice'],
    color: '#FFB6C1',
    icon: Mic
  },
  {
    id: '8',
    name: 'Synth Lead',
    category: 'Synth',
    duration: 3.0,
    bpm: 128,
    key: 'E',
    tags: ['synth', 'lead', 'electronic'],
    color: '#87CEEB',
    icon: Music
  }
];

interface SoundLibraryProps {
  onSoundSelect: (sound: Sound) => void;
}

function SoundLibrary({ onSoundSelect }: SoundLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(soundLibrary.map(s => s.category)))];

  const filteredSounds = soundLibrary.filter(sound => {
    const matchesSearch = sound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sound.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || sound.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSoundDragStart = (e: React.DragEvent, sound: Sound) => {
    e.dataTransfer.setData('application/json', JSON.stringify(sound));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const playSound = (soundId: string) => {
    setPlayingSound(soundId);
    // Simulate sound playback
    setTimeout(() => setPlayingSound(null), 1000);
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Sound Library</h2>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sound Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {filteredSounds.map(sound => {
            const Icon = sound.icon;
            return (
              <div
                key={sound.id}
                draggable
                onDragStart={(e) => handleSoundDragStart(e, sound)}
                onClick={() => onSoundSelect(sound)}
                className="group relative p-3 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-all border border-gray-700 hover:border-gray-600"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: sound.color + '20', color: sound.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{sound.name}</h3>
                    <p className="text-sm text-gray-400">{sound.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{sound.duration}s</span>
                      {sound.bpm && (
                        <span className="text-xs text-gray-500">{sound.bpm} BPM</span>
                      )}
                      {sound.key && (
                        <span className="text-xs text-gray-500">Key: {sound.key}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {sound.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-700 text-xs rounded-full text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound(sound.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-600 rounded-lg transition-all"
                  >
                    <Play className={`w-4 h-4 ${playingSound === sound.id ? 'text-green-400' : 'text-gray-400'}`} />
                  </button>
                </div>

                {/* Drag indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {filteredSounds.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No sounds found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoundLibrary;