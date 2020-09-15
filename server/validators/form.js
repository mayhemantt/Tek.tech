const {check}= require('express-validator')

exports.contactFormValidator=[
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is Must'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email is Must'),
    check('message')
        .not()
        .isEmpty()
        .isLength({min:20})
        .withMessage('Message Must Be 20 Char ')
]