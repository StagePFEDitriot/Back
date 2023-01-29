const express = require('express')
const router  = express.Router()
const {upload} = require('../middleware/upload');
const userController = require('../controllers/userController')
const authentificationController = require('../routes/authentification')
router.get('/',userController.index)
router.get('/show',userController.show)
//router.post('/store',userController.store)
router.put('/update',userController.update)//,upload.single('idPhoto'),
router.post('/showID',userController.showID)
router.delete('/delete',userController.destory)
router.get('/confirmation/:token', userController.confirm);
router.post('/register',userController.adds)//,upload.single('idPhoto'),
module.exports=router