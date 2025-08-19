# 🐄 Cows & Bulls Game

A classic number guessing game built with Next.js, TypeScript, and Tailwind CSS.

## 🎮 How to Play

### Game Rules
- **Bulls**: Correct digit in the correct position
- **Cows**: Correct digit in the wrong position
- Each digit appears only once in the secret number
- The first digit cannot be 0
- You have 3 hints available per game

### Objective
Guess the 4-digit secret number in as few attempts as possible!

### Example
If the secret number is **1234** and you guess **1567**:
- **1 Bull**: The digit "1" is in the correct position
- **0 Cows**: No other digits match

## ✨ Features

### 🎯 Core Gameplay
- 4-digit number guessing with unique digits
- Real-time feedback after each guess
- Automatic win detection
- Input validation (only 4 digits allowed)

### 📊 Score Tracking
- Number of attempts
- Game duration timer
- Hints used counter
- Complete guess history

### 💡 Hint System
- **Hint 1**: Reveals the first digit
- **Hint 2**: Shows the sum of all digits
- **Hint 3**: Reveals the last digit
- Limited to 3 hints per game

### 🎨 User Interface
- Beautiful gradient design
- Responsive layout for mobile and desktop
- Interactive buttons with hover effects
- Clear visual feedback
- Mobile-friendly navigation

### 🔄 Game Management
- Start new game anytime
- Rules explanation toggle
- Persistent game state during session
- Automatic game initialization

## 🚀 Getting Started

1. **Navigate to the game**: Click on "🎮 Cows & Bulls" in the navigation menu
2. **Read the rules**: Click the "📖 Rules" button to understand how to play
3. **Start guessing**: Enter a 4-digit number and click "Guess!"
4. **Use hints wisely**: Click "💡 Hint" when you need help (3 available)
5. **Track progress**: Monitor your attempts, time, and hints used
6. **Start over**: Click "🎮 New Game" to play again

## 🎯 Strategy Tips

- Start with common patterns like 1234 or 5678
- Use hints strategically - don't waste them early
- Pay attention to the feedback to eliminate possibilities
- Remember that each digit appears only once
- Use the sum hint to narrow down possibilities

## 🛠️ Technical Details

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Semantic HTML and keyboard navigation

## 🎉 Enjoy the Game!

Test your logic skills and see how quickly you can guess the secret number. Good luck! 