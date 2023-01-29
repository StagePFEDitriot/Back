const panier = require('../models/panier')
const http = require ('http')
require('dotenv').config();

const fs = require("fs")
const path = require('path');
//c bon 
const index = (req, res, next) => {
    panier.find()
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
// c bon
const show = async (req, res) => {
    let user = req.body._id
    try{
        const existingPanier = await panier.findOne({user}).populate('user').populate('produit')
        res.json(
            {existingPanier}
        )
    } 
    catch(error) {
        res.json({
            message:'an error Occured',
            error
        })
    }
}

const showID = (req, res) => {
    let panierID = req.body._id
    panier.findById(panierID).populate('user').populate('produit')
    .then(existingPanier=> {
        res.json(
            {existingPanier}
        )
    })
    .catch(error => {
        res.json({
            message:'an error Occured',
            error
        })
    })
}
const destory = async (req, res, next) => {
    let panierID=req.body.panierID
    let produitID= req.body.produit
        //idPhoto:req.file.path,
    
    try{
        const panierP = await panier.findById(panierID)
        panierP.produit.remove(produitID)
        panierP.save()

    res.json({panierP});
    
} catch(e){
    return res.status(422).send({
        error: { message: e , resend: true }
    });
}
}
const update = async (req, res, next)=>
{
    let panierID=req.body.panierID
    let produitID= req.body.produit
        //idPhoto:req.file.path,
    
    try{
        const panierP = await panier.findById(panierID)
        panierP.produit.push(produitID)
        panierP.save()

    res.json({panierP});
    
} catch(e){
    return res.status(422).send({
        error: { message: e , resend: true }
    });
}
    
}
const deletePanier = (req, res, next) => {
    let panierID = req.body.panierID
    panier.findByIdAndRemove(panierID)
        .then(() => {
            res.json({
                message: 'Panier delete successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error Occured!',
                error
            })
        })
}
module.exports = {
    index,
    show,
    showID,
    destory,
    update,
    deletePanier

}