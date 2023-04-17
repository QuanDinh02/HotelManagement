import './App.scss';
import { FaReact } from 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <div className='d-flex align-items-center gap-2 bg-dark bg-gradient text-white p-2'>
        <span><FaReact className='App-logo' /></span>
        <span>Hotel Management</span>
      </div>
    </div>
  );
}

export default App;
