const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather App',
    name: 'Ragahav'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title: 'About Me!',
    name: 'Ragahav'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    helpText:"Please contact Raghav!",
    title:'Help',
    name:'Raghav'
  })
})

app.get('/weather',(req,res)=>{
  // console.log(req.query.address)
  if(!req.query.address)
  {
    return res.send({
      error:"Address location must be specified!"
    })
  }

  const address = req.query.address
  geocode(address,(error,{longitude,latitude,location}={})=>{
    if(error){
      return res.send({error})        
    }

    forecast(longitude, latitude, (error, foreCastData) => {
    if(error){
      return res.send({ error})        
    }
    return res.send({
        location,
        forecast:foreCastData,
        address,
      }
    )
    
    })
    
})


})

// app.get('/products',(req,res)=>{
//   console.log(req.query.search)
//   res.send({
//     prodeucts:[],
//   })
// })

app.get('/help/*',(req,res)=>{
  res.render('error',{
    errorMessage:"Help article not found!",
    title:'404 Page',
    name:'Raghav'
  })
})

app.get('*',(req,res)=>{
  res.render('error',{
    errorMessage:"Page not found",
    title:'404 Page',
    name:'Raghav'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})