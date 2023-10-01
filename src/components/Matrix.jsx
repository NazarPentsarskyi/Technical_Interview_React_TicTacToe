import { useState, useEffect, useCallback } from 'react';
import tictactoe from '../../public/tictactoe_white.svg';
import Board from './Board';
import Status from './Status';

const Matrix = () => {

  const [square, setSquare] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [strikeClass, setStrikeClass] = useState();

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

    const winningCombinations = [
      //Rows
      { combo: [0, 1, 2], strikeClass: 'strike-row-1' },
      { combo: [3, 4, 5], strikeClass: 'strike-row-2' },
      { combo: [6, 7, 8], strikeClass: 'strike-row-3' },
    
      //Columns
      { combo: [0, 3, 6], strikeClass: 'strike-column-1' },
      { combo: [1, 4, 7], strikeClass: 'strike-column-2' },
      { combo: [2, 5, 8], strikeClass: 'strike-column-3' },
    
      //Diagonals
      { combo: [0, 4, 8], strikeClass: 'strike-diagonal-1' },
      { combo: [2, 4, 6], strikeClass: 'strike-diagonal-2' },
    ];

    for (const { combo, strikeClass } of winningCombinations) {
      const squareValue1 = square[combo[0]];
      const squareValue2 = square[combo[1]];
      const squareValue3 = square[combo[2]];
  
      if (
        squareValue1 !== null &&
        squareValue1 === squareValue2 &&
        squareValue1 === squareValue3
      ) {
        setStrikeClass(strikeClass);
        setGameOver(true);
        if (squareValue1 === 'X') {
        setWinner('X');
        } else {
          setWinner('O');
        }
        return;
      }
    }
  
    if (!square.includes(null)) {
      setGameOver(true);
      setWinner('Tie');
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
    setStrikeClass(null);
  };

  return (
    <>
    <div className='header'>
      <h1>Tic Tac Toe</h1>
      <img className='logo'
        src={tictactoe}
        alt='logo tic tac toe game'
        onClick={handleResetBoard}
      />
    </div>
    <div className='main'>
      <Board
        square={square}
        gameOver={gameOver}
        handleResetBoard={handleResetBoard}
        handleSquareClick={handleSquareClick}
        strikeClass={strikeClass}
      />
      <Status onReset={handleResetBoard} winner={winner}/>
      </div>
    </>
  );
};

export default Matrix;