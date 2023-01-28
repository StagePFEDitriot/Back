const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livraisonSchema = new Schema({
  
     user : {
        type: Schema.Types.ObjectId,
         ref: "user"
     },
     commande : {
        type: Schema.Types.ObjectId,
         ref: "commande"
     },
     livreur : {
        type: Schema.Types.ObjectId,
         ref: "livreur"
     },
     date:{
        type: String
     },
     etat:
     {
        type:String
     }
}, { timestamps: true})

const Livraison = mongoose.model('livraison', livraisonSchema);

module.exports = Livraison