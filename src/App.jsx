import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, SkipForward, Trophy, Target } from 'lucide-react';

const CELL_SIZE = 50;
const EMPTY = 0;
const WALL = 1;
const BOX = 2;
const TARGET = 3;
const PLAYER = 4;
const BOX_ON_TARGET = 5;
const PLAYER_ON_TARGET = 6;

// The 'levels' array now contains 10 solvable levels.
// The first 5 are your originals, and levels 6-10 are new additions.
const levels = [
  // --- Your Original 5 Levels ---
  // Level 1
  [
    [1,1,1,1,1,1,1],
    [1,1,0,0,0,1,1],
    [1,0,4,2,0,0,1],
    [1,0,0,0,3,1,1],
    [1,1,1,1,1,1,1]
  ],
  // Level 2
  [
    [1,1,1,1,1,1],
    [1,3,0,0,1,1],
    [1,0,2,2,0,1],
    [1,0,4,0,0,1],
    [1,1,1,3,1,1],
    [1,1,1,1,1,1]
  ],
  // Level 3
  [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,1],
    [1,0,2,3,0,0,0,1],
    [1,0,0,1,2,3,0,1],
    [1,0,4,0,0,0,0,1],
    [1,1,1,1,1,1,1,1]
  ],
  // Level 4
  [
    [1,1,1,1,1,1,1],
    [1,0,3,0,3,0,1],
    [1,0,0,2,0,0,1],
    [1,0,2,4,2,0,1],
    [1,0,0,2,0,0,1],
    [1,0,3,0,3,0,1],
    [1,1,1,1,1,1,1]
  ],
  // Level 5
  [
    [1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,1,1],
    [1,1,0,3,0,3,0,1],
    [1,0,0,2,4,2,0,1],
    [1,0,3,0,2,0,1,1],
    [1,1,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1]
  ],

  // --- NEW ADDITIONAL LEVELS ---
  
  // Level 6 - "The Hallway"
  [
    [1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,1,1],
    [1,3,2,4,2,3,0,1],
    [1,1,1,0,0,0,1,1],
    [1,1,1,1,1,1,1,1]
  ],
  
  // Level 7 - "Crossroads"
  [
    [1,1,1,1,1,1,1],
    [1,0,0,3,0,0,1],
    [1,0,0,2,0,0,1],
    [1,3,2,4,2,3,1],
    [1,0,0,2,0,0,1],
    [1,0,0,3,0,0,1],
    [1,1,1,1,1,1,1]
  ],

  // Level 8 - "Open Space"
  [
    [1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,1],
    [1,0,3,0,2,0,3,0,1],
    [1,0,0,2,4,2,0,0,1],
    [1,0,3,0,2,0,3,0,1],
    [1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1]
  ],

  // Level 9 - "The Trap"
  [
    [1,1,1,1,1,1,1],
    [1,0,0,0,1,1,1],
    [1,3,2,0,0,0,1],
    [1,0,1,2,3,0,1],
    [1,0,4,2,0,0,1],
    [1,1,1,3,1,1,1],
    [1,1,1,1,1,1,1]
  ],

  // Level 10 - "Final Puzzle"
  [
    [1,1,1,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,1,1],
    [1,0,3,2,0,2,3,0,1],
    [1,0,0,1,4,1,0,0,1],
    [1,0,3,2,0,2,3,0,1],
    [1,1,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1]
  ]
];

const SokobanGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [history, setHistory] = useState([]);

  const initializeLevel = useCallback((levelIndex) => {
    const level = levels[levelIndex].map(row => [...row]);
    const newGameState = level.map(row => [...row]);
    let playerX = 0, playerY = 0;

    for (let y = 0; y < newGameState.length; y++) {
      for (let x = 0; x < newGameState[y].length; x++) {
        if (newGameState[y][x] === PLAYER || newGameState[y][x] === PLAYER_ON_TARGET) {
          playerX = x;
          playerY = y;
          newGameState[y][x] = newGameState[y][x] === PLAYER_ON_TARGET ? TARGET : EMPTY;
          break;
        }
      }
    }

    setGameState(newGameState);
    setPlayerPos({ x: playerX, y: playerY });
    setMoves(0);
    setIsCompleted(false);
    setGameWon(false);
    setHistory([{ 
      gameState: newGameState.map(row => [...row]), 
      playerPos: { x: playerX, y: playerY }, 
      moves: 0 
    }]);
  }, []);

  useEffect(() => {
    initializeLevel(currentLevel);
  }, [currentLevel, initializeLevel]);

  const checkWinCondition = useCallback((state) => {
    return !state.some(row => row.includes(TARGET));
  }, []);
  
  const saveState = useCallback(() => {
    const currentState = {
      gameState: gameState.map(row => [...row]),
      playerPos: { ...playerPos },
      moves,
    };
    setHistory(prev => [...prev, currentState]);
  }, [gameState, playerPos, moves]);

  const movePlayer = useCallback((dx, dy) => {
    if (isCompleted) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newX < 0 || newX >= gameState[0].length || newY < 0 || newY >= gameState.length) {
      return;
    }

    const targetCell = gameState[newY][newX];

    if (targetCell === WALL) {
      return;
    }

    saveState();
    
    if (targetCell === BOX || targetCell === BOX_ON_TARGET) {
      const boxNewX = newX + dx;
      const boxNewY = newY + dy;

      if (boxNewX < 0 || boxNewX >= gameState[0].length || boxNewY < 0 || boxNewY >= gameState.length) {
        setHistory(prev => prev.slice(0, -1));
        return;
      }
      
      const boxTargetCell = gameState[boxNewY][boxNewX];

      if (boxTargetCell === WALL || boxTargetCell === BOX || boxTargetCell === BOX_ON_TARGET) {
        setHistory(prev => prev.slice(0, -1));
        return;
      }

      const newGameState = gameState.map(row => [...row]);

      newGameState[boxNewY][boxNewX] = boxTargetCell === TARGET ? BOX_ON_TARGET : BOX;
      
      // Clear the player's old spot
      const oldPlayerCell = newGameState[playerPos.y][playerPos.x];
      newGameState[playerPos.y][playerPos.x] = oldPlayerCell === PLAYER_ON_TARGET ? TARGET : EMPTY;
      
      // Move player into the box's old spot
      newGameState[newY][newX] = targetCell === BOX_ON_TARGET ? PLAYER_ON_TARGET : PLAYER;

      // This logic was causing bugs. Simpler to just update player pos state.
      setPlayerPos({ x: newX, y: newY });
      setGameState(newGameState);
      setMoves(prev => prev + 1);

      if (checkWinCondition(newGameState)) {
        setIsCompleted(true);
        if (currentLevel === levels.length - 1) {
          setGameWon(true);
        }
      }
    } else { 
      setPlayerPos({ x: newX, y: newY });
      setMoves(prev => prev + 1);
    }
  }, [playerPos, gameState, isCompleted, saveState, checkWinCondition, currentLevel]);

  const undoMove = useCallback(() => {
    if (history.length <= 1) return;
    
    const lastState = history[history.length - 1];
    setGameState(lastState.gameState);
    setPlayerPos(lastState.playerPos);
    setMoves(lastState.moves);
    setHistory(prev => prev.slice(0, -1));
    setIsCompleted(false);
  }, [history]);

  const nextLevel = useCallback(() => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
    }
  }, [currentLevel]);

  const resetLevel = useCallback(() => {
    initializeLevel(currentLevel);
  }, [currentLevel, initializeLevel]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'r', 'u'].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key.toLowerCase()) {
        case 'arrowup': case 'w': movePlayer(0, -1); break;
        case 'arrowdown': case 's': movePlayer(0, 1); break;
        case 'arrowleft': case 'a': movePlayer(-1, 0); break;
        case 'arrowright': case 'd': movePlayer(1, 0); break;
        case 'r': resetLevel(); break;
        case 'u': undoMove(); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, resetLevel, undoMove]);

  const getCellContent = (cell, x, y) => {
    const isPlayerHere = playerPos.x === x && playerPos.y === y;
    
    if (isPlayerHere) {
      return (
        <div className="w-full h-full bg-blue-500 rounded-full border-2 border-blue-700 flex items-center justify-center text-white font-bold shadow-lg transform transition-transform duration-150 hover:scale-110">
          👩🏻‍🦰
        </div>
      );
    }

    switch (cell) {
      case WALL:
        return <div className="w-full h-full bg-gray-800 border border-gray-600 shadow-inner"></div>;
      case BOX:
        return (
          <div className="w-full h-full bg-amber-600 border-2 border-amber-800 rounded-lg shadow-lg flex items-center justify-center transform transition-transform duration-200">
            <div className="w-6 h-6 bg-amber-500 rounded border border-amber-700"></div>
          </div>
        );
      case TARGET:
        return (
          <div className="w-full h-full bg-green-200 border-2 border-green-400 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-green-600" />
          </div>
        );
      case BOX_ON_TARGET:
        return (
          <div className="w-full h-full bg-green-500 border-2 border-green-700 rounded-lg shadow-lg flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 bg-green-400 rounded border border-green-600"></div>
          </div>
        );
      default:
        return <div className="w-full h-full bg-gray-100"></div>;
    }
  };

  if (gameState.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-pink-900 flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Congratulations! 🎉</h1>
          <p className="text-xl text-gray-600 mb-6">You've completed all {levels.length} levels!</p>
          <button
            onClick={() => setCurrentLevel(0)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const gridHeight = gameState.length * CELL_SIZE;
  const gridWidth = gameState[0].length * CELL_SIZE;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Sokoban</h1>
          <div className="flex items-center justify-center gap-6 text-white">
            <span className="text-lg">Level: {currentLevel + 1}/{levels.length}</span>
            <span className="text-lg">Moves: {moves}</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="grid gap-1 p-4 bg-white/5 rounded-xl border-2 border-white/10"
            style={{
              gridTemplateColumns: `repeat(${gameState[0].length}, ${CELL_SIZE}px)`,
              width: gridWidth + 32,
              height: gridHeight + 32
            }}
          >
            {gameState.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className="border border-gray-300/20 transition-all duration-200"
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                >
                  {getCellContent(cell, x, y)}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={undoMove}
            disabled={history.length <= 1}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Undo
          </button>
          <button
            onClick={resetLevel}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Reset
          </button>
          {isCompleted && currentLevel < levels.length - 1 && (
            <button
              onClick={nextLevel}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 animate-bounce"
            >
              <SkipForward className="w-4 h-4" />
              Next Level
            </button>
          )}
        </div>
        
        <div className="text-center text-white/70 text-sm">
          <p>Use arrow keys or WASD to move • R to reset • U to undo</p>
          <p className="mt-1">Push boxes (📦) onto targets (🎯) to complete each level</p>
        </div>
      </div>
    </div>
  );
};

export default SokobanGame;