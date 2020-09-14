const request = require('request')

const getWeather = (lat, lon, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=41e6b7daeff5b8d7eb4a9cc780649597&query='+ lat +','+lon +'&units=f'
    request({url, json:true}, (error, {body}={})=>{
        if(error){
            callback('could not connect to weather service', undefined)
        }else if(body.error){
            callback('could not get weather', undefined)
        }else{
            callback(undefined, {
                forecast: 'It is ' + body.current.weather_descriptions[0] +' out. The temp is ' + body.current.temperature + ' but it feels like ' + body.current.feelslike,
            })
        }
    })
}

module.exports = getWeather