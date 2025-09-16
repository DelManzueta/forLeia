import React from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  sounds: any[];
  volume: number;
  muted: boolean;
  solo: boolean;
}

interface TimelineProps {
  tracks: Track[];
  currentTime: number;
  isPlaying: boolean;
  onTrackSelect: (trackId: string) => void;
  selectedTrack: string | null;
}

function Timeline({ tracks, currentTime, isPlaying, onTrackSelect, selectedTrack }: TimelineProps) {
  return (
    <div className="bg-gray-800 text-white rounded-2xl border border-gray-700 shadow-xl">
      {/* Timeline Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Timeline</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="p-4">
        {/* Transport Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button className="p-4 bg-yellow-600 hover:bg-yellow-500 rounded-xl transition-colors">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors">
            <Square className="w-5 h-5" />
          </button>
          <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => onTrackSelect(track.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                selectedTrack === track.id
                  ? 'bg-yellow-600/20 border-yellow-500'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">{track.name}</span>
                  <span className="text-sm text-gray-400">
                    {track.sounds.length} sounds
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <div className="w-16 h-1 bg-gray-600 rounded-full">
                    <div 
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${track.volume}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Track Timeline */}
              <div className="mt-3 h-12 bg-gray-800 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-16 gap-px">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer"
                    ></div>
                  ))}
                </div>
                {/* Playhead */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-yellow-500"
                  style={{ left: `${(currentTime / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Track Button */}
        <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors">
          + Add New Track
        </button>
      </div>
    </div>
  );
}

export default Timeline;