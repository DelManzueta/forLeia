import React, { useState } from 'react';
import { Search, Music, Drum, Piano, Guitar, Mic, Play, Pause, Filter, RotateCcw, Volume2, Sliders } from 'lucide-react';

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

  // Electronic Drums
  { id: '9', name: 'House Kick', category: 'Drums', genre: 'Electronic', instrument: 'Kick', duration: 0.5, originalBpm: 128, currentBpm: 128, tags: ['kick', 'house'], color: '#FF6B6B', icon: Drum },
  { id: '10', name: 'Techno Kick', category: 'Drums', genre: 'Electronic', instrument: 'Kick', duration: 0.4, originalBpm: 130, currentBpm: 130, tags: ['kick', 'techno'], color: '#FF6B6B', icon: Drum },
  { id: '11', name: 'DnB Kick', category: 'Drums', genre: 'Electronic', instrument: 'Kick', duration: 0.3, originalBpm: 174, currentBpm: 174, tags: ['kick', 'dnb'], color: '#FF6B6B', icon: Drum },
  { id: '12', name: 'House Snare', category: 'Drums', genre: 'Electronic', instrument: 'Snare', duration: 0.2, originalBpm: 128, currentBpm: 128, tags: ['snare', 'house'], color: '#FF6B6B', icon: Drum },
  { id: '13', name: 'Techno Clap', category: 'Drums', genre: 'Electronic', instrument: 'Snare', duration: 0.3, originalBpm: 130, currentBpm: 130, tags: ['clap', 'techno'], color: '#FF6B6B', icon: Drum },
  { id: '14', name: 'DnB Snare', category: 'Drums', genre: 'Electronic', instrument: 'Snare', duration: 0.2, originalBpm: 174, currentBpm: 174, tags: ['snare', 'dnb'], color: '#FF6B6B', icon: Drum },
  { id: '15', name: 'House Hi-Hat', category: 'Drums', genre: 'Electronic', instrument: 'Hi-Hat', duration: 0.1, originalBpm: 128, currentBpm: 128, tags: ['hihat', 'house'], color: '#FF6B6B', icon: Drum },

  // Rock Drums
  { id: '16', name: 'Rock Kick', category: 'Drums', genre: 'Rock', instrument: 'Kick', duration: 0.6, originalBpm: 120, currentBpm: 120, tags: ['kick', 'rock'], color: '#FF6B6B', icon: Drum },
  { id: '17', name: 'Rock Snare', category: 'Drums', genre: 'Rock', instrument: 'Snare', duration: 0.4, originalBpm: 120, currentBpm: 120, tags: ['snare', 'rock'], color: '#FF6B6B', icon: Drum },
  { id: '18', name: 'Rock Hi-Hat', category: 'Drums', genre: 'Rock', instrument: 'Hi-Hat', duration: 0.15, originalBpm: 120, currentBpm: 120, tags: ['hihat', 'rock'], color: '#FF6B6B', icon: Drum },
  { id: '19', name: 'Crash Cymbal', category: 'Drums', genre: 'Rock', instrument: 'Cymbal', duration: 1.5, originalBpm: 120, currentBpm: 120, tags: ['crash', 'cymbal'], color: '#FF6B6B', icon: Drum },
  { id: '20', name: 'Ride Cymbal', category: 'Drums', genre: 'Rock', instrument: 'Cymbal', duration: 0.8, originalBpm: 120, currentBpm: 120, tags: ['ride', 'cymbal'], color: '#FF6B6B', icon: Drum },

  // Hip Hop Bass
  { id: '21', name: 'Trap 808 C', category: 'Bass', genre: 'Hip Hop', instrument: '808', duration: 2.0, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['808', 'trap'], color: '#8B5CF6', icon: Music },
  { id: '22', name: 'Trap 808 F', category: 'Bass', genre: 'Hip Hop', instrument: '808', duration: 2.2, originalBpm: 140, currentBpm: 140, key: 'F', tags: ['808', 'trap'], color: '#8B5CF6', icon: Music },
  { id: '23', name: 'Drill 808 G', category: 'Bass', genre: 'Hip Hop', instrument: '808', duration: 1.8, originalBpm: 150, currentBpm: 150, key: 'G', tags: ['808', 'drill'], color: '#8B5CF6', icon: Music },
  { id: '24', name: 'Boom Bap Bass', category: 'Bass', genre: 'Hip Hop', instrument: 'Synth Bass', duration: 1.5, originalBpm: 90, currentBpm: 90, key: 'A', tags: ['bass', 'boom bap'], color: '#8B5CF6', icon: Music },
  { id: '25', name: 'Lo-Fi Bass', category: 'Bass', genre: 'Hip Hop', instrument: 'Synth Bass', duration: 2.5, originalBpm: 85, currentBpm: 85, key: 'E', tags: ['bass', 'lo-fi'], color: '#8B5CF6', icon: Music },

  // Electronic Bass
  { id: '26', name: 'House Bass C', category: 'Bass', genre: 'Electronic', instrument: 'Synth Bass', duration: 2.0, originalBpm: 128, currentBpm: 128, key: 'C', tags: ['bass', 'house'], color: '#8B5CF6', icon: Music },
  { id: '27', name: 'Techno Bass', category: 'Bass', genre: 'Electronic', instrument: 'Synth Bass', duration: 1.8, originalBpm: 130, currentBpm: 130, key: 'F', tags: ['bass', 'techno'], color: '#8B5CF6', icon: Music },
  { id: '28', name: 'DnB Reese', category: 'Bass', genre: 'Electronic', instrument: 'Reese Bass', duration: 2.8, originalBpm: 174, currentBpm: 174, key: 'B', tags: ['reese', 'dnb'], color: '#8B5CF6', icon: Music },
  { id: '29', name: 'Dubstep Wobble', category: 'Bass', genre: 'Electronic', instrument: 'Wobble Bass', duration: 2.5, originalBpm: 140, currentBpm: 140, key: 'E', tags: ['wobble', 'dubstep'], color: '#8B5CF6', icon: Music },
  { id: '30', name: 'Acid Bass', category: 'Bass', genre: 'Electronic', instrument: 'Acid Bass', duration: 1.2, originalBpm: 130, currentBpm: 130, key: 'D', tags: ['acid', 'tb303'], color: '#8B5CF6', icon: Music },

  // Rock Bass
  { id: '31', name: 'Rock Bass C', category: 'Bass', genre: 'Rock', instrument: 'Electric Bass', duration: 1.5, originalBpm: 120, currentBpm: 120, key: 'C', tags: ['bass', 'rock'], color: '#8B5CF6', icon: Music },
  { id: '32', name: 'Punk Bass', category: 'Bass', genre: 'Rock', instrument: 'Electric Bass', duration: 1.0, originalBpm: 160, currentBpm: 160, key: 'E', tags: ['bass', 'punk'], color: '#8B5CF6', icon: Music },
  { id: '33', name: 'Metal Bass', category: 'Bass', genre: 'Rock', instrument: 'Electric Bass', duration: 1.2, originalBpm: 140, currentBpm: 140, key: 'D', tags: ['bass', 'metal'], color: '#8B5CF6', icon: Music },

  // Hip Hop Synths
  { id: '34', name: 'Trap Lead', category: 'Synths', genre: 'Hip Hop', instrument: 'Lead Synth', duration: 2.0, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['lead', 'trap'], color: '#10B981', icon: Music },
  { id: '35', name: 'Lo-Fi Keys', category: 'Synths', genre: 'Hip Hop', instrument: 'Keys', duration: 3.0, originalBpm: 85, currentBpm: 85, key: 'Am', tags: ['keys', 'lo-fi'], color: '#10B981', icon: Music },
  { id: '36', name: 'Drill Pluck', category: 'Synths', genre: 'Hip Hop', instrument: 'Pluck', duration: 0.5, originalBpm: 150, currentBpm: 150, key: 'G', tags: ['pluck', 'drill'], color: '#10B981', icon: Music },
  { id: '37', name: 'Trap Pad', category: 'Synths', genre: 'Hip Hop', instrument: 'Pad', duration: 4.0, originalBpm: 140, currentBpm: 140, key: 'Em', tags: ['pad', 'trap'], color: '#10B981', icon: Music },

  // Electronic Synths
  { id: '38', name: 'House Lead', category: 'Synths', genre: 'Electronic', instrument: 'Lead Synth', duration: 2.0, originalBpm: 128, currentBpm: 128, key: 'C', tags: ['lead', 'house'], color: '#10B981', icon: Music },
  { id: '39', name: 'Techno Stab', category: 'Synths', genre: 'Electronic', instrument: 'Stab', duration: 0.8, originalBpm: 130, currentBpm: 130, key: 'F', tags: ['stab', 'techno'], color: '#10B981', icon: Music },
  { id: '40', name: 'Trance Pluck', category: 'Synths', genre: 'Electronic', instrument: 'Pluck', duration: 0.5, originalBpm: 132, currentBpm: 132, key: 'G', tags: ['pluck', 'trance'], color: '#10B981', icon: Music },
  { id: '41', name: 'Ambient Pad', category: 'Synths', genre: 'Electronic', instrument: 'Pad', duration: 5.0, originalBpm: 120, currentBpm: 120, key: 'Am', tags: ['pad', 'ambient'], color: '#10B981', icon: Music },
  { id: '42', name: 'DnB Arp', category: 'Synths', genre: 'Electronic', instrument: 'Arp', duration: 1.5, originalBpm: 174, currentBpm: 174, key: 'Em', tags: ['arp', 'dnb'], color: '#10B981', icon: Music },

  // Rock Synths
  { id: '43', name: 'Rock Lead', category: 'Synths', genre: 'Rock', instrument: 'Lead Synth', duration: 2.5, originalBpm: 120, currentBpm: 120, key: 'E', tags: ['lead', 'rock'], color: '#10B981', icon: Music },
  { id: '44', name: 'Prog Pad', category: 'Synths', genre: 'Rock', instrument: 'Pad', duration: 4.0, originalBpm: 110, currentBpm: 110, key: 'Dm', tags: ['pad', 'prog'], color: '#10B981', icon: Music },

  // Hip Hop Piano
  { id: '45', name: 'Lo-Fi Piano C', category: 'Piano', genre: 'Hip Hop', instrument: 'Piano', duration: 2.0, originalBpm: 85, currentBpm: 85, key: 'C', tags: ['piano', 'lo-fi'], color: '#F59E0B', icon: Piano },
  { id: '46', name: 'Trap Piano Am', category: 'Piano', genre: 'Hip Hop', instrument: 'Piano', duration: 2.2, originalBpm: 140, currentBpm: 140, key: 'Am', tags: ['piano', 'trap'], color: '#F59E0B', icon: Piano },
  { id: '47', name: 'Boom Bap Keys', category: 'Piano', genre: 'Hip Hop', instrument: 'Piano', duration: 1.8, originalBpm: 90, currentBpm: 90, key: 'G', tags: ['piano', 'boom bap'], color: '#F59E0B', icon: Piano },

  // Electronic Piano
  { id: '48', name: 'House Piano', category: 'Piano', genre: 'Electronic', instrument: 'Piano', duration: 2.1, originalBpm: 128, currentBpm: 128, key: 'F', tags: ['piano', 'house'], color: '#F59E0B', icon: Piano },
  { id: '49', name: 'Trance Piano', category: 'Piano', genre: 'Electronic', instrument: 'Piano', duration: 2.3, originalBpm: 132, currentBpm: 132, key: 'Em', tags: ['piano', 'trance'], color: '#F59E0B', icon: Piano },

  // Rock Piano
  { id: '50', name: 'Rock Piano', category: 'Piano', genre: 'Rock', instrument: 'Piano', duration: 2.0, originalBpm: 120, currentBpm: 120, key: 'Dm', tags: ['piano', 'rock'], color: '#F59E0B', icon: Piano },
  { id: '51', name: 'Ballad Piano', category: 'Piano', genre: 'Rock', instrument: 'Piano', duration: 3.0, originalBpm: 80, currentBpm: 80, key: 'Am', tags: ['piano', 'ballad'], color: '#F59E0B', icon: Piano },

  // Hip Hop Guitar
  { id: '52', name: 'Lo-Fi Guitar', category: 'Guitar', genre: 'Hip Hop', instrument: 'Guitar', duration: 1.5, originalBpm: 85, currentBpm: 85, key: 'C', tags: ['guitar', 'lo-fi'], color: '#EF4444', icon: Guitar },
  { id: '53', name: 'Trap Guitar', category: 'Guitar', genre: 'Hip Hop', instrument: 'Guitar', duration: 1.8, originalBpm: 140, currentBpm: 140, key: 'Am', tags: ['guitar', 'trap'], color: '#EF4444', icon: Guitar },

  // Electronic Guitar
  { id: '54', name: 'House Guitar', category: 'Guitar', genre: 'Electronic', instrument: 'Guitar', duration: 1.6, originalBpm: 128, currentBpm: 128, key: 'G', tags: ['guitar', 'house'], color: '#EF4444', icon: Guitar },
  { id: '55', name: 'Techno Guitar', category: 'Guitar', genre: 'Electronic', instrument: 'Guitar', duration: 1.7, originalBpm: 130, currentBpm: 130, key: 'F', tags: ['guitar', 'techno'], color: '#EF4444', icon: Guitar },

  // Rock Guitar
  { id: '56', name: 'Rock Chord Em', category: 'Guitar', genre: 'Rock', instrument: 'Guitar', duration: 2.0, originalBpm: 120, currentBpm: 120, key: 'Em', tags: ['guitar', 'rock'], color: '#EF4444', icon: Guitar },
  { id: '57', name: 'Metal Riff', category: 'Guitar', genre: 'Rock', instrument: 'Guitar', duration: 1.9, originalBpm: 140, currentBpm: 140, key: 'Dm', tags: ['guitar', 'metal'], color: '#EF4444', icon: Guitar },
  { id: '58', name: 'Blues Lead', category: 'Guitar', genre: 'Rock', instrument: 'Guitar', duration: 2.5, originalBpm: 100, currentBpm: 100, key: 'E', tags: ['guitar', 'blues'], color: '#EF4444', icon: Guitar },
  { id: '59', name: 'Punk Chord', category: 'Guitar', genre: 'Rock', instrument: 'Guitar', duration: 0.3, originalBpm: 160, currentBpm: 160, tags: ['guitar', 'punk'], color: '#EF4444', icon: Guitar },

  // Hip Hop Vocals
  { id: '60', name: 'Trap Vocal Ah', category: 'Vocals', genre: 'Hip Hop', instrument: 'Vocal', duration: 1.0, originalBpm: 140, currentBpm: 140, key: 'C', tags: ['vocal', 'trap'], color: '#EC4899', icon: Mic },
  { id: '61', name: 'Lo-Fi Vocal', category: 'Vocals', genre: 'Hip Hop', instrument: 'Vocal', duration: 1.2, originalBpm: 85, currentBpm: 85, key: 'G', tags: ['vocal', 'lo-fi'], color: '#EC4899', icon: Mic },
  { id: '62', name: 'Drill Vocal', category: 'Vocals', genre: 'Hip Hop', instrument: 'Vocal', duration: 0.8, originalBpm: 150, currentBpm: 150, key: 'F', tags: ['vocal', 'drill'], color: '#EC4899', icon: Mic },

  // Electronic Vocals
  { id: '63', name: 'House Vocal', category: 'Vocals', genre: 'Electronic', instrument: 'Vocal', duration: 1.5, originalBpm: 128, currentBpm: 128, key: 'Am', tags: ['vocal', 'house'], color: '#EC4899', icon: Mic },
  { id: '64', name: 'Trance Vocal', category: 'Vocals', genre: 'Electronic', instrument: 'Vocal', duration: 2.0, originalBpm: 132, currentBpm: 132, key: 'C', tags: ['vocal', 'trance'], color: '#EC4899', icon: Mic },
  { id: '65', name: 'Techno Vocal', category: 'Vocals', genre: 'Electronic', instrument: 'Vocal', duration: 1.8, originalBpm: 130, currentBpm: 130, tags: ['vocal', 'techno'], color: '#EC4899', icon: Mic },

  // Rock Vocals
  { id: '66', name: 'Rock Vocal', category: 'Vocals', genre: 'Rock', instrument: 'Vocal', duration: 0.5, originalBpm: 120, currentBpm: 120, tags: ['vocal', 'rock'], color: '#EC4899', icon: Mic },
  { id: '67', name: 'Metal Scream', category: 'Vocals', genre: 'Rock', instrument: 'Vocal', duration: 0.3, originalBpm: 140, currentBpm: 140, tags: ['vocal', 'metal'], color: '#EC4899', icon: Mic },
  { id: '68', name: 'Blues Vocal', category: 'Vocals', genre: 'Rock', instrument: 'Vocal', duration: 1.8, originalBpm: 100, currentBpm: 100, tags: ['vocal', 'blues'], color: '#EC4899', icon: Mic },

  // Additional sounds for variety
  { id: '69', name: 'Jazz Piano', category: 'Piano', genre: 'Jazz', instrument: 'Piano', duration: 2.5, originalBpm: 120, currentBpm: 120, key: 'Bb', tags: ['piano', 'jazz'], color: '#F59E0B', icon: Piano },
  { id: '70', name: 'Reggae Guitar', category: 'Guitar', genre: 'Reggae', instrument: 'Guitar', duration: 1.3, originalBpm: 90, currentBpm: 90, key: 'D', tags: ['guitar', 'reggae'], color: '#EF4444', icon: Guitar },
  { id: '71', name: 'Funk Bass', category: 'Bass', genre: 'Funk', instrument: 'Electric Bass', duration: 1.0, originalBpm: 115, currentBpm: 115, key: 'E', tags: ['bass', 'funk'], color: '#8B5CF6', icon: Music },
  { id: '72', name: 'Latin Perc', category: 'Drums', genre: 'Latin', instrument: 'Percussion', duration: 0.4, originalBpm: 120, currentBpm: 120, tags: ['perc', 'latin'], color: '#FF6B6B', icon: Drum }
];

