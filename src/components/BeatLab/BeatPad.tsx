import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface Sound {
  label: string;
  key: string;
  color: string;
  glowColor: string;
}

const drumSounds: Sound[] = [
  { label: 'Kick', key: '1', color: 'bg-yellow-400', glowColor: 'shadow-yellow-400/50' },
  { label: 'Snare', key: '2', color: 'bg-blue-400', glowColor: 'shadow-blue-400/50' },
  { label: 'Hi-Hat', key: '3', color: 'bg-green-400', glowColor: 'shadow-green-400/50' },
  { label: 'Clap', key: '4', color: 'bg-purple-400', glowColor: 'shadow-purple-400/50' },
  { label: 'Tom', key: '5', color: 'bg-pink-400', glowColor: 'shadow-pink-400/50' },
  { label: 'Cymbal', key: '6', color: 'bg-red-400', glowColor: 'shadow-red-400/50' },
  { label: 'Rim', key: '7', color: 'bg-indigo-400', glowColor: 'shadow-indigo-400/50' },
  { label: 'Shaker', key: '8', color: 'bg-teal-400', glowColor: 'shadow-teal-400/50' },
  { label: 'Bass', key: '9', color: 'bg-orange-400', glowColor: 'shadow-orange-400/50' }
];

function BeatPad() {
  const [isMuted, setIsMuted] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Initialize audio elements
    drumSounds.forEach(sound => {
      const audio = new Audio(`/sounds/${sound.label.toLowerCase()}.mp3`);
      audio.preload = 'auto';
      audioRefs.current[sound.key] = audio;
    });

    // Keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const sound = drumSounds.find(s => s.key === e.key);
      if (sound && !activeKeys.includes(sound.key) && !isMuted) {
        playSound(sound.key);
        setActiveKeys(prev => [...prev, sound.key]);
        if (isRecording) {
          setCurrentSequence(prev => [...prev, sound.key]);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const sound = drumSounds.find(s => s.key === e.key);
      if (sound) {
        setActiveKeys(prev => prev.filter(key => key !== sound.key));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isMuted, activeKeys, isRecording]);

  const playSound = (key: string) => {
    if (isMuted) return;
    
    const audio = audioRefs.current[key];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-xl">
            <Music className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Beat Pad</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-lg transition-colors ${
              isRecording 
                ? 'bg-red-500 text-white' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {isRecording ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-gray-400" />
            ) : (
              <Volume2 className="w-6 h-6 text-yellow-600" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {drumSounds.map((sound) => (
          <button
            key={sound.key}
            onClick={() => {
              playSound(sound.key);
              setActiveKeys(prev => [...prev, sound.key]);
              setTimeout(() => setActiveKeys(prev => prev.filter(k => k !== sound.key)), 200);
            }}
            className={`relative h-32 rounded-2xl ${sound.color} transition-all duration-200 ${
              activeKeys.includes(sound.key) 
                ? 'shadow-lg scale-95' 
                : 'hover:scale-[1.02] shadow-xl'
            } ${activeKeys.includes(sound.key) ? sound.glowColor : ''}`}
          >
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-200 ${
              activeKeys.includes(sound.key) ? 'opacity-20' : 'opacity-0'
            } bg-white`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white mb-2">{sound.label}</span>
              <span className="text-sm text-white/80">Press {sound.key}</span>
            </div>
          </button>
        ))}
      </div>

      {currentSequence.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">Current Sequence</span>
            <button
              onClick={() => setCurrentSequence([])}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSequence.map((key, index) => {
              const sound = drumSounds.find(s => s.key === key);
              return (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${sound?.color} text-white`}
                >
                  {sound?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-center text-sm text-gray-500">
        Press number keys (1-9) or tap the pads to play sounds
      </p>
    </div>
  );
}

export default BeatPad;