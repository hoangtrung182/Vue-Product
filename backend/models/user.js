const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minLength: 6,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };