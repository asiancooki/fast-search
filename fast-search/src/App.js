import React, { useState } from 'react';

function App() {
  const [website, setWebsite] = useState('TikTok');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fastsearch-s869.onrender.com/', {
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
    <div style={{ padding: '20px' }}>
      <h1>Search {website}</h1>
      <select value={website} onChange={e => setWebsite(e.target.value)}>
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
      <br /><br />
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      <h2>Results:</h2>
      {results.length === 0 && !loading && <p>No results yet.</p>}
      <ul>
        {results.map((item, idx) => (
          <li key={idx}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a><br/>
            <small>{item.snippet}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
