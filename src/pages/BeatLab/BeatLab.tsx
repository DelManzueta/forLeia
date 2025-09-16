import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, Volume2, VolumeX, Save, Download, Settings, Music, Drum, Piano, Guitar, Mic, Search, Filter, Trash2, Copy, Plus, X, Grid, List, Headphones, Layers, Radio, SkipBack, SkipForward, SwordIcon as Record, Repeat, Shuffle, Home, Folder, ChevronDown, ChevronRight, Eye, EyeOff, Lock, Unlock, MoreHorizontal, Zap, Sparkles, AudioWaveform as Waveform, Sliders, Maximize2, Minimize2 } from 'lucide-react';

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
  { id: '1', name: 'Ethereal Kick', category: 'Drums', genre: 'Future Bass', instrument: 'Kick', duration: 0.8, bpm: 140, tags: ['kick', 'ethereal'], color: '#FF6B9D', icon: 'Drum' },
  { id: '2', name: 'Crystal Clap', category: 'Drums', genre: 'Future Bass', instrument: 'Clap', duration: 0.3, bpm: 140, tags: ['clap', 'crystal'], color: '#C084FC', icon: 'Drum' },
  { id: '3', name: 'Neon Hi-Hat', category: 'Drums', genre: 'Synthwave', instrument: 'Hi-Hat', duration: 0.1, bpm: 120, tags: ['hihat', 'neon'], color: '#06D6A0', icon: 'Drum' },
  { id: '4', name: 'Cosmic Bass', category: 'Bass', genre: 'Future Bass', instrument: 'Bass', duration: 2.0, bpm: 140, key: 'C', tags: ['bass', 'cosmic'], color: '#4ECDC4', icon: 'Music' },
  { id: '5', name: 'Dreamy Pad', category: 'Synths', genre: 'Ambient', instrument: 'Pad', duration: 4.0, bpm: 120, key: 'Am', tags: ['pad', 'dreamy'], color: '#A8E6CF', icon: 'Music' },
  { id: '6', name: 'Liquid Piano', category: 'Piano', genre: 'Lo-Fi', instrument: 'Piano', duration: 2.5, bpm: 85, key: 'C', tags: ['piano', 'liquid'], color: '#FFD93D', icon: 'Piano' },
  { id: '7', name: 'Stellar Arp', category: 'Synths', genre: 'Synthwave', instrument: 'Arp', duration: 1.5, bpm: 120, key: 'Em', tags: ['arp', 'stellar'], color: '#6BCF7F', icon: 'Music' },
  { id: '8', name: 'Velvet Guitar', category: 'Guitar', genre: 'Indie', instrument: 'Guitar', duration: 3.0, bpm: 110, key: 'G', tags: ['guitar', 'velvet'], color: '#FF8B94', icon: 'Guitar' },
];

const drumPads = [
  { id: 'pad1', name: 'Ethereal Kick', key: '1', color: '#FF6B9D', sound: soundLibrary[0] },
  { id: 'pad2', name: 'Crystal Clap', key: '2', color: '#C084FC', sound: soundLibrary[1] },
  { id: 'pad3', name: 'Neon Hi-Hat', key: '3', color: '#06D6A0', sound: soundLibrary[2] },
  { id: 'pad4', name: 'Cosmic Bass', key: '4', color: '#4ECDC4', sound: soundLibrary[3] },
  { id: 'pad5', name: 'Dreamy Pad', key: '5', color: '#A8E6CF', sound: soundLibrary[4] },
  { id: 'pad6', name: 'Liquid Piano', key: '6', color: '#FFD93D', sound: soundLibrary[5] },
  { id: 'pad7', name: 'Stellar Arp', key: '7', color: '#6BCF7F', sound: soundLibrary[6] },
  { id: 'pad8', name: 'Velvet Guitar', key: '8', color: '#FF8B94', sound: soundLibrary[7] },
  { id: 'pad9', name: 'Ambient FX', key: '9', color: '#B19CD9', sound: soundLibrary[0] },
];

