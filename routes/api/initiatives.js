// routes/api/initiatives.js

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Initiative = require('../../models/Initiative');

// Get all initiatives
router.get('/', async (req, res) => {
    try {
        const initiatives = await Initiative.find();
        res.json(initiatives);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create an initiative
router.post('/', auth, async (req, res) => {
    const { name, description } = req.body;

    try {
        const newInitiative = new Initiative({
            name,
            description,
            organizer: req.user.id
        });

        const initiative = await newInitiative.save();
        res.json(initiative);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Join an initiative
router.put('/join/:id', auth, async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id);

        if (!initiative) {
            return res.status(404).json({ msg: 'Initiative not found' });
        }

        if (initiative.participants.includes(req.user.id)) {
            return res.status(400).json({ msg: 'You have already joined this initiative' });
        }

        initiative.participants.push(req.user.id);
        await initiative.save();

        res.json(initiative);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Leave an initiative
router.put('/leave/:id', auth, async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id);

        if (!initiative) {
            return res.status(404).json({ msg: 'Initiative not found' });
        }

        if (!initiative.participants.includes(req.user.id)) {
            return res.status(400).json({ msg: 'You have not joined this initiative' });
        }

        const index = initiative.participants.indexOf(req.user.id);
        initiative.participants.splice(index, 1);
        await initiative.save();

        res.json(initiative);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id).populate('participants', 'name email');
        if (!initiative) {
            return res.status(404).json({ msg: 'Initiative not found' });
        }
        res.json(initiative);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
