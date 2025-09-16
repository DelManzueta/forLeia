import React, { useState } from 'react';
import { Search, Music, Drum, Piano, Guitar, Mic, Play, Pause, X, Plus } from 'lucide-react';

export interface Sound {
  id: string;
  name: string;
  category: string;
  genre: string;
  instrument: string;
  duration: number;
  originalBpm: number;
  currentBpm: number;
  key?: string;
  tags: string[];
  color: string;
  icon: typeof Music | typeof Drum | typeof Piano | typeof Guitar | typeof Mic;
}

// Professional sound library with actual Sound objects
const soundLibrary: Sound[] = [
  // Drums
  {
    id: '1',
    name: 'Trap Kick 808',
    category: 'Drums',
    genre: 'Hip Hop',
    instrument: 'Kick',
    duration: 0.8,
    originalBpm: 140,
    currentBpm: 140,
    tags: ['kick', '808', 'trap'],
    color: '#FF6B6B',
    icon: Drum
  },
  {
    id: '2',
    name: 'Crisp Snare',
    category: 'Drums',
    genre: 'Hip Hop',
    instrument: 'Snare',
    duration: 0.3,
    originalBpm: 140,
    currentBpm: 140,
    tags: ['snare', 'trap'],
    color: '#FF6B6B',
    icon: Drum
  },
  {
    id: '3',
    name: 'Closed Hi-Hat',
    category: 'Drums',
    genre: 'Hip Hop',
    instrument: 'Hi-Hat',
    duration: 0.1,
    originalBpm: 140,
    currentBpm: 140,
    tags: ['hihat', 'closed'],
    color: '#FF6B6B',
    icon: Drum
  },
  {
    id: '4',
    name: 'Open Hi-Hat',
    category: 'Drums',
    genre: 'Hip Hop',
    instrument: 'Hi-Hat',
    duration: 0.2,
    originalBpm: 140,
    currentBpm: 140,
    tags: ['hihat', 'open'],
    color: '#FF6B6B',
    icon: Drum
  },
  // Bass
  {
    id: '5',
    name: 'Sub Bass C',
    category: 'Bass',
    genre: 'Hip Hop',
    instrument: '808',
    duration: 2.0,
    originalBpm: 140,
    currentBpm: 140,
    key: 'C',
    tags: ['808', 'sub', 'bass'],
    color: '#8B5CF6',
    icon: Music
  },
  {
    id: '6',
    name: 'Reese Bass F',
    category: 'Bass',
    genre: 'Electronic',
    instrument: 'Synth Bass',
    duration: 1.5,
    originalBpm: 174,
    currentBpm: 174,
    key: 'F',
    tags: ['reese', 'dnb'],
    color: '#8B5CF6',
    icon: Music
  },
  // Synths
  {
    id: '7',
    name: 'Trap Lead',
    category: 'Synths',
    genre: 'Hip Hop',
    instrument: 'Lead',
    duration: 2.0,
    originalBpm: 140,
    currentBpm: 140,
    key: 'C',
    tags: ['lead', 'trap'],
    color: '#10B981',
    icon: Music
  },
  {
    id: '8',
    name: 'Ambient Pad',
    category: 'Synths',
    genre: 'Electronic',
    instrument: 'Pad',
    duration: 4.0,
    originalBpm: 120,
    currentBpm: 120,
    key: 'Am',
    tags: ['pad', 'ambient'],
    color: '#10B981',
    icon: Music
  },
  // Piano
  {
    id: '9',
    name: 'Lo-Fi Piano',
    category: 'Piano',
    genre: 'Hip Hop',
    instrument: 'Piano',
    duration: 2.0,
    originalBpm: 85,
    currentBpm: 85,
    key: 'C',
    tags: ['piano', 'lo-fi'],
    color: '#F59E0B',
    icon: Piano
  },
  {
    id: '10',
    name: 'House Piano',
    category: 'Piano',
    genre: 'Electronic',
    instrument: 'Piano',
    duration: 2.1,
    originalBpm: 128,
    currentBpm: 128,
    key: 'F',
    tags: ['piano', 'house'],
    color: '#F59E0B',
    icon: Piano
  },
  // Guitar
  {
    id: '11',
    name: 'Lo-Fi Guitar',
    category: 'Guitar',
    genre: 'Hip Hop',
    instrument: 'Guitar',
    duration: 1.5,
    originalBpm: 85,
    currentBpm: 85,
    key: 'C',
    tags: ['guitar', 'lo-fi'],
    color: '#EF4444',
    icon: Guitar
  },
  {
    id: '12',
    name: 'Rock Guitar',
    category: 'Guitar',
    genre: 'Rock',
    instrument: 'Guitar',
    duration: 2.0,
    originalBpm: 120,
    currentBpm: 120,
    key: 'Em',
    tags: ['guitar', 'rock'],
    color: '#EF4444',
    icon: Guitar
  }
];

