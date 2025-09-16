import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Trash2, Copy, Move } from 'lucide-react';
import type { Sound } from './SoundLibrary';

interface TimelineTrack {
  id: string;
  sound: Sound;
  startTime: number;
  volume: number;
  muted: boolean;
  position: number; // Position in pixels
}

interface TimelineProps {
  tracks: TimelineTrack[];
  onTracksChange: (tracks: TimelineTrack[]) => void;
  isPlaying: boolean;
  currentTime: number;
  bpm: number;
}

function Timeline({ tracks, onTracksChange, isPlaying, currentTime, bpm }: TimelineProps) {
  const [draggedTrack, setDraggedTrack] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const soundData = e.dataTransfer.getData('application/json');
      if (soundData) {
        const sound: Sound = JSON.parse(soundData);
        const rect = timelineRef.current?.getBoundingClientRect();
        if (rect) {
          const position = e.clientX - rect.left;
          const timePosition = (position / rect.width) * 32; // 32 beats visible
          
          const newTrack: TimelineTrack = {
            id: `track-${Date.now()}`,
            sound,
            startTime: timePosition,
            volume: 1,
            muted: false,
            position
          };
          
          onTracksChange([...tracks, newTrack]);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleTrackDragStart = (e: React.DragEvent, trackId: string) => {
    setDraggedTrack(trackId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleTrackDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedTrack) return;

    const rect = timelineRef.current?.getBoundingClientRect();
    if (rect) {
      const position = e.clientX - rect.left;
      const timePosition = (position / rect.width) * 32;
      
      const updatedTracks = tracks.map(track => 
        track.id === draggedTrack 
          ? { ...track, startTime: timePosition, position }
          : track
      );
      
      onTracksChange(updatedTracks);
    }
    setDraggedTrack(null);
  };

  const deleteTrack = (trackId: string) => {
    onTracksChange(tracks.filter(track => track.id !== trackId));
  };

  const toggleMute = (trackId: string) => {
    const updatedTracks = tracks.map(track =>
      track.id === trackId ? { ...track, muted: !track.muted } : track
    );
    onTracksChange(updatedTracks);
  };

  const updateVolume = (trackId: string, volume: number) => {
    const updatedTracks = tracks.map(track =>
      track.id === trackId ? { ...track, volume } : track
    );
    onTracksChange(updatedTracks);
  };

  const duplicateTrack = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      const newTrack: TimelineTrack = {
        ...track,
        id: `track-${Date.now()}`,
        startTime: track.startTime + 2,
        position: track.position + 100
      };
      onTracksChange([...tracks, newTrack]);
    }
  };

  // Generate beat markers
  const beatMarkers = Array.from({ length: 33 }, (_, i) => i);

  return (
    <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Timeline</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>BPM: {bpm}</span>
          <span>•</span>
          <span>{tracks.length} tracks</span>
        </div>
      </div>

      {/* Timeline Header with Beat Numbers */}
      <div className="mb-2">
        <div className="flex border-b border-gray-700 pb-2">
          <div className="w-32 text-xs text-gray-500 flex items-center">Track</div>
          <div className="flex-1 relative">
            <div className="flex">
              {beatMarkers.map(beat => (
                <div
                  key={beat}
                  className="flex-1 text-center text-xs text-gray-500 border-l border-gray-700 first:border-l-0"
                  style={{ minWidth: '40px' }}
                >
                  {beat + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Tracks */}
      <div 
        ref={timelineRef}
        className="space-y-2 min-h-[200px] relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {tracks.length === 0 ? (
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-700 rounded-xl">
            <p className="text-gray-500 text-sm">Drag sounds here to create tracks</p>
          </div>
        ) : (
          tracks.map((track) => {
            const Icon = track.sound.icon;
            return (
              <div
                key={track.id}
                className={`flex items-center bg-gray-800 rounded-lg border ${
                  selectedTrack === track.id ? 'border-yellow-500' : 'border-gray-700'
                } hover:border-gray-600 transition-colors`}
              >
                {/* Track Controls */}
                <div className="w-32 p-2 border-r border-gray-700">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{ backgroundColor: track.sound.color + '40' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: track.sound.color }} />
                    </div>
                    <span className="text-xs font-medium truncate" title={track.sound.name}>
                      {track.sound.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={() => toggleMute(track.id)}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                    >
                      {track.muted ? (
                        <VolumeX className="w-3 h-3 text-gray-500" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-gray-300" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={track.volume}
                      onChange={(e) => updateVolume(track.id, parseFloat(e.target.value))}
                      className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                  </div>
                </div>

                {/* Track Timeline */}
                <div className="flex-1 relative h-12 bg-gray-800">
                  <div
                    draggable
                    onDragStart={(e) => handleTrackDragStart(e, track.id)}
                    onDrop={handleTrackDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => setSelectedTrack(track.id)}
                    className="absolute top-1 bottom-1 rounded cursor-move hover:opacity-80 transition-opacity group"
                    style={{
                      left: `${(track.startTime / 32) * 100}%`,
                      width: `${(track.sound.duration / 32) * 100}%`,
                      backgroundColor: track.sound.color + '80',
                      border: `1px solid ${track.sound.color}`,
                      minWidth: '20px'
                    }}
                  >
                    <div className="h-full flex items-center justify-center text-xs font-medium text-white">
                      {track.sound.name.split(' ')[0]}
                    </div>
                    
                    {/* Track Actions */}
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1 p-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateTrack(track.id);
                          }}
                          className="p-1 bg-black/50 hover:bg-black/70 rounded text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTrack(track.id);
                          }}
                          className="p-1 bg-black/50 hover:bg-red-500 rounded text-white transition-colors"
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

        {/* Playhead */}
        {isPlaying && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 pointer-events-none z-10"
            style={{
              left: `${132 + (currentTime / 32) * (100)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="w-3 h-3 bg-yellow-500 rounded-full -translate-x-1/2 -translate-y-1"></div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Drag sounds from the library to create tracks • Drag tracks to reposition • Click tracks to select
      </div>
    </div>
  );
}

export default Timeline;