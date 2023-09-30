import { useState, useEffect, useCallback } from "react";

const Matrix = () => {

  const [textX, setTextX] = useState(Array(9).fill(null));
  const [xPlay, setXPlay] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handlerX = (index) =>{
    if (disableButtons || textX[index] !== null) return;

    const updatedText = [...textX];
    updatedText[index] = 'X';

    setTextX(updatedText);
    setXPlay(!xPlay);
    setDisableButtons(true);

    setTimeout(() => {
      if (updatedText[index] !== 'X') return;
      const randomIndex = getRandomEmptyIndex(updatedText);

      if (randomIndex !== -1) {
        const updatedTextWithO = [...updatedText];
        updatedTextWithO[randomIndex] = 'O';
        setTextX(updatedTextWithO);
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
  
      if (textX[x] && textX[x] === textX[y] && textX[y] === textX[z]) {
        setGameOver(true);
        setWinner(textX[x]);
        return;
      }
    }
  
    if (!textX.includes(null)) {
      setGameOver(true);
      setWinner("Tie");
    }
  }, [textX]);

  useEffect(() => {
    if (!gameOver) {
      checkWinner();
    }
  }, [textX, gameOver, checkWinner]);

  const getRandomEmptyIndex = (arr) => {
    const emptyIndices = arr.reduce((indices, val, index) => {
      if (val === null) indices.push(index);
      return indices;
    }, []);

    if (emptyIndices.length === 0) return -1;
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    return randomIndex;
  }
  
  const resetBoard = () => {
    setTextX(Array(9).fill(null));
    setXPlay(true);
    setDisableButtons(false);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="matrix">
        {textX.map((item, index) => (
            <button
              className="matrix-item"
              key={index}
              onClick = {gameOver ? resetBoard : () => handlerX(index)}>
                {item}
              </button>
          ))
        }      
      </div>
      <button className="reset" onClick={() => resetBoard()}>
        Reset Board
      </button>
      <h2>Winner is : {winner}</h2>
    </>
  );
};

export default Matrix