import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Square, RotateCcw, Volume2, VolumeX, Save, Download, 
  Settings, Music, Drum, Piano, Guitar, Mic, Search, Filter, 
  Trash2, Copy, Plus, X, Grid, List, Headphones, Layers, Radio,
  SkipBack, SkipForward, Record, Repeat, Shuffle, Home, Folder,
  ChevronDown, ChevronRight, Eye, EyeOff, Lock, Unlock, MoreHorizontal
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
  name: string;
  sound: Sound;
  startTime: number;
  duration: number;
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
  armed: boolean;
  color: string;
  clips: TrackClip[];
}

interface TrackClip {
  id: string;
  startTime: number;
  duration: number;
  offset: number;
  gain: number;
}

const soundLibrary: Sound[] = [
  // Drums
  { id: '1', name: 'Big Room', category: 'Drums', genre: 'Electronic', instrument: 'Kick', duration: 0.8, bpm: 128, tags: ['kick', 'big room'], color: '#FF6B6B', icon: 'Drum' },
  { id: '2', name: 'Hat Clap', category: 'Drums', genre: 'Hip Hop', instrument: 'Clap', duration: 0.3, bpm: 140, tags: ['clap', 'hat'], color: '#FF6B6B', icon: 'Drum' },
  { id: '3', name: 'Swinging Arp', category: 'Synths', genre: 'Electronic', instrument: 'Arp', duration: 2.0, bpm: 120, key: 'C', tags: ['arp', 'swing'], color: '#10B981', icon: 'Music' },
  { id: '4', name: 'Kick 03', category: 'Drums', genre: 'Hip Hop', instrument: 'Kick', duration: 0.6, bpm: 90, tags: ['kick', 'boom bap'], color: '#FF6B6B', icon: 'Drum' },
  { id: '5', name: 'Kick 04', category: 'Drums', genre: 'Hip Hop', instrument: 'Kick', duration: 0.5, bpm: 85, tags: ['kick', 'lo-fi'], color: '#FF6B6B', icon: 'Drum' },
  { id: '6', name: 'Grand Piano', category: 'Piano', genre: 'Classical', instrument: 'Piano', duration: 3.0, bpm: 120, key: 'C', tags: ['piano', 'grand'], color: '#F59E0B', icon: 'Piano' },
  { id: '7', name: 'House Bass', category: 'Bass', genre: 'Electronic', instrument: 'Bass', duration: 2.0, bpm: 128, key: 'F', tags: ['bass', 'house'], color: '#8B5CF6', icon: 'Music' },
  { id: '8', name: 'Electro Bass', category: 'Bass', genre: 'Electronic', instrument: 'Bass', duration: 1.8, bpm: 130, key: 'G', tags: ['bass', 'electro'], color: '#8B5CF6', icon: 'Music' },
];

const instrumentCategories = [
  { name: 'After Party', sounds: ['Big Room', 'Hat Clap', 'Swinging Arp'] },
  { name: 'Beat Machine', sounds: ['Kick 03', 'Kick 04'] },
  { name: 'Big Room', sounds: ['Big Room'] },
  { name: 'Boutique 78', sounds: [] },
  { name: 'Breakbeat 808', sounds: [] },
  { name: 'Crate Digger', sounds: [] },
  { name: 'Dub Smooth', sounds: [] },
  { name: 'Electric Bump', sounds: [] },
  { name: 'Epic Electro', sounds: [] },
  { name: 'Gritty Funk', sounds: [] },
  { name: 'Indie Disco', sounds: [] },
  { name: 'Major Crush', sounds: [] },
  { name: 'Modern Club', sounds: [] },
  { name: 'Nu Disco', sounds: [] },
  { name: 'Pie Delux', sounds: [] },
  { name: 'Retro Funk', sounds: [] },
  { name: 'Silverbox', sounds: [] },
  { name: 'Study Beats', sounds: [] },
  { name: 'Trap Door', sounds: [] }
];

function BeatLab() {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      name: 'Big Room',
      sound: soundLibrary[0],
      startTime: 0,
      duration: 8,
      volume: 0.8,
      pan: 0,
      muted: false,
      solo: false,
      armed: false,
      color: '#4ADE80',
      clips: [
        { id: 'clip1', startTime: 0, duration: 2, offset: 0, gain: 1 },
        { id: 'clip2', startTime: 4, duration: 2, offset: 0, gain: 1 },
        { id: 'clip3', startTime: 8, duration: 2, offset: 0, gain: 1 }
      ]
    },
    {
      id: '2',
      name: 'Hat Clap',
      sound: soundLibrary[1],
      startTime: 0,
      duration: 8,
      volume: 0.6,
      pan: 0,
      muted: false,
      solo: false,
      armed: false,
      color: '#60A5FA',
      clips: [
        { id: 'clip4', startTime: 1, duration: 1, offset: 0, gain: 1 },
        { id: 'clip5', startTime: 3, duration: 1, offset: 0, gain: 1 },
        { id: 'clip6', startTime: 5, duration: 1, offset: 0, gain: 1 },
        { id: 'clip7', startTime: 7, duration: 1, offset: 0, gain: 1 }
      ]
    },
    {
      id: '3',
      name: 'Swinging Arp',
      sound: soundLibrary[2],
      startTime: 0,
      duration: 8,
      volume: 0.7,
      pan: 0,
      muted: false,
      solo: false,
      armed: false,
      color: '#4ADE80',
      clips: [
        { id: 'clip8', startTime: 0, duration: 8, offset: 0, gain: 1 }
      ]
    },
    {
      id: '4',
      name: 'Kick 03',
      sound: soundLibrary[3],
      startTime: 0,
      duration: 8,
      volume: 0.9,
      pan: 0,
      muted: false,
      solo: false,
      armed: false,
      color: '#4ADE80',
      clips: [
        { id: 'clip9', startTime: 0, duration: 0.5, offset: 0, gain: 1 },
        { id: 'clip10', startTime: 2, duration: 0.5, offset: 0, gain: 1 },
        { id: 'clip11', startTime: 4, duration: 0.5, offset: 0, gain: 1 },
        { id: 'clip12', startTime: 6, duration: 0.5, offset: 0, gain: 1 }
      ]
    },
    {
      id: '5',
      name: 'Grand Piano',
      sound: soundLibrary[5],
      startTime: 0,
      duration: 8,
      volume: 0.5,
      pan: 0,
      muted: false,
      solo: false,
      armed: false,
      color: '#4ADE80',
      clips: [
        { id: 'clip13', startTime: 2, duration: 2, offset: 0, gain: 1 },
        { id: 'clip14', startTime: 6, duration: 2, offset: 0, gain: 1 }
      ]
    },
    {
      id: '6',
      name: 'House Bass',
      sound: soundLibrary[6],
      startTime: 0,
      duration: 8,
      volume: 0.7,
      pan: 0,
      muted: false,
      solo: false,
      armed: false,
      color: '#4ADE80',
      clips: [
        { id: 'clip15', startTime: 0, duration: 8, offset: 0, gain: 1 }
      ]
    }
  ]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [selectedCategory, setSelectedCategory] = useState('After Party');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInstrument, setShowInstrument] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // Audio context for real sound
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.connect(audioContextRef.current.destination);
    masterGainRef.current.gain.value = masterVolume;

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = masterVolume;
    }
  }, [masterVolume]);

  // Playback timer
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const soundData = e.dataTransfer.getData('application/json');
      if (soundData) {
        const sound: Sound = JSON.parse(soundData);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 300; // Account for mixer width
        const startTime = Math.max(0, (x / 50) / zoom); // 50px per second
        
        const newTrack: Track = {
          id: `track-${Date.now()}`,
          name: sound.name,
          sound,
          startTime: 0,
          duration: 8,
          volume: 0.7,
          pan: 0,
          muted: false,
          solo: false,
          armed: false,
          color: sound.color,
          clips: [{ id: `clip-${Date.now()}`, startTime, duration: sound.duration, offset: 0, gain: 1 }]
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

  const updatePan = (trackId: string, pan: number) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, pan } : track
    ));
  };

  const deleteTrack = (trackId: string) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  const handleSoundDragStart = (e: React.DragEvent, sound: Sound) => {
    e.dataTransfer.setData('application/json', JSON.stringify(sound));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const playSound = async (sound: Sound) => {
    if (!audioContextRef.current) return;
    
    try {
      // Create a simple oscillator for demo (in real app, would load actual audio files)
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(masterGainRef.current!);
      
      // Different frequencies for different instruments
      const frequencies = {
        'Kick': 60,
        'Clap': 200,
        'Arp': 440,
        'Piano': 523,
        'Bass': 80
      };
      
      oscillator.frequency.value = frequencies[sound.instrument as keyof typeof frequencies] || 440;
      oscillator.type = sound.instrument === 'Kick' ? 'sine' : sound.instrument === 'Clap' ? 'noise' : 'square';
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + sound.duration);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + sound.duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Generate time markers
  const timeMarkers = Array.from({ length: 17 }, (_, i) => i);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Top Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-700 rounded">
                <Home className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-700 rounded">
                <Folder className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="text-sm text-gray-300">More Like This</div>
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
              Save
            </button>
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
              Permalink
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Transport Controls */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-700 rounded">
                <SkipBack className="w-4 h-4 text-gray-300" />
              </button>
              <button
                onClick={handlePlay}
                className="p-2 bg-green-600 hover:bg-green-500 rounded"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={handleStop}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <Square className="w-4 h-4 text-gray-300" />
              </button>
              <button className="p-1 hover:bg-gray-700 rounded">
                <SkipForward className="w-4 h-4 text-gray-300" />
              </button>
            </div>

            {/* Time Display */}
            <div className="bg-black px-3 py-1 rounded font-mono text-green-400 text-sm">
              {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')}:{Math.floor((currentTime % 1) * 100).toString().padStart(2, '0')}
            </div>

            {/* BPM and Controls */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">♩ = {bpm}</span>
              <button className="p-1 hover:bg-gray-700 rounded">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Sound Library */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Library Header */}
          <div className="p-3 border-b border-gray-700">
            <div className="text-sm font-medium text-gray-300 mb-2">Library</div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search Library"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-3 py-1 bg-gray-900 border border-gray-600 rounded text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto">
            {instrumentCategories.map((category) => (
              <div key={category.name} className="border-b border-gray-700">
                <button
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center justify-between"
                >
                  {category.name}
                  {selectedCategory === category.name ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>
                {selectedCategory === category.name && (
                  <div className="bg-gray-900 px-3 py-2">
                    {soundLibrary
                      .filter(sound => category.sounds.includes(sound.name) || category.name === 'After Party')
                      .map(sound => (
                        <div
                          key={sound.id}
                          draggable
                          onDragStart={(e) => handleSoundDragStart(e, sound)}
                          onClick={() => playSound(sound)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded cursor-pointer text-xs text-gray-400"
                        >
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: sound.color }}></div>
                          {sound.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center - Track Mixer */}
        <div className="w-80 bg-gray-850 border-r border-gray-700 flex flex-col">
          {/* Mixer Header */}
          <div className="p-3 border-b border-gray-700">
            <div className="text-sm font-medium text-gray-300">Track Mixer</div>
          </div>

          {/* Track Controls */}
          <div className="flex-1 overflow-y-auto">
            {tracks.map((track) => (
              <div
                key={track.id}
                className={`border-b border-gray-700 p-3 ${
                  selectedTrack === track.id ? 'bg-gray-700' : 'hover:bg-gray-800'
                }`}
                onClick={() => setSelectedTrack(track.id)}
              >
                {/* Track Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: track.color }}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white truncate">{track.name}</div>
                    <div className="text-xs text-gray-400">{track.sound.instrument}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTrack(track.id);
                    }}
                    className="p-1 hover:bg-gray-600 rounded opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>

                {/* Controls */}
                <div className="space-y-2">
                  {/* Solo/Mute/Arm */}
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSolo(track.id);
                      }}
                      className={`px-2 py-1 text-xs rounded font-bold ${
                        track.solo ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      S
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute(track.id);
                      }}
                      className={`px-2 py-1 text-xs rounded font-bold ${
                        track.muted ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      M
                    </button>
                    <button
                      className={`px-2 py-1 text-xs rounded font-bold ${
                        track.armed ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      R
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Vol</span>
                      <span>{Math.round(track.volume * 100)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={track.volume}
                      onChange={(e) => updateVolume(track.id, parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Pan Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Pan</span>
                      <span>{track.pan > 0 ? `R${Math.round(track.pan * 100)}` : track.pan < 0 ? `L${Math.round(Math.abs(track.pan) * 100)}` : 'C'}</span>
                    </div>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.01"
                      value={track.pan}
                      onChange={(e) => updatePan(track.id, parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Timeline */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Timeline Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Zoom:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-16 accent-blue-500"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {tracks.length} tracks
              </div>
            </div>
          </div>

          {/* Time Ruler */}
          <div className="bg-gray-800 border-b border-gray-700 h-8 relative">
            <div className="flex h-full">
              {timeMarkers.map(beat => (
                <div
                  key={beat}
                  className="flex-1 border-l border-gray-600 first:border-l-0 relative"
                  style={{ minWidth: `${50 * zoom}px` }}
                >
                  <span className="absolute top-1 left-1 text-xs text-gray-400">
                    {beat + 1}
                  </span>
                </div>
              ))}
              
              {/* Playhead */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
                style={{ left: currentTime * 50 * zoom }}
              >
                <div className="w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1"></div>
              </div>
            </div>
          </div>

          {/* Timeline Tracks */}
          <div 
            className="flex-1 overflow-auto"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`h-16 border-b border-gray-700 relative ${
                  selectedTrack === track.id ? 'bg-gray-800' : 'hover:bg-gray-850'
                }`}
                onClick={() => setSelectedTrack(track.id)}
              >
                {/* Track Background */}
                <div className="absolute inset-0" style={{ backgroundColor: track.color + '10' }}></div>
                
                {/* Track Clips */}
                {track.clips.map(clip => (
                  <div
                    key={clip.id}
                    className="absolute top-1 bottom-1 rounded cursor-move group"
                    style={{
                      left: clip.startTime * 50 * zoom,
                      width: clip.duration * 50 * zoom,
                      backgroundColor: track.color,
                      minWidth: '20px'
                    }}
                  >
                    {/* Waveform visualization */}
                    <div className="h-full flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        {Array.from({ length: Math.floor(clip.duration * 10) }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute bg-black"
                            style={{
                              left: `${i * 10}%`,
                              top: `${30 + Math.random() * 40}%`,
                              width: '1px',
                              height: `${Math.random() * 40 + 20}%`
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-black relative z-10 truncate px-2">
                        {track.name}
                      </span>
                    </div>

                    {/* Clip Actions */}
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1 p-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Duplicate clip logic
                          }}
                          className="p-1 bg-black/50 hover:bg-black/70 rounded text-white"
                        >
                          <Copy className="w-2 h-2" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Delete clip logic
                          }}
                          className="p-1 bg-black/50 hover:bg-red-500 rounded text-white"
                        >
                          <Trash2 className="w-2 h-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Drop Zone */}
            {tracks.length === 0 && (
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-600 m-4 rounded">
                <div className="text-center text-gray-500">
                  <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Drag sounds here to create tracks</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panel - Instrument/Effects */}
      {showInstrument && (
        <div className="h-64 bg-gray-800 border-t border-gray-700 flex">
          {/* Instrument Selector */}
          <div className="w-64 border-r border-gray-700 p-4">
            <div className="text-sm font-medium text-gray-300 mb-3">Electronic</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 rounded p-3 text-center">
                <div className="w-12 h-12 bg-gray-600 rounded mx-auto mb-2"></div>
                <div className="text-xs text-gray-300">Presets</div>
              </div>
              <div className="bg-gray-700 rounded p-3 text-center">
                <div className="w-12 h-12 bg-gray-600 rounded mx-auto mb-2"></div>
                <div className="text-xs text-gray-300">Arpfunk</div>
              </div>
            </div>
          </div>

          {/* Instrument Interface */}
          <div className="flex-1 p-4">
            <div className="bg-gray-900 rounded-lg h-full p-4 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {soundLibrary.slice(0, 8).map((sound, i) => (
                    <button
                      key={sound.id}
                      onClick={() => playSound(sound)}
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold transition-all hover:scale-105"
                      style={{ backgroundColor: sound.color }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <p className="text-sm">Click pads or use number keys 1-8</p>
              </div>
            </div>
          </div>

          {/* Effects Panel */}
          <div className="w-48 border-l border-gray-700 p-4">
            <div className="text-sm font-medium text-gray-300 mb-3">Percussion</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Hi-Hat, Cymbals & Shaker</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <button
                    key={i}
                    className="w-8 h-8 bg-yellow-500 rounded-full text-black text-xs font-bold hover:bg-yellow-400 transition-colors"
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Kick, Snare & Claps, Follow
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Master Volume */}
      <div className="bg-gray-800 border-t border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                className="w-24 accent-green-500"
              />
              <span className="text-xs text-gray-400 w-8">
                {Math.round(masterVolume * 100)}
              </span>
            </div>
            <button
              onClick={() => setShowInstrument(!showInstrument)}
              className="text-xs text-gray-400 hover:text-white"
            >
              {showInstrument ? 'Hide' : 'Show'} Instrument
            </button>
          </div>
          <div className="text-xs text-gray-500">
            44.1kHz • 24-bit • {isPlaying ? 'Playing' : 'Stopped'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeatLab;