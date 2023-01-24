const express = require('express')
const router  = express.Router()
const {upload} = require('../middleware/upload');
const commentaireController = require('../controllers/commentaireController')
router.get('/',commentaireController.index)

router.post('/store',commentaireController.store)
router.put('/update',commentaireController.update)//,upload.single('idPhoto'),
router.get('/showID',commentaireController.showID)
router.delete('/delete',commentaireController.destory)
//router.get('/confirmation/:token', produitController.confirm);
//router.post('/register',produitController.adds)//,upload.single('idPhoto'),
module.exports=router