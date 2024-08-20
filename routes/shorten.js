import express from 'express';
import validUrl from 'valid-url';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../services/redisClient.js';

const router = express.Router();
const BASE_URL = 'http://localhost:3000';

// POST /shorten
router.post('/shorten', async (req, res) => {
    const { url } = req.body;

    if (!validUrl.isUri(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const shortcode = uuidv4().slice(0, 8);
    await client.set(shortcode, url);

    res.status(200).json({
        shortcode: shortcode,
        redirect: `${BASE_URL}/${shortcode}`
    });
});

// GET /:shortcode
router.get('/:shortcode', async (req, res) => {
    const { shortcode } = req.params;

    const url = await client.get(shortcode);

    if (url) {
        return res.status(302).redirect(url);
    } else {
        return res.status(404).json({ error: 'Shortcode not found' });
    }
});

export default router;
