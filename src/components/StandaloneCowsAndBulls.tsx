'use client';

import React, { useState, useEffect } from 'react';

interface GameState {
  secretNumber: string;
  attempts: string[];
  feedback: string[];
  gameWon: boolean;
  gameOver: boolean;
  startTime: number | null;
  endTime: number | null;
  hintsUsed: number;
  maxHints: number;
}

const StandaloneCowsAndBulls: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    secretNumber: '',
    attempts: [],
    feedback: [],
    gameWon: false,
    gameOver: false,
    startTime: null,
    endTime: null,
    hintsUsed: 0,
    maxHints: 3,
  });

  const [currentGuess, setCurrentGuess] = useState('');
  const [showRules, setShowRules] = useState(false);

  // Generate a random 4-digit number with unique digits
  const generateSecretNumber = (): string => {
    const digits = '0123456789'.split('');
    let result = '';
    
    // First digit can't be 0
    const firstDigit = digits.slice(1)[Math.floor(Math.random() * 9)];
    result += firstDigit;
    digits.splice(digits.indexOf(firstDigit), 1);
    
    // Add remaining 3 digits
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      result += digits[randomIndex];
      digits.splice(randomIndex, 1);
    }
    
    return result;
  };

  // Calculate cows and bulls for a guess
  const calculateFeedback = (guess: string, secret: string): string => {
    let bulls = 0;
    let cows = 0;
    
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        bulls++;
      } else if (secret.includes(guess[i])) {
        cows++;
      }
    }
    
    if (bulls === 4) return '🎉 4 Bulls! You won!';
    if (bulls === 0 && cows === 0) return '❌ No matches';
    
    let feedback = '';
    if (bulls > 0) feedback += `${bulls} Bull${bulls > 1 ? 's' : ''}`;
    if (cows > 0) {
      if (feedback) feedback += ' & ';
      feedback += `${cows} Cow${cows > 1 ? 's' : ''}`;
    }
    
    return feedback;
  };

  // Start a new game
  const startNewGame = () => {
    const newSecretNumber = generateSecretNumber();
    setGameState({
      secretNumber: newSecretNumber,
      attempts: [],
      feedback: [],
      gameWon: false,
      gameOver: false,
      startTime: Date.now(),
      endTime: null,
      hintsUsed: 0,
      maxHints: 3,
    });
    setCurrentGuess('');
  };

  // Submit a guess
  const submitGuess = () => {
    if (currentGuess.length !== 4 || !/^\d{4}$/.test(currentGuess)) {
      alert('Please enter a valid 4-digit number!');
      return;
    }

    const feedback = calculateFeedback(currentGuess, gameState.secretNumber);
    const isWon = feedback.includes('You won!');
    
    setGameState(prev => ({
      ...prev,
      attempts: [...prev.attempts, currentGuess],
      feedback: [...prev.feedback, feedback],
      gameWon: isWon,
      gameOver: isWon,
      endTime: isWon ? Date.now() : prev.endTime,
    }));
    
    setCurrentGuess('');
  };

  // Use a hint
  const useHint = () => {
    if (gameState.hintsUsed >= gameState.maxHints) {
      alert('No hints remaining!');
      return;
    }

    const secret = gameState.secretNumber;
    const hintIndex = gameState.hintsUsed;
    let hint = '';
    
    switch (hintIndex) {
      case 0:
        hint = `The first digit is ${secret[0]}`;
        break;
      case 1:
        hint = `The sum of all digits is ${secret.split('').reduce((sum, digit) => sum + parseInt(digit), 0)}`;
        break;
      case 2:
        hint = `The last digit is ${secret[3]}`;
        break;
    }
    
    alert(`Hint: ${hint}`);
    
    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }));
  };

  // Calculate game statistics
  const getGameStats = () => {
    if (!gameState.startTime) return null;
    
    const endTime = gameState.endTime || Date.now();
    const duration = Math.floor((endTime - gameState.startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    
    return {
      attempts: gameState.attempts.length,
      time: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      hintsUsed: gameState.hintsUsed,
    };
  };

  // Initialize game on component mount
  useEffect(() => {
    startNewGame();
  }, []);

  const stats = getGameStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">
            🐄 Cows & Bulls 🐂
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Guess the 4-digit number with unique digits!
          </p>

          {/* Game Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button
              onClick={startNewGame}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              🎮 New Game
            </button>
            <button
              onClick={() => setShowRules(!showRules)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              📖 Rules
            </button>
            <button
              onClick={useHint}
              disabled={gameState.hintsUsed >= gameState.maxHints}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                gameState.hintsUsed >= gameState.maxHints
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              💡 Hint ({gameState.maxHints - gameState.hintsUsed} left)
            </button>
          </div>

          {/* Rules */}
          {showRules && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">How to Play:</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• <strong>Bulls:</strong> Correct digit in correct position</li>
                <li>• <strong>Cows:</strong> Correct digit in wrong position</li>
                <li>• Each digit appears only once in the number</li>
                <li>• First digit cannot be 0</li>
                <li>• Use hints wisely - you only have 3!</li>
              </ul>
            </div>
          )}

          {/* Game Status */}
          {gameState.gameWon && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6 text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-2">🎉 Congratulations!</h2>
              <p className="text-green-700">
                You guessed the number in {stats?.attempts} attempts!
              </p>
              <p className="text-green-700">Time: {stats?.time}</p>
            </div>
          )}

          {/* Input Section */}
          {!gameState.gameOver && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex gap-4 items-center justify-center">
                <input
                  type="text"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Enter 4 digits"
                  className="text-2xl text-center font-mono w-32 h-12 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  maxLength={4}
                />
                <button
                  onClick={submitGuess}
                  disabled={currentGuess.length !== 4}
                  className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Guess!
                </button>
              </div>
            </div>
          )}

          {/* Game Statistics */}
          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">{stats.attempts}</div>
                <div className="text-sm text-indigo-500">Attempts</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.time}</div>
                <div className="text-sm text-green-500">Time</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.hintsUsed}</div>
                <div className="text-sm text-yellow-500">Hints Used</div>
              </div>
            </div>
          )}

          {/* Attempts History */}
          {gameState.attempts.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Your Guesses:</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {gameState.attempts.map((attempt, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white rounded-lg px-4 py-2 shadow-sm"
                  >
                    <span className="font-mono text-lg">{attempt}</span>
                    <span className="text-sm font-medium text-gray-600">
                      {gameState.feedback[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandaloneCowsAndBulls; 