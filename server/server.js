import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import cors from 'cors';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
{    origin:["http://localhost:3000"]
}))
// Serve static files (JS, CSS, etc.)
// app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// Fallback for SPA routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
