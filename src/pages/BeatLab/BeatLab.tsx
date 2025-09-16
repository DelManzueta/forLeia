import React, { useState } from 'react';
import { Search, Music, Drum, Piano, Guitar, Mic, Play, Pause, X, Plus } from 'lucide-react';

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

const soundLibrary: Sound[] = [
  // Hip Hop Drums
  { id: '1', name: 'Trap Kick 808', category: 'Drums', genre: 'Hip Hop', instrument: 'Kick', duration: 0.8, originalBpm: 140, currentBpm: 140, tags: ['kick', '808', 'trap'], color: '#FF6B6B', icon: Drum },
  { id: '2', name: 'Boom Bap Kick', category: 'Drums', genre: 'Hip Hop', instrument: 'Kick', duration: 0.6, originalBpm: 90, currentBpm: 90, tags: ['kick', 'boom bap'], color: '#FF6B6B', icon: Drum },
  { id: '3', name: 'Drill Kick', category: 'Drums', genre: 'Hip Hop', instrument: 'Kick', duration: 0.4, originalBpm: 150, currentBpm: 150, tags: ['kick', 'drill'], color: '#FF6B6B', icon: Drum },
  { id: '4', name: 'Trap Snare', category: 'Drums', genre: 'Hip Hop', instrument: 'Snare', duration: 0.3, originalBpm: 140, currentBpm: 140, tags: ['snare', 'trap'], color: '#FF6B6B', icon: Drum },
  { id: '5', name: 'Clap Layered', category: 'Drums', genre: 'Hip Hop', instrument: 'Snare', duration: 0.4, originalBpm: 120, currentBpm: 120, tags: ['clap', 'layered'], color: '#FF6B6B', icon: Drum },
  { id: '6', name: 'Trap Hi-Hat', category: 'Drums', genre: 'Hip Hop', instrument: 'Hi-Hat', duration: 0.1, originalBpm: 140, currentBpm: 140, tags: ['hihat', 'trap'], color: '#FF6B6B', icon: Drum },
  { id: '7', name: 'Drill Hi-Hat', category: 'Drums', genre: 'Hip Hop', instrument: 'Hi-Hat', duration: 0.08, originalBpm: 150, currentBpm: 150, tags: ['hihat', 'drill'], color: '#FF6B6B', icon: Drum },
  { id: '8', name: 'Open Hat Trap', category: 'Drums', genre: 'Hip Hop', instrument: 'Hi-Hat', duration: 0.2, originalBpm: 140, currentBpm: 140, tags: ['hihat', 'open'], color: '#FF6B6B', icon: Drum },
  { id: '9', name: 'Tom Low', category: 'Drums', genre: 'Hip Hop', instrument: 'Tom', duration: 0.5, originalBpm: 120, currentBpm: 120, tags: ['tom', 'low'], color: '#FF6B6B', icon: Drum },
  { id: '10', name: 'Tom High', category: 'Drums', genre: 'Hip Hop', instrument: 'Tom', duration: 0.4, originalBpm: 120, currentBpm: 120, tags: ['tom', 'high'], color: '#FF6B6B', icon: Drum },
  { id: '11', name: 'Perc Shaker', category: 'Drums', genre: 'Hip Hop', instrument: 'Percussion', duration: 0.2, originalBpm: 120, currentBpm: 120, tags: ['perc', 'shaker'], color: '#FF6B6B', icon: Drum },
  { id: '12', name: 'Perc Tambourine', category: 'Drums', genre: 'Hip Hop', instrument: 'Percussion', duration: 0.3, originalBpm: 120, currentBpm: 120, tags: ['perc', 'tambourine'], color: '#FF6B6B', icon: Drum },
  { id: '13', name: 'Crash Cymbal', category: 'Drums', genre: 'Hip Hop', instrument: 'Cymbal', duration: 1.5, originalBpm: 120, currentBpm: 120, tags: ['crash', 'cymbal'], color: '#FF6B6B', icon: Drum },
  { id: '14', name: 'Ride Cymbal', category: 'Drums', genre: 'Hip Hop', instrument: 'Cymbal', duration: 0.8, originalBpm: 120, currentBpm: 120, tags: ['ride', 'cymbal'], color: '#FF6B6B', icon: Drum },
  { id: '15', name: 'Reverse Cymbal', category: 'Drums', genre: 'Hip Hop', instrument: 'Cymbal', duration: 1.2, originalBpm: 120, currentBpm: 120, tags: ['reverse', 'cymbal'], color: '#FF6B6B', icon: Drum },

  // Electronic Drums
  { id: '16', name: 'House Kick', category: 'Drums', genre: 'Electronic', instrument: 'Kick', duration: 0.5, originalBpm: 128, currentBpm: 128, tags: ['kick', 'house'], color: '#FF6B6B', icon: Drum },
  { id: '17', name: 'Techno Kick', category: 'Drums', genre: 'Electronic', instrument: 'Kick', duration: 0.4, originalBpm: 130, currentBpm: 130, tags: ['kick', 'techno'], color: '#FF6B6B', icon: Drum },
  { id: '18', name: 'DnB Kick', category: 'Drums', genre: 'Electronic', instrument: 'Kick', duration: 0.3, originalBpm: 174, currentBpm: 174, tags: ['kick', 'dnb'], color: '#FF6B6B', icon: Drum },
  { id: '19', name: 'House Snare', category: 'Drums', genre: 'Electronic', instrument: 'Snare', duration: 0.2, originalBpm: 128, currentBpm: 128, tags: ['snare', 'house'], color: '#FF6B6B', icon: Drum },
  { id: '20', name: 'Techno Clap', category: 'Drums', genre: 'Electronic', instrument: 'Snare', duration: 0.3, originalBpm: 130, currentBpm: 130, tags: ['clap', 'techno'], color: '#FF6B6B', icon: Drum },
  { id: '21', name: 'DnB Snare', category: 'Drums', genre: 'Electronic', instrument: 'Snare', duration: 0.2, originalBpm: 174, currentBpm: 174, tags: ['snare', 'dnb'], color: '#FF6B6B', icon: Drum },
  { id: '22', name: 'House Hi-Hat', category: 'Drums', genre: 'Electronic', instrument: 'Hi-Hat', duration: 0.1, originalBpm: 128, currentBpm: 128, tags: ['hihat', 'house'], color: '#FF6B6B', icon: Drum },
  { id: '23', name: 'Techno Hi-Hat', category: 'Drums', genre: 'Electronic', instrument: 'Hi-Hat', duration: 0.08, originalBpm: 130, currentBpm: 130, tags: ['hihat', 'techno'], color: '#FF6B6B', icon: Drum },
  { id: '24', name: 'DnB Hi-Hat', category: 'Drums', genre: 'Electronic', instrument: 'Hi-Hat', duration: 0.06, originalBpm: 174, currentBpm: 174, tags: ['hihat', 'dnb'], color: '#FF6B6B', icon: Drum },

  // Rock Drums
  { id: '25', name: 'Rock Kick', category: 'Drums', genre: 'Rock', instrument: 'Kick', duration: 0.6, originalBpm: 120, currentBpm: 120, tags: ['kick', 'rock'], color: '#FF6B6B', icon: Drum },
  { id: '26', name: 'Rock Snare', category: 'Drums', genre: 'Rock', instrument: 'Snare', duration: 0.4, originalBpm: 120, currentBpm: 120, tags: ['snare', 'rock'], color: '#FF6B6B', icon: Drum },
  { id: '27', name: 'Rock Hi-Hat', category: 'Drums', genre: 'Rock', instrument: 'Hi-Hat', duration: 0.15, originalBpm: 120, currentBpm: 120, tags: ['hihat', 'rock'], color: '#FF6B6B', icon: Drum },

  // Hip Hop Bass
  { id: '28', name: 'Trap 808 C', category: 'Bass', genre: 'Hip Hop', instrument: '808', duration: 2.0, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['808', 'trap'], color: '#8B5CF6', icon: Music },
  { id: '29', name: 'Trap 808 F', category: 'Bass', genre: 'Hip Hop', instrument: '808', duration: 2.2, originalBpm: 140, currentBpm: 140, key: 'F', tags: ['808', 'trap'], color: '#8B5CF6', icon: Music },
  { id: '30', name: 'Drill 808 G', category: 'Bass', genre: 'Hip Hop', instrument: '808', duration: 1.8, originalBpm: 150, currentBpm: 150, key: 'G', tags: ['808', 'drill'], color: '#8B5CF6', icon: Music },
  { id: '31', name: 'Boom Bap Bass', category: 'Bass', genre: 'Hip Hop', instrument: 'Synth Bass', duration: 1.5, originalBpm: 90, currentBpm: 90, key: 'A', tags: ['bass', 'boom bap'], color: '#8B5CF6', icon: Music },
  { id: '32', name: 'Lo-Fi Bass', category: 'Bass', genre: 'Hip Hop', instrument: 'Synth Bass', duration: 2.5, originalBpm: 85, currentBpm: 85, key: 'E', tags: ['bass', 'lo-fi'], color: '#8B5CF6', icon: Music },
  { id: '33', name: 'Trap Sub Bass', category: 'Bass', genre: 'Hip Hop', instrument: 'Sub Bass', duration: 3.0, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['sub', 'trap'], color: '#8B5CF6', icon: Music },

  // Electronic Bass
  { id: '34', name: 'House Bass C', category: 'Bass', genre: 'Electronic', instrument: 'Synth Bass', duration: 2.0, originalBpm: 128, currentBpm: 128, key: 'C', tags: ['bass', 'house'], color: '#8B5CF6', icon: Music },
  { id: '35', name: 'Techno Bass', category: 'Bass', genre: 'Electronic', instrument: 'Synth Bass', duration: 1.8, originalBpm: 130, currentBpm: 130, key: 'F', tags: ['bass', 'techno'], color: '#8B5CF6', icon: Music },
  { id: '36', name: 'DnB Reese', category: 'Bass', genre: 'Electronic', instrument: 'Reese Bass', duration: 2.8, originalBpm: 174, currentBpm: 174, key: 'B', tags: ['reese', 'dnb'], color: '#8B5CF6', icon: Music },
  { id: '37', name: 'Dubstep Wobble', category: 'Bass', genre: 'Electronic', instrument: 'Wobble Bass', duration: 2.5, originalBpm: 140, currentBpm: 140, key: 'E', tags: ['wobble', 'dubstep'], color: '#8B5CF6', icon: Music },
  { id: '38', name: 'Acid Bass', category: 'Bass', genre: 'Electronic', instrument: 'Acid Bass', duration: 1.2, originalBpm: 130, currentBpm: 130, key: 'D', tags: ['acid', 'tb303'], color: '#8B5CF6', icon: Music },
  { id: '39', name: 'Future Bass', category: 'Bass', genre: 'Electronic', instrument: 'Future Bass', duration: 2.3, originalBpm: 150, currentBpm: 150, key: 'G', tags: ['future', 'bass'], color: '#8B5CF6', icon: Music },

  // Rock Bass
  { id: '40', name: 'Rock Bass C', category: 'Bass', genre: 'Rock', instrument: 'Electric Bass', duration: 1.5, originalBpm: 120, currentBpm: 120, key: 'C', tags: ['bass', 'rock'], color: '#8B5CF6', icon: Music },
  { id: '41', name: 'Punk Bass', category: 'Bass', genre: 'Rock', instrument: 'Electric Bass', duration: 1.0, originalBpm: 160, currentBpm: 160, key: 'E', tags: ['bass', 'punk'], color: '#8B5CF6', icon: Music },
  { id: '42', name: 'Metal Bass', category: 'Bass', genre: 'Rock', instrument: 'Electric Bass', duration: 1.2, originalBpm: 140, currentBpm: 140, key: 'D', tags: ['bass', 'metal'], color: '#8B5CF6', icon: Music },

  // Hip Hop Synths
  { id: '43', name: 'Trap Lead', category: 'Synths', genre: 'Hip Hop', instrument: 'Lead Synth', duration: 2.0, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['lead', 'trap'], color: '#10B981', icon: Music },
  { id: '44', name: 'Lo-Fi Keys', category: 'Synths', genre: 'Hip Hop', instrument: 'Keys', duration: 3.0, originalBpm: 85, currentBpm: 85, key: 'Am', tags: ['keys', 'lo-fi'], color: '#10B981', icon: Music },
  { id: '45', name: 'Drill Pluck', category: 'Synths', genre: 'Hip Hop', instrument: 'Pluck', duration: 0.5, originalBpm: 150, currentBpm: 150, key: 'G', tags: ['pluck', 'drill'], color: '#10B981', icon: Music },
  { id: '46', name: 'Trap Pad', category: 'Synths', genre: 'Hip Hop', instrument: 'Pad', duration: 4.0, originalBpm: 140, currentBpm: 140, key: 'Em', tags: ['pad', 'trap'], color: '#10B981', icon: Music },
  { id: '47', name: 'Hip Hop Brass', category: 'Synths', genre: 'Hip Hop', instrument: 'Brass', duration: 1.8, originalBpm: 90, currentBpm: 90, key: 'F', tags: ['brass', 'hip hop'], color: '#10B981', icon: Music },
  { id: '48', name: 'Trap Bell', category: 'Synths', genre: 'Hip Hop', instrument: 'Bell', duration: 1.2, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['bell', 'trap'], color: '#10B981', icon: Music },
  { id: '49', name: 'Lo-Fi String', category: 'Synths', genre: 'Hip Hop', instrument: 'String', duration: 3.5, originalBpm: 85, currentBpm: 85, key: 'Am', tags: ['string', 'lo-fi'], color: '#10B981', icon: Music },

  // Electronic Synths
  { id: '50', name: 'House Lead', category: 'Synths', genre: 'Electronic', instrument: 'Lead Synth', duration: 2.0, originalBpm: 128, currentBpm: 128, key: 'C', tags: ['lead', 'house'], color: '#10B981', icon: Music },
  { id: '51', name: 'Techno Stab', category: 'Synths', genre: 'Electronic', instrument: 'Stab', duration: 0.8, originalBpm: 130, currentBpm: 130, key: 'F', tags: ['stab', 'techno'], color: '#10B981', icon: Music },
  { id: '52', name: 'Trance Pluck', category: 'Synths', genre: 'Electronic', instrument: 'Pluck', duration: 0.5, originalBpm: 132, currentBpm: 132, key: 'G', tags: ['pluck', 'trance'], color: '#10B981', icon: Music },
  { id: '53', name: 'Ambient Pad', category: 'Synths', genre: 'Electronic', instrument: 'Pad', duration: 5.0, originalBpm: 120, currentBpm: 120, key: 'Am', tags: ['pad', 'ambient'], color: '#10B981', icon: Music },
  { id: '54', name: 'DnB Arp', category: 'Synths', genre: 'Electronic', instrument: 'Arp', duration: 1.5, originalBpm: 174, currentBpm: 174, key: 'Em', tags: ['arp', 'dnb'], color: '#10B981', icon: Music },
  { id: '55', name: 'Electro Brass', category: 'Synths', genre: 'Electronic', instrument: 'Brass', duration: 2.2, originalBpm: 128, currentBpm: 128, key: 'D', tags: ['brass', 'electro'], color: '#10B981', icon: Music },
  { id: '56', name: 'Synth Bell', category: 'Synths', genre: 'Electronic', instrument: 'Bell', duration: 1.5, originalBpm: 130, currentBpm: 130, key: 'G', tags: ['bell', 'synth'], color: '#10B981', icon: Music },
  { id: '57', name: 'Trance String', category: 'Synths', genre: 'Electronic', instrument: 'String', duration: 4.2, originalBpm: 132, currentBpm: 132, key: 'Em', tags: ['string', 'trance'], color: '#10B981', icon: Music },

  // Hip Hop Piano
  { id: '58', name: 'Lo-Fi Piano C', category: 'Piano', genre: 'Hip Hop', instrument: 'Piano', duration: 2.0, originalBpm: 85, currentBpm: 85, key: 'C', tags: ['piano', 'lo-fi'], color: '#F59E0B', icon: Piano },
  { id: '59', name: 'Trap Piano Am', category: 'Piano', genre: 'Hip Hop', instrument: 'Piano', duration: 2.2, originalBpm: 140, currentBpm: 140, key: 'Am', tags: ['piano', 'trap'], color: '#F59E0B', icon: Piano },
  { id: '60', name: 'Boom Bap Keys', category: 'Piano', genre: 'Hip Hop', instrument: 'Piano', duration: 1.8, originalBpm: 90, currentBpm: 90, key: 'G', tags: ['piano', 'boom bap'], color: '#F59E0B', icon: Piano },

  // Electronic Piano
  { id: '61', name: 'House Piano', category: 'Piano', genre: 'Electronic', instrument: 'Piano', duration: 2.1, originalBpm: 128, currentBpm: 128, key: 'F', tags: ['piano', 'house'], color: '#F59E0B', icon: Piano },
  { id: '62', name: 'Trance Piano', category: 'Piano', genre: 'Electronic', instrument: 'Piano', duration: 2.3, originalBpm: 132, currentBpm: 132, key: 'Em', tags: ['piano', 'trance'], color: '#F59E0B', icon: Piano },

  // Rock Piano
  { id: '63', name: 'Rock Piano', category: 'Piano', genre: 'Rock', instrument: 'Piano', duration: 2.0, originalBpm: 120, currentBpm: 120, key: 'Dm', tags: ['piano', 'rock'], color: '#F59E0B', icon: Piano },
  { id: '64', name: 'Ballad Piano', category: 'Piano', genre: 'Rock', instrument: 'Piano', duration: 3.0, originalBpm: 80, currentBpm: 80, key: 'Am', tags: ['piano', 'ballad'], color: '#F59E0B', icon: Piano },

  // Hip Hop Guitar
  { id: '65', name: 'Lo-Fi Guitar', category: 'Guitar', genre: 'Hip Hop', instrument: 'Guitar', duration: 1.5, originalBpm: 85, currentBpm: 85, key: 'C', tags: ['guitar', 'lo-fi'], color: '#EF4444', icon: Guitar },
  { id: '66', name: 'Trap Guitar', category: 'Guitar', genre: 'Hip Hop', instrument: 'Guitar', duration: 1.8, originalBpm: 140, currentBpm: 140, key: 'Am', tags: ['guitar', 'trap'], color: '#EF4444', icon: Guitar },

  // Electronic Guitar
  { id: '67', name: 'House Guitar', category: 'Guitar', genre: 'Electronic', instrument: 'Guitar', duration: 1.6, originalBpm: 128, currentBpm: 128, key: 'G', tags: ['guitar', 'house'], color: '#EF4444', icon: Guitar },
  { id: '68', name: 'Techno Guitar', category: 'Guitar', genre: 'Electronic', instrument: 'Guitar', duration: 1.7, originalBpm: 130, currentBpm: 130, key: 'F', tags: ['guitar', 'techno'], color: '#EF4444', icon: Guitar },

  // Rock Guitar
  { id: '69', name: 'Rock Chord Em', category: 'Guitar', genre: 'Rock', instrument: 'Guitar', duration: 2.0, originalBpm: 120, currentBpm: 120, key: 'Em', tags: ['guitar', 'rock'], color: '#EF4444', icon: Guitar },
  { id: '70', name: 'Metal Riff', category: 'Guitar', genre: 'Rock', instrument: 'Guitar', duration: 1.9, originalBpm: 140, currentBpm: 140, key: 'Dm', tags: ['guitar', 'metal'], color: '#EF4444', icon: Guitar },
  { id: '71', name: 'Blues Lead', category: 'Guitar', genre: 'Rock', instrument: 'Guitar', duration: 2.5, originalBpm: 100, currentBpm: 100, key: 'E', tags: ['guitar', 'blues'], color: '#EF4444', icon: Guitar },

  // Hip Hop Vocals
  { id: '72', name: 'Trap Vocal Ah', category: 'Vocals', genre: 'Hip Hop', instrument: 'Vocal', duration: 1.0, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['vocal', 'trap'], color: '#EC4899', icon: Mic }
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
                className="group bg-gray-700 hover:bg-gray-600 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:scale-105 border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl"
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