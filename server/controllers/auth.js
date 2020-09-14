const User= require('../models/user')
const shortId =require('shortid')
const jwt= require('jsonwebtoken')
const expressJwt=require('express-jwt')
const Blog =require('../models/blog')

exports.signup=(req,res)=>{
    User.findOne({email:req.body.email}).exec((err, user)=>{
        if(user){
            return res.status(400).json({
                error: 'Email is Taken'
            })
        }

        const {name,email,password}=req.body
        let username = shortId.generate()

        let profile=`${process.env.CLIENT_URL}/profile/${username}`

        let newUser=new User({name, email,password, profile,username})
        newUser.save((err, success)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
           }
            res.json({
                message: 'Signup Success! Please Signin.'
            })
        })
    })
}

exports.signin=(req,res)=>{
    const {email,password}= req.body
    // Check if user exist
    User.findOne({email}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist, please siginup'
            })
        }
        // authenticate

        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email Pass dose not match'
            })
        }
    // generate jwt
        const token= jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie('token', token, {expiresIn: '1d'})
        const {_id, username, name, email, role}=user

        return res.json({
            token, user:{_id, username, name, email, role}
        })

    })

}

exports.signout=(req,res)=>{
    res.clearCookie("token")
    res.json({
        message:"Signout Success"
    })
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, algorithms:['HS256']
});

exports.authMiddleware=(req,res,next)=>{
    const authUserId = req.user._id
    User.findById({_id: authUserId})
    .exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                 error: 'USer Not Found'
            })
        }
        req.profile= user

        next()
    })
}


exports.adminMiddleware=(req,res,next)=>{
    const adminUserId = req.user._id
    User.findById({_id: adminUserId})
    .exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                 error: 'USer Not Found'
            })
        }

        if(user.role !== 1){
            return res.status(400).json({
                error: 'Admin Resource'
           })
        }
        req.profile= user

        next()
    })
}



exports.canUpdateDeleteBlog=(req,res, next)=>{
    const slug= req.params.slug.toLowerCase()
    Blog.findOne({slug}).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        let authorizedUser= data.postedBy._id.toString()===req.profile._id.toString()
        if(!authorizedUser){{
            if(err){
                return res.status(400).json({
                    error : 'Not Authorized User'
                })
            }
        }}
        next()
    })
}