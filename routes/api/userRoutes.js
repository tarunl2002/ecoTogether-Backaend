const express = require('express');
const { registerUser, loginUser, getUser } = require('../../Controllers/userController');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUser);
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    const { name, bio, interests } = req.body;

    const profileFields = {};
    if (name) profileFields.name = name;
    if (bio) profileFields.bio = bio;
    if (interests) profileFields.interests = interests.split(',').map(interest => interest.trim());

    try {
        let user = await User.findById(req.user.id);
        if (user) {
            user = await User.findByIdAndUpdate(
                req.user.id,
                { $set: profileFields },
                { new: true }
            );
            return res.json(user);
        }
        res.status(404).json({ msg: 'User not found' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
