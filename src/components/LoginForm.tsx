'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-recipe-purple mb-6">Log in to Mood Food</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-purple"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-purple"
            placeholder="Your password"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-recipe-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 mb-4"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-recipe-purple hover:text-recipe-red transition duration-200"
            disabled={loading}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
} 