import React from 'react';
import { useState, useEffect } from 'react';
import { Music, Save, FolderOpen, Download, Upload } from 'lucide-react';
import Timeline from '../../components/BeatLab/Timeline';
import SoundLibrary from '../../components/BeatLab/SoundLibrary';
import MixerPanel from '../../components/BeatLab/MixerPanel';

interface Track {
  id: string;
  name: string;
  color: string;
  muted: boolean;
  solo: boolean;
  volume: number;
  pan: number;
  effects: {
    reverb: number;
    delay: number;
    eq: {
      low: number;
      mid: number;
      high: number;
    };
  };
  clips: Clip[];
}

interface Clip {
  id: string;
  name: string;
  start: number;
  duration: number;
  color: string;
  type: 'audio' | 'midi';
}

interface Sound {
  id: string;
  name: string;
  category: string;
  duration: number;
  bpm?: number;
  key?: string;
  tags: string[];
  color: string;
}

function BeatLab() {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      name: 'Drums',
      color: '#FF6B6B',
      muted: false,
      solo: false,
      volume: 75,
      pan: 0,
      effects: {
        reverb: 0,
        delay: 0,
        eq: { low: 0, mid: 0, high: 0 }
      },
      clips: [
        {
          id: 'clip1',
          name: 'Kick Pattern',
          start: 0,
          duration: 4,
          color: '#FF6B6B',
          type: 'audio'
        }
      ]
    },
    {
      id: '2',
      name: 'Bass',
      color: '#4ECDC4',
      muted: false,
      solo: false,
      volume: 70,
      pan: 0,
      effects: {
        reverb: 0,
        delay: 0,
        eq: { low: 0, mid: 0, high: 0 }
      },
      clips: []
    },
    {
      id: '3',
      name: 'Melody',
      color: '#45B7D1',
      muted: false,
      solo: false,
      volume: 65,
      pan: 0,
      effects: {
        reverb: 20,
        delay: 10,
        eq: { low: 0, mid: 0, high: 0 }
      },
      clips: []
    }
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(30); // 30 seconds
  const [masterVolume, setMasterVolume] = useState(75);
  const [activePanel, setActivePanel] = useState<'library' | 'mixer'>('library');
  const [projectName, setProjectName] = useState('Untitled Project');

  // Playback simulation
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleSoundSelect = (sound: Sound) => {
    // Add sound to the first available track or create a new one
    const targetTrack = tracks.find(track => track.clips.length === 0) || tracks[0];
    
    const newClip: Clip = {
      id: Date.now().toString(),
      name: sound.name,
      start: currentTime,
      duration: sound.duration,
      color: sound.color,
      type: 'audio'
    };

    const updatedTracks = tracks.map(track =>
      track.id === targetTrack.id
        ? { ...track, clips: [...track.clips, newClip] }
        : track
    );

    setTracks(updatedTracks);
  };

  const saveProject = () => {
    const project = {
      name: projectName,
      tracks,
      duration,
      masterVolume,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(`beatlab-project-${Date.now()}`, JSON.stringify(project));
    // Show success notification
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-yellow-600">Beat Lab</h1>
            <p className="mt-2 text-yellow-600/80">Professional music creation studio 🎵</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Project name..."
            />
            <div className="flex gap-2">
              <button
                onClick={saveProject}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                <FolderOpen className="w-4 h-4" />
                Open
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main DAW Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline - Takes up most space */}
        <div className="lg:col-span-3">
          <Timeline
            tracks={tracks}
            onTracksChange={setTracks}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Panel Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActivePanel('library')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activePanel === 'library'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Library
            </button>
            <button
              onClick={() => setActivePanel('mixer')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activePanel === 'mixer'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Mixer
            </button>
          </div>

          {/* Panel Content */}
          {activePanel === 'library' && (
            <SoundLibrary onSoundSelect={handleSoundSelect} />
          )}
          {activePanel === 'mixer' && (
            <MixerPanel
              tracks={tracks}
              onTracksChange={setTracks}
              masterVolume={masterVolume}
              onMasterVolumeChange={setMasterVolume}
            />
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Music className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Pro Tips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-medium mb-2">Drag & Drop</h3>
            <p className="text-sm opacity-90">Drag sounds from the library directly onto tracks in the timeline.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-medium mb-2">Timeline Navigation</h3>
            <p className="text-sm opacity-90">Click anywhere on the timeline to jump to that position. Use zoom controls to get precise.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-medium mb-2">Mixing</h3>
            <p className="text-sm opacity-90">Use the mixer panel to adjust volume, pan, EQ, and effects for each track.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeatLab;