import React, { useState, useCallback } from 'react';
import { 
  Play, Pause, Square, RotateCcw, Volume2, VolumeX, Save, Download, 
  Settings, Music, Drum, Piano, Guitar, Mic, Search, Filter, 
  Trash2, Copy, Plus, X, Grid, List, Headphones, Layers, Radio
} from 'lucide-react';
import BeatPad from '../../components/BeatLab/BeatPad';
import MyBeats from '../../components/BeatLab/MyBeats';
import VoiceRecorder from '../../components/BeatLab/VoiceRecorder';
import SoundLibrary, { type Sound } from '../../components/BeatLab/SoundLibrary';

interface Track {
  id: string;
  sound: Sound;
  startTime: number;
  volume: number;
  muted: boolean;
  solo: boolean;
  position: number;
}

function BeatLab() {
  const [activeTab, setActiveTab] = useState('studio');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [projectName, setProjectName] = useState('Untitled Project');

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
    
    // Play sound preview (simulated)
    console.log(`Playing sound: ${sound.name}`);
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

  const tabs = [
    { id: 'studio', label: 'Studio', icon: Layers },
    { id: 'beatpad', label: 'Beat Pad', icon: Drum },
    { id: 'mybeats', label: 'My Beats', icon: Music },
    { id: 'recorder', label: 'Voice Recorder', icon: Mic }
  ];

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
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:border-yellow-500"
              placeholder="Project name..."
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveProject}
              className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 rounded text-sm transition-colors"
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

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-4">
        <div className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === id
                  ? 'text-yellow-400 border-yellow-400 bg-gray-700/50'
                  : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-700/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'studio' && (
          <div className="h-full flex">
            {/* Sound Library Sidebar */}
            <div className="w-80 bg-gray-800 border-r border-gray-700">
              <SoundLibrary onSoundSelect={handleSoundSelect} />
            </div>

            {/* Timeline Area */}
            <div className="flex-1 flex flex-col bg-gray-900">
              {/* Transport Controls */}
              <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePlay}
                      className="flex items-center justify-center w-12 h-12 bg-yellow-600 hover:bg-yellow-500 rounded-full transition-colors shadow-lg"
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
                    <div className="bg-gray-900 text-yellow-400 px-4 py-2 rounded font-mono text-lg border border-gray-600">
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
                        className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-sm focus:outline-none focus:border-yellow-500"
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
                        className="w-20 accent-yellow-500"
                      />
                      <span className="text-sm text-gray-300 w-8">
                        {Math.round(masterVolume * 100)}
                      </span>
                    </div>
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

              {/* Timeline Tracks */}
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
                  tracks.map((track) => {
                    const IconComponent = track.sound.icon;
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
                              className="flex-1 accent-yellow-500"
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
          </div>
        )}

        {activeTab === 'beatpad' && (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 overflow-auto">
            <BeatPad />
          </div>
        )}

        {activeTab === 'mybeats' && (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 overflow-auto">
            <MyBeats />
          </div>
        )}

        {activeTab === 'recorder' && (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 overflow-auto">
            <VoiceRecorder />
          </div>
        )}
      </div>
    </div>
  );
}

export default BeatLab;