const mongoose = require('mongoose')

const authSessionTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    validUntil: {
        type: Date,
    }
})

module.exports = mongoose.model('AuthSessionToken', authSessionTokenSchema)