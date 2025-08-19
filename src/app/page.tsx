'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Redirect directly to the Cows & Bulls game
  useEffect(() => {
    router.push('/cows-and-bulls');
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="text-6xl mb-4">🐄🐂</div>
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Cows & Bulls Game
        </h1>
        <p className="text-gray-600">Redirecting to the game...</p>
      </div>
    </div>
  );
} 