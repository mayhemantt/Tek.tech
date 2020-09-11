/** 
// ---------------------------------------------------------------------------------//
    Project Mains
    * ?Help - Question - Suggestion
    * TODO: Todo
     * @param Parameter_For_This_Method
     * * Important (40%)
    * !Warning (Much Important)
    * 
     //// before it was this- ____ now i added this-____ 
    * TODO: Why added?
// ---------------------------------------------------------------------------------//
 */


const express= require('express')
const morgan= require('morgan')
const bodyParser= require('body-parser')
const cors = require('cors')
const cookieParser= require('cookie-parser')
require('dotenv').config()
const mongoose=require('mongoose')



// import routes



const blogRoutes= require('./routes/blog')
const authRoutes= require('./routes/auth')
const userRoutes= require('./routes/user')
const categoryRoutes= require('./routes/category')
const tagRoutes= require('./routes/tag')
// app
const app=express()
 
// db
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('DB Up')
})

// middleware

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())


// CORS

if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}



// routes
app.use('/api', userRoutes)
app.use('/api',blogRoutes)
app.use('/api',authRoutes)
app.use('/api',categoryRoutes)
app.use('/api',tagRoutes)

const port= process.env.PORT || 8000


app.listen(port, ()=>{
    console.log(`${port} Running live`)
})