interface SoundLibraryProps {
  onSoundSelect: (sound: Sound) => void;
}

function SoundLibrary({ onSoundSelect }: SoundLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedInstrument, setSelectedInstrument] = useState('All');
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...Array.from(new Set(soundLibrary.map(s => s.category)))];
  const genres = ['All', ...Array.from(new Set(soundLibrary.map(s => s.genre)))];
  const instruments = ['All', ...Array.from(new Set(soundLibrary.map(s => s.instrument)))];

  const filteredSounds = soundLibrary.filter(sound => {
    const matchesSearch = sound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sound.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || sound.category === selectedCategory;
    const matchesGenre = selectedGenre === 'All' || sound.genre === selectedGenre;
    const matchesInstrument = selectedInstrument === 'All' || sound.instrument === selectedInstrument;
    return matchesSearch && matchesCategory && matchesGenre && matchesInstrument;
  });

  const handleSoundDragStart = (e: React.DragEvent, sound: Sound) => {
    e.dataTransfer.setData('application/json', JSON.stringify(sound));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const playSound = (soundId: string) => {
    setPlayingSound(soundId);
    setTimeout(() => setPlayingSound(null), 800);
  };

  const updateSoundBpm = (soundId: string, newBpm: number) => {
    // In a real implementation, this would update the sound's BPM
    // For now, we'll just update the display
    const soundIndex = soundLibrary.findIndex(s => s.id === soundId);
    if (soundIndex !== -1) {
      soundLibrary[soundIndex].currentBpm = newBpm;
    }
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGenre('All');
    setSelectedInstrument('All');
    setSearchTerm('');
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl h-96 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Sound Library</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{filteredSounds.length} sounds</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search sounds, genres, instruments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-3 p-3 bg-gray-800 rounded-lg">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs focus:outline-none focus:border-yellow-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs focus:outline-none focus:border-yellow-500"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Instrument</label>
                <select
                  value={selectedInstrument}
                  onChange={(e) => setSelectedInstrument(e.target.value)}
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs focus:outline-none focus:border-yellow-500"
                >
                  {instruments.map(inst => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Sound Grid */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {filteredSounds.map(sound => {
            const Icon = sound.icon;
            return (
              <div
                key={sound.id}
                draggable
                onDragStart={(e) => handleSoundDragStart(e, sound)}
                onClick={() => onSoundSelect(sound)}
                className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-3 cursor-pointer transition-all border border-gray-700 hover:border-yellow-500"
              >
                {/* Icon and Play Button */}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: sound.color + '20' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: sound.color }} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound(sound.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-all"
                  >
                    {playingSound === sound.id ? (
                      <Pause className="w-3 h-3 text-yellow-500" />
                    ) : (
                      <Play className="w-3 h-3 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Sound Info */}
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-white truncate" title={sound.name}>
                    {sound.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{sound.genre}</span>
                    {sound.key && <span className="bg-gray-700 px-1 rounded">{sound.key}</span>}
                  </div>
                  <div className="text-xs text-gray-500">{sound.duration}s</div>
                </div>

                {/* BPM Control */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-gray-400" />
                    <input
                      type="range"
                      min="60"
                      max="200"
                      value={sound.currentBpm}
                      onChange={(e) => updateSoundBpm(sound.id, parseInt(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                    <span className="text-xs text-gray-400 w-8">{sound.currentBpm}</span>
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
              onClick={resetFilters}
              className="mt-2 text-xs text-yellow-500 hover:text-yellow-400"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-500">Drag sounds to timeline • Use BPM sliders to adjust tempo</p>
      </div>
    </div>
  );
}

export default SoundLibrary;