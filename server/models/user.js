const mongoose = require('mongoose')
const bycrpt = require('bcryptjs')
//user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    this.password = await bycrpt.hash(this.password, 10);
    next()
})



module.exports = mongoose.model('User', userSchema)