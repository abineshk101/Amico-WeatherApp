const request = require('request')

const geoplace = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aba9948c1b4837cecc64758cbba8adaa&units=metric`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the server', undefined)
        } else if (response.body.cod != '200') {
            callback('Please enter the correct details', undefined)
        } else {
            const state = response.body.main
            console.log(state.temp_min)
            callback(undefined, {
                'climate': response.body.weather[0].description,
                'current_temp': state.temp,
                'place':response.body.name,
                'temp_min':state.temp_min,
                'temp_max':state.temp_max
            })
        }
    })
}

module.exports = geoplace 