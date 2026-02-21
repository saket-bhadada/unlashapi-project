import express from 'express';

const search = express.Router();

search.post('/', async (req, res) => {
  const { searchQuery } = req.body;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const api = process.env.API_KEY;
    const url = `https://api.unsplash.com/search/photos?client_id=${api}&query=${searchQuery}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // Unsplash search API returns results in 'results' property
      return res.status(200).json({ images: data.results });
    } else {
      return res
        .status(400)
        .json({ error: 'Something went wrong with the Unsplash API' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default search;
