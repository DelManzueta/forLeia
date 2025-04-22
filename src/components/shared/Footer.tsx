import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-sm mt-auto border-t border-white/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 CreativeQuest. Made with ❤️ for Leia
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-600 hover:text-teal-600 text-sm">
              Home
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-teal-600 text-sm">
              Privacy
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-teal-600 text-sm">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;