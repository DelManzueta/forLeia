import React, { useState } from 'react';
import { Search, Music, Drum, Piano, Guitar, Mic, Play, Pause, X, Plus, Filter, Grid, List } from 'lucide-react';

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
  icon: string;
  url?: string;
}

// Icon mapping
const iconMap = {
  'Drum': Drum,
  'Music': Music,
  'Piano': Piano,
  'Guitar': Guitar,
  'Mic': Mic
};

// Professional sound library with realistic samples
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
    tags: ['kick', '808', 'trap', 'bass'],
    color: '#FF6B6B',
    icon: 'Drum'
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
    tags: ['snare', 'trap', 'crisp'],
    color: '#FF6B6B',
    icon: 'Drum'
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
    tags: ['hihat', 'closed', 'trap'],
    color: '#FF6B6B',
    icon: 'Drum'
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
    tags: ['hihat', 'open', 'trap'],
    color: '#FF6B6B',
    icon: 'Drum'
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
    icon: 'Music'
  },
  {
    id: '6',
    name: 'Reese Bass',
    category: 'Bass',
    genre: 'Electronic',
    instrument: 'Synth Bass',
    duration: 1.5,
    originalBpm: 174,
    currentBpm: 174,
    key: 'F',
    tags: ['reese', 'dnb', 'bass'],
    color: '#8B5CF6',
    icon: 'Music'
  },
  // Synths
  {
    id: '7',
    name: 'Trap Lead',
    category: 'Synths',
    genre: 'Hip Hop',
    instrument: 'Lead Synth',
    duration: 2.0,
    originalBpm: 140,
    currentBpm: 140,
    key: 'C',
    tags: ['lead', 'trap', 'melody'],
    color: '#10B981',
    icon: 'Music'
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
    tags: ['pad', 'ambient', 'atmosphere'],
    color: '#10B981',
    icon: 'Music'
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
    tags: ['piano', 'lo-fi', 'chill'],
    color: '#F59E0B',
    icon: 'Piano'
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
    tags: ['piano', 'house', 'dance'],
    color: '#F59E0B',
    icon: 'Piano'
  }
];

interface ProfessionalSoundLibraryProps {
  onSoundSelect: (sound: Sound) => void;
}

function ProfessionalSoundLibrary({ onSoundSelect }: ProfessionalSoundLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

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
    
    // Create drag image
    const dragImage = document.createElement('div');
    dragImage.textContent = sound.name;
    dragImage.style.cssText = `
      position: absolute;
      top: -1000px;
      background: ${sound.color};
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
    `;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const playSound = (soundId: string) => {
    // In a real implementation, this would play the actual audio
    setPlayingSound(soundId);
    setTimeout(() => setPlayingSound(null), 1000);
  };

  const SoundCard = ({ sound }: { sound: Sound }) => {
    const IconComponent = iconMap[sound.icon as keyof typeof iconMap] || Music;
    
    return (
      <div
        draggable
        onDragStart={(e) => handleSoundDragStart(e, sound)}
        onClick={() => onSoundSelect(sound)}
        className="group bg-gray-800 hover:bg-gray-700 rounded-xl p-4 cursor-pointer transition-all border border-gray-700 hover:border-blue-500 hover:shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: sound.color + '20', border: `1px solid ${sound.color}40` }}
          >
            <IconComponent className="w-5 h-5" style={{ color: sound.color }} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound(sound.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-600 rounded-lg transition-all"
          >
            {playingSound === sound.id ? (
              <Pause className="w-4 h-4 text-blue-400" />
            ) : (
              <Play className="w-4 h-4 text-gray-300" />
            )}
          </button>
        </div>

        {/* Sound Info */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-white truncate" title={sound.name}>
            {sound.name}
          </h4>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="truncate">{sound.genre}</span>
            {sound.key && (
              <span className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">
                {sound.key}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{sound.duration}s</span>
            <span>{sound.currentBpm} BPM</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {sound.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white rounded-2xl h-[600px] flex flex-col border border-gray-700 shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800 rounded-t-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Sound Library</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters ? 'bg-blue-500 text-white' : 'hover:bg-gray-700 text-gray-400'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-500' : 'hover:bg-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-blue-500' : 'hover:bg-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
              {filteredSounds.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search sounds, tags, or instruments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-3">
            {/* Selected Filters */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => removeFilter(filter)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium hover:bg-blue-400 transition-colors"
                  >
                    {filter}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Available Filters */}
            <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
              {filterOptions
                .filter(option => !selectedFilters.includes(option.value))
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
        )}
      </div>

      {/* Sound Grid/List */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
        {filteredSounds.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No sounds found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSelectedFilters([]);
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-2'
          }>
            {filteredSounds.map(sound => (
              <SoundCard key={sound.id} sound={sound} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
        <p className="text-xs text-gray-500 text-center">
          🎵 Drag sounds to timeline • 🎧 Click to preview • 🔍 Use filters to find sounds
        </p>
      </div>
    </div>
  );
}

export default ProfessionalSoundLibrary;