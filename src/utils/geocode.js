const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidTE5ZWMwNDMiLCJhIjoiY2tvbWh5dTJtMGhqOTJ1cXRkN3p2MGdqaSJ9.7GEFUjKOHYeK7fG8c7laDw'
    
    request({ url ,json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!',undefined)
        }
        else if (body.message === "Not Found" || body.features.length===0) {
            callback('Unable to find location. Try another search.',undefined)
        } 
        else{
            const longitude=body.features[0].center[0]
            const latitude=body.features[0].center[1]
            const location=body.features[0].place_name
            const data = {
                longitude:longitude,
                latitude:latitude,
                location:location,
            }
            callback(undefined,data)
        }

    })    
}

module.exports = geocode