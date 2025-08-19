'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid md:grid-cols-2 flex-grow">
        {/* Left side - App Info */}
        <div className="bg-gradient-to-br from-recipe-purple to-recipe-purple/80 text-white flex flex-col justify-center p-8 lg:p-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mood Food</h1>
            <p className="text-xl mb-8">Find the perfect recipe based on how you feel today.</p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">😊</div>
                <div>
                  <h3 className="text-xl font-semibold">Match your mood</h3>
                  <p className="opacity-90">Discover recipes tailored to your current emotional state.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🍽️</div>
                <div>
                  <h3 className="text-xl font-semibold">Explore cuisines</h3>
                  <p className="opacity-90">Curated collection of Indian and Italian recipes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🧠</div>
                <div>
                  <h3 className="text-xl font-semibold">Understand connections</h3>
                  <p className="opacity-90">Learn why certain foods work best for specific moods.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Auth Forms */}
        <div className="flex items-center justify-center p-8 bg-gray-50">
          {showLogin ? (
            <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
          )}
        </div>
      </div>
      
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Mood Food. Find recipes based on your mood.</p>
        </div>
      </footer>
    </div>
  );
} 