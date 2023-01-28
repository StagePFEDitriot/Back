const express = require('express')
const router  = express.Router()
const {upload} = require('../middleware/upload');
const livraisonController = require('../controllers/livraisonController')
router.get('/',livraisonController.index)

router.post('/store',livraisonController.store)
router.put('/update',livraisonController.update)//,upload.single('idPhoto'),
router.get('/showID',livraisonController.showID)
router.delete('/delete',livraisonController.destory)
router.get('/showLivreur', livraisonController.showLivreur);
//router.post('/register',livraisonController.adds)//,upload.single('idPhoto'),
module.exports=router