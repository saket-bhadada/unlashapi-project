import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e) {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setIsLoading(true);
    setError('');
    setImages([]);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.images && data.images.length > 0) {
          setImages(data.images);
          setHasSearched(true);
        } else {
          setError('No images found for your search');
          setHasSearched(true);
        }
      } else {
        setError(data.error || 'Search failed. Please try again.');
        setHasSearched(true);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please ensure the server is running.');
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <nav className="nav">
        <div className="nav-content">
          <h1>ImageHub</h1>
          <div className="nav-links">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="search-container">
          <h2>Search Images</h2>
          <form onSubmit={handleSearch}>
            <div className="search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Search for images..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? '🔍 Searching...' : '🔍 Search'}
              </button>
            </div>
          </form>

          {error && <div className="error-message">✕ {error}</div>}
        </div>

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading images...</p>
          </div>
        )}

        {!isLoading && hasSearched && images.length === 0 && !error && (
          <div className="no-results">
            <h2>No images found</h2>
            <p>Try adjusting your search query and try again</p>
          </div>
        )}

        {images.length > 0 && (
          <div>
            <p
              style={{
                textAlign: 'center',
                color: 'var(--text-light)',
                marginBottom: '2rem',
              }}
            >
              Found {images.length} images
            </p>
            <div className="gallery">
              {images.map((img, index) => (
                <div key={img.id || index} className="gallery-item">
                  <img
                    src={img.urls?.small || img.urls?.regular}
                    alt={img.alt_description || img.description || 'image'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'var(--text-light)',
            }}
          >
            <h2 style={{ color: 'var(--text-light)', fontSize: '1.5rem' }}>
              Start searching for images
            </h2>
            <p>Enter a search term above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
