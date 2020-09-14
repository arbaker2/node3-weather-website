const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const getWeather = require('./utils/weather.js')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Ssniper'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ssniper'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Ssniper',
        helpMessage: "This is a help message",
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }

    const loc = req.query.address

    geocode(loc, (error, {lat,lon,location}={})=>{
        if(loc){
            if(error){
                return res.send({
                    error: error,
                })
            }
            getWeather(lat,lon,(error,weatherData)=>{
                if(error){
                    return res.send({
                        error: error,
                    })
                }
                res.send({'address': req.query.address, location: location, forecast: weatherData})
            })
        }  
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req,res)=> {
    res.render('error',{
        title:'404',
        name:'Ssniper',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res)=> {
    res.render('error',{
        title:'404',
        name:'Ssniper',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('sever up on local port 3000')
})