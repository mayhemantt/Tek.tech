const {check}= require('express-validator')

exports.userSignupValidator=[
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is Must'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid Email Address'),
    check('password')
        .isLength({min:6})
        .withMessage('Password Must Be of At Least 6 Characters')
]


exports.userSigninValidator=[
    check('email')
        .isEmail()
        .withMessage('Must be a valid Email Address'),
    check('password')
        .isLength({min:6})
        .withMessage('Password Must Be of At Least 6 Characters')
]


exports.forgotPasswordValidator=[
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid Email Address')
]

exports.resetPasswordValidator=[
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({min: 6})
        .withMessage("Password must be 6 char's ")
]