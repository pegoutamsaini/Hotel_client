const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateJWTToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

function generateJWTToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    
    const options = {
        expiresIn: '1h' 
    };
    return jwt.sign(payload, secretKey, options);
}
