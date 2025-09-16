import React, { useState } from 'react';
import { Play, Pause, Square, RotateCcw, Volume2 } from 'lucide-react';
import SoundLibrary from '../../components/BeatLab/SoundLibrary';
import Timeline from '../../components/BeatLab/Timeline';
import MixerPanel from '../../components/BeatLab/MixerPanel';

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
}

interface TimelineTrack {
  id: string;
  sound: Sound;
  startTime: number;
  duration: number;
}

function BeatLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [masterVolume, setMasterVolume] = useState(75);
  const [timelineTracks, setTimelineTracks] = useState<TimelineTrack[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const handleSoundSelect = (sound: Sound) => {
    // Add sound to timeline at current position
    const newTrack: TimelineTrack = {
      id: `track-${Date.now()}`,
      sound,
      startTime: currentTime,
      duration: sound.duration
    };
    setTimelineTracks([...timelineTracks, newTrack]);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setTimelineTracks([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Beat Lab</h1>
        <p className="text-gray-400">Create amazing beats with professional tools</p>
      </div>

      {/* Transport Controls */}
      <div className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={handleStop}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition-all duration-200"
            >
              <Square className="w-6 h-6" />
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition-all duration-200"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseInt(e.target.value))}
                className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <span className="text-sm text-gray-400 w-8">{masterVolume}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
        {/* Timeline - Full width on top, 2/3 on large screens */}
        <div className="lg:col-span-2">
          <Timeline
            tracks={timelineTracks}
            currentTime={currentTime}
            isPlaying={isPlaying}
            onTrackSelect={setSelectedTrack}
            selectedTrack={selectedTrack}
          />
        </div>

        {/* Mixer Panel - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <MixerPanel
            tracks={timelineTracks}
            selectedTrack={selectedTrack}
            masterVolume={masterVolume}
            onVolumeChange={setMasterVolume}
          />
        </div>
      </div>

      {/* Sound Library - Full width at bottom */}
      <div className="mt-6">
        <SoundLibrary onSoundSelect={handleSoundSelect} />
      </div>
    </div>
  );
}

export default BeatLab;