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