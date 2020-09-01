/**
 
  
  
  To visualize below comments, add Better Comments VS Code Extension, or follow the Syntax
  * After a successful installation edit the setting.json for the extension and add the following code.
  
  
  {
    "javascript.updateImportsOnFileMove.enabled": "always",
    "powermode.enabled": true,
    "editor.fontSize": 16,
    "liveServer.settings.donotVerifyTags": true,
    "better-comments.highlightPlainText": true,
    "better-comments.tags": [

        {
            "tag": "!",
            "color": "#FF2D00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": true,
            "italic": true
        },
        {
            "tag": "?",
            "color": "#3498DB",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "//",
            "color": "#474747",
            "strikethrough": true,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "to",
            "color": "#FF8C00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "*",
            "color": "pink",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "",
            "color":"blond",
            "strikethrough":false,
            "underline":false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": true
        }
    ]
}

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
// app
const app=express()
 
// db
mongoose.connect(process.env.DATABASE,{
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

if(process.env.NODE_ENV=== 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}


app.use(cors())

// routes

app.use('/api',blogRoutes)
app.use('/api',authRoutes)



const port= process.env.PORT || 8000


app.listen(port, ()=>{
    console.log(`${port} Running live`)
})