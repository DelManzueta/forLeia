import React, { useState, useCallback } from 'react';
import { 
  Play, Pause, Square, RotateCcw, Volume2, VolumeX, Save, Download, 
  Settings, Music, Drum, Piano, Guitar, Mic, Search, Filter, 
  Trash2, Copy, Plus, X, Grid, List
} from 'lucide-react';

interface Sound {
  id: string;
  name: string;
  category: string;
  genre: string;
  instrument: string;
  duration: number;
  bpm: number;
  key?: string;
  tags: string[];
  color: string;
  icon: string;
}

interface Track {
  id: string;
  sound: Sound;
  startTime: number;
  volume: number;
  muted: boolean;
  solo: boolean;
  position: number;
}

// Icon mapping
const iconMap = {
  'Drum': Drum,
  'Music': Music,
  'Piano': Piano,
  'Guitar': Guitar,
  'Mic': Mic
};

// Professional sound library
const soundLibrary: Sound[] = [
  {
    id: '1',
    name: 'Trap Kick 808',
    category: 'Drums',
    genre: 'Hip Hop',
    instrument: 'Kick',
    duration: 0.8,
    bpm: 140,
    tags: ['kick', '808', 'trap'],
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
    bpm: 140,
    tags: ['snare', 'trap'],
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
    bpm: 140,
    tags: ['hihat', 'closed'],
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
    bpm: 140,
    tags: ['hihat', 'open'],
    color: '#FF6B6B',
    icon: 'Drum'
  },
  {
    id: '5',
    name: 'Sub Bass C',
    category: 'Bass',
    genre: 'Hip Hop',
    instrument: '808',
    duration: 2.0,
    bpm: 140,
    key: 'C',
    tags: ['808', 'sub', 'bass'],
    color: '#8B5CF6',
    icon: 'Music'
  },
  {
    id: '6',
    name: 'Reese Bass F',
    category: 'Bass',
    genre: 'Electronic',
    instrument: 'Synth Bass',
    duration: 1.5,
    bpm: 174,
    key: 'F',
    tags: ['reese', 'dnb'],
    color: '#8B5CF6',
    icon: 'Music'
  },
  {
    id: '7',
    name: 'Trap Lead',
    category: 'Synths',
    genre: 'Hip Hop',
    instrument: 'Lead',
    duration: 2.0,
    bpm: 140,
    key: 'C',
    tags: ['lead', 'trap'],
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
    bpm: 120,
    key: 'Am',
    tags: ['pad', 'ambient'],
    color: '#10B981',
    icon: 'Music'
  },
  {
    id: '9',
    name: 'Lo-Fi Piano',
    category: 'Piano',
    genre: 'Hip Hop',
    instrument: 'Piano',
    duration: 2.0,
    bpm: 85,
    key: 'C',
    tags: ['piano', 'lo-fi'],
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
    bpm: 128,
    key: 'F',
    tags: ['piano', 'house'],
    color: '#F59E0B',
    icon: 'Piano'
  }
];

