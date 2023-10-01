import PropTypes from 'prop-types';

const Strike = ({ strikeClass }) => {
  return (
    <div className={`strike ${strikeClass}`}></div>
  )
};

Strike.propTypes = {
  strikeClass: PropTypes.func.isRequired
};

export default Strike;