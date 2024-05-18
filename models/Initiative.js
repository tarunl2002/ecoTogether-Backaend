// models/Initiative.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InitiativeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Initiative = mongoose.model('initiative', InitiativeSchema);
