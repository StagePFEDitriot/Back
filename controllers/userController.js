const user = require('../models/user')
const panier = require('../models/panier')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const http = require('http')
const config = require("../config.json")
const nodemailer = require("nodemailer");
require('dotenv').config();

const fs = require("fs")
const path = require('path')
//c bon 
const index = (req, res, next) => {
    user.find()
        .then(users => {
            res.header('Access-Control-Allow-Origin', '*');
            res.json(
                users
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
    let email = req.body.email
    user.findOne({ email })
        .then(existingUser => {
            res.json(
                { existingUser }
            )
        })
        .catch(error => {
            res.json({
                message: 'an error Occured'
            })
        })
}


const update = async (req, res, next)=>
{
    let userID=req.body._id
    let existingUser= {
        username,
        email,
        password,
        role,
        phone,
    } = req.body;
    try{const update = await user.findByIdAndUpdate(userID,{$set:existingUser},{ new: true });
    res.json({update});
    
} catch(e){
    return res.status(422).send({
        error: { message: 'e', resend: true }
    });
}
    
}

const showID = (req, res) => {
    let _id = req.body._id
    user.findById(_id)
        .then(existingUser => {
            res.json(
                { existingUser }
            )
        })
        .catch(error => {
            res.json({
                message: 'an error Occured',
                error
            })
        })
}
const adds = (req, res, next) => {
    // console.log(req.file.path)
    console.log("azertyy")
    try {
        let {
            username,
            email,
            password,
            role,
            phone,
        } = req.body;
        const saltRounds = 10
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
            let newUser = new user({
                username,
                email,
                password: hashedPassword,
                phone,
                role,
                conf: Math.floor((Math.random() * 10) + 1456),
                confirmed: false

            })
            console.log(hashedPassword)
           
            newUser.save().then(response => {
                let Panier = new panier({
               
                    user : newUser._id
                })
                Panier.save()
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
                res.json({
                    message: 'user Added Sucessfull!',
                    response
                })

            })
                .catch(err => {
                    res.status(400).json(err)
                    err
                })

        }).catch(err => {
            res.status(400).json({
                message: "An error occured while hashing password",
                err
            })
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};
const confirm = async (req, res, next) => {

    var token;
    /* try {
         tokenValue = jwt.verify(req.params.token, config.token_secret);
     } catch (e) {
         return res.status(400).send({ message: 'The confirmation link expired, please reverify.' });
     }*/
    token = jwt.verify(req.params.token, config.token_secret)
    console.log(token.email)

    user.findOne({ "email": token.email }, function (err, user) {
        if (!user) {
            return res.status(401).send({ message: 'Aucun utilisateur, Veuillez proceder a l\'inscription.' })
        } else if (user.confirmed) {
            return res.status(200).send({ message: 'Cet utilisateur a deja été verifié, Veuillez vous connecter' })
        } else {
            user.confirmed = true
            user.save(function (err) {
                if (err) {
                    return res.status(500).send({ message: err.message })
                } else {
                    return res.status(200).send({ message: 'Cet compte est été verifié, Veuillez vous connecter' })
                }
            })
        }
    })


};

module.exports = {
    index,
    show,
    update,
    showID,
    adds,
    confirm

}