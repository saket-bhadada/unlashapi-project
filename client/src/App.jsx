import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <nav className="nav">
        <div className="nav-content">
          <h1>ImageHub</h1>
          <div className="nav-links">
            <Link to="/search">
              <button>Search</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="hero">
          <h1>Welcome to ImageHub</h1>
          <p>Discover and search for beautiful images from around the world</p>
          <div className="button-group">
            <Link to="/search">
              <button>Start Searching</button>
            </Link>
            <Link to="/register">
              <button className="secondary">Create Account</button>
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Features</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '1rem',
            }}
          >
            <div>
              <h3>🔍 Powerful Search</h3>
              <p>Search through millions of high-quality images instantly</p>
            </div>
            <div>
              <h3>⚡ Fast Results</h3>
              <p>
                Get results in milliseconds with our optimized search engine
              </p>
            </div>
            <div>
              <h3>🎨 High Quality</h3>
              <p>Access beautiful images in high resolution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
