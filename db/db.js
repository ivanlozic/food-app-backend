const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://ivanlozic995:oXXXXCunnE9IPby5@cluster0.cuzw3nm.mongodb.net/';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;