import PropTypes from 'prop-types';
import Square from './Square';
import Strike from './Strike';

const Board = ({ square, handleResetBoard, gameOver, handleSquareClick, strikeClass}) => {
  return (
    <>
      <div className='board'>
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
        <Strike strikeClass={strikeClass} />
      </div>
    </>
  )
};

Board.propTypes = {
  square: PropTypes.array,
  handleResetBoard: PropTypes.func.isRequired,
  gameOver: PropTypes.bool,
  handleSquareClick: PropTypes.func.isRequired,
  strikeClass: PropTypes.string
};

export default Board;