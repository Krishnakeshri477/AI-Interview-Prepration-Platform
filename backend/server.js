// backend\server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { errorHandler } = require('./src/middleware/errorHandler');
const passport = require('passport');
require('./src/config/passport');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/interview', require('./src/routes/apiRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));