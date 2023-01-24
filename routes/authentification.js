const router = require('express').Router();
//mongodb user model
let user = require('../models/user');
//password handler
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
//const {upload} = require('../middleware/upload');
//const multer = require('multer')

const nodemailer = require("nodemailer");
const accountSid = 'ACcfbb5251ade067ce9665f55a759fcf23';
const authToken = 'fd0d5d4c5a62addb0db43647cbe32432';
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();
//const path = require('path') 

function randomNumber(min, max) {
    return Math.random()
}




/**
 * @swagger
 * /authentification/login:
 *  post:
 *    description: Use to login user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/login').post(async (req, res) => {
    try {

        const email = req.body.email;
        const passwordEntered = req.body.password;

        console.log(email)
        console.log(passwordEntered)

        // validate

        if (!email || !passwordEntered)
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter all required fields."
                });

        const existingUser = await user.findOne({
            email
        }).select("+password");
        if (!existingUser)
            return res.status(401).json({
                errorMessage: "Wrong email or password."
            });

        const passwordCorrect = await bcrypt.compare(
            passwordEntered,
            existingUser.password

        );
        if (!passwordCorrect) {
            return res.status(401).json({
                errorMessage: "Wrong email or password."
            });
        }

        require('dotenv').config();

        //sign the token
        const token = jwt.sign({
            user: existingUser._id,
        },
            "wu1tfXw2N4rE8$ASd$L*ADsUQ94gLIXRO5EbrHXzxcwRy#05IF"
        );
        console.log(token)
        //send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).json({ token, existingUser }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
router.route('/logout').get(auth, (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "none",
        })
        .send();

});

/**
 * @swagger
 * /authentification/changePassword:
 *  post:
 *    description: Use to change user password
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/changePassword').post(async (req, res) => {
    try {
        //const confirmPassword = req.body.cnewpassword;
        const newpassword = req.body.newpassword;
        const email = req.body.email;

        const existingUser = await user.findOne({
            email
        }).select("+password");
        console.log(existingUser.password);

        if (!existingUser) {
            return res.status(401).json({
                errorMessage: "User Not found"
            });
        }

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(newpassword, salt)

        const result = await user.findOneAndUpdate({ email }, { password: password }, { new: true })
        console.log(result);
        return res.status(200).json({ result })



    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.route('/CodeConfig').post(async (req, res) => {
    try {
        const email = req.body.email
        const existingUser = await user.findOne({
            email
        }).select("+password");

        if (existingUser) {
            let transporter = nodemailer.createTransport(
                {
                    service: "gmail",
                    auth: {
                        user: "sinda.arous@esprit.tn",
                        pass: "181JFT0162",
                    },
                    tls: {
                        rejectUnauthorized: false,
                    }
                }
            )
            let mailOptions = {
                from: "sinda.arous@esprit.tn",
                to: existingUser.email,
                subject: "FackCheck",
                text: "Votre Code de confirmation est " + existingUser.conf,
            };
 
            transporter.sendMail(mailOptions, function (err, success) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("email send ")
                    const Conf = Math.floor((Math.random() * 10) + 1234)
                    console.log(Conf)
                    existingUser.conf = Conf;
                    existingUser.save()
                }
            })

            return res.status(200).json({ existingUser })
        } else {
            return res.status(401).json({
                errorMessage: "conf n'est pas genere ."
            });
        }


    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

router.route('/CodeConfigsms').post(async (req, res) => {
    try {
        const email = req.body.email
        const existingUser = await user.findOne({
            email
        }).select("+password");

        if (existingUser) {


            client.messages
                .create({
                    body: 'Votre Code de confirmation est  ' + existingUser,
                    messagingServiceSid: 'MGf0f0c61d965bffa52eebcd791bbd105a',
                    to: '+21690521296'
                })
                .then(message => console.log(message.sid))
                .done();
            const Conf = Math.floor((Math.random() * 10) + 1234)
            console.log(Conf)
            existingUser.conf = Conf;
            existingUser.save()
            return res.status(200).json({ existingUser })
        } else {
            return res.status(401).json({
                errorMessage: "conf n'est pas genere ."
            });
        }


    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
module.exports = router
