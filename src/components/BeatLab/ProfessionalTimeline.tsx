import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Trash2, Copy, Settings, Solo } from 'lucide-react';
import type { AudioTrack } from './AudioEngine';

interface ProfessionalTimelineProps {
  tracks: AudioTrack[];
  onTracksChange: (tracks: AudioTrack[]) => void;
  isPlaying: boolean;
  currentTime: number;
  bpm: number;
  onSeek: (time: number) => void;
}

const PIXELS_PER_SECOND = 50;
const TRACK_HEIGHT = 80;
const TIMELINE_HEIGHT = 40;

function ProfessionalTimeline({ 
  tracks, 
  onTracksChange, 
  isPlaying, 
  currentTime, 
  bpm,
  onSeek 
}: ProfessionalTimelineProps) {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [draggedTrack, setDraggedTrack] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const soundData = e.dataTransfer.getData('application/json');
      if (soundData && timelineRef.current) {
        const sound = JSON.parse(soundData);
        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const startTime = Math.max(0, x / (PIXELS_PER_SECOND * zoom));
        
        const newTrack: AudioTrack = {
          id: `track-${Date.now()}`,
          name: sound.name,
          audioBuffer: null, // Will be loaded by AudioEngine
          startTime,
          duration: sound.duration || 2,
          volume: 1,
          muted: false,
          solo: false,
          color: sound.color || '#3B82F6'
        };
        
        onTracksChange([...tracks, newTrack]);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleTrackMouseDown = (e: React.MouseEvent, trackId: string) => {
    if (e.button !== 0) return; // Only left click
    
    setSelectedTrack(trackId);
    setDraggedTrack(trackId);
    
    const track = tracks.find(t => t.id === trackId);
    if (track && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const trackStartX = track.startTime * PIXELS_PER_SECOND * zoom;
      setDragOffset(e.clientX - rect.left - trackStartX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedTrack || !timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset;
    const newStartTime = Math.max(0, x / (PIXELS_PER_SECOND * zoom));
    
    const updatedTracks = tracks.map(track =>
      track.id === draggedTrack
        ? { ...track, startTime: newStartTime }
        : track
    );
    
    onTracksChange(updatedTracks);
  };

  const handleMouseUp = () => {
    setDraggedTrack(null);
    setDragOffset(0);
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = x / (PIXELS_PER_SECOND * zoom);
    onSeek(time);
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

  const toggleSolo = (trackId: string) => {
    const updatedTracks = tracks.map(track =>
      track.id === trackId ? { ...track, solo: !track.solo } : track
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
      const newTrack: AudioTrack = {
        ...track,
        id: `track-${Date.now()}`,
        name: `${track.name} Copy`,
        startTime: track.startTime + track.duration + 0.5
      };
      onTracksChange([...tracks, newTrack]);
    }
  };

  // Generate time markers
  const maxTime = Math.max(60, ...tracks.map(t => t.startTime + t.duration));
  const timeMarkers = [];
  for (let i = 0; i <= maxTime; i += 5) {
    timeMarkers.push(i);
  }

  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-2xl">
      {/* Timeline Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Timeline</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Zoom:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-20 accent-blue-500"
              />
            </div>
            <div className="text-sm text-gray-400">
              {tracks.length} tracks • {Math.floor(currentTime)}s
            </div>
          </div>
        </div>
      </div>

      {/* Time Ruler */}
      <div 
        className="bg-gray-800 border-b border-gray-700 relative cursor-pointer"
        style={{ height: TIMELINE_HEIGHT }}
        onClick={handleTimelineClick}
      >
        <div className="flex h-full">
          <div className="w-48 bg-gray-700 border-r border-gray-600 flex items-center justify-center">
            <span className="text-xs text-gray-400">Time</span>
          </div>
          <div className="flex-1 relative">
            {timeMarkers.map(time => (
              <div
                key={time}
                className="absolute top-0 bottom-0 border-l border-gray-600"
                style={{ left: time * PIXELS_PER_SECOND * zoom }}
              >
                <span className="absolute top-1 left-1 text-xs text-gray-400">
                  {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                </span>
              </div>
            ))}
            
            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
              style={{ left: currentTime * PIXELS_PER_SECOND * zoom }}
            >
              <div className="w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Area */}
      <div 
        ref={timelineRef}
        className="relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {tracks.length === 0 ? (
          <div 
            className="flex items-center justify-center border-2 border-dashed border-gray-600 m-4 rounded-xl"
            style={{ height: TRACK_HEIGHT * 3 }}
          >
            <div className="text-center text-gray-500">
              <div className="text-lg mb-2">🎵</div>
              <p>Drag sounds here to create tracks</p>
              <p className="text-sm mt-1">Or click the timeline to set playback position</p>
            </div>
          </div>
        ) : (
          tracks.map((track, index) => (
            <div
              key={track.id}
              className={`flex border-b border-gray-700 ${
                selectedTrack === track.id ? 'bg-gray-800' : 'bg-gray-900'
              }`}
              style={{ height: TRACK_HEIGHT }}
            >
              {/* Track Controls */}
              <div className="w-48 bg-gray-800 border-r border-gray-600 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium truncate" title={track.name}>
                      {track.name}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleSolo(track.id)}
                        className={`px-2 py-1 text-xs rounded ${
                          track.solo ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-300'
                        }`}
                      >
                        S
                      </button>
                      <button
                        onClick={() => toggleMute(track.id)}
                        className={`px-2 py-1 text-xs rounded ${
                          track.muted ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300'
                        }`}
                      >
                        M
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={track.volume}
                      onChange={(e) => updateVolume(track.id, parseFloat(e.target.value))}
                      className="flex-1 accent-blue-500"
                    />
                    <span className="text-xs text-gray-400 w-8">
                      {Math.round(track.volume * 100)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Track Timeline */}
              <div className="flex-1 relative bg-gray-900">
                <div
                  className="absolute top-2 bottom-2 rounded cursor-move group shadow-lg"
                  style={{
                    left: track.startTime * PIXELS_PER_SECOND * zoom,
                    width: track.duration * PIXELS_PER_SECOND * zoom,
                    backgroundColor: track.color + '40',
                    border: `2px solid ${track.color}`,
                    minWidth: '40px'
                  }}
                  onMouseDown={(e) => handleTrackMouseDown(e, track.id)}
                >
                  {/* Waveform visualization placeholder */}
                  <div className="h-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-current"
                          style={{
                            left: `${i * 5}%`,
                            top: `${20 + Math.random() * 60}%`,
                            width: '2px',
                            height: `${Math.random() * 40 + 10}%`
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-white relative z-10">
                      {track.name}
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
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 p-3 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Drag sounds from library • Click timeline to seek • Drag tracks to move</span>
          <span>BPM: {bpm} • Sample Rate: 44.1kHz</span>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalTimeline;