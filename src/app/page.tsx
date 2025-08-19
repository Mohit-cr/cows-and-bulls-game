'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../components/LandingPage';
import MainLayout from '../components/MainLayout';
import Link from 'next/link';
import { moods } from '../data/recipes';

export default function Home() {
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Handle client-side rendering for localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state
  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-recipe-purple">Loading...</div>
      </div>
    );
  }

  // Show landing page if not authenticated
  if (!user) {
    return <LandingPage />;
  }

  // Show mood selection if authenticated
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-recipe-purple">
            Mood Food
          </h1>
          <p className="text-xl mt-4">
            Hi {user.name}, find the perfect Indian or Italian recipe based on your mood
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {moods.map((mood) => (
            <Link 
              key={mood.id}
              href={`/recipes/${mood.id}`}
              className="mood-card group"
            >
              <div className="text-center">
                <div className="emoji-lg mb-4">{mood.emoji}</div>
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-recipe-purple transition-colors">
                  {mood.name}
                </h2>
                <p className="text-gray-600">{mood.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Games Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-recipe-purple mb-6">🎮 Fun & Games</h2>
          <div className="max-w-md mx-auto">
            <Link 
              href="/cows-and-bulls"
              className="block bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-4xl mb-3">🐄🐂</div>
              <h3 className="text-2xl font-bold mb-2">Cows & Bulls</h3>
              <p className="text-indigo-100">
                Test your logic with this classic number guessing game!
              </p>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 