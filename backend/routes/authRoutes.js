import express from 'express';
const router=express.Router();
// const authController=require('../controller/authController');
import * as authController from '../controller/authController.js';
//import * as authController → imports all named exports from authController.js into an object (authController).
router.post('/register',authController.register);

router.post('/login',authController.login);

router.get('/logout',authController.logout);

//Protected Routes 
router.post('/updatePassword',authController.protect,authController.updatePassword);

router.get('/adminOnly',authController.protect,authController.restrictTo('admin'),(req,res)=>{
    res.status(200).json({message:'This is an admin only route'});
})


router.get('/me', authController.protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

// module.exports=router;
export default router;