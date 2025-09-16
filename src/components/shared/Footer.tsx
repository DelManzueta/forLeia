import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-sm mt-auto border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 CreativeQuest. Made with ❤️ for Leia
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-600 hover:text-teal-600 text-sm">
              Home
            </Link>
            <Link to="/privacy" className="text-gray-600 text-sm transition-colors" style={{ '--hover-color': 'var(--color-primary-600)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-600)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              Privacy
            </Link>
            <Link to="/help" className="text-gray-600 text-sm transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-600)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;