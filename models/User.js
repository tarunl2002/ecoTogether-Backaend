// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    bio: {
        type: String
    },
    interests: {
        type: [String]
    }
});

module.exports = User = mongoose.model('user', UserSchema);
