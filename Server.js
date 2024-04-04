const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const path=require('path');
// require('../Client/build')







// Middleware
app.use(morgan('dev'));
app.use(cors()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const MONGO_URL = process.env.MONGODB_URL;
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    
  });

  app.options('*', cors());

  app.use(express.static(path.join(__dirname, '../Client/build')));
 
//For userRoutes
const UserRoute = require('./Route/routes');
app.use('/api', UserRoute);
// For Transaction
app.use('/api/transaction/', require('./Route/transactionRoute'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/build/index.html'));
});
const port = process.env.PORT || 3000; // Set default port to 3000 if PORT is not specified in .env

app.listen(port, () => {
  console.log('Server is running on port', port);
});
