const request = require('request')

const forecast = (longitude,lattitude,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&appid=6b2f6eea8833ea8532f999668e219649&units=metric'
    // 'https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=6b2f6eea8833ea8532f999668e219649&lang=zh_cn'
    // https://api.openweathermap.org/data/2.5/weather?lat=44.1545&lon=-75.7088&appid=6b2f6eea8833ea8532f999668e219649

    request({ url ,json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!',{undefined})
        }
        else if (body.message==="wrong latitude") {
            callback('Unable to find location. Your Lattitude is wrong.',{undefined})
        } 
        else if (body.message==="wrong longitude") {
            callback('Unable to find location. Your Longitude is wrong.',{undefined})
        } 
        else{
            // const data='The weather looks as '+body.weather[0].description + '!. It is currently ' +body.main.temp + ' degrees out.'
            const data = {
                description:body.weather[0].description,
                temperature:body.main.temp,
                icon:body.weather[0].icon,
            }
            callback(undefined,data)
        }

    })    
}

module.exports = forecast