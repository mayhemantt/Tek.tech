const express= require('express')
const router=express.Router()

const {signup, signin, signout,forgotPassword, resetPassword,preSignup, googleLogin}= require('../controllers/auth')


// validators

const {runValidation}= require('../validators')
const{userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator}= require('../validators/auth')


router.post('/pre-signup',userSignupValidator,runValidation, preSignup)
router.post('/signup',runValidation, signup)
router.post('/signin',userSigninValidator,runValidation, signin)
router.get('/signout', signout)
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset', resetPasswordValidator, runValidation, resetPassword)

// google
router.post('/google-login', googleLogin)

module.exports= router