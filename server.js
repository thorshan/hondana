// .env Configuration
require('dotenv').config();

const express = require('express');
const path = require('path');


const app = express();
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));  

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
const categoryRoute = require('./routes/categoryRoutes');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const bookRoute = require('./routes/bookRoutes');

// Author route
app.use('/api', authorRoute);
// Genre route
app.use('/api', genreRoute);
// Category route
app.use('/api', categoryRoute);
// User route
app.use('/api', userRoute);
// Authentication route
app.use('/api', authRoute);
// Book route
app.use('/api', bookRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));
