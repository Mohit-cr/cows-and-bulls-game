'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-recipe-purple">
          Mood Food
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-recipe-purple transition-colors">
            Home
          </Link>
          <Link href="/cows-and-bulls" className="text-gray-600 hover:text-recipe-purple transition-colors">
            🎮 Cows & Bulls
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-recipe-purple focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* User Profile */}
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-800 hidden sm:block">Hi, {user.name.split(' ')[0]}</span>
              <div className="w-8 h-8 bg-recipe-purple rounded-full flex items-center justify-center text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-20 border-t">
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-600 hover:text-recipe-purple transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/cows-and-bulls" 
              className="block px-4 py-2 text-gray-600 hover:text-recipe-purple transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              🎮 Cows & Bulls
            </Link>
            {user && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-recipe-purple/10"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 