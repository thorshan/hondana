// .env Configuration
require('dotenv').config();

const express = require('express');


const app = express();
app.use(express.json());

// API calls
const cors = require('cors');
app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended : true }));


// Database connection
const connectDb = require('./config/database');
connectDb();

// Routers Configurations
const authorRoute = require('./routes/authorRoutes');
const genreRoute = require('./routes/genresRoutes');

// Author route
app.use('/api', authorRoute);
// Genre route
app.use('/api', genreRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));
