require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Connect to MongoDB 4.2
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB 4.2 Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(morgan('dev'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`);
//});

// Handle EADDRINUSE by trying the next port
//server.on('error', (e) => {
  //if (e.code === 'EADDRINUSE') {
    //console.log(`Port ${PORT} in use, trying ${PORT + 1}...`);
    //app.listen(PORT + 1);
  //}
//});
//Consider using port 0 to let the OS assign a free port:
const server = app.listen(0, () => {
  console.log(`Server running on port ${server.address().port}`);
});