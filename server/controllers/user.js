const User= require('../models/user')  
const Blog = require('../models/blog')
const errorHandler= require('../helpers/dbErrorHandler')
const _= require('lodash')
const formidable = require('formidable')
const fs= require('fs')
const { use } = require('../routes/user')

exports.read=(req,res)=>{
    req.profile.hashed_password= undefined
    return res.json(req.profile)
}

exports.publicProfile =(req,res)=>{
    let username = req.params.username
    let user
    let blogs

    User.findOne({username}).exec((err, userFromDb)=>{
        if(err || !userFromDb){
            return res.status(400).json({
                error: 'User Not Found'
            })
        }

        user = userFromDb
        let userId = user._id
        Blog.find({postedBy: userId})
        .populate('categories','_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy','_id name')
        .limit(10)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
            .exec((err, data)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                user.photo= undefined
                user.hashed_password= undefined
                res.json({
                    user,blogs: data
                })
            })
    })
}

exports.update=(req,res)=>{
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: 'Photo cant be uploaded'
            })
        }
        let user= req.profile
        user= _.extend(user, fields)
        if(files.photo){
            if(files.photo.size> 100000){
                return res.status(400).json({
                    error: 'Photo cant be uploaded <1 mb'
                })
            }
            user.photo.data= fs.readFileSync(files.photo.path)
            user.photo.contentType= files.photo.type

            user.save((err, result)=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                user.hashed_password= undefined

                res.json(user)
            })
        }
    })
}

exports.photo= (req,res)=>{
    const username= req.params.username
    User.findOne({username}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'No User Found'
            })
        }
        if(user.photo.data){
            res.set('Content-Type',user.photo.contentType)
            return res.send(user.photo.data)
        }
    })

}