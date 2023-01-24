const livreur = require('../models/livreur')
const http = require ('http')
require('dotenv').config();

const fs = require("fs")
const path = require('path');
//c bon 
const index = (req, res, next) => {
    livreur.find()
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
    let username = req.body.username
     livreur.findOne({username})
    .then(existingLivreur => {
        res.json(
            {existingLivreur}
        )
    })
    .catch(error => {
        res.json({
            message:'an error Occured'
        })
    })
}
//c bon 
const store = (req, res, next) => {
   
    let Livreur = new livreur({
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        //image: req.body.image,
        password: req.body.password,
        role: req.body.role,
       // conf:req.body.conf,
       // idPhoto : req.body.idPhoto,
        confirmed : false
    })
    Livreur.save()
        .then(response => {
            res.json({
                message: 'livreur Added Sucessfull!',
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
    let livreurID = req.body._id
    livreur.findById(livreurID)
    .then(existingLivreur => {
        res.json(
            {existingLivreur}
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
    let livreurID = req.body.livreurID
    livreur.findByIdAndRemove(livreurID)
        .then(() => {
            res.json({
                message: 'Livreur successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error Occured!',
                error
            })
        })
}
update = async (req, res, next)=>
{
    let livreurID=req.body.livreurID
    let existingLivreur={
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        //image: req.body.image,
        password: req.body.password,
        role: req.body.role,
        //idPhoto:req.file.path,
    }
    try{const update = await livreur.findByIdAndUpdate(livreurID,{$set:existingLivreur},{ new: true });
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