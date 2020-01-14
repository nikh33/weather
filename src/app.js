const path = require('path');
const express = require('express');
const hbs = require('hbs'); 
const geolocation = require('./geolocation');
const wheather = require('./wheather');
const location = process.argv[2];

const app = express(); 

// define path for express config
const viewLocation = path.join(__dirname,'./template/views');
const flePath = path.join(__dirname,'../public');
const partialPath = path.join(__dirname,'./template/partials')
//setup handlebar as view engine and view location 
app.set('view engine', 'hbs');
app.set("views", viewLocation);
hbs.registerPartials(partialPath);
//setup static directory to seerve
app.use(express.static(flePath))

// these are static pages so cno need to create functions
app.get('',(req,res) => {
   // res.send('home page')
   res.render('index', {
       title: 'Home',
       name: 'nikhil'
   })
})

app.get('/help', (req, res) => {
   // res.send('help page')
   res.render('help', {
       title: 'Help',
       name: 'nikhil'
   })
})

app.get('/about', (req, res) => {
    res.render('about', {
       title: 'About',
       name: 'nikhil'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.redirect('404')
    }
    const address = req.query.address
    //Destructing data tol lat long and place
    geolocation.geocode(address, (err, { latitude, longitude, place_name } = {}) => {
        if (err)
            return err;
        wheather.conditions(latitude, longitude, (err, conditions) => {
            if (err)
                return err;

            res.send({
                title: 'Weather',
                forcast: conditions,
                location: place_name,
                address: address,
                name: 'nikhil'
            })
        })
    })
    
})

app.get("help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "nikhil",
    errorMessage: "Article not found"
  });
});
app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'nikhil',
        errorMessage: 'Page not found'
    })
})

app.listen(3010,() => {
    console.log('server is up')
})