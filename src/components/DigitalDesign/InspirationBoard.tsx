import React from 'react';
import { Heart, Download, ExternalLink, Sparkles, Star, Trophy, Palette, PenTool } from 'lucide-react';

const featuredArtists = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
    specialty: 'Digital Illustration',
    artwork: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&h=300',
    likes: 245
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
    specialty: 'Character Design',
    artwork: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400&h=300',
    likes: 189
  }
];

const artStyles = [
  {
    id: 1,
    name: 'Digital Painting',
    image: 'https://images.unsplash.com/photo-1516617442634-75371039cb3a?auto=format&fit=crop&w=400&h=300',
    description: 'Create stunning digital paintings using brushes and layers',
    icon: Palette
  },
  {
    id: 2,
    name: 'Vector Art',
    image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=400&h=300',
    description: 'Design scalable illustrations with clean lines and shapes',
    icon: PenTool
  }
];

function InspirationBoard() {
  return (
    <div className="space-y-8">
      {/* Featured Artists */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArtists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{artist.name}</h3>
                  <p className="text-sm text-purple-500">{artist.specialty}</p>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={artist.artwork}
                  alt="Featured artwork"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex items-center justify-between text-white">
                    <button className="flex items-center gap-1">
                      <Heart className="w-5 h-5" />
                      <span>{artist.likes}</span>
                    </button>
                    <button className="p-2">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Art Styles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Art Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artStyles.map((style) => {
            const Icon = style.icon;
            return (
              <div
                key={style.id}
                className="group relative overflow-hidden rounded-3xl shadow-lg"
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-purple-900/20 p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{style.name}</h3>
                  </div>
                  <p className="text-white/90 text-sm transform translate-y-8 group-hover:translate-y-0 transition-transform delay-75">
                    {style.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weekly Challenge */}
      <section className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-xl font-bold">Weekly Art Challenge</h2>
        </div>
        <p className="text-2xl font-bold mb-2">Create a Magical Forest Scene</p>
        <p className="text-white/90 mb-4">
          Use your favorite digital art tools to bring a mystical forest to life!
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Earn 50 points</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Star className="w-4 h-4" />
            <span className="text-sm">Special Badge Available</span>
          </div>
        </div>
        <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors">
          Join Challenge
        </button>
      </section>

      {/* Learning Resources */}
      <section className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Color Theory Guide</h3>
              <p className="text-sm text-gray-600">Master the basics of color theory</p>
            </div>
            <ExternalLink className="w-5 h-5 text-purple-500 flex-shrink-0" />
          </a>
          <a
            href="#"
            className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Digital Brushes Pack</h3>
              <p className="text-sm text-gray-600">Free brushes for digital painting</p>
            </div>
            <ExternalLink className="w-5 h-5 text-purple-500 flex-shrink-0" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default InspirationBoard;