function BeatLab() {
  const [activeView, setActiveView] = useState<'studio' | 'pads' | 'library'>('studio');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(140);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePads, setActivePads] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
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
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const playSound = async (sound: Sound, padId?: string) => {
    if (!audioContextRef.current || !masterGainRef.current) return;
    
    if (padId) {
      setActivePads(prev => [...prev, padId]);
      setTimeout(() => setActivePads(prev => prev.filter(id => id !== padId)), 200);
      
      if (isRecording) {
        setSequence(prev => [...prev, padId]);
      }
    }

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      const filterNode = audioContextRef.current.createBiquadFilter();
      
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(masterGainRef.current);
      
      const frequencies = {
        'Kick': 60,
        'Clap': 200,
        'Hi-Hat': 8000,
        'Bass': 80,
        'Pad': 440,
        'Piano': 523,
        'Arp': 880,
        'Guitar': 330
      };
      
      oscillator.frequency.value = frequencies[sound.instrument as keyof typeof frequencies] || 440;
      oscillator.type = sound.instrument === 'Kick' ? 'sine' : 
                      sound.instrument === 'Hi-Hat' ? 'sawtooth' : 
                      sound.instrument === 'Clap' ? 'square' : 'triangle';
      
      filterNode.frequency.value = sound.instrument === 'Hi-Hat' ? 10000 : 2000;
      filterNode.Q.value = 1;
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + sound.duration);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + sound.duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const soundData = e.dataTransfer.getData('application/json');
      if (soundData) {
        const sound: Sound = JSON.parse(soundData);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const startTime = Math.max(0, (x / 60) / zoom);
        
        const newTrack: Track = {
          id: `track-${Date.now()}`,
          name: sound.name,
          sound,
          startTime: 0,
          duration: 16,
          volume: 0.7,
          pan: 0,
          muted: false,
          solo: false,
          armed: false,
          color: sound.color,
          clips: [{ 
            id: `clip-${Date.now()}`, 
            startTime, 
            duration: sound.duration, 
            offset: 0, 
            gain: 1 
          }]
        };
        
        setTracks(prev => [...prev, newTrack]);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

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

  const deleteTrack = (trackId: string) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  const filteredSounds = soundLibrary.filter(sound => {
    const matchesSearch = sound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sound.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || sound.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const timeMarkers = Array.from({ length: 17 }, (_, i) => i);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col overflow-hidden">
      {/* Modern Top Bar */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Project Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">Beat Studio Pro</span>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 text-sm font-medium">
              <Save className="w-4 h-4 inline mr-2" />
              Save Project
            </button>
          </div>

          {/* Center - Transport */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTime(0)}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={handlePlay}
              className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={handleStop}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <Square className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Right - Status */}
          <div className="flex items-center gap-4">
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-emerald-400 font-mono text-sm">
                {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-purple-400 font-mono text-sm">♩ {bpm}</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <div className="w-20 h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                  style={{ width: `${masterVolume * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Modern Sidebar - Sound Library */}
        <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
          {/* Library Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sound Library
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveView('library')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    activeView === 'library' ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/10'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveView('pads')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    activeView === 'pads' ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/10'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modern Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sounds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-400"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['all', 'Drums', 'Bass', 'Synths', 'Piano', 'Guitar'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/10 hover:bg-white/20 text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeView === 'pads' ? (
              /* Drum Pads View */
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {drumPads.map(pad => (
                    <button
                      key={pad.id}
                      onClick={() => playSound(pad.sound, pad.id)}
                      className={`relative group h-20 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        activePads.includes(pad.id) ? 'scale-95' : ''
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${pad.color}40, ${pad.color}80)`,
                        boxShadow: activePads.includes(pad.id) 
                          ? `0 0 30px ${pad.color}60` 
                          : `0 8px 32px ${pad.color}20`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 rounded-2xl transition-all duration-300" />
                      <div className="relative h-full flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-white mb-1">{pad.key}</span>
                        <span className="text-xs text-white/80 text-center px-2">{pad.name}</span>
                      </div>
                      <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300" />
                    </button>
                  ))}
                </div>

                {/* Sequence Display */}
                {sequence.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-300">Recorded Sequence</span>
                      <button
                        onClick={() => setSequence([])}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sequence.map((padId, index) => {
                        const pad = drumPads.find(p => p.id === padId);
                        return (
                          <div
                            key={index}
                            className="px-2 py-1 rounded-lg text-xs font-medium text-white"
                            style={{ backgroundColor: pad?.color + '80' }}
                          >
                            {pad?.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isRecording
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                </div>
              </div>
            ) : (
              /* Sound Library View */
              <div className="grid grid-cols-1 gap-3">
                {filteredSounds.map(sound => (
                  <div
                    key={sound.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/json', JSON.stringify(sound));
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                    onClick={() => playSound(sound)}
                    className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${sound.color}40, ${sound.color}80)`
                        }}
                      >
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{sound.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span className="px-2 py-0.5 bg-white/10 rounded-full">{sound.genre}</span>
                          {sound.key && (
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full font-mono">
                              {sound.key}
                            </span>
                          )}
                          <span>{sound.duration}s</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Play className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Track Mixer */}
        <div className="w-72 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold text-white mb-2">Track Mixer</h3>
            <div className="text-xs text-gray-400">{tracks.length} tracks</div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {tracks.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-gray-500">
                  <Waveform className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No tracks yet</p>
                  <p className="text-xs mt-1">Drag sounds to timeline</p>
                </div>
              </div>
            ) : (
              tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`border-b border-white/5 p-4 transition-all duration-200 ${
                    selectedTrack === track.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTrack(track.id)}
                >
                  {/* Track Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{ backgroundColor: track.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm truncate">{track.name}</div>
                      <div className="text-xs text-gray-400">{track.sound.instrument}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTrack(track.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>

                  {/* Modern Controls */}
                  <div className="space-y-3">
                    {/* Solo/Mute/Record */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSolo(track.id);
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                          track.solo 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/25' 
                            : 'bg-white/10 hover:bg-white/20 text-gray-300'
                        }`}
                      >
                        SOLO
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(track.id);
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                          track.muted 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25' 
                            : 'bg-white/10 hover:bg-white/20 text-gray-300'
                        }`}
                      >
                        MUTE
                      </button>
                    </div>

                    {/* Modern Volume Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Volume</span>
                        <span className="text-white font-mono">{Math.round(track.volume * 100)}%</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={track.volume}
                          onChange={(e) => updateVolume(track.id, parseFloat(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider-modern"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div 
                          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full pointer-events-none transition-all duration-200"
                          style={{ width: `${track.volume * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Pan Control */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Pan</span>
                        <span className="text-white font-mono">
                          {track.pan === 0 ? 'CENTER' : track.pan > 0 ? `R${Math.round(track.pan * 100)}` : `L${Math.round(Math.abs(track.pan) * 100)}`}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="-1"
                          max="1"
                          step="0.01"
                          value={track.pan}
                          onChange={(e) => setTracks(tracks.map(t => 
                            t.id === track.id ? { ...t, pan: parseFloat(e.target.value) } : t
                          ))}
                          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Timeline Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900/50 to-purple-900/20">
          {/* Timeline Header */}
          <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-white">Timeline</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Maximize2 className="w-4 h-4" />
                  <span>Zoom:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-20 accent-purple-500"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {Math.floor(currentTime)}s / 32 beats
              </div>
            </div>
          </div>

          {/* Time Ruler */}
          <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 h-12 relative overflow-hidden">
            <div className="flex h-full">
              {timeMarkers.map(beat => (
                <div
                  key={beat}
                  className="flex-1 border-l border-white/10 first:border-l-0 relative"
                  style={{ minWidth: `${60 * zoom}px` }}
                >
                  <span className="absolute top-2 left-2 text-xs text-gray-400 font-mono">
                    {beat + 1}
                  </span>
                  {/* Beat subdivisions */}
                  <div className="absolute top-8 left-1/4 w-px h-2 bg-white/5" />
                  <div className="absolute top-8 left-1/2 w-px h-3 bg-white/10" />
                  <div className="absolute top-8 left-3/4 w-px h-2 bg-white/5" />
                </div>
              ))}
              
              {/* Modern Playhead */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-teal-400 z-20 pointer-events-none shadow-lg shadow-emerald-500/50"
                style={{ left: currentTime * 60 * zoom }}
              >
                <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full -translate-x-1/2 -translate-y-1 shadow-lg shadow-emerald-500/50" />
              </div>
            </div>
          </div>

          {/* Timeline Tracks */}
          <div 
            className="flex-1 overflow-auto"
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
          >
            {tracks.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Sparkles className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Start Creating</h3>
                  <p className="text-gray-400 mb-4">Drag sounds from the library to create your first track</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm text-gray-300">
                    <Music className="w-4 h-4" />
                    Drop Zone Active
                  </div>
                </div>
              </div>
            ) : (
              tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`h-20 border-b border-white/5 relative group transition-all duration-200 ${
                    selectedTrack === track.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTrack(track.id)}
                >
                  {/* Track Background */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundColor: track.color }}
                  />
                  
                  {/* Track Clips */}
                  {track.clips.map(clip => (
                    <div
                      key={clip.id}
                      className="absolute top-2 bottom-2 rounded-xl cursor-move group/clip shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden"
                      style={{
                        left: clip.startTime * 60 * zoom,
                        width: Math.max(clip.duration * 60 * zoom, 40),
                        background: `linear-gradient(135deg, ${track.color}80, ${track.color}B0)`,
                        border: `1px solid ${track.color}`
                      }}
                    >
                      {/* Modern Waveform */}
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-30">
                          {Array.from({ length: Math.floor(clip.duration * 20) }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute bg-black/40 rounded-full"
                              style={{
                                left: `${(i / Math.floor(clip.duration * 20)) * 100}%`,
                                top: `${40 + Math.sin(i * 0.5) * 20}%`,
                                width: '2px',
                                height: `${20 + Math.random() * 40}%`,
                                transform: 'translateX(-50%)'
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-white relative z-10 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full">
                          {track.name}
                        </span>
                      </div>

                      {/* Clip Actions */}
                      <div className="absolute top-1 right-1 opacity-0 group-hover/clip:opacity-100 transition-opacity duration-200">
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Duplicate logic
                            }}
                            className="p-1 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-all duration-200 backdrop-blur-sm"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTrack(track.id);
                            }}
                            className="p-1 bg-black/50 hover:bg-red-500 rounded-lg text-white transition-all duration-200 backdrop-blur-sm"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Resize Handles */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 opacity-0 group-hover/clip:opacity-100 cursor-w-resize transition-opacity duration-200" />
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20 opacity-0 group-hover/clip:opacity-100 cursor-e-resize transition-opacity duration-200" />
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modern Bottom Panel */}
      <div className="h-64 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="flex h-full">
          {/* Instrument Selector */}
          <div className="w-80 border-r border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Instruments</h3>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Electronic', icon: Zap, active: true },
                { name: 'Drums', icon: Drum, active: false },
                { name: 'Piano', icon: Piano, active: false },
                { name: 'Guitar', icon: Guitar, active: false }
              ].map(instrument => (
                <button
                  key={instrument.name}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    instrument.active
                      ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <instrument.icon className={`w-8 h-8 mx-auto mb-2 ${
                    instrument.active ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                  <div className={`text-sm font-medium ${
                    instrument.active ? 'text-white' : 'text-gray-400'
                  }`}>
                    {instrument.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Modern Drum Pads */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Beat Pads</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isRecording
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-gray-300'
                  }`}
                >
                  {isRecording ? 'Recording...' : 'Record'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              {drumPads.slice(0, 9).map(pad => (
                <button
                  key={pad.id}
                  onClick={() => playSound(pad.sound, pad.id)}
                  className={`relative group h-20 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    activePads.includes(pad.id) ? 'scale-95' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${pad.color}40, ${pad.color}80)`,
                    boxShadow: activePads.includes(pad.id) 
                      ? `0 0 40px ${pad.color}80, inset 0 0 20px ${pad.color}40` 
                      : `0 8px 32px ${pad.color}20`
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 rounded-2xl transition-all duration-300" />
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white mb-1">{pad.key}</span>
                    <span className="text-xs text-white/90 text-center px-2 font-medium">{pad.name.split(' ')[0]}</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300" />
                  
                  {/* Ripple Effect */}
                  {activePads.includes(pad.id) && (
                    <div 
                      className="absolute inset-0 rounded-2xl animate-ping"
                      style={{ backgroundColor: pad.color + '40' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Effects Panel */}
          <div className="w-64 border-l border-white/10 p-6">
            <h3 className="font-semibold text-white mb-4">Effects</h3>
            <div className="space-y-4">
              {['Reverb', 'Delay', 'Filter', 'Distortion'].map(effect => (
                <div key={effect} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{effect}</span>
                    <button className="w-6 h-6 bg-white/10 hover:bg-emerald-500/50 rounded-lg transition-all duration-200">
                      <div className="w-2 h-2 bg-current rounded-full mx-auto" />
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Status Bar */}
      <div className="bg-black/40 backdrop-blur-xl border-t border-white/10 px-6 py-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 text-gray-400">
            <span>44.1kHz • 24-bit</span>
            <span>•</span>
            <span>{isPlaying ? 'Playing' : 'Stopped'}</span>
            <span>•</span>
            <span>{tracks.length} tracks</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>CPU: 12%</span>
            <span>•</span>
            <span>RAM: 256MB</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .slider-modern::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10B981, #06D6A0);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          border: 2px solid white;
        }
        
        .slider-modern::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10B981, #06D6A0);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}

export default BeatLab;