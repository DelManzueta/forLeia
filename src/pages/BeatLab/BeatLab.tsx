import React, { useState } from 'react';
import { Play, Pause, Square, RotateCcw, Volume2, Settings } from 'lucide-react';
import SoundLibrary from '../../components/BeatLab/SoundLibrary';
import BeatPad from '../../components/BeatLab/BeatPad';
import MyBeats from '../../components/BeatLab/MyBeats';
import VoiceRecorder from '../../components/BeatLab/VoiceRecorder';
import type { Sound } from '../../components/BeatLab/SoundLibrary';

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
  const [activeView, setActiveView] = useState<'library' | 'beatpad' | 'mybeats' | 'recorder'>('library');

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
      case 'beatpad':
        return <BeatPad />;
      case 'mybeats':
        return <MyBeats />;
      case 'recorder':
        return <VoiceRecorder />;
      default:
        return <SoundLibrary onSoundSelect={handleSoundSelect} />;
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-yellow-600">Beat Lab</h1>
        <p className="mt-2 text-yellow-600/80">Create amazing beats! 🎵</p>
      </header>

      {/* Transport Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              className="flex items-center justify-center w-12 h-12 bg-yellow-500 hover:bg-yellow-400 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
            >
              <Square className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">BPM:</span>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
                className="w-16 px-2 py-1 border border-gray-200 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                min="60"
                max="200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-600" />
              <input
                type="range"
                min="0"
                max="100"
                className="w-20 accent-yellow-500"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
        {[
          { id: 'library', label: 'Sound Library' },
          { id: 'beatpad', label: 'Beat Pad' },
          { id: 'mybeats', label: 'My Beats' },
          { id: 'recorder', label: 'Voice Recorder' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as any)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeView === tab.id
                ? 'bg-yellow-100 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active View */}
      <div className="mt-6">
        {renderActiveView()}
      </div>

      {/* Status Bar */}
      {tracks.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>Tracks: {tracks.length}</span>
              <span>Time: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
              <span>BPM: {bpm}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span>{isPlaying ? 'Playing' : 'Stopped'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BeatLab;