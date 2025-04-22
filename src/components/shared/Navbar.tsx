import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Palette, Code, Globe, Pencil, Music, Coins, Keyboard, Book, Mail, 
  CheckSquare, Heart, Menu, X, ChevronRight, Sparkles, Brain, Dumbbell,
  Salad, Sun, Moon
} from 'lucide-react';

const navItems = [
  { 
    category: 'Creative',
    path: '/creative',
    icon: Palette,
    items: [
      { path: '/art-studio', icon: Palette, label: 'Art Studio' },
      { path: '/coding', icon: Code, label: 'Coding' },
      { path: '/design', icon: Pencil, label: 'Design' },
      { path: '/music', icon: Music, label: 'Beat Lab' }
    ]
  },
  {
    category: 'Learning',
    path: '/learning',
    icon: Globe,
    items: [
      { path: '/language', icon: Globe, label: 'Language' },
      { path: '/typing', icon: Keyboard, label: 'Typing' },
      { path: '/library', icon: Book, label: 'Library' }
    ]
  },
  {
    category: 'Organization',
    path: '/organization',
    icon: CheckSquare,
    items: [
      { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
      { path: '/email', icon: Mail, label: 'Email' },
      { path: '/finance-fun', icon: Coins, label: 'CoinQuest' }
    ]
  }
];

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActiveLink = (path: string) => {
    if (path.includes('?')) {
      const [basePath, query] = path.split('?');
      return location.pathname === basePath && location.search.includes(query);
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            CreativeQuest
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((category) => (
              <div key={category.category} className="relative group">
                <Link
                  to={category.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActiveLink(category.path)
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.category}
                </Link>
                <div className="absolute top-full left-0 w-48 py-2 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 text-sm ${
                          isActiveLink(item.path)
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 py-6 h-full overflow-auto">
          {navItems.map((category) => (
            <div key={category.category} className="mb-8">
              <Link
                to={category.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium mb-2 ${
                  isActiveLink(category.path)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.category}</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
              <div className="grid grid-cols-2 gap-2 pl-4">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-colors ${
                        isActiveLink(item.path)
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;