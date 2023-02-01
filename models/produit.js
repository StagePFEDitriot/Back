const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produitSchema = new Schema({
    name: {
        type: String,
    }, 
    size: {
        type: String
    }, 
    type: {
        type: String,
    },
    prise: {
        type: Number,       
    }, 
    description: {
        type: String,
    }, 
    statusStock:{
        type: String,
    },
    image: {
        type: String,
    }, 
    color:{
        type:String,
    },
    confirmed :{
        type : Boolean,
        default : false 
    }
}, { timestamps: true})

const Produit = mongoose.model('produit', produitSchema);

module.exports = Produit