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
  difficulty: number; // 2, 3, or 4 digits
}

interface PlayerScore {
  name: string;
  gamesWon: number;
  totalAttempts: number;
  bestAttempts: number;
  averageAttempts: number;
  totalTime: number;
  bestTime: number;
}

interface DigitInput {
  value: string;
  isMarked: boolean;
  isCorrect: boolean;
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
    difficulty: 4, // Default to 4 digits
  });

  const [currentGuess, setCurrentGuess] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [gameMode, setGameMode] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [players, setPlayers] = useState<PlayerScore[]>([]);
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  
  // New state for interactive features
  const [digitInputs, setDigitInputs] = useState<DigitInput[]>([]);
  const [selectedDigitIndex, setSelectedDigitIndex] = useState<number>(-1);
  const [usedDigits, setUsedDigits] = useState<Set<string>>(new Set());
  const [eliminatedDigits, setEliminatedDigits] = useState<Set<string>>(new Set());

  // Load players from localStorage
  useEffect(() => {
    const savedPlayers = localStorage.getItem('cowsAndBullsPlayers');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);

  // Save players to localStorage
  const savePlayers = (newPlayers: PlayerScore[]) => {
    setPlayers(newPlayers);
    localStorage.setItem('cowsAndBullsPlayers', JSON.stringify(newPlayers));
  };

  // Initialize digit inputs based on difficulty
  const initializeDigitInputs = (difficulty: number) => {
    const inputs: DigitInput[] = [];
    for (let i = 0; i < difficulty; i++) {
      inputs.push({
        value: '',
        isMarked: false,
        isCorrect: false,
      });
    }
    setDigitInputs(inputs);
    setCurrentGuess('');
    setSelectedDigitIndex(-1);
    setUsedDigits(new Set());
    setEliminatedDigits(new Set());
  };

  // Generate a random number with specified digits
  const generateSecretNumber = (digits: number): string => {
    const availableDigits = '0123456789'.split('');
    let result = '';
    
    // First digit can't be 0
    const firstDigit = availableDigits.slice(1)[Math.floor(Math.random() * 9)];
    result += firstDigit;
    availableDigits.splice(availableDigits.indexOf(firstDigit), 1);
    
    // Add remaining digits
    for (let i = 1; i < digits; i++) {
      const randomIndex = Math.floor(Math.random() * availableDigits.length);
      result += availableDigits[randomIndex];
      availableDigits.splice(randomIndex, 1);
    }
    
    return result;
  };

  // Calculate cows and bulls for a guess
  const calculateFeedback = (guess: string, secret: string): string => {
    let bulls = 0;
    let cows = 0;
    
    for (let i = 0; i < secret.length; i++) {
      if (guess[i] === secret[i]) {
        bulls++;
      } else if (secret.includes(guess[i])) {
        cows++;
      }
    }
    
    if (bulls === secret.length) return `🎉 ${bulls} Bulls! You won!`;
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
  const startNewGame = (difficulty: number) => {
    const newSecretNumber = generateSecretNumber(difficulty);
    setGameState({
      secretNumber: newSecretNumber,
      attempts: [],
      feedback: [],
      gameWon: false,
      gameOver: false,
      startTime: Date.now(),
      endTime: null,
      hintsUsed: 0,
      maxHints: Math.min(difficulty, 3), // Adjust hints based on difficulty
      difficulty,
    });
    initializeDigitInputs(difficulty);
    setGameMode('playing');
  };

  // Handle digit input from number pad
  const handleDigitInput = (digit: string) => {
    if (selectedDigitIndex >= 0 && selectedDigitIndex < digitInputs.length) {
      const newInputs = [...digitInputs];
      newInputs[selectedDigitIndex].value = digit;
      setDigitInputs(newInputs);
      
      // Update current guess
      const newGuess = newInputs.map(input => input.value).join('');
      setCurrentGuess(newGuess);
      
      // Move to next digit or stay if last digit
      if (selectedDigitIndex < digitInputs.length - 1) {
        setSelectedDigitIndex(selectedDigitIndex + 1);
      }
    }
  };

  // Handle digit selection
  const selectDigit = (index: number) => {
    setSelectedDigitIndex(index);
  };

  // Mark digit as correct
  const markDigit = (index: number) => {
    if (index >= 0 && index < digitInputs.length) {
      const newInputs = [...digitInputs];
      newInputs[index].isMarked = !newInputs[index].isMarked;
      setDigitInputs(newInputs);
    }
  };

  // Delete digit
  const deleteDigit = (index: number) => {
    if (index >= 0 && index < digitInputs.length) {
      const newInputs = [...digitInputs];
      newInputs[index].value = '';
      setDigitInputs(newInputs);
      
      // Update current guess
      const newGuess = newInputs.map(input => input.value).join('');
      setCurrentGuess(newGuess);
    }
  };

  // Clear all digits
  const clearAllDigits = () => {
    const newInputs = digitInputs.map(input => ({ ...input, value: '' }));
    setDigitInputs(newInputs);
    setCurrentGuess('');
    setSelectedDigitIndex(-1);
  };

  // Submit a guess
  const submitGuess = () => {
    if (currentGuess.length !== gameState.difficulty || !/^\d+$/.test(currentGuess)) {
      alert(`Please enter a valid ${gameState.difficulty}-digit number!`);
      return;
    }

    const feedback = calculateFeedback(currentGuess, gameState.secretNumber);
    const isWon = feedback.includes('You won!');
    
    // Update used and eliminated digits based on feedback
    const newUsedDigits = new Set(usedDigits);
    const newEliminatedDigits = new Set(eliminatedDigits);
    
    if (feedback.includes('❌ No matches')) {
      // All digits in this guess are eliminated
      currentGuess.split('').forEach(digit => {
        newEliminatedDigits.add(digit);
      });
    } else {
      // Some digits might be used
      currentGuess.split('').forEach(digit => {
        if (!newEliminatedDigits.has(digit)) {
          newUsedDigits.add(digit);
        }
      });
    }
    
    setUsedDigits(newUsedDigits);
    setEliminatedDigits(newEliminatedDigits);
    
    setGameState(prev => ({
      ...prev,
      attempts: [...prev.attempts, currentGuess],
      feedback: [...prev.feedback, feedback],
      gameWon: isWon,
      gameOver: isWon,
      endTime: isWon ? Date.now() : prev.endTime,
    }));
    
    if (isWon) {
      setGameMode('gameOver');
    } else {
      // Clear inputs for next guess
      clearAllDigits();
    }
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
        hint = `The last digit is ${secret[secret.length - 1]}`;
        break;
    }
    
    alert(`Hint: ${hint}`);
    
    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }));
  };

  // Record player score
  const recordPlayerScore = (playerName: string) => {
    const stats = getGameStats();
    if (!stats) return;

    const existingPlayer = players.find(p => p.name === playerName);
    const newScore: PlayerScore = {
      name: playerName,
      gamesWon: (existingPlayer?.gamesWon || 0) + 1,
      totalAttempts: (existingPlayer?.totalAttempts || 0) + stats.attempts,
      bestAttempts: existingPlayer ? Math.min(existingPlayer.bestAttempts, stats.attempts) : stats.attempts,
      averageAttempts: 0, // Will be calculated below
      totalTime: (existingPlayer?.totalTime || 0) + stats.duration,
      bestTime: existingPlayer ? Math.min(existingPlayer.bestTime, stats.duration) : stats.duration,
    };

    // Calculate average attempts
    newScore.averageAttempts = Math.round(newScore.totalAttempts / newScore.gamesWon);

    const updatedPlayers = existingPlayer 
      ? players.map(p => p.name === playerName ? newScore : p)
      : [...players, newScore];

    savePlayers(updatedPlayers);
    setCurrentPlayer('');
    setShowPlayerInput(false);
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
      duration, // in seconds
      hintsUsed: gameState.hintsUsed,
    };
  };

  // Reset all scores
  const resetScores = () => {
    if (confirm('Are you sure you want to reset all player scores?')) {
      setPlayers([]);
      localStorage.removeItem('cowsAndBullsPlayers');
    }
  };

  const stats = getGameStats();

  // Game Menu
  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-5xl font-bold text-indigo-600 mb-4">
              🐄 Cows & Bulls 🐂
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose your difficulty level and start playing!
            </p>

            {/* Difficulty Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <button
                onClick={() => startNewGame(2)}
                className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-2">🟢</div>
                <h3 className="text-xl font-bold mb-2">Easy</h3>
                <p className="text-sm">2 Digits</p>
                <p className="text-xs text-green-100 mt-2">Perfect for kids 6-7 years!</p>
              </button>

              <button
                onClick={() => startNewGame(3)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-2">🟡</div>
                <h3 className="text-xl font-bold mb-2">Medium</h3>
                <p className="text-sm">3 Digits</p>
                <p className="text-xs text-yellow-100 mt-2">Great for beginners!</p>
              </button>

              <button
                onClick={() => startNewGame(4)}
                className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-2">🔴</div>
                <h3 className="text-xl font-bold mb-2">Hard</h3>
                <p className="text-sm">4 Digits</p>
                <p className="text-xs text-red-100 mt-2">Challenge yourself!</p>
              </button>
            </div>

            {/* Game Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowScores(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🏆 View Scores
              </button>
              <button
                onClick={() => setShowRules(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                📖 Rules
              </button>
            </div>

            {/* Rules Modal */}
            {showRules && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md max-h-[80vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">How to Play:</h3>
                  <ul className="text-blue-700 text-sm space-y-2 mb-6">
                    <li>• <strong>Bulls:</strong> Correct digit in correct position</li>
                    <li>• <strong>Cows:</strong> Correct digit in wrong position</li>
                    <li>• Each digit appears only once in the number</li>
                    <li>• First digit cannot be 0</li>
                    <li>• Use hints wisely - you have {gameState.maxHints}!</li>
                    <li>• <strong>Easy:</strong> 2 digits, <strong>Medium:</strong> 3 digits, <strong>Hard:</strong> 4 digits</li>
                    <li>• <strong>New:</strong> Click digits to select, use number pad to input!</li>
                  </ul>
                  <button
                    onClick={() => setShowRules(false)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            )}

            {/* Scores Modal */}
            {showScores && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-4xl max-h-[80vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">🏆 Player Scores</h3>
                  
                  {players.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No games played yet. Start playing to see scores!</p>
                  ) : (
                    <div className="space-y-4">
                      {players.map((player, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-bold text-lg text-indigo-600 mb-2">{player.name}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-semibold">Games Won:</span> {player.gamesWon}
                            </div>
                            <div>
                              <span className="font-semibold">Best Attempts:</span> {player.bestAttempts}
                            </div>
                            <div>
                              <span className="font-semibold">Avg Attempts:</span> {player.averageAttempts}
                            </div>
                            <div>
                              <span className="font-semibold">Best Time:</span> {Math.floor(player.bestTime / 60)}:{(player.bestTime % 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={resetScores}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      🗑️ Reset Scores
                    </button>
                    <button
                      onClick={() => setShowScores(false)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameMode === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Congratulations!</h1>
            <p className="text-xl text-gray-700 mb-6">
              You guessed the {gameState.difficulty}-digit number in {stats?.attempts} attempts!
            </p>
            <p className="text-lg text-gray-600 mb-6">Time: {stats?.time}</p>

            {/* Player Name Input */}
            {showPlayerInput ? (
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Enter your name to save your score:</label>
                <div className="flex gap-2 justify-center">
                  <input
                    type="text"
                    value={currentPlayer}
                    onChange={(e) => setCurrentPlayer(e.target.value)}
                    placeholder="Your name"
                    className="px-4 py-2 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    maxLength={20}
                  />
                  <button
                    onClick={() => recordPlayerScore(currentPlayer)}
                    disabled={!currentPlayer.trim()}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Save Score
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowPlayerInput(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-6"
              >
                🏆 Save My Score
              </button>
            )}

            {/* Game Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => startNewGame(gameState.difficulty)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🎮 Play Again ({gameState.difficulty} digits)
              </button>
              <button
                onClick={() => setGameMode('menu')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🏠 Main Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">
              🐄 Cows & Bulls 🐂
            </h1>
            <p className="text-gray-600 mb-2">
              Guess the {gameState.difficulty}-digit number with unique digits!
            </p>
            <div className="text-sm text-indigo-500">
              Difficulty: {gameState.difficulty === 2 ? '🟢 Easy' : gameState.difficulty === 3 ? '🟡 Medium' : '🔴 Hard'}
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button
              onClick={() => setGameMode('menu')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              🏠 Menu
            </button>
            <button
              onClick={() => startNewGame(gameState.difficulty)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              🎮 New Game
            </button>
            <button
              onClick={() => setShowRules(true)}
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

          {/* Rules Modal */}
          {showRules && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">How to Play:</h3>
                <ul className="text-blue-700 text-sm space-y-2 mb-6">
                  <li>• <strong>Bulls:</strong> Correct digit in correct position</li>
                  <li>• <strong>Cows:</strong> Correct digit in wrong position</li>
                  <li>• Each digit appears only once in the number</li>
                  <li>• First digit cannot be 0</li>
                  <li>• Use hints wisely - you have {gameState.maxHints}!</li>
                  <li>• <strong>Current Difficulty:</strong> {gameState.difficulty} digits</li>
                  <li>• <strong>New:</strong> Click digits to select, use number pad to input!</li>
                </ul>
                <button
                  onClick={() => setShowRules(false)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          )}

          {/* Interactive Digit Input Fields */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Your Guess:</h3>
              <p className="text-sm text-gray-600">Click on a digit position to select it, then use the number pad below</p>
            </div>
            
            {/* Digit Input Fields */}
            <div className="flex justify-center gap-3 mb-4">
              {digitInputs.map((input, index) => (
                <div key={index} className="relative">
                  <div
                    className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center text-2xl font-mono cursor-pointer transition-all duration-200 ${
                      selectedDigitIndex === index
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : input.isMarked
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : input.value
                        ? 'border-blue-300 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                    onClick={() => selectDigit(index)}
                  >
                    {input.value || '?'}
                  </div>
                  
                  {/* Action Buttons */}
                  {selectedDigitIndex === index && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <button
                        onClick={() => markDigit(index)}
                        className={`px-3 py-1 text-xs rounded ${
                          input.isMarked
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {input.isMarked ? 'Unmark' : 'Mark'}
                      </button>
                      <button
                        onClick={() => deleteDigit(index)}
                        className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Current Guess Display */}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">Current Guess:</p>
              <p className="text-xl font-mono text-indigo-600">{currentGuess || 'No digits entered'}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={clearAllDigits}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                🗑️ Clear All
              </button>
              <button
                onClick={submitGuess}
                disabled={currentGuess.length !== gameState.difficulty}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🎯 Submit Guess
              </button>
            </div>
          </div>

          {/* Number Pad */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Number Pad</h3>
            <div className="grid grid-cols-5 gap-3 max-w-xs mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDigitInput(digit)}
                  disabled={selectedDigitIndex === -1}
                  className={`w-12 h-12 rounded-lg font-bold text-lg transition-all duration-200 ${
                    selectedDigitIndex === -1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : eliminatedDigits.has(digit)
                      ? 'bg-red-200 text-red-600 cursor-not-allowed'
                      : usedDigits.has(digit)
                      ? 'bg-yellow-200 text-yellow-600 hover:bg-yellow-300'
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                  }`}
                >
                  {digit}
                </button>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span>Used</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 rounded"></div>
                <span>Eliminated</span>
              </div>
            </div>
          </div>

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