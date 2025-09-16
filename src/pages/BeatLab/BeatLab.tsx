import React, { useState, useCallback } from 'react';
import { Play, Pause, Square, RotateCcw, Volume2, Settings, Save, Download, Upload } from 'lucide-react';
import ProfessionalSoundLibrary, { type Sound } from '../../components/BeatLab/ProfessionalSoundLibrary';
import ProfessionalTimeline from '../../components/BeatLab/ProfessionalTimeline';
import AudioEngineComponent, { type AudioTrack, audioEngine } from '../../components/BeatLab/AudioEngine';
import BeatPad from '../../components/BeatLab/BeatPad';
import MyBeats from '../../components/BeatLab/MyBeats';
import VoiceRecorder from '../../components/BeatLab/VoiceRecorder';

function BeatLab() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [activeView, setActiveView] = useState<'library' | 'timeline' | 'beatpad' | 'mybeats' | 'recorder'>('timeline');
  const [projectName, setProjectName] = useState('Untitled Project');

  const handleSoundSelect = useCallback(async (sound: Sound) => {
    // Create audio buffer for the sound
    const audioBuffer = audioEngine.createDummyBuffer(sound.duration);
    
    const newTrack: AudioTrack = {
      id: `track-${Date.now()}`,
      name: sound.name,
      audioBuffer,
      startTime: currentTime,
      duration: sound.duration,
      volume: 1,
      muted: false,
      solo: false,
      color: sound.color
    };
    
    setTracks(prev => [...prev, newTrack]);
    
    // Switch to timeline view to show the new track
    if (activeView !== 'timeline') {
      setActiveView('timeline');
    }
  }, [currentTime, activeView]);

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

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleMasterVolumeChange = (volume: number) => {
    setMasterVolume(volume);
    audioEngine.setMasterVolume(volume);
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

  const exportProject = () => {
    // In a real implementation, this would render the audio to a file
    alert('Export functionality would render your project to an audio file (WAV/MP3)');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'library':
        return <ProfessionalSoundLibrary onSoundSelect={handleSoundSelect} />;
      case 'timeline':
        return (
          <ProfessionalTimeline
            tracks={tracks}
            onTracksChange={setTracks}
            isPlaying={isPlaying}
            currentTime={currentTime}
            bpm={bpm}
            onSeek={handleSeek}
          />
        );
      case 'beatpad':
        return <BeatPad />;
      case 'mybeats':
        return <MyBeats />;
      case 'recorder':
        return <VoiceRecorder />;
      default:
        return <ProfessionalSoundLibrary onSoundSelect={handleSoundSelect} />;
    }
  };

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Beat Lab</h1>
            <p className="text-gray-600 mt-1">Professional music production studio</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Project name..."
            />
            <button
              onClick={saveProject}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={exportProject}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Transport Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              className="flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-400 rounded-full transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
            >
              <Square className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
              title="Clear all tracks"
            >
              <RotateCcw className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Time Display */}
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-mono">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(1).padStart(4, '0')}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* BPM Control */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">BPM:</span>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value) || 120)}
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="60"
                max="200"
              />
            </div>
            
            {/* Master Volume */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={masterVolume}
                onChange={(e) => handleMasterVolumeChange(parseFloat(e.target.value))}
                className="w-24 accent-blue-500"
              />
              <span className="text-sm text-gray-600 w-8">
                {Math.round(masterVolume * 100)}
              </span>
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
          { id: 'timeline', label: 'Timeline', emoji: '🎼' },
          { id: 'library', label: 'Sound Library', emoji: '🎵' },
          { id: 'beatpad', label: 'Beat Pad', emoji: '🥁' },
          { id: 'mybeats', label: 'My Beats', emoji: '💾' },
          { id: 'recorder', label: 'Voice Recorder', emoji: '🎤' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as any)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeView === tab.id
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active View */}
      <div className="mt-6">
        {renderActiveView()}
      </div>

      {/* Status Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              {isPlaying ? 'Playing' : 'Stopped'}
            </span>
            <span>Tracks: {tracks.length}</span>
            <span>BPM: {bpm}</span>
            <span>Sample Rate: 44.1kHz</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Master: {Math.round(masterVolume * 100)}%</span>
            <span className="text-blue-600 font-medium">{projectName}</span>
          </div>
        </div>
      </div>

      {/* Audio Engine */}
      <AudioEngineComponent
        tracks={tracks}
        isPlaying={isPlaying}
        currentTime={currentTime}
        bpm={bpm}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}

export default BeatLab;