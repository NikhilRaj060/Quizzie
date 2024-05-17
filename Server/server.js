const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log('Connected to database successfully.');
    app.listen(PORT, () => {
      console.log(`Server is started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

connectDB();