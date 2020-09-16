const User= require('../models/user')
const shortId =require('shortid')
const jwt= require('jsonwebtoken')
const expressJwt=require('express-jwt')
const Blog =require('../models/blog')
// sendgrid
const sgMail =require('@sendgrid/mail') //SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const _ = require('lodash')
const {OAuth2Client}= require('google-auth-library')


exports.preSignup=(req,res)=>{
    const {name, email, password}= req.body
    User.findOne({email: email.toLowerCase()},(err, user)=>{
        if(user){
            return res.status(400).json({
                error: 'Email is Taken'
            })
        }

        const token= jwt.sign({name, email, password},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'10m'})
        const emailData = {
            from: process.env.EMAIL_TO,
            to: email,
            subject: `Activation Link`,
            html: `
                <h4> Reset Link </h4>
                <p>${process.env.CLIENT_URL}/auth/activate/${token} </p>
            `
        };

        sgMail.send(emailData, (err, success)=>{
            if(err){
                return res.status(400).json({
                    error: `Error Generating Mail to ${email}`
                })
            }
            res.status(200).json({
                message: `Email Sent with Reset link to ${email}`
            })
        })
    })

}


// exports.signup=(req,res)=>{
//     User.findOne({email:req.body.email}).exec((err, user)=>{
//         if(user){
//             return res.status(400).json({
//                 error: 'Email is Taken'
//             })
//         }
//         const {name,email,password}=req.body
//         let username = shortId.generate()

//         let profile=`${process.env.CLIENT_URL}/profile/${username}`

//         let newUser=new User({name, email,password, profile,username})
//         newUser.save((err, success)=>{
//             if(err){
//                 return res.status(400).json({
//                     error: err
//                 })
//            }
//             res.json({
//                 message: 'Signup Success! Please Signin.'
//             })
//         })
//     })
// }

exports.signup=(req,res)=>{
    const token = req.body.token 
    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
            if(err){
                return res.status(401).json({
                    error: 'Expired Link'
                })
            }

            const {name, email, password}= jwt.decode(token)

            let username = shortId.generate()
            let profile=`${process.env.CLIENT_URL}/profile/${username}`

            const user= new User({name, email, password, profile, username})
            user.save((err, user)=>{
               if(err){
                return res.status(401).json({
                    error: errorHandler(err)
                })
               }

               return res.json({
                   message: 'Signup Success!'
               })
            })


        })
    }else{
        return res.json(400).json({
            message: 'Something went wrong,  please try again'
        })
    }
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
        const token = jwt.sign({_id:user._id}, process.env.JWT_RESET_PASSWORD,{expiresIn: '90s'})
        
        // email
        const emailData = {
            from: process.env.EMAIL_TO,
            to: email,
            subject: `Reset Password Link`,
            html: `
                <h4> Reset Link </h4>
                <p>${process.env.CLIENT_URL}/auth/${token}< /p>
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
                        message: `Email Sent with Reset link to ${email}`
                    })
                })
            }
        })
    }) 
}

exports.resetPassword= (req,res)=>{
    const {resetPasswordLink,newPassword}= req.body;

    if(resetPasswordLink){
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decode){
            if(err){
                return res.status(401).json({
                    error: 'Expired Link, try again'
                })
            }
            User.findOne({resetPasswordLink}, (err, user)=>{
                if(err || !user){
                    return res.status(401).json({
                        error: 'Something Went Wrong'
                    })
                }
                const updatedFields ={
                    password: newPassword,
                    resetPasswordLink:''
                }

                user = _.extend(user, updatedFields)

                user.save((err, result)=>{
                    if(err || !user){
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }
                    res.json({
                        message: `Great Now You Can Login!`
                    })
                })
            })
        })
    }
}

const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
exports.googleLogin = (req, res) => {
    const idToken = req.body.tokenId;
    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then(response => {
        // console.log(response)
        const { email_verified, name, email, jti } = response.payload;
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    // console.log(user)
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.cookie('token', token, { expiresIn: '1d' });
                    const { _id, email, name, role, username } = user;
                    return res.json({ token, user: { _id, email, name, role, username } });
                } else {
                    let username = shortId.generate();
                    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
                    let password = jti;
                    user = new User({ name, email, profile, username, password });
                    user.save((err, data) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            });
                        }
                        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                        res.cookie('token', token, { expiresIn: '1d' });
                        const { _id, email, name, role, username } = data;
                        return res.json({ token, user: { _id, email, name, role, username } });
                    });
                }
            });
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again.'
            });
        }
    });
};