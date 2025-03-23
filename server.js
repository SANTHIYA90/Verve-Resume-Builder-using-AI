const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/verveDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message));


// Define the user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Seed the database with the admin credentials if not present
const seedDatabase = async () => {
  try {
    const user = await User.findOne({ email: 'verve@admin.com' });
    if (!user) {
      const admin = new User({ email: 'verve@admin.com', password: 'admin' });
      await admin.save();
      console.log('Admin user created');
    }
  } catch (err) {
    console.error('Error seeding the database:', err.message);
  }
};

seedDatabase();

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html'); // Serve the login page
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
