const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } ,
    nickname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("users", userSchema);