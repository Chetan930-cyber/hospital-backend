const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./db_config/db');

dotenv.config();

const app = express();

// Update CORS configuration to allow requests from multiple origins
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use('/api/users', require('./routes/users'));
app.use('/api/appointments', require('./routes/appointment'));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});