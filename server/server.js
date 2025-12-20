import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

app.get('/home',homePage);