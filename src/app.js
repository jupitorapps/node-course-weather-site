const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000 //setup port heroku || local
//define paths for Express config
const pubicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//console.log(__dirname) //get the current directory

app.set('view engine', 'hbs') //initialize hbs for use
app.set('views', viewsPath) //set path to views for express, hbs
hbs.registerPartials(partialsPath) //set path to partials

//set up static directory to serve
app.use(express.static(pubicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pradeep Behera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pradeep Behera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Docs',
        content: 'Help content will appear here soon',
        name: 'Pradeep Behera'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter place for which you need the weather report"
        })
    }

    geocode.geocode(req.query.address, (error, { lat, long, location } = {}) => { //set default value for empty params

        if (error) {
            return res.send({ error })
        }

        forecast.forecast(long, lat, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            
            console.log(location)
            console.log(forecastData)
            //console.log(__filename)
            global.place = location
            global.weather_forecast = forecastData

            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            })

        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })

    // console.log(req.query)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        notfound: "Help docs not found. ",
        name: "Pradeep Behera"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        notfound: "Page not found. ",
        name: "Pradeep Behera"
    })
})

app.listen(port, () => {
    console.log('Server Started on port '+port)
})