interface SoundLibraryProps {
  onSoundSelect: (sound: Sound) => void;
}

function SoundLibrary({ onSoundSelect }: SoundLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  // Get all unique filter options
  const allCategories = Array.from(new Set(soundLibrary.map(s => s.category)));
  const allGenres = Array.from(new Set(soundLibrary.map(s => s.genre)));
  const allInstruments = Array.from(new Set(soundLibrary.map(s => s.instrument)));
  
  const filterOptions = [
    ...allCategories.map(cat => ({ type: 'category', value: cat, label: cat })),
    ...allGenres.map(genre => ({ type: 'genre', value: genre, label: genre })),
    ...allInstruments.map(inst => ({ type: 'instrument', value: inst, label: inst }))
  ];

  const filteredSounds = soundLibrary.filter(sound => {
    const matchesSearch = sound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sound.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilters.length === 0) return matchesSearch;
    
    const matchesFilters = selectedFilters.some(filter => 
      sound.category === filter || 
      sound.genre === filter || 
      sound.instrument === filter
    );
    
    return matchesSearch && matchesFilters;
  });

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  const handleSoundDragStart = (e: React.DragEvent, sound: Sound) => {
    e.dataTransfer.setData('application/json', JSON.stringify(sound));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const playSound = (soundId: string) => {
    setPlayingSound(soundId);
    setTimeout(() => setPlayingSound(null), 800);
  };

  const updateSoundBpm = (soundId: string, newBpm: number) => {
    const soundIndex = soundLibrary.findIndex(s => s.id === soundId);
    if (soundIndex !== -1) {
      soundLibrary[soundIndex].currentBpm = newBpm;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Sound Library</h2>
          <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
            {filteredSounds.length} sounds
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search sounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm transition-all"
          />
        </div>

        {/* Filter Bubbles */}
        <div className="space-y-2">
          {/* Selected Filters */}
          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => removeFilter(filter)}
                  className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs font-medium hover:bg-yellow-400 transition-colors"
                >
                  {filter}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}
          
          {/* Available Filters */}
          <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
            {filterOptions
              .filter(option => !selectedFilters.includes(option.value))
              .slice(0, 12)
              .map(option => (
                <button
                  key={option.value}
                  onClick={() => addFilter(option.value)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium hover:bg-gray-600 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  {option.label}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Sound Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-1 gap-3">
          {filteredSounds.map(sound => {
            const Icon = sound.icon;
            return (
              <div
                key={sound.id}
                draggable
                onDragStart={(e) => handleSoundDragStart(e, sound)}
                onClick={() => onSoundSelect(sound)}
                className="group bg-gray-700 hover:bg-gray-600 rounded-lg p-3 cursor-pointer transition-all border border-gray-600 hover:border-yellow-500"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: sound.color + '40', border: `1px solid ${sound.color}` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: sound.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{sound.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{sound.genre}</span>
                      {sound.key && (
                        <span className="bg-gray-600 px-1.5 py-0.5 rounded font-mono">
                          {sound.key}
                        </span>
                      )}
                      <span>{sound.duration}s</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound(sound.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-500 rounded transition-all"
                  >
                    {playingSound === sound.id ? (
                      <Pause className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSounds.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No sounds found</p>
            <button
              onClick={() => {
                setSelectedFilters([]);
                setSearchTerm('');
              }}
              className="mt-2 text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoundLibrary;