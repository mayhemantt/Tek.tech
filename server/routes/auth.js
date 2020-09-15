const express= require('express')
const router=express.Router()
const {signup, signin, signout,forgotPassword, resetPassword}= require('../controllers/auth')


// validators

const {runValidation}= require('../validators')
const{userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator}= require('../validators/auth')


router.post('/signup',userSignupValidator,runValidation, signup)
router.post('/signin',userSigninValidator,runValidation, signin)
router.get('/signout', signout)
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset', resetPasswordValidator, runValidation, resetPassword)

module.exports= router