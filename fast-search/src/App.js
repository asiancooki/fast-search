import React, { useState, useEffect } from 'react';

function CopyLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleCopy} style={{
      position: 'absolute',
      right: '-40px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    }}>
      <span style={{
        display: 'inline-block',
        transition: 'transform 0.3s, opacity 0.3s',
        transform: copied ? 'scale(1.3)' : 'scale(1)',
        opacity: copied ? 1 : 0.85
      }}>
        {copied ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#66a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12v7a2 2 0 0 0 2 2h7" />
            <polyline points="16 3 21 3 21 8" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        )}
      </span>
    </button>
  );
}

function App() {
  const platforms = [
    { name: 'TikTok', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg' },
    { name: 'Instagram', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg' },
    { name: 'Facebook', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg' },
    { name: 'LinkedIn', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg' },
    { name: 'YouTube', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg' },
    { name: 'Reddit', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/reddit.svg' },
    { name: 'Threads', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/threads.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg' },
  ];

  const [website, setWebsite] = useState('TikTok');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => JSON.parse(localStorage.getItem('searchHistory')) || []);
  const [darkMode, setDarkMode] = useState(true);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setSplashGone(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    setSuggestion('');

    try {
      const res = await fetch('https://fastsearch-s869.onrender.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, website }),
      });
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        setSuggestion(`No results for "${query}". Try another keyword.`);
      } else {
        setResults(data.results);
      }

      const updatedHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error(err);
      alert('Error fetching results');
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? 'linear-gradient(135deg, #141e30, #243b55)' : '#f0f0f0',
      color: darkMode ? '#fff' : '#222',
      fontFamily: "'Poppins', sans-serif",
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: 'clamp(20px, 5vh, 40px)',
      transition: 'background 0.4s, color 0.4s'
    }}>
      {/* ... splash screen and header parts unchanged ... */}

      {/* SEARCH RESULTS */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', width: '100%' }}>
        {results.map((item, idx) => (
          <div key={idx} style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <li style={{
              background: darkMode ? '#2a2a2a' : '#eee',
              padding: '10px',
              borderRadius: '10px',
              textAlign: 'left',
              flexGrow: 1,
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              wordBreak: 'break-word'
            }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
                color: '#66a6ff', fontWeight: '600'
              }}>
                {item.title}
              </a>
              <br />
              <small style={{ color: darkMode ? '#aaa' : '#555' }}>{item.snippet}</small>
            </li>

            <CopyLinkButton url={item.url} />
          </div>
        ))}
      </ul>

      {/* LINKEDIN ICON */}
      <a href="https://www.linkedin.com/in/yauchau/" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', bottom: '20px', right: '20px'
      }}>
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" style={{
          width: 'clamp(24px, 5vw, 30px)',
          height: 'clamp(24px, 5vw, 30px)',
          filter: 'invert(0.7)',
          transition: 'transform 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </a>
    </div>
  );
}

export default App;
