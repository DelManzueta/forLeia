import React, { useState } from 'react';
import { Play, Pause, Square, RotateCcw, Volume2, Settings } from 'lucide-react';
import SoundLibrary, { Sound } from '../../components/BeatLab/SoundLibrary';
import Timeline from '../../components/BeatLab/Timeline';
import MixerPanel from '../../components/BeatLab/MixerPanel';
import BeatPad from '../../components/BeatLab/BeatPad';
import MyBeats from '../../components/BeatLab/MyBeats';
import VoiceRecorder from '../../components/BeatLab/VoiceRecorder';

interface Track {
  id: string;
  sound: Sound;
  startTime: number;
  volume: number;
  muted: boolean;
}

function BeatLab() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [activeView, setActiveView] = useState<'library' | 'timeline' | 'mixer' | 'beatpad' | 'mybeats' | 'recorder'>('library');

  const handleSoundSelect = (sound: Sound) => {
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      sound,
      startTime: currentTime,
      volume: 1,
      muted: false
    };
    setTracks([...tracks, newTrack]);
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

  const renderActiveView = () => {
    switch (activeView) {
      case 'library':
        return <SoundLibrary onSoundSelect={handleSoundSelect} />;
      case 'timeline':
        return <Timeline tracks={tracks} onSoundSelect={handleSoundSelect} />;
      case 'mixer':
        return <MixerPanel tracks={tracks} />;
      case 'beatpad':
        return <BeatPad onSoundSelect={handleSoundSelect} />;
      case 'mybeats':
        return <MyBeats />;
      case 'recorder':
        return <VoiceRecorder onSoundSelect={handleSoundSelect} />;
      default:
        return <SoundLibrary onSoundSelect={handleSoundSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Beat Lab
          </h1>
          <p className="text-gray-300">Create, mix, and produce your own beats</p>
        </div>

        {/* Transport Controls */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlay}
                className="flex items-center justify-center w-12 h-12 bg-yellow-500 hover:bg-yellow-400 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-gray-900" />
                ) : (
                  <Play className="w-6 h-6 text-gray-900 ml-1" />
                )}
              </button>
              <button
                onClick={handleStop}
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              >
                <Square className="w-5 h-5" />
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">BPM:</span>
                <input
                  type="number"
                  value={bpm}
                  onChange={(e) => setBpm(parseInt(e.target.value))}
                  className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-sm"
                  min="60"
                  max="200"
                />
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-20 accent-yellow-500"
                />
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'library', label: 'Sound Library', icon: '🎵' },
            { id: 'timeline', label: 'Timeline', icon: '⏱️' },
            { id: 'mixer', label: 'Mixer', icon: '🎛️' },
            { id: 'beatpad', label: 'Beat Pad', icon: '🥁' },
            { id: 'mybeats', label: 'My Beats', icon: '💾' },
            { id: 'recorder', label: 'Voice Recorder', icon: '🎤' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeView === tab.id
                  ? 'bg-yellow-500 text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active View */}
        <div className="mb-6">
          {renderActiveView()}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>Tracks: {tracks.length}</span>
              <span>Time: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
              <span>BPM: {bpm}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span>{isPlaying ? 'Playing' : 'Stopped'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeatLab;