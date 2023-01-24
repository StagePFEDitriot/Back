const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandeSchema = new Schema({
    produit: [{
        // required: true,
         type: Schema.Types.ObjectId,
         ref: "produit"
     } ],
     user : {
        type: Schema.Types.ObjectId,
         ref: "user"
     },
     panier : {
        type: Schema.Types.ObjectId,
         ref: "panier"
     },
     date: {
        type: String,
    },
    numero: {
        type: Number,
    },
    statut:{
        type: String,
    },
    total:{
        type: Number,
    }
  
}, { timestamps: true})

const Commande = mongoose.model('commande', commandeSchema);

module.exports = Commande