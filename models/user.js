const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
    }, 
    phone: {
        type: String
    }, 
    username: {
        type: String,
    },
    password: {
        type: String,       
    }, 
    role: {
        type: String,
    },
    image: {
        type: String,
    }, 
    conf:{
        type: Number,
    },
    idPhoto:{
        type: String,
    },
    confirmed :{
        type : Boolean,
        default : false 
    }
}, { timestamps: true})

const User = mongoose.model('user', userSchema);

module.exports = User