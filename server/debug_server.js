
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import homePage from './home.js';
import search from './search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 3002;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/home', homePage);
app.use('/api/search', search);

app.listen(port, () => {
    console.log(`Debug Server is running on port ${port}`);
});
