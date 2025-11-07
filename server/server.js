import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});