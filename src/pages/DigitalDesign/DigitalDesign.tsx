import React, { useState } from 'react';
import { Pencil, Palette, Video, Sparkles, Trophy, Star, ExternalLink } from 'lucide-react';
import DesignTutorials from '../../components/DigitalDesign/DesignTutorials';
import MyDesignProjects from '../../components/DigitalDesign/MyDesignProjects';
import InspirationBoard from '../../components/DigitalDesign/InspirationBoard';

const tabs = [
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'projects', label: 'My Projects' },
  { id: 'inspiration', label: 'Inspiration' }
];

const tools = [
  {
    name: 'Adobe Fresco',
    icon: Palette,
    description: 'Digital painting and drawing',
    link: 'https://www.adobe.com/products/fresco.html',
    platform: 'iPad'
  },
  {
    name: 'Adobe Illustrator',
    icon: Pencil,
    description: 'Vector graphics and logos',
    link: 'https://www.adobe.com/products/illustrator.html',
    platform: 'Desktop'
  },
  {
    name: 'Adobe Photoshop',
    icon: Video,
    description: 'Photo editing and digital art',
    link: 'https://www.adobe.com/products/photoshop.html',
    platform: 'Desktop'
  }
];

function DigitalDesign() {
  const [activeTab, setActiveTab] = useState('tutorials');

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-purple-600">Digital Design Workshop</h1>
        <p className="mt-2 text-purple-600/80">Create amazing digital art! 🎨</p>
      </header>

      {/* Tools Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <a
              key={tool.name}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                  <span className="inline-block mt-2 text-xs font-medium text-purple-500 bg-purple-50 px-2 py-1 rounded-full">
                    {tool.platform}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </section>

      {/* Featured Challenge */}
      <div className="bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-xl font-bold">Design Challenge of the Week</h2>
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-bold">Create a Magical Forest Scene</p>
          <p className="text-lg opacity-90">Use your favorite digital art tools to bring a mystical forest to life!</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">Earn 50 points</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="text-sm">Special Badge Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'tutorials' && <DesignTutorials />}
        {activeTab === 'projects' && <MyDesignProjects />}
        {activeTab === 'inspiration' && <InspirationBoard />}
      </div>
    </div>
  );
}

export default DigitalDesign;