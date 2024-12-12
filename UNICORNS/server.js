import express from 'express';
import path from 'path';
import cors from 'cors';
import { unicorns } from './public/unicorns.js'; // Import unicorns data

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public'))); // Adjust for ES modules

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// API endpoint to get unicorn data
app.get('/api/unicorns', (req, res) => {
    res.json(unicorns); // Serve the unicorns data
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});