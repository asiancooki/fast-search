import React, { useState, useEffect } from 'react';

function App() {
  const platforms = [
    { name: 'TikTok', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg' },
    { name: 'Instagram', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg' },
    { name: 'Facebook', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg' },
    { name: 'X', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg' },
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

  useEffect(() => {
    const timer = setTimeout(() => setSplashGone(true), 2500);
    return () => clearTimeout(timer);
  }, []);

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
      background: 'linear-gradient(135deg, #141e30, #243b55)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Poppins', sans-serif",
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* SPLASH SCREEN */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: splashGone ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.5s ease'
      }}>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{ fontSize: '60px', margin: 0 }}>FastSearch</h1>
          <p style={{
            position: 'absolute',
            bottom: '-18px',
            right: '0',
            fontSize: '14px',
            color: '#aaa',
            margin: 0
          }}>by Yau Chau</p>
        </div>
      </div>

      {/* HEADER */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center'
      }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1 style={{ fontSize: '48px', margin: 0, letterSpacing: '1px' }}>FastSearch</h1>
          <p style={{
            position: 'absolute',
            bottom: '-14px',
            right: '0',
            fontSize: '12px',
            color: '#aaa',
            margin: 0
          }}>by Yau Chau</p>
        </div>
        <p style={{
          fontSize: '22px',
          marginTop: '30px',
          background: 'linear-gradient(90deg, #66a6ff, #89f7fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '600',
        }}>Find your results fast, anywhere.</p>
      </div>

      {/* LINKEDIN ICON */}
      <a href="https://www.linkedin.com/in/yauchau/" target="_blank" rel="noopener noreferrer" style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
      }}>
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" style={{
          width: '30px',
          height: '30px',
          filter: 'invert(0.7)',
          transition: 'transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}/>
      </a>

      {/* MAIN SEARCH CONTAINER */}
      <div style={{
        background: 'rgba(20, 20, 20, 0.85)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        width: '90%',
        maxWidth: '460px',
        textAlign: 'center',
        marginTop: '100px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Search <span style={{ color: '#66a6ff' }}>{website}</span></h2>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          {platforms.map(platform => (
            <div
              key={platform.name}
              onClick={() => setWebsite(platform.name)}
              style={{
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                background: website === platform.name ? '#66a6ff' : '#222',
                boxShadow: website === platform.name ? '0 0 15px #66a6ff' : '0 2px 8px rgba(0,0,0,0.5)',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src={platform.icon} alt={platform.name} style={{
                filter: website === platform.name ? 'invert(1)' : 'invert(0.7)',
                width: '28px',
                height: '28px'
              }} />
            </div>
          ))}
        </div>

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
            background: '#333',
            color: '#fff',
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
            background: loading ? '#555' : '#66a6ff',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        {results.length > 0 && (
          <h3 style={{ fontSize: '18px', margin: '20px 0 10px', color: '#ccc' }}>Top 5 Results</h3>
        )}

        {results.length === 0 && !loading && <p style={{ color: '#ccc' }}>No results yet.</p>}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((item, idx) => (
            <li key={idx} style={{
              background: '#2a2a2a',
              padding: '10px',
              borderRadius: '10px',
              marginBottom: '15px',
              textAlign: 'left',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: '#66a6ff', textDecoration: 'none' }}>
                {item.title}
              </a>
              <br />
              <small style={{ color: '#aaa' }}>{item.snippet}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