function BeatLab() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [projectName, setProjectName] = useState('Untitled Project');
  
  // Sound Library State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter options
  const allCategories = Array.from(new Set(soundLibrary.map(s => s.category)));
  const allGenres = Array.from(new Set(soundLibrary.map(s => s.genre)));
  const allInstruments = Array.from(new Set(soundLibrary.map(s => s.instrument)));
  
  const filterOptions = [
    ...allCategories.map(cat => ({ value: cat, label: cat })),
    ...allGenres.map(genre => ({ value: genre, label: genre })),
    ...allInstruments.map(inst => ({ value: inst, label: inst }))
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

  const handleSoundSelect = useCallback((sound: Sound) => {
    // Create a new track from the selected sound
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      sound,
      startTime: currentTime,
      volume: 1,
      muted: false,
      solo: false,
      position: currentTime * 50 // 50 pixels per second
    };
    
    setTracks(prev => [...prev, newTrack]);
    
    // Play sound preview
    playSound(sound.id);
  }, [currentTime]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const soundData = e.dataTransfer.getData('application/json');
      if (soundData) {
        const sound: Sound = JSON.parse(soundData);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 200; // Account for track controls width
        const startTime = Math.max(0, x / 50); // 50 pixels per second
        
        const newTrack: Track = {
          id: `track-${Date.now()}`,
          sound,
          startTime,
          volume: 1,
          muted: false,
          solo: false,
          position: x
        };
        
        setTracks(prev => [...prev, newTrack]);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleSoundDragStart = (e: React.DragEvent, sound: Sound) => {
    e.dataTransfer.setData('application/json', JSON.stringify(sound));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const playSound = (soundId: string) => {
    setPlayingSound(soundId);
    setTimeout(() => setPlayingSound(null), 800);
  };

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  const deleteTrack = (trackId: string) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  const toggleMute = (trackId: string) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, muted: !track.muted } : track
    ));
  };

  const toggleSolo = (trackId: string) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, solo: !track.solo } : track
    ));
  };

  const updateVolume = (trackId: string, volume: number) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, volume } : track
    ));
  };

  const duplicateTrack = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      const newTrack: Track = {
        ...track,
        id: `track-${Date.now()}`,
        startTime: track.startTime + track.sound.duration + 0.5
      };
      setTracks([...tracks, newTrack]);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleReset = () => {
    setTracks([]);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const saveProject = () => {
    const project = {
      name: projectName,
      tracks,
      bpm,
      masterVolume,
      createdAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate time markers for timeline
  const maxTime = Math.max(60, ...tracks.map(t => t.startTime + t.sound.duration));
  const timeMarkers = [];
  for (let i = 0; i <= maxTime; i += 5) {
    timeMarkers.push(i);
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Beat Lab</h1>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:border-blue-500"
              placeholder="Project name..."
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveProject}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => alert('Export functionality would render audio file')}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="flex items-center justify-center w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors"
            >
              <Square className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors"
              title="Clear all tracks"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
            
            {/* Time Display */}
            <div className="bg-gray-900 text-green-400 px-4 py-2 rounded font-mono text-lg">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(1).padStart(4, '0')}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* BPM Control */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">BPM:</span>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value) || 120)}
                className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-sm focus:outline-none focus:border-blue-500"
                min="60"
                max="200"
              />
            </div>
            
            {/* Master Volume */}
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gray-300" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                className="w-20 accent-blue-500"
              />
              <span className="text-sm text-gray-300 w-8">
                {Math.round(masterVolume * 100)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sound Library Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Library Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Sound Library</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded transition-colors ${
                  showFilters ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400'
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search sounds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="space-y-2">
                {selectedFilters.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedFilters.map(filter => (
                      <button
                        key={filter}
                        onClick={() => removeFilter(filter)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-500"
                      >
                        {filter}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                  {filterOptions
                    .filter(option => !selectedFilters.includes(option.value))
                    .slice(0, 8)
                    .map(option => (
                      <button
                        key={option.value}
                        onClick={() => addFilter(option.value)}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600"
                      >
                        <Plus className="w-3 h-3" />
                        {option.label}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound List */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-2">
              {filteredSounds.map(sound => {
                const IconComponent = iconMap[sound.icon as keyof typeof iconMap] || Music;
                return (
                  <div
                    key={sound.id}
                    draggable
                    onDragStart={(e) => handleSoundDragStart(e, sound)}
                    onClick={() => handleSoundSelect(sound)}
                    className="group bg-gray-700 hover:bg-gray-600 rounded-lg p-3 cursor-pointer transition-all border border-gray-600 hover:border-blue-500"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{ backgroundColor: sound.color + '40', border: `1px solid ${sound.color}` }}
                      >
                        <IconComponent className="w-4 h-4" style={{ color: sound.color }} />
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
                          <Pause className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Play className="w-4 h-4 text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Timeline Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Timeline</h2>
              <div className="text-sm text-gray-400">
                {tracks.length} tracks • {Math.floor(currentTime)}s
              </div>
            </div>
          </div>

          {/* Time Ruler */}
          <div className="bg-gray-800 border-b border-gray-700 h-10 relative">
            <div className="flex h-full">
              <div className="w-48 bg-gray-700 border-r border-gray-600 flex items-center justify-center">
                <span className="text-xs text-gray-400">Track Controls</span>
              </div>
              <div className="flex-1 relative">
                {timeMarkers.map(time => (
                  <div
                    key={time}
                    className="absolute top-0 bottom-0 border-l border-gray-600"
                    style={{ left: time * 50 }}
                  >
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                ))}
                
                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
                  style={{ left: currentTime * 50 }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracks */}
          <div 
            className="flex-1 overflow-auto"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {tracks.length === 0 ? (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-600 m-4 rounded-xl">
                <div className="text-center text-gray-500">
                  <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg mb-1">No tracks yet</p>
                  <p className="text-sm">Drag sounds from the library to create tracks</p>
                </div>
              </div>
            ) : (
              tracks.map((track, index) => {
                const IconComponent = iconMap[track.sound.icon as keyof typeof iconMap] || Music;
                return (
                  <div
                    key={track.id}
                    className="flex border-b border-gray-700 h-20 hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Track Controls */}
                    <div className="w-48 bg-gray-800 border-r border-gray-600 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{ backgroundColor: track.sound.color + '40' }}
                        >
                          <IconComponent className="w-4 h-4" style={{ color: track.sound.color }} />
                        </div>
                        <span className="text-sm font-medium truncate flex-1" title={track.sound.name}>
                          {track.sound.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSolo(track.id)}
                          className={`px-2 py-1 text-xs rounded font-bold ${
                            track.solo ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                          }`}
                        >
                          S
                        </button>
                        <button
                          onClick={() => toggleMute(track.id)}
                          className={`px-2 py-1 text-xs rounded font-bold ${
                            track.muted ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                          }`}
                        >
                          M
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={track.volume}
                          onChange={(e) => updateVolume(track.id, parseFloat(e.target.value))}
                          className="flex-1 accent-blue-500"
                        />
                        <span className="text-xs text-gray-400 w-8">
                          {Math.round(track.volume * 100)}
                        </span>
                      </div>
                    </div>

                    {/* Track Timeline */}
                    <div className="flex-1 relative bg-gray-900">
                      <div
                        className="absolute top-2 bottom-2 rounded cursor-move group shadow-lg border-2"
                        style={{
                          left: track.startTime * 50,
                          width: track.sound.duration * 50,
                          backgroundColor: track.sound.color + '60',
                          borderColor: track.sound.color,
                          minWidth: '40px'
                        }}
                      >
                        {/* Waveform visualization */}
                        <div className="h-full flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 opacity-30">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute bg-current"
                                style={{
                                  left: `${i * 3.33}%`,
                                  top: `${30 + Math.random() * 40}%`,
                                  width: '1px',
                                  height: `${Math.random() * 40 + 20}%`
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium text-white relative z-10">
                            {track.sound.name}
                          </span>
                        </div>

                        {/* Track Actions */}
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateTrack(track.id);
                              }}
                              className="p-1 bg-black/70 hover:bg-black/90 rounded text-white transition-colors"
                              title="Duplicate"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTrack(track.id);
                              }}
                              className="p-1 bg-black/70 hover:bg-red-500 rounded text-white transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              {isPlaying ? 'Playing' : 'Stopped'}
            </span>
            <span>Tracks: {tracks.length}</span>
            <span>BPM: {bpm}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Master: {Math.round(masterVolume * 100)}%</span>
            <span>44.1kHz • 24-bit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeatLab;