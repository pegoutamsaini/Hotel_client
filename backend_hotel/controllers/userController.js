const User = require('../models/User');

exports.signup = async (req, res) => {
    const { username, password, email } = req.body;

    // Check if username, password, and email are empty or null
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allow only alphanumeric characters and underscore
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ error: 'Invalid username format' });
        }

        const newUser = new User({ username, password, email });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
