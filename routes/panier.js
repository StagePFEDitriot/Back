const express = require('express')
const router  = express.Router()
const {upload} = require('../middleware/upload');
const panierController = require('../controllers/panierController')
router.get('/',panierController.index)
router.get('/show',panierController.show)
//router.post('/store',panierController.store)
router.put('/update',panierController.update)//,upload.single('idPhoto'),
router.get('/showID',panierController.showID)
router.delete('/delete',panierController.destory)
//router.get('/confirmation/:token', panierController.confirm);
//router.post('/register',panierController.adds)//,upload.single('idPhoto'),
module.exports=router