const User= require('../models/user')
const shortId =require('shortid')
const jwt= require('jsonwebtoken')
const expressJwt=require('express-jwt')
const Blog =require('../models/blog')
// sendgrid
const sgMail =require('@sendgrid/mail') //SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


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

exports.forgotPassword=(req,res)=>{
    const {email} = req.body 
    User.findOne({email},(err, user)=>{
        if(err || !user){
            return res.status(401).json({
                error :'User with that email does not exist'
            })
        }
        const token = jwt.sign({_id:user._id}, process.env.JWT_RESET_PASSWORD,{expiresIn: '10m'})
        
        // email
        const emailData = {
            from: process.env.EMAIL_TO,
            to: email,
            subject: `Reset Password Link`,
            html: `
                <h4> Reset Link </h4>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}< /p>
            `
        };

        //populate db with user reset link...

        return user.updateOne({resetPasswordLink: token},(err, success)=>{
            if(err){
                return res.json({error: errorHandler(err)})
            }else{
                sgMail.send(emailData, (err, success)=>{
                    if(err){
                        return res.status(400).json({
                            error: `Error Generating Mail to ${email}`
                        })
                    }
                    res.status(200).json({
                        success: `Email Sent with Reset link to ${email}`
                    })
                })
            }
        })
    }) 
}

exports.resetPassword= (req,res)=>{

}