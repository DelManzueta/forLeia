import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, Settings } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  color: string;
  muted: boolean;
  solo: boolean;
  volume: number;
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

interface TimelineProps {
  tracks: Track[];
  onTracksChange: (tracks: Track[]) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function Timeline({ tracks, onTracksChange, isPlaying, onPlayPause, currentTime, duration, onSeek }: TimelineProps) {
  const [draggedClip, setDraggedClip] = useState<{ trackId: string; clipId: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  const pixelsPerSecond = 50 * zoom;
  const timelineWidth = duration * pixelsPerSecond;

  const handleClipDragStart = (trackId: string, clipId: string) => {
    setDraggedClip({ trackId, clipId });
  };

  const handleClipDrop = (targetTrackId: string, dropX: number) => {
    if (!draggedClip) return;

    const newTime = Math.max(0, dropX / pixelsPerSecond);
    
    const updatedTracks = tracks.map(track => {
      if (track.id === draggedClip.trackId) {
        return {
          ...track,
          clips: track.clips.filter(clip => clip.id !== draggedClip.clipId)
        };
      }
      if (track.id === targetTrackId) {
        const draggedClipData = tracks
          .find(t => t.id === draggedClip.trackId)
          ?.clips.find(c => c.id === draggedClip.clipId);
        
        if (draggedClipData) {
          return {
            ...track,
            clips: [...track.clips, { ...draggedClipData, start: newTime }]
          };
        }
      }
      return track;
    });

    onTracksChange(updatedTracks);
    setDraggedClip(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const time = x / pixelsPerSecond;
      onSeek(Math.max(0, Math.min(duration, time)));
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl overflow-hidden">
      {/* Transport Controls */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSeek(0)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={onPlayPause}
              className="p-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={() => {
                onSeek(0);
                if (isPlaying) onPlayPause();
              }}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Square className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-mono bg-gray-700 px-3 py-1 rounded">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-20 accent-green-500"
              />
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex">
          <div className="w-48 p-2 border-r border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tracks</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                  className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
                >
                  -
                </button>
                <span className="text-xs">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                  className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative overflow-x-auto">
            <div 
              ref={timelineRef}
              className="relative h-12 cursor-pointer"
              style={{ width: `${timelineWidth}px` }}
              onClick={handleTimelineClick}
            >
              {/* Time Ruler */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: Math.ceil(duration) + 1 }, (_, i) => (
                  <div
                    key={i}
                    className="relative border-l border-gray-600"
                    style={{ width: `${pixelsPerSecond}px` }}
                  >
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      {i}s
                    </span>
                    {/* Sub-divisions */}
                    {Array.from({ length: 4 }, (_, j) => (
                      <div
                        key={j}
                        className="absolute top-6 border-l border-gray-700"
                        style={{ left: `${(j + 1) * (pixelsPerSecond / 4)}px` }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Playhead */}
              <div
                ref={playheadRef}
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
                style={{ left: `${currentTime * pixelsPerSecond}px` }}
              >
                <div className="absolute -top-1 -left-2 w-4 h-4 bg-red-500 rotate-45 transform origin-center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="max-h-96 overflow-y-auto">
        {tracks.map((track, index) => (
          <div key={track.id} className="flex border-b border-gray-700">
            {/* Track Header */}
            <div className="w-48 p-3 bg-gray-800 border-r border-gray-700">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: track.color }}
                  />
                  <input
                    type="text"
                    value={track.name}
                    onChange={(e) => {
                      const updatedTracks = tracks.map(t =>
                        t.id === track.id ? { ...t, name: e.target.value } : t
                      );
                      onTracksChange(updatedTracks);
                    }}
                    className="flex-1 bg-transparent text-sm font-medium focus:outline-none focus:bg-gray-700 px-1 rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const updatedTracks = tracks.map(t =>
                        t.id === track.id ? { ...t, muted: !t.muted } : t
                      );
                      onTracksChange(updatedTracks);
                    }}
                    className={`px-2 py-1 text-xs rounded ${
                      track.muted ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={() => {
                      const updatedTracks = tracks.map(t =>
                        t.id === track.id ? { ...t, solo: !t.solo } : t
                      );
                      onTracksChange(updatedTracks);
                    }}
                    className={`px-2 py-1 text-xs rounded ${
                      track.solo ? 'bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  >
                    S
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.volume}
                    onChange={(e) => {
                      const updatedTracks = tracks.map(t =>
                        t.id === track.id ? { ...t, volume: parseInt(e.target.value) } : t
                      );
                      onTracksChange(updatedTracks);
                    }}
                    className="flex-1 accent-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Track Timeline */}
            <div
              className="flex-1 relative h-16 bg-gray-850"
              style={{ width: `${timelineWidth}px` }}
              onDrop={(e) => {
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                handleClipDrop(track.id, x);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: Math.ceil(duration) + 1 }, (_, i) => (
                  <div
                    key={i}
                    className="border-l border-gray-700 opacity-30"
                    style={{ width: `${pixelsPerSecond}px` }}
                  />
                ))}
              </div>

              {/* Audio Clips */}
              {track.clips.map((clip) => (
                <div
                  key={clip.id}
                  draggable
                  onDragStart={() => handleClipDragStart(track.id, clip.id)}
                  className="absolute top-1 bottom-1 rounded cursor-move shadow-lg border border-opacity-50 hover:border-opacity-100 transition-all"
                  style={{
                    left: `${clip.start * pixelsPerSecond}px`,
                    width: `${clip.duration * pixelsPerSecond}px`,
                    backgroundColor: clip.color,
                    borderColor: clip.color,
                  }}
                >
                  <div className="p-1 h-full flex flex-col justify-between">
                    <span className="text-xs font-medium text-white truncate">
                      {clip.name}
                    </span>
                    {/* Waveform visualization placeholder */}
                    <div className="flex-1 flex items-end gap-px">
                      {Array.from({ length: Math.floor(clip.duration * 10) }, (_, i) => (
                        <div
                          key={i}
                          className="bg-white bg-opacity-60 w-px"
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Track Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            const newTrack: Track = {
              id: Date.now().toString(),
              name: `Track ${tracks.length + 1}`,
              color: `hsl(${Math.random() * 360}, 70%, 50%)`,
              muted: false,
              solo: false,
              volume: 75,
              clips: []
            };
            onTracksChange([...tracks, newTrack]);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
        >
          + Add Track
        </button>
      </div>
    </div>
  );
}

export default Timeline;