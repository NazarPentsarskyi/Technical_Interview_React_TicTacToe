import PropTypes from 'prop-types';

const Square = ({ index, item, handleResetBoard, gameOver, handleSquareClick}) => {
  return (
    <>
      <button
        className="matrix-item"
        onClick = {gameOver ? handleResetBoard : () => handleSquareClick(index)}
      >
        {item}
      </button>
    </>
  )
};

Square.propTypes = {
  index: PropTypes.number,
  item: PropTypes.string,
  handleResetBoard: PropTypes.func.isRequired,
  gameOver: PropTypes.bool,
  handleSquareClick: PropTypes.func.isRequired,
};

export default Square;