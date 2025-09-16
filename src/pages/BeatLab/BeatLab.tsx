import React, { useState } from 'react';
import { Music, Play, Pause, Square, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import BeatPad from '../../components/BeatLab/BeatPad';
import MyBeats from '../../components/BeatLab/MyBeats';
import VoiceRecorder from '../../components/BeatLab/VoiceRecorder';
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

interface Track {
  id: string;
  name: string;
  sounds: Array<{
    id: string;
    soundId: string;
    position: number;
    duration: number;
  }>;
  volume: number;
  muted: boolean;
  solo: boolean;
}

function BeatLab() {
  const [activeView, setActiveView] = useState<'beatpad' | 'timeline' | 'mybeats' | 'recorder'>('beatpad');
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([
    { id: '1', name: 'Drums', sounds: [], volume: 100, muted: false, solo: false },
    { id: '2', name: 'Bass', sounds: [], volume: 100, muted: false, solo: false },
    { id: '3', name: 'Melody', sounds: [], volume: 100, muted: false, solo: false },
    { id: '4', name: 'Vocals', sounds: [], volume: 100, muted: false, solo: false }
  ]);

  const handleSoundSelect = (sound: Sound) => {
    console.log('Sound selected:', sound);
    // Add sound to the first available track
    const firstTrack = tracks[0];
    if (firstTrack) {
      const newSound = {
        id: Date.now().toString(),
        soundId: sound.id,
        position: 0,
        duration: sound.duration
      };
      
      setTracks(prevTracks => 
        prevTracks.map(track => 
          track.id === firstTrack.id 
            ? { ...track, sounds: [...track.sounds, newSound] }
            : track
        )
      );
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTracks(tracks.map(track => ({ ...track, sounds: [] })));
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-yellow-600">Beat Lab</h1>
        <p className="mt-2 text-yellow-600/80">Create amazing music! 🎵</p>
      </header>

      {/* Transport Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              className={`p-3 rounded-xl transition-colors ${
                isPlaying 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={handleStop}
              className="p-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
            >
              <Square className="w-6 h-6" />
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">BPM:</span>
              <input
                type="range"
                min="60"
                max="200"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
                className="w-24"
              />
              <span className="text-sm font-medium text-gray-700 w-8">{bpm}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-yellow-600" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-20"
              />
              <span className="text-sm font-medium text-gray-700 w-8">{volume}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
        {[
          { id: 'beatpad', label: 'Beat Pad', icon: Music },
          { id: 'timeline', label: 'Timeline', icon: Music },
          { id: 'mybeats', label: 'My Beats', icon: Music },
          { id: 'recorder', label: 'Voice Recorder', icon: Music }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id as any)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeView === id
                ? 'bg-yellow-100 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeView === 'beatpad' && <BeatPad />}
          {activeView === 'timeline' && <Timeline onSoundSelect={handleSoundSelect} />}
          {activeView === 'mybeats' && <MyBeats />}
          {activeView === 'recorder' && <VoiceRecorder />}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <SoundLibrary onSoundSelect={handleSoundSelect} />
          <MixerPanel onSoundSelect={handleSoundSelect} />
        </div>
      </div>
    </div>
  );
}

export default BeatLab;