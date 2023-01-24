const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const panierSchema = new Schema({
    
    produit: [{
        // required: true,
         type: Schema.Types.ObjectId,
         ref: "produit"
     } ],
     user : {
        type: Schema.Types.ObjectId,
         ref: "user"
     }
   
}, { timestamps: true})

const Panier = mongoose.model('panier', panierSchema);


module.exports = Panier