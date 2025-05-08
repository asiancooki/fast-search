console.log('Starting server.js...');

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});


const EXA_API_KEY = 'ed7fa3f5-9f6a-4071-91cb-e7e22de72de6';

app.post('/search', async (req, res) => {
    const { query, website } = req.body;
    let domain;

    switch (website) {
        case 'TikTok':
            domain = 'https://tiktok.com';
            break;
        case 'Instagram':
            domain = 'https://instagram.com';
            break;
        case 'Facebook':
            domain = 'https://facebook.com';
            break;
        case 'X':
            domain = 'https://x.com';
            break;
        case 'LinkedIn':
            domain = 'https://linkedin.com';
            break;
        case 'YouTube':
            domain = 'https://youtube.com';
            break;
        case 'Reddit':
            domain = 'https://reddit.com';
            break;
        case 'Threads':
            domain = 'https://threads.net';
            break;
        case 'GitHub':
            domain = 'https://github.com';
            break;
        default:
            return res.status(400).json({ error: 'Invalid website' });
    }

    if (website === 'Instagram') {
        const username = query.replace(/\s+/g, '').toLowerCase();
        const profileUrl = `https://www.instagram.com/${username}/`;
    
        try {
            const profileResponse = await axios.get(profileUrl);
    
            if (profileResponse.data.includes("Sorry, this page isn't available")) {
                console.log(`Instagram username ${username} not found, fallback to Exa search.`);
                // continue to Exa API fallback
            } else {
                // ✅ Profile exists
                return res.json({
                    results: [{
                        url: profileUrl,
                        title: `Instagram profile: ${username}`,
                        snippet: `Direct profile found for @${username}`
                    }]
                });
            }
        } catch (err) {
            console.error('Error checking Instagram profile:', err.message);
            // optionally continue to fallback too
        }
    }
    

    try {
        const response = await axios.post('https://api.exa.ai/search', {
            query: query,
            num_results: 5,
            type: 'keyword',
            include_domains: [domain]
        }, {
            headers: {
                'Authorization': `Bearer ${EXA_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching from Exa API' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
