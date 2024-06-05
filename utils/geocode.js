const request = require('request')

const geocode = (address, callback) => {
    const url = `https://geocode.maps.co/search?q=${address}&api_key=6658308eef49b681161076gmi0ae33a`
    request({ url, json: true }, (error, response) => {
        if (response.body.length == 0) {
            callback("Please enter the correct details", undefined)
        } else {
            callback(undefined, {
                'lattitude': response.body[0].lat,
                'longitude': response.body[0].lon
            })
        }
    })
}

module.exports = geocode