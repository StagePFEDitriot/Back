const produit = require('../models/produit')
const http = require ('http')
require('dotenv').config();

const fs = require("fs")
const path = require('path');
//c bon 
const index = (req, res, next) => {
    produit.find()

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
// c bon
const show = (req, res) => {
    let name = req.body.name
     produit.findOne({name})
    .then(existingProduit => {
        res.json(
            {existingProduit}
        )
    })
    .catch(error => {
        res.json({
            message:'an error Occured'
        })
    })
}
const showID = (req, res) => {
    let produitID = req.body.produitID
    produit.findById(produitID)
    .then(existingProduit => {
        res.json(
            {existingProduit}
        )
    })
    .catch(error => {
        res.json({
            message:'an error Occured',
            error
        })
    })
}
//c bon 
const store = (req, res, next) => {
    
    let Produit = new produit({
        name: req.body.name,
        size: req.body.size,
        type: req.body.type,
        prise: req.body.prise,
        description: req.body.description,
        statusStock: req.body.statusStock,
        color:req.body.color,
        image:req.file.path,  
        confirmed: false,
    })
    Produit.save()
        .then(response => {
            res.json({
                message: 'produit Added Sucessfull!',
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
const destory = (req, res, next) => {
    let produitID = req.body.produitID
    produit.findByIdAndRemove(produitID)
        .then(() => {
            res.json({
                message: 'Produit successfully'
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
    let produitID=req.body.produitID
    let existingProduit={
        name: req.body.name,
        size: req.body.size,
        type: req.body.type,
        prise: req.body.prise,
        description: req.body.description,
        statusStock: req.body.statusStock,
        color:req.body.color,
        confirmed:req.body.confirmed,
        //idPhoto:req.file.path,
    }
    try{const update = await produit.findByIdAndUpdate(produitID,{$set:existingProduit},{ new: true });
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
    show,
    showID,
    destory,
    update

}