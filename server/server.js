import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import bodyParser from 'body-parser';
import cors from 'cors';
import homePage from './home.js';
import search from './search.js';

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

app.get('/home',homePage);
app.use('/api/search',search);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});