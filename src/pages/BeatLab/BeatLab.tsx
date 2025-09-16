import React, { useState } from 'react';
import { Search, Music, Drum, Piano, Guitar, Mic, Play, Pause, X, Plus } from 'lucide-react';
import soundLibraryData from '../../data/soundLibrary.json';

interface Sound {
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

// Icon mapping for JSON data
const iconMap = {
  'Drum': Drum,
  'Music': Music,
  'Piano': Piano,
  'Guitar': Guitar,
  'Mic': Mic
};

// Convert JSON data to Sound objects with proper icon references
const soundLibrary: Sound[] = soundLibraryData.map(sound => ({
  ...sound,
  icon: iconMap[sound.icon as keyof typeof iconMap]
}));

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
    <div className="bg-gray-800 text-white rounded-2xl h-96 flex flex-col border border-gray-700 shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800 rounded-t-2xl">
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
            onSoundSelect={handleSoundSelect}
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
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {filteredSounds.map(sound => {
            const Icon = sound.icon;
            return (
              <div
                key={sound.id}
                draggable
                onDragStart={(e) => handleSoundDragStart(e, sound)}
                onClick={() => onSoundSelect(sound)}
                className="group bg-gray-800 hover:bg-gray-700 rounded-xl p-3 cursor-pointer transition-all border border-gray-700 hover:border-yellow-500 hover:shadow-lg"
              >
                {/* Icon and Play Button */}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: sound.color + '20', border: `1px solid ${sound.color}40` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: sound.color }} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound(sound.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded-lg transition-all"
                  >
                    {playingSound === sound.id ? (
                      <Pause className="w-3 h-3 text-yellow-500" />
                    ) : (
                      <Play className="w-3 h-3 text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Sound Info */}
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-white truncate" title={sound.name}>
                    {sound.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="truncate">{sound.genre}</span>
                    {sound.key && (
                      <span className="bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">
                        {sound.key}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{sound.duration}s</div>
                </div>

                {/* BPM Control */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400 w-8">{sound.currentBpm}</span>
                    <input
                      type="range"
                      min="60"
                      max="200"
                      value={sound.currentBpm}
                      onChange={(e) => updateSoundBpm(sound.id, parseInt(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSounds.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No sounds found</p>
            <button
              onClick={() => {
                setSelectedFilters([]);
                setSearchTerm('');
              }}
              className="mt-2 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
        <p className="text-xs text-gray-500 text-center">
          Drag sounds to timeline • Click bubbles to filter • Adjust BPM on hover
        </p>
      </div>
    </div>
  );
}

export default SoundLibrary;