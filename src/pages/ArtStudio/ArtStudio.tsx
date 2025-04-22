import React from 'react';
import { Palette } from 'lucide-react';

function ArtStudio() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-rose-600">Art Studio</h1>
        <p className="mt-2 text-rose-600/80">Express yourself through colors and shapes! 🎨</p>
      </header>
      
      {/* Inspiration Gallery */}
      <section className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">Inspiration Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&h=300"
            alt="Art Inspiration"
            className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&h=300"
            alt="Art Inspiration"
            className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
          <img 
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&h=300"
            alt="Art Inspiration"
            className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </div>
      </section>

      {/* Weekly Challenge */}
      <section className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-100 rounded-lg">
            <Palette className="w-6 h-6 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-rose-600">Weekly Challenge</h2>
        </div>
        <div className="bg-rose-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-rose-700 mb-2">Draw Your Favorite Animal! 🐾</h3>
          <p className="text-rose-600">Use any medium you like - pencils, crayons, or even digital tools. Let your imagination run wild!</p>
        </div>
      </section>

      {/* Drawing Tutorials */}
      <section className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">Drawing Tutorials</h2>
        <div className="aspect-video">
          <iframe 
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/videoseries?list=PLnoO3k54vcBSa78-fuytax0hGgVRZOBsp" 
            title="Drawing Tutorials"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* My Art Projects */}
      <section className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">My Art Projects</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="New project name..."
              className="flex-1 px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
              Add Project
            </button>
          </div>
          <div className="divide-y divide-rose-100">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded text-rose-500" />
                <span>Rainbow Dragon Drawing</span>
              </div>
              <span className="text-rose-500">In Progress</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded text-rose-500" checked />
                <span className="line-through text-gray-400">Butterfly Garden Sketch</span>
              </div>
              <span className="text-green-500">Completed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArtStudio;