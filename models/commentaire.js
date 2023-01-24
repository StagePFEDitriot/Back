const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentaireSchema = new Schema({
  
     user : {
        type: Schema.Types.ObjectId,
         ref: "user"
     },
     produit : {
        type: Schema.Types.ObjectId,
         ref: "produit"
     },
     date: {
        type: String,
    },
    description: {
        type: String,
    },
    
   
  
}, { timestamps: true})

const Commentaire = mongoose.model('commentaire', commentaireSchema);

module.exports = Commentaire