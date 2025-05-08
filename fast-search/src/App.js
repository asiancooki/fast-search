import React, { useState } from 'react';

function App() {
  const [website, setWebsite] = useState('TikTok');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fastsearch-s869.onrender.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, website }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert('Error fetching results');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Poppins', sans-serif",
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.9)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Search <span style={{ color: '#66a6ff' }}>{website}</span></h1>
        
        <select
          value={website}
          onChange={e => setWebsite(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: 'none',
            borderRadius: '10px',
            background: '#f1f1f1',
            fontSize: '16px'
          }}>
          <option value="TikTok">TikTok</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="X">X</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="YouTube">YouTube</option>
          <option value="Reddit">Reddit</option>
          <option value="Threads">Threads</option>
          <option value="GitHub">GitHub</option>
        </select>

        <input
          type="text"
          placeholder="Enter search query"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: 'none',
            borderRadius: '10px',
            background: '#f1f1f1',
            fontSize: '16px'
          }}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: 'none',
            borderRadius: '10px',
            background: loading ? '#aaa' : '#66a6ff',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        <h2 style={{ fontSize: '18px', margin: '20px 0 10px', color: '#333' }}>Results:</h2>

        {results.length === 0 && !loading && <p style={{ color: '#777' }}>No results yet.</p>}
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((item, idx) => (
            <li key={idx} style={{
              background: '#f9f9f9',
              padding: '10px',
              borderRadius: '10px',
              marginBottom: '10px',
              textAlign: 'left',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: '#333', textDecoration: 'none' }}>
                {item.title}
              </a>
              <br />
              <small style={{ color: '#666' }}>{item.snippet}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
