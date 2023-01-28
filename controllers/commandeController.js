const commande = require('../models/commande')
const panier = require('../models/panier')
const http = require('http')
require('dotenv').config();

const fs = require("fs")
const path = require('path');
//c bon 
const index = (req, res, next) => {
    commande.find().populate('user').populate('produit')
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
const show = (req, res) => {
    let user = req.body.userID
    commande.find({ user })
        .then(existingCommande => {
            res.json(
                { existingCommande }
            )
        })
        .catch(error => {
            res.json({
                message: 'an error Occured'
            })
        })
}
//c bon 
const store = async(req, res, next) => {

    let Commande = new commande({
        produit: req.body.produit,
        user: req.body.user,
        panier: req.body.panier,
        date: req.body.date,
        numero: req.body.numero,
        statut: req.body.statut,
        total: req.body.total,
    })

    Commande.save()
        .then(response => {
            res.json({
                message: 'commande Added Sucessfull!',
                response
            })


        })
        .catch(error => {
            res.json({
                message: 'an error Occured!',
                error
            })
        })
        const user = Commande.user
        const existingPanier = await(panier.findOne({ user }))

        for (const element of existingPanier.produit) {
            console.log(element._id);
            existingPanier.produit=[]
            existingPanier.save()
                .then(response => {
                    res.json({
                        message: 'panier Added Sucessfull!',
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
    /*const panierP = existingPanier._id
    const produitID = Commande.produit

   
    panierP.produit.remove(produitID)
    panierP.save()*/
}
const showID = (req, res) => {
    let livreurID = req.body._id
    commande.findById(livreurID)
        .then(existingLivreur => {
            res.json(
                { existingLivreur }
            )
        })
        .catch(error => {
            res.json({
                message: 'an error Occured',
                error
            })
        })
}
const destory = (req, res, next) => {
    let CommandeID = req.body.CommandeID
    commande.findByIdAndRemove(CommandeID)
        .then(() => {
            res.json({
                message: 'commande successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error Occured!',
                error
            })
        })
}
const update = async (req, res, next) => {
    let livreurID = req.body.livreurID
    let existingLivreur = {
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        //image: req.body.image,
        password: req.body.password,
        role: req.body.role,
        //idPhoto:req.file.path,
    }
    try {
        const update = await commande.findByIdAndUpdate(livreurID, { $set: existingLivreur }, { new: true });
        res.json({ update });

    } catch (e) {
        return res.status(422).send({
            error: { message: 'e', resend: true }
        });
    }

}

module.exports = {
    index,
    store,
    destory,
    show,
}