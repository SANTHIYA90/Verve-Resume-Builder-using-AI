// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB (replace with your MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/verve-login'; // Use your MongoDB URI here
mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 30000
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

// Define User Schema (for demonstration purposes)
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Insert demo user (only for demonstration, not needed for every run)
const demoUser = new User({
    email: 'verve@admin.com',
    password: 'admin'
});

// Save demo user to database if it doesn't already exist
User.findOne({ email: demoUser.email }).then(user => {
    if (!user) {
        demoUser.save().then(() => console.log('Demo user created'));
    }
});

// Handle login request
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check against demo user
    User.findOne({ email: email, password: password }).then(user => {
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    }).catch(err => {
        res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
