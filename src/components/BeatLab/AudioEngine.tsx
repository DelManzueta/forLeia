import React, { useRef, useEffect } from 'react';

export interface AudioTrack {
  id: string;
  name: string;
  audioBuffer: AudioBuffer | null;
  startTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  solo: boolean;
  color: string;
}

interface AudioEngineProps {
  tracks: AudioTrack[];
  isPlaying: boolean;
  currentTime: number;
  bpm: number;
  onTimeUpdate: (time: number) => void;
}

class AudioEngine {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private tracks: Map<string, { source: AudioBufferSourceNode | null; gain: GainNode }> = new Map();
  private startTime: number = 0;
  private pauseTime: number = 0;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
  }

  async loadAudioFromUrl(url: string): Promise<AudioBuffer> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error loading audio:', error);
      // Return a silent buffer as fallback
      const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
      return buffer;
    }
  }

  createDummyBuffer(duration: number = 1): AudioBuffer {
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const channelData = buffer.getChannelData(0);
    
    // Generate a simple tone for demo purposes
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1;
    }
    
    return buffer;
  }

  play(tracks: AudioTrack[], startTime: number = 0) {
    this.stop();
    this.startTime = this.audioContext.currentTime - startTime;

    tracks.forEach(track => {
      if (track.muted || !track.audioBuffer) return;

      const source = this.audioContext.createBufferSource();
      const gain = this.audioContext.createGain();
      
      source.buffer = track.audioBuffer;
      gain.gain.value = track.volume;
      
      source.connect(gain);
      gain.connect(this.masterGain);
      
      const when = this.startTime + track.startTime;
      source.start(when);
      
      this.tracks.set(track.id, { source, gain });
    });
  }

  stop() {
    this.tracks.forEach(({ source }) => {
      if (source) {
        try {
          source.stop();
        } catch (e) {
          // Source might already be stopped
        }
      }
    });
    this.tracks.clear();
  }

  setTrackVolume(trackId: string, volume: number) {
    const track = this.tracks.get(trackId);
    if (track?.gain) {
      track.gain.gain.value = volume;
    }
  }

  setMasterVolume(volume: number) {
    this.masterGain.gain.value = volume;
  }

  getCurrentTime(): number {
    return this.audioContext.currentTime - this.startTime;
  }
}

const audioEngine = new AudioEngine();

function AudioEngineComponent({ tracks, isPlaying, currentTime, bpm, onTimeUpdate }: AudioEngineProps) {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      audioEngine.play(tracks, currentTime);
      
      const updateTime = () => {
        const time = audioEngine.getCurrentTime();
        onTimeUpdate(time);
        animationFrameRef.current = requestAnimationFrame(updateTime);
      };
      
      animationFrameRef.current = requestAnimationFrame(updateTime);
    } else {
      audioEngine.stop();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, tracks, currentTime, onTimeUpdate]);

  return null;
}

export { AudioEngine, audioEngine };
export default AudioEngineComponent;