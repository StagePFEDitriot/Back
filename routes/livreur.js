const express = require('express')
const router  = express.Router()
const {upload} = require('../middleware/upload');
const livreurController = require('../controllers/livreurController')
router.get('/',livreurController.index)
router.get('/show',livreurController.show)
router.post('/store',livreurController.store)
router.put('/update',livreurController.update)//,upload.single('idPhoto'),
router.get('/showID',livreurController.showID)
router.delete('/delete',livreurController.destory)
//router.get('/confirmation/:token', produitController.confirm);
//router.post('/register',produitController.adds)//,upload.single('idPhoto'),
module.exports=router