const express = require('express')
const router  = express.Router()
const {upload} = require('../middleware/upload');
const produitController = require('../controllers/produitController')
router.get('/',produitController.index)
router.get('/show',produitController.show)
router.post('/store',upload.single('image'),produitController.store)
router.put('/update',produitController.update)//,upload.single('idPhoto'),
router.get('/showID',produitController.showID)
router.delete('/delete',produitController.destory)
//router.get('/confirmation/:token', produitController.confirm);
//router.post('/register',produitController.adds)//,upload.single('idPhoto'),
module.exports=router