import React, { useState } from 'react';
import { Search, Music, Drum, Piano, Guitar, Mic, Download, Play, Pause, Volume2 } from 'lucide-react';

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
  // Drums - 15 sounds
  { id: '1', name: 'Kick 808', category: 'Drums', duration: 0.8, bpm: 120, tags: ['kick', '808', 'bass'], color: '#FF6B6B', icon: Drum },
  { id: '2', name: 'Snare Clap', category: 'Drums', duration: 0.3, bpm: 120, tags: ['snare', 'clap'], color: '#FF6B6B', icon: Drum },
  { id: '3', name: 'Hi-Hat Closed', category: 'Drums', duration: 0.1, bpm: 120, tags: ['hihat', 'closed'], color: '#FF6B6B', icon: Drum },
  { id: '4', name: 'Hi-Hat Open', category: 'Drums', duration: 0.2, bpm: 120, tags: ['hihat', 'open'], color: '#FF6B6B', icon: Drum },
  { id: '5', name: 'Crash Cymbal', category: 'Drums', duration: 1.5, bpm: 120, tags: ['crash', 'cymbal'], color: '#FF6B6B', icon: Drum },
  { id: '6', name: 'Ride Bell', category: 'Drums', duration: 0.8, bpm: 120, tags: ['ride', 'bell'], color: '#FF6B6B', icon: Drum },
  { id: '7', name: 'Tom High', category: 'Drums', duration: 0.4, bpm: 120, tags: ['tom', 'high'], color: '#FF6B6B', icon: Drum },
  { id: '8', name: 'Tom Mid', category: 'Drums', duration: 0.5, bpm: 120, tags: ['tom', 'mid'], color: '#FF6B6B', icon: Drum },
  { id: '9', name: 'Tom Low', category: 'Drums', duration: 0.6, bpm: 120, tags: ['tom', 'low'], color: '#FF6B6B', icon: Drum },
  { id: '10', name: 'Kick Punch', category: 'Drums', duration: 0.4, bpm: 120, tags: ['kick', 'punch'], color: '#FF6B6B', icon: Drum },
  { id: '11', name: 'Snare Rim', category: 'Drums', duration: 0.2, bpm: 120, tags: ['snare', 'rim'], color: '#FF6B6B', icon: Drum },
  { id: '12', name: 'Perc Shaker', category: 'Drums', duration: 0.3, bpm: 120, tags: ['perc', 'shaker'], color: '#FF6B6B', icon: Drum },
  { id: '13', name: 'Perc Tamb', category: 'Drums', duration: 0.4, bpm: 120, tags: ['perc', 'tambourine'], color: '#FF6B6B', icon: Drum },
  { id: '14', name: 'Clap Verb', category: 'Drums', duration: 0.6, bpm: 120, tags: ['clap', 'reverb'], color: '#FF6B6B', icon: Drum },
  { id: '15', name: 'Kick Sub', category: 'Drums', duration: 1.0, bpm: 120, tags: ['kick', 'sub', 'bass'], color: '#FF6B6B', icon: Drum },

  // Bass - 12 sounds
  { id: '16', name: 'Bass 808', category: 'Bass', duration: 2.0, bpm: 120, key: 'C', tags: ['808', 'sub'], color: '#8B5CF6', icon: Music },
  { id: '17', name: 'Bass Synth', category: 'Bass', duration: 1.5, bpm: 120, key: 'A', tags: ['synth', 'analog'], color: '#8B5CF6', icon: Music },
  { id: '18', name: 'Bass Wobble', category: 'Bass', duration: 2.5, bpm: 140, key: 'E', tags: ['wobble', 'dubstep'], color: '#8B5CF6', icon: Music },
  { id: '19', name: 'Bass Pluck', category: 'Bass', duration: 0.8, bpm: 128, key: 'G', tags: ['pluck', 'short'], color: '#8B5CF6', icon: Music },
  { id: '20', name: 'Bass Deep', category: 'Bass', duration: 3.0, bpm: 90, key: 'F', tags: ['deep', 'house'], color: '#8B5CF6', icon: Music },
  { id: '21', name: 'Bass Acid', category: 'Bass', duration: 1.2, bpm: 130, key: 'D', tags: ['acid', 'tb303'], color: '#8B5CF6', icon: Music },
  { id: '22', name: 'Bass Reese', category: 'Bass', duration: 2.8, bpm: 174, key: 'B', tags: ['reese', 'dnb'], color: '#8B5CF6', icon: Music },
  { id: '23', name: 'Bass Growl', category: 'Bass', duration: 1.8, bpm: 150, key: 'C#', tags: ['growl', 'distorted'], color: '#8B5CF6', icon: Music },
  { id: '24', name: 'Bass Vintage', category: 'Bass', duration: 2.2, bpm: 110, key: 'Ab', tags: ['vintage', 'moog'], color: '#8B5CF6', icon: Music },
  { id: '25', name: 'Bass Funk', category: 'Bass', duration: 1.0, bpm: 115, key: 'E', tags: ['funk', 'slap'], color: '#8B5CF6', icon: Music },
  { id: '26', name: 'Bass Trap', category: 'Bass', duration: 1.5, bpm: 140, key: 'F#', tags: ['trap', 'modern'], color: '#8B5CF6', icon: Music },
  { id: '27', name: 'Bass Minimal', category: 'Bass', duration: 4.0, bpm: 125, key: 'Bb', tags: ['minimal', 'techno'], color: '#8B5CF6', icon: Music },

  // Synths - 15 sounds
  { id: '28', name: 'Lead Saw', category: 'Synths', duration: 2.0, key: 'C', tags: ['lead', 'saw'], color: '#10B981', icon: Music },
  { id: '29', name: 'Pad Warm', category: 'Synths', duration: 4.0, key: 'Am', tags: ['pad', 'warm'], color: '#10B981', icon: Music },
  { id: '30', name: 'Arp Fast', category: 'Synths', duration: 1.5, bpm: 128, key: 'Em', tags: ['arp', 'fast'], color: '#10B981', icon: Music },
  { id: '31', name: 'Pluck Bright', category: 'Synths', duration: 0.5, key: 'G', tags: ['pluck', 'bright'], color: '#10B981', icon: Music },
  { id: '32', name: 'Brass Stab', category: 'Synths', duration: 0.8, key: 'F', tags: ['brass', 'stab'], color: '#10B981', icon: Music },
  { id: '33', name: 'Bell Soft', category: 'Synths', duration: 3.0, key: 'D', tags: ['bell', 'soft'], color: '#10B981', icon: Music },
  { id: '34', name: 'Choir Ah', category: 'Synths', duration: 2.5, key: 'C', tags: ['choir', 'vocal'], color: '#10B981', icon: Music },
  { id: '35', name: 'Strings Lush', category: 'Synths', duration: 4.0, key: 'Am', tags: ['strings', 'lush'], color: '#10B981', icon: Music },
  { id: '36', name: 'Lead Acid', category: 'Synths', duration: 1.8, bpm: 130, key: 'E', tags: ['lead', 'acid'], color: '#10B981', icon: Music },
  { id: '37', name: 'Pad Dark', category: 'Synths', duration: 5.0, key: 'Fm', tags: ['pad', 'dark'], color: '#10B981', icon: Music },
  { id: '38', name: 'Arp Slow', category: 'Synths', duration: 2.0, bpm: 90, key: 'Bb', tags: ['arp', 'slow'], color: '#10B981', icon: Music },
  { id: '39', name: 'Pluck Perc', category: 'Synths', duration: 0.3, key: 'A', tags: ['pluck', 'percussive'], color: '#10B981', icon: Music },
  { id: '40', name: 'Sweep Up', category: 'Synths', duration: 2.0, tags: ['sweep', 'riser'], color: '#10B981', icon: Music },
  { id: '41', name: 'Sweep Down', category: 'Synths', duration: 1.5, tags: ['sweep', 'fall'], color: '#10B981', icon: Music },
  { id: '42', name: 'Noise White', category: 'Synths', duration: 1.0, tags: ['noise', 'white'], color: '#10B981', icon: Music },

  // Piano - 9 sounds
  { id: '43', name: 'Piano C', category: 'Piano', duration: 2.0, key: 'C', tags: ['piano', 'chord'], color: '#F59E0B', icon: Piano },
  { id: '44', name: 'Piano Am', category: 'Piano', duration: 2.2, key: 'Am', tags: ['piano', 'minor'], color: '#F59E0B', icon: Piano },
  { id: '45', name: 'Piano G', category: 'Piano', duration: 1.8, key: 'G', tags: ['piano', 'major'], color: '#F59E0B', icon: Piano },
  { id: '46', name: 'Piano F', category: 'Piano', duration: 2.1, key: 'F', tags: ['piano', 'chord'], color: '#F59E0B', icon: Piano },
  { id: '47', name: 'Piano Em', category: 'Piano', duration: 2.3, key: 'Em', tags: ['piano', 'emotional'], color: '#F59E0B', icon: Piano },
  { id: '48', name: 'Piano Dm', category: 'Piano', duration: 2.0, key: 'Dm', tags: ['piano', 'dark'], color: '#F59E0B', icon: Piano },
  { id: '49', name: 'Piano Stab', category: 'Piano', duration: 0.5, key: 'C', tags: ['piano', 'stab'], color: '#F59E0B', icon: Piano },
  { id: '50', name: 'Piano Roll', category: 'Piano', duration: 1.2, bpm: 120, key: 'G', tags: ['piano', 'roll'], color: '#F59E0B', icon: Piano },
  { id: '51', name: 'Piano Soft', category: 'Piano', duration: 3.0, key: 'Am', tags: ['piano', 'soft'], color: '#F59E0B', icon: Piano },

  // Guitar - 9 sounds
  { id: '52', name: 'Guitar C', category: 'Guitar', duration: 1.5, key: 'C', tags: ['guitar', 'chord'], color: '#EF4444', icon: Guitar },
  { id: '53', name: 'Guitar Am', category: 'Guitar', duration: 1.8, key: 'Am', tags: ['guitar', 'acoustic'], color: '#EF4444', icon: Guitar },
  { id: '54', name: 'Guitar G', category: 'Guitar', duration: 1.6, key: 'G', tags: ['guitar', 'strum'], color: '#EF4444', icon: Guitar },
  { id: '55', name: 'Guitar F', category: 'Guitar', duration: 1.7, key: 'F', tags: ['guitar', 'fingerpick'], color: '#EF4444', icon: Guitar },
  { id: '56', name: 'Guitar Em', category: 'Guitar', duration: 2.0, key: 'Em', tags: ['guitar', 'emotional'], color: '#EF4444', icon: Guitar },
  { id: '57', name: 'Guitar Dm', category: 'Guitar', duration: 1.9, key: 'Dm', tags: ['guitar', 'minor'], color: '#EF4444', icon: Guitar },
  { id: '58', name: 'Guitar Lead', category: 'Guitar', duration: 2.5, key: 'E', tags: ['guitar', 'lead'], color: '#EF4444', icon: Guitar },
  { id: '59', name: 'Guitar Mute', category: 'Guitar', duration: 0.3, tags: ['guitar', 'muted'], color: '#EF4444', icon: Guitar },
  { id: '60', name: 'Guitar Slide', category: 'Guitar', duration: 1.0, tags: ['guitar', 'slide'], color: '#EF4444', icon: Guitar },

  // Vocals - 12 sounds
  { id: '61', name: 'Vocal Ah C', category: 'Vocals', duration: 1.0, key: 'C', tags: ['vocal', 'ah'], color: '#EC4899', icon: Mic },
  { id: '62', name: 'Vocal Oh G', category: 'Vocals', duration: 1.2, key: 'G', tags: ['vocal', 'oh'], color: '#EC4899', icon: Mic },
  { id: '63', name: 'Vocal Eh F', category: 'Vocals', duration: 0.8, key: 'F', tags: ['vocal', 'eh'], color: '#EC4899', icon: Mic },
  { id: '64', name: 'Vocal Mm Am', category: 'Vocals', duration: 1.5, key: 'Am', tags: ['vocal', 'mm'], color: '#EC4899', icon: Mic },
  { id: '65', name: 'Vocal Choir', category: 'Vocals', duration: 2.0, key: 'C', tags: ['vocal', 'choir'], color: '#EC4899', icon: Mic },
  { id: '66', name: 'Vocal Whisper', category: 'Vocals', duration: 1.8, tags: ['vocal', 'whisper'], color: '#EC4899', icon: Mic },
  { id: '67', name: 'Vocal Shout', category: 'Vocals', duration: 0.5, tags: ['vocal', 'shout'], color: '#EC4899', icon: Mic },
  { id: '68', name: 'Vocal Breath', category: 'Vocals', duration: 0.3, tags: ['vocal', 'breath'], color: '#EC4899', icon: Mic },
  { id: '69', name: 'Vocal Hum', category: 'Vocals', duration: 2.5, key: 'Em', tags: ['vocal', 'hum'], color: '#EC4899', icon: Mic },
  { id: '70', name: 'Vocal Scat', category: 'Vocals', duration: 1.0, tags: ['vocal', 'scat'], color: '#EC4899', icon: Mic },
  { id: '71', name: 'Vocal Doo', category: 'Vocals', duration: 0.6, key: 'G', tags: ['vocal', 'doo'], color: '#EC4899', icon: Mic },
  { id: '72', name: 'Vocal La', category: 'Vocals', duration: 1.3, key: 'D', tags: ['vocal', 'la'], color: '#EC4899', icon: Mic }
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
    setTimeout(() => setPlayingSound(null), 800);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg h-full flex flex-col">
      {/* Compact Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-300">SOUNDS</h3>
          <span className="text-xs text-gray-500">{filteredSounds.length}</span>
        </div>
        
        {/* Compact Search */}
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-7 pr-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Compact Category Pills */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Sound List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-1">
          {filteredSounds.map(sound => {
            const Icon = sound.icon;
            return (
              <div
                key={sound.id}
                draggable
                onDragStart={(e) => handleSoundDragStart(e, sound)}
                onClick={() => onSoundSelect(sound)}
                className="group flex items-center gap-2 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors border-l-2 border-transparent hover:border-yellow-500"
              >
                {/* Icon */}
                <div
                  className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: sound.color + '20' }}
                >
                  <Icon className="w-3 h-3" style={{ color: sound.color }} />
                </div>

                {/* Sound Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white truncate">{sound.name}</span>
                    <div className="flex items-center gap-1">
                      {sound.key && (
                        <span className="text-xs text-gray-500 bg-gray-800 px-1 rounded">{sound.key}</span>
                      )}
                      {sound.bpm && (
                        <span className="text-xs text-gray-500">{sound.bpm}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-500">{sound.duration}s</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound(sound.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
                    >
                      {playingSound === sound.id ? (
                        <Pause className="w-3 h-3 text-yellow-500" />
                      ) : (
                        <Play className="w-3 h-3 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSounds.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs">No sounds found</p>
          </div>
        )}
      </div>

      {/* Compact Footer */}
      <div className="p-2 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-500">Drag sounds to timeline</p>
      </div>
    </div>
  );
}

export default SoundLibrary;