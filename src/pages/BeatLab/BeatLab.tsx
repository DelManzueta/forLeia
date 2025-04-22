import React from 'react';
import { Music } from 'lucide-react';
import BeatPad from '../../components/BeatLab/BeatPad';
import VoiceRecorder from '../../components/BeatLab/VoiceRecorder';
import MyBeats from '../../components/BeatLab/MyBeats';

function BeatLab() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-yellow-600">Beat Lab</h1>
        <p className="mt-2 text-yellow-600/80">Create your own music! 🎵</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <BeatPad />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <VoiceRecorder />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <MyBeats />
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Music className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Coming Soon!</h2>
          </div>
          <div className="space-y-2">
            <p className="text-lg">More exciting features on the way:</p>
            <ul className="list-disc list-inside space-y-1 text-white/90">
              <li>Record and save your beats</li>
              <li>Mix different sounds together</li>
              <li>Share your music with friends</li>
              <li>Learn rhythm patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeatLab;