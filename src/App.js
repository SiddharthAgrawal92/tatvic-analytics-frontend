import './styles.css';
import Login from './components/Login';
import axios from 'axios';
axios.defaults.baseURL = 'https://tatvic-analytics-server.onrender.com';

const App = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;