import PropTypes from 'prop-types';
import Square from './Square';

const Board = ({ square, handleResetBoard, gameOver, handleSquareClick}) => {
  return (
    <>
      <div className="matrix">
        {square.map((item, index) => (
          <Square
            key={index}
            item={item}
            index={index}
            gameOver={gameOver}
            handleResetBoard={handleResetBoard}
            handleSquareClick={handleSquareClick} 
          />
          ))
        }     
      </div>
    </>
  )
};

Board.propTypes = {
  square: PropTypes.array,
  handleResetBoard: PropTypes.func.isRequired,
  gameOver: PropTypes.bool,
  handleSquareClick: PropTypes.func.isRequired,
};

export default Board;