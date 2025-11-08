import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  const fetchAPI =async()=>{
    const response = await axios.get("http://localhost:5000/api");
    setData(response.data.message);
  };

  useEffect(() => {
    fetchAPI();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <p>{data}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
