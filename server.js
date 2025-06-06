console.log('Starting server.js...');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});


const EXA_API_KEY = process.env.EXA_API_KEY;

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
            console.log('Response HTML:', profileResponse.data.substring(0, 500)); // only print first 500 chars
            const ogTypeMatch = /<meta property=["']og:type["'] content=["']profile["']/.exec(profileResponse.data);
    
            if (ogTypeMatch) {
                const titleMatch = /<meta property=["']og:title["'] content=["'](.*?)["']/.exec(profileResponse.data);
                const descriptionMatch = /<meta property=["']og:description["'] content=["'](.*?)["']/.exec(profileResponse.data);
                const title = titleMatch ? titleMatch[1] : `Instagram profile: ${username}`;
                const description = descriptionMatch ? descriptionMatch[1] : `Direct profile found for @${username}`;
    
                return res.json({
                    results: [{
                        url: profileUrl,
                        title: title,
                        snippet: description
                    }]
                });
            } else {
                console.log(`Instagram username ${username} not found (missing og:type=profile), fallback to Exa search.`);
                // → will continue to Exa fallback
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
