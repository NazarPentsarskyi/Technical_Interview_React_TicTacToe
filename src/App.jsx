import Matrix from './components/Matrix';
import tictactoe from '../public/tictactoe_white.svg';
import './App.css';

function App() {
  return (
    <>
    <div className='header'>
      <h1>Tic Tac Toe</h1>
      <img className='logo' src={tictactoe} alt='logo tic tac toe game' />
    </div>
      <Matrix />
    </>
  )
}

export default App;
