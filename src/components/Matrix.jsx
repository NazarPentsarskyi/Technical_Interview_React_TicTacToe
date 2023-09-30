import { useState, useEffect, useCallback } from "react";
import Board from "./Board";
import Status from "./Status";

const Matrix = () => {

  const [square, setSquare] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (index) =>{
    if (disableButtons || square[index] !== null) return;

    const updatedBoard = [...square];
    updatedBoard[index] = 'X';

    setSquare(updatedBoard);
    setXPlaying(!xPlaying);
    setDisableButtons(true);

    setTimeout(() => {
      if (updatedBoard[index] !== 'X') return;
      const randomIndexBoard = getRandomEmptyIndex(updatedBoard);

      if (randomIndexBoard !== -1) {
        const updatedBoardWithO = [...updatedBoard];
        updatedBoardWithO[randomIndexBoard] = 'O';
        setSquare(updatedBoardWithO);
        setDisableButtons(false);
      }
    }, 500);
  };
   
  const checkWinner = useCallback(() => {

    const WIN_CONDITIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
  
      if (square[x] && square[x] === square[y] && square[y] === square[z]) {
        setGameOver(true);
        setWinner(square[x]);
        return;
      }
    }
  
    if (!square.includes(null)) {
      setGameOver(true);
      setWinner("Tie");
    }
  }, [square]);

  useEffect(() => {
    if (!gameOver) {
      checkWinner();
    }
  }, [square, gameOver, checkWinner]);

  const getRandomEmptyIndex = (arr) => {
    const emptyIndices = arr.reduce((indices, val, index) => {
      if (val === null) indices.push(index);
      return indices;
    }, []);

    if (emptyIndices.length === 0) return -1;
    const randomIndexBoard = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    return randomIndexBoard;
  }
  
  const handleResetBoard = () => {
    setSquare(Array(9).fill(null));
    setXPlaying(true);
    setDisableButtons(false);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <>
      <Board
        square={square}
        gameOver={gameOver}
        handleResetBoard={handleResetBoard}
        handleSquareClick={handleSquareClick}
      />
      <Status onReset={handleResetBoard} winner={winner}/>
    </>
  );
};

export default Matrix;