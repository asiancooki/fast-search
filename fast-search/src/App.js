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
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: 'clamp(20px, 5vh, 40px)',
      transition: 'background 0.4s, color 0.4s'
    }}>
      {/* SPLASH SCREEN */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: splashGone ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.5s ease'
      }}>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 60px)', margin: 0 }}>FastSearch</h1>
          <p style={{
            position: 'absolute', bottom: '-clamp(10px, 2vw, 18px)', right: '0',
            fontSize: 'clamp(10px, 2vw, 14px)', color: '#aaa', margin: 0
          }}>by Yau Chau</p>
        </div>
      </div>

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 5vh, 40px)' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', margin: 0 }}>FastSearch</h1>
          <p style={{
            position: 'absolute', bottom: '-clamp(8px, 1.5vw, 14px)', right: '0',
            fontSize: 'clamp(10px, 2vw, 12px)', color: '#aaa', margin: 0
          }}>by Yau Chau</p>
        </div>
        <p style={{
          fontSize: 'clamp(16px, 4vw, 26px)', marginTop: 'clamp(20px, 5vh, 50px)',
          background: 'linear-gradient(90deg, #66a6ff, #89f7fe)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '600'
        }}>
          Find your results fast, anywhere.
        </p>
        <button onClick={toggleDarkMode} style={{
          padding: '8px 16px', borderRadius: '8px', marginTop: '10px',
          background: darkMode ? '#333' : '#ddd', color: darkMode ? '#fff' : '#222',
          border: 'none', cursor: 'pointer'
        }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* SEARCH BOX */}
      <div style={{
        background: darkMode ? 'rgba(20,20,20,0.85)' : '#fff',
        color: darkMode ? '#fff' : '#222',
        padding: '40px', borderRadius: '20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        width: '90%', maxWidth: '460px',
        textAlign: 'center', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <h2>Search <span style={{ color: '#66a6ff' }}>{website}</span></h2>

        {/* Platforms */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '12px', marginBottom: '20px'
        }}>
          {platforms.map(platform => (
            <div key={platform.name} onClick={() => setWebsite(platform.name)} style={{
              cursor: 'pointer', padding: '8px', borderRadius: '50%',
              background: website === platform.name ? '#66a6ff' : '#222',
              boxShadow: website === platform.name ? '0 0 15px #66a6ff' : '0 2px 8px rgba(0,0,0,0.5)',
              width: 'clamp(40px,10vw,50px)', height: 'clamp(40px,10vw,50px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <img src={platform.icon} alt={platform.name} style={{
                filter: website === platform.name ? 'invert(1)' : 'invert(0.7)',
                width: 'clamp(20px,5vw,28px)', height: 'clamp(20px,5vw,28px)'
              }} />
            </div>
          ))}
        </div>

        {/* Search history */}
        {searchHistory.length > 0 && (
          <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px', textAlign: 'center' }}>
            Recent: {searchHistory.map((q, idx) => (
              <span key={idx} onClick={() => { setQuery(q); handleSearch(); }} style={{
                cursor: 'pointer', marginRight: '8px', textDecoration: 'underline'
              }}>
                {q}
              </span>
            ))}
          </div>
        )}

        {/* Input */}
        <input type="text" placeholder="Enter search query" value={query}
          onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown}
          style={{
            width: '100%', padding: '12px', borderRadius: '10px',
            border: 'none', background: darkMode ? '#333' : '#eee',
            color: darkMode ? '#fff' : '#222', fontSize: '16px', marginBottom: '12px'
          }} />

        <button onClick={handleSearch} disabled={loading} style={{
          width: '100%', padding: '12px', borderRadius: '10px',
          background: loading ? '#555' : '#66a6ff', color: '#fff',
          fontSize: '16px', border: 'none', cursor: 'pointer'
        }}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        {loading && <p style={{ fontSize: '12px', marginTop: '10px' }}>Loading results...</p>}
        {suggestion && <p style={{ color: 'orange', fontSize: '14px', marginTop: '10px' }}>{suggestion}</p>}
      </div>

      {/* RESULTS */}
      {results.length > 0 && (
        <div style={{
          marginTop: '30px',
          width: '95%',
          maxWidth: '600px',
          background: darkMode ? 'rgba(20,20,20,0.9)' : '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          padding: '20px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px'
          }}>
            {results.map((item, idx) => (
              <div key={idx} style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <li style={{
                  background: darkMode ? '#2a2a2a' : '#eee',
                  padding: '12px', borderRadius: '10px',
                  textAlign: 'left', flexGrow: 1,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  wordBreak: 'break-word'
                }}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
                    color: '#66a6ff', fontWeight: '600'
                  }}>{item.title}</a>
                  <br />
                  <small style={{ color: darkMode ? '#aaa' : '#555' }}>{item.snippet}</small>
                </li>
                <CopyLinkButton url={item.url} />
              </div>
            ))}
          </ul>
        </div>
      )}

      {/* LINKEDIN */}
      <a href="https://www.linkedin.com/in/yauchau/" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', bottom: '20px', right: '20px'
      }}>
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" style={{
          width: 'clamp(24px,5vw,30px)', height: 'clamp(24px,5vw,30px)',
          filter: 'invert(0.7)', transition: 'transform 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
      </a>

        {/* POWERED BY EXA */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          fontSize: '10px',
          color: darkMode ? '#aaa' : '#555',
          opacity: 0.7
      }}>
        Powered by Exa
      </div>

    </div>
  );
}

export default App;
