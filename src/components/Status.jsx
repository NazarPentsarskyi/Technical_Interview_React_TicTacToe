import PropTypes from 'prop-types';

const Status = ({ onReset, winner }) => {
  return (
    <>
      <button className="reset" onClick={onReset}>
        Reset Board
      </button>
      <h2>Winner is : {winner}</h2>
    </>
  )
};

Status.propTypes = {
  onReset: PropTypes.func.isRequired,
  winner: PropTypes.string
};

export default Status;