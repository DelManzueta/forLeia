import React from 'react';
import { Volume2, VolumeX, Sliders, RotateCcw, Settings } from 'lucide-react';

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
}

interface MixerPanelProps {
  tracks: Track[];
  onTracksChange: (tracks: Track[]) => void;
  masterVolume: number;
  onMasterVolumeChange: (volume: number) => void;
}

function MixerPanel({ tracks, onTracksChange, masterVolume, onMasterVolumeChange }: MixerPanelProps) {
  const updateTrack = (trackId: string, updates: Partial<Track>) => {
    const updatedTracks = tracks.map(track =>
      track.id === trackId ? { ...track, ...updates } : track
    );
    onTracksChange(updatedTracks);
  };

  const updateTrackEffect = (trackId: string, effectType: string, value: number) => {
    const updatedTracks = tracks.map(track => {
      if (track.id === trackId) {
        if (effectType === 'reverb' || effectType === 'delay') {
          return {
            ...track,
            effects: {
              ...track.effects,
              [effectType]: value
            }
          };
        } else if (effectType.startsWith('eq.')) {
          const eqBand = effectType.split('.')[1];
          return {
            ...track,
            effects: {
              ...track.effects,
              eq: {
                ...track.effects.eq,
                [eqBand]: value
              }
            }
          };
        }
      }
      return track;
    });
    onTracksChange(updatedTracks);
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Mixer</h2>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Track Channels */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {tracks.map(track => (
            <div key={track.id} className="flex-shrink-0 w-20 bg-gray-800 rounded-lg p-3">
              {/* Track Header */}
              <div className="text-center mb-3">
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: track.color }}
                />
                <div className="text-xs font-medium truncate" title={track.name}>
                  {track.name}
                </div>
              </div>

              {/* EQ Section */}
              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-400 text-center">EQ</div>
                {/* High */}
                <div className="flex flex-col items-center">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.1"
                    value={track.effects.eq.high}
                    onChange={(e) => updateTrackEffect(track.id, 'eq.high', parseFloat(e.target.value))}
                    className="w-12 h-16 accent-blue-500 slider-vertical"
                    style={{ writingMode: 'bt-lr', appearance: 'slider-vertical' }}
                  />
                  <span className="text-xs text-gray-400">H</span>
                </div>
                {/* Mid */}
                <div className="flex flex-col items-center">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.1"
                    value={track.effects.eq.mid}
                    onChange={(e) => updateTrackEffect(track.id, 'eq.mid', parseFloat(e.target.value))}
                    className="w-12 h-16 accent-green-500 slider-vertical"
                    style={{ writingMode: 'bt-lr', appearance: 'slider-vertical' }}
                  />
                  <span className="text-xs text-gray-400">M</span>
                </div>
                {/* Low */}
                <div className="flex flex-col items-center">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.1"
                    value={track.effects.eq.low}
                    onChange={(e) => updateTrackEffect(track.id, 'eq.low', parseFloat(e.target.value))}
                    className="w-12 h-16 accent-red-500 slider-vertical"
                    style={{ writingMode: 'bt-lr', appearance: 'slider-vertical' }}
                  />
                  <span className="text-xs text-gray-400">L</span>
                </div>
              </div>

              {/* Effects */}
              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-400 text-center">FX</div>
                <div className="flex flex-col items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.effects.reverb}
                    onChange={(e) => updateTrackEffect(track.id, 'reverb', parseInt(e.target.value))}
                    className="w-12 h-12 accent-purple-500"
                    style={{ writingMode: 'bt-lr', appearance: 'slider-vertical' }}
                  />
                  <span className="text-xs text-gray-400">Rev</span>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.effects.delay}
                    onChange={(e) => updateTrackEffect(track.id, 'delay', parseInt(e.target.value))}
                    className="w-12 h-12 accent-yellow-500"
                    style={{ writingMode: 'bt-lr', appearance: 'slider-vertical' }}
                  />
                  <span className="text-xs text-gray-400">Del</span>
                </div>
              </div>

              {/* Pan */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 text-center mb-1">Pan</div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={track.pan}
                  onChange={(e) => updateTrack(track.id, { pan: parseInt(e.target.value) })}
                  className="w-full accent-gray-500"
                />
                <div className="text-xs text-center text-gray-400">
                  {track.pan === 0 ? 'C' : track.pan > 0 ? `R${track.pan}` : `L${Math.abs(track.pan)}`}
                </div>
              </div>

              {/* Volume Fader */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 text-center mb-1">Vol</div>
                <div className="flex flex-col items-center h-32">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.volume}
                    onChange={(e) => updateTrack(track.id, { volume: parseInt(e.target.value) })}
                    className="h-24 accent-green-500"
                    style={{ writingMode: 'bt-lr', appearance: 'slider-vertical' }}
                  />
                  <div className="text-xs text-center text-gray-400 mt-1">
                    {track.volume}
                  </div>
                </div>
              </div>

              {/* Mute/Solo */}
              <div className="space-y-1">
                <button
                  onClick={() => updateTrack(track.id, { muted: !track.muted })}
                  className={`w-full py-1 text-xs rounded ${
                    track.muted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  MUTE
                </button>
                <button
                  onClick={() => updateTrack(track.id, { solo: !track.solo })}
                  className={`w-full py-1 text-xs rounded ${
                    track.solo ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  SOLO
                </button>
              </div>
            </div>
          ))}

          {/* Master Channel */}
          <div className="flex-shrink-0 w-20 bg-gray-800 rounded-lg p-3 border-l-2 border-yellow-500">
            <div className="text-center mb-3">
              <div className="text-xs font-bold text-yellow-400">MASTER</div>
            </div>

            {/* Master Volume */}
            <div className="mb-4">
              <div className="flex flex-col items-center h-32">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterVolume}
                  onChange={(e) => onMasterVolumeChange(parseInt(e.target.value))}
                  className="h-24 accent-yellow-500"
                  style={{ writingMode: 'bt-lr', appearance: 'slider-vertical' }}
                />
                <div className="text-xs text-center text-gray-400 mt-1">
                  {masterVolume}
                </div>
              </div>
            </div>

            {/* Master Controls */}
            <div className="space-y-1">
              <button className="w-full py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded">
                <Volume2 className="w-3 h-3 mx-auto" />
              </button>
              <button className="w-full py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded">
                <RotateCcw className="w-3 h-3 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MixerPanel;