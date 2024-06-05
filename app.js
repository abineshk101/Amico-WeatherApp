const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('../weather-app/utils/geocode')
const geoplace=require('../web-server/utils/geoplace')

const app=express()
const port=3000

/// Define path for Express config
const indexPath=path.join(__dirname,'/public')
const viewpath=path.join(__dirname,'/templates/views')
const partialPath=path.join(__dirname,'/templates/partials')

/// setup handlebar engine
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialPath)

/// setup static dictionary to use
app.use(express.static(indexPath))

app.get("",(req,res)=>{
    res.render('index',{
        title:"INDEX",
        name:"Abinesh",
        message:"Welcome to Home page"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"ABOUT",
        name:"Abinesh",
        message:"This page is about weather app"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',
        {
            title:"HELP",
            name:"Abinesh",
            message:"You can refer anything about weather app"
        })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide the address'
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude}={})=>{
        if (error){
            return res.send.error
        }
        geoplace(lattitude,longitude,(forcastError,{climate,current_temp,place,temp_min,temp_max})=>{
            if(forcastError){
                return res.send.forcastError
            }
        res.send({
            lattitude,                                                                                                                                                                                                      
            longitude,
            climate,
            current_temp,
            place,
            temp_min,
            temp_max
        })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404Error',
        {
            title:"404 Error",
            name:"Abinesh",
            message:"Help page was not found"
        })
})


app.get('*',(req,res)=>{
    res.render('404Error',
    {
        title:"404 Error",
        name:"Abinesh",
        message:"Page was not found"
    })
})

app.listen(port,()=>{
    console.log("The http://localhost:"+port)
})

// const newPath=path.join(__dirname,'foldername_to_change')
// app.use('views',newPath)