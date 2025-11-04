import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());

// Development mode: Serve static files if they exist, otherwise redirect to Vite dev server
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app build directory
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
    
    // Catch-all handler to serve the React app's index.html for any route
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
    });
} else {
    // In development, we'll let Vite handle the client
    app.get('/', (req, res) => {
        res.redirect('http://localhost:5173');
    });
}

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    console.log(`Open http://localhost:${port} to view the app`);
});