import express from 'express';
import path from 'path';
import cors from 'cors';
import { turtles } from './public/turtles.js'; // Import turtles data

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

// API endpoint to get turtle data
app.get('/api/turtles', (req, res) => {
    res.json(turtles); // Serve the turtles data
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//////////////////////////////////////
///////// START THE SERVER //////////
////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});