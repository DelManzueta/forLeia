import React, { useState } from 'react';
import { Music, Play, Pause, Volume2, Settings } from 'lucide-react';
import SoundLibrary from '../../components/BeatLab/SoundLibrary';
import Timeline from '../../components/BeatLab/Timeline';
import MixerPanel from '../../components/BeatLab/MixerPanel';
import BeatPad from '../../components/BeatLab/BeatPad';
import MyBeats from '../../components/BeatLab/MyBeats';
import VoiceRecorder from '../../components/BeatLab/VoiceRecorder';

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
  icon: string;
}

interface TimelineTrack {
  id: string;
  sound: Sound;
  startTime: number;
  volume: number;
  muted: boolean;
  solo: boolean;
}

function BeatLab() {
  const [tracks, setTracks] = useState<TimelineTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [activeView, setActiveView] = useState<'library' | 'beatpad' | 'mybeats' | 'recorder'>('library');

  const handleSoundSelect = (sound: Sound) => {
    const newTrack: TimelineTrack = {
      id: `track-${Date.now()}`,
      sound,
      startTime: currentTime,
      volume: 0.8,
      muted: false,
      solo: false
    };
    setTracks([...tracks, newTrack]);
  };

  const handleTrackUpdate = (trackId: string, updates: Partial<TimelineTrack>) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, ...updates } : track
    ));
  };

  const handleTrackDelete = (trackId: string) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimelineClick = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Beat Lab</h1>
                <p className="text-purple-200">Create amazing beats and music</p>
              </div>
            </div>
            
            {/* Transport Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2">
                <span className="text-white text-sm">BPM:</span>
                <input
                  type="number"
                  value={bpm}
                  onChange={(e) => setBpm(parseInt(e.target.value))}
                  className="w-16 bg-gray-700 text-white text-sm rounded px-2 py-1 border-none outline-none"
                  min="60"
                  max="200"
                />
              </div>
              <button
                onClick={togglePlayback}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2 bg-gray-800 rounded-xl p-2">
            {[
              { id: 'library', label: 'Sound Library', icon: Music },
              { id: 'beatpad', label: 'Beat Pad', icon: Play },
              { id: 'mybeats', label: 'My Beats', icon: Volume2 },
              { id: 'recorder', label: 'Voice Recorder', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeView === id
                    ? 'bg-yellow-500 text-gray-900 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Panel - Active View */}
          <div className="lg:col-span-2">
            {activeView === 'library' && (
              <SoundLibrary onSoundSelect={handleSoundSelect} />
            )}
            {activeView === 'beatpad' && <BeatPad />}
            {activeView === 'mybeats' && <MyBeats />}
            {activeView === 'recorder' && <VoiceRecorder />}
          </div>

          {/* Right Panel - Mixer */}
          <div>
            <MixerPanel
              tracks={tracks}
              onTrackUpdate={handleTrackUpdate}
              onTrackDelete={handleTrackDelete}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <Timeline
            tracks={tracks}
            currentTime={currentTime}
            onTimelineClick={handleTimelineClick}
            onTrackUpdate={handleTrackUpdate}
            onTrackDelete={handleTrackDelete}
            isPlaying={isPlaying}
            bpm={bpm}
          />
        </div>
      </div>
    </div>
  );
}

export default BeatLab;