const commentaire = require('../models/commentaire')

const http = require ('http')
require('dotenv').config();

const fs = require("fs")
const path = require('path');
//c bon 
const index = (req, res, next) => {
    commentaire.find().populate('user').populate('produit')
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                error
            })
        })
}
//c bon 
const store = (req, res, next) => {
   
    let Commentaire = new commentaire({
        produit: req.body.produit,
        user: req.body.user,
        description: req.body.description,
        date: req.body.date,
       
    })
    
    Commentaire.save()
        .then(response => {
          
            res.json({
                message: 'commentaire Added Sucessfull!',
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'an error Occured!',
                error
            })
        })
}
const showID = (req, res) => {
    let commentaireID = req.body._id
    commentaire.findById(commentaireID)
    .then(existingCommentaire => {
        res.json(
            {existingCommentaire}
        )
    })
    .catch(error => {
        res.json({
            message:'an error Occured',
            error
        })
    })
}
const destory = (req, res, next) => {
    let commentaireID = req.body.commentaireID
    commentaire.findByIdAndRemove(commentaireID)
        .then(() => {
            res.json({
                message: 'commentaire delete successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error Occured!',
                error
            })
        })
}
const update = async (req, res, next)=>
{
    let commentaireID=req.body.commentaireID
    let existingCommantaire={
        description: req.body.description,
    }
    try{const update = await commentaire.findByIdAndUpdate(commentaireID,{$set:existingCommantaire},{ new: true });
    res.json({update});
    
} catch(e){
    return res.status(422).send({
        error: { message: 'e', resend: true }
    });
}
    
}

module.exports = {
    index,
    store,
    showID,
    destory, 
    update
   

}