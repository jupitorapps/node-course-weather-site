const request = require('request')

const forecast=(long, lat, callback)=>{
    const url = 'https://api.darksky.net/forecast/14b51418a18f1a179e4929795776b88d/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'
    request({url, json:true},(error, {body})=>{
        if (error) {
            callback('Unable to connect to Weather Service',undefined)
        } else if(body.error){
            callback(body.error, undefined)

        } else{
            const responseData = body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degree out. There is a "+(body.currently.precipProbability*100)+"% chance of rain"
            callback(undefined, responseData) 
        }
    })
}

  module.exports = {
      forecast: forecast
}