const livraison = require('../models/livraison')

const http = require ('http')
require('dotenv').config();

const fs = require("fs")
const path = require('path');
//c bon 
const index = (req, res, next) => {
    livraison.find()//.populate('user').populate('commande').populate('livreur')
        .then(response => {
            res.header('Access-Control-Allow-Origin', '*');
            res.json(
                response
            )
        })
        .catch(error => {
            res.json({
                error
            })
        })
}
//c bon 
const store = (req, res, next) => {
   
    let Livraison = new livraison({
        
        user: req.body.user,
        commande: req.body.commande,
        livreur: req.body.livreur,
        date : req.body.date,
        etat:req.body.etat
    })
    
    Livraison.save()
        .then(response => {
          
            res.json({
                message: 'Livraison Added Sucessfull!',
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
    let livraisonID = req.body.livraisonID
    livraison.findById(livraisonID)
    .then(existingLivraison => {
        res.json(
            {existingLivraison}
        )
    })
    .catch(error => {
        res.json({
            message:'an error Occured',
            error
        })
    })
}
const showLivreur = (req, res) => {
    let livreur = req.body.livreur
    livraison.findOne({livreur})
    .then(existingLivraison => {
        res.json(
            {existingLivraison}
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
    let livraisonID = req.body.livraisonID
    livraison.findByIdAndRemove(livraisonID)
        .then(() => {
            res.json({
                message: 'livraison delete successfully'
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
    let livraisonID=req.body.livraisonID
    let existingLivraison={
        user: req.body.user,
        commande: req.body.commande,
        livreur: req.body.livreur,
        date : req.body.date,
        etat:req.body.etat
    }
    try{const update = await livraison.findByIdAndUpdate(livraisonID,{$set:existingLivraison},{ new: true });
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
    update,
    showLivreur
   

}