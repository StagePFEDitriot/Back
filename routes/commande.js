const express = require('express')
const router  = express.Router()
const {upload} = require('../middleware/upload');
const commandeController = require('../controllers/commandeController')
router.get('/',commandeController.index)
//router.get('/show',commandeController.show)
router.post('/store',commandeController.store)
//router.put('/update',commandeController.update)//,upload.single('idPhoto'),
//router.get('/showID',commandeController.showID)
router.delete('/delete',commandeController.destory)
//router.get('/confirmation/:token', produitController.confirm);
//router.post('/register',produitController.adds)//,upload.single('idPhoto'),
module.exports=router