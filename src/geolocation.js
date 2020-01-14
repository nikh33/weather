const request = require('request')


module.exports = {
    'geocode': (address, callback) => {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmlraDMzIiwiYSI6ImNrNHpmZmlzODA5d3Uzb21zZ3UyNnUzMnYifQ.N149-xbDNb8g1yu-KDP12Q&limit=1";
        request({
            url, //object shortend not need to write url: url
            json: true
        }, (error, {body}) => {
            if (error) {
                callback('unable to connect')
            } else if (body.message) {
                callback(body.message)
            } else if (body.features.length == 0) {
                callback('No location found')
            } else {
                const latitude = body.features[0].center[1]
                const longitude = body.features[0].center[0]
                const place_name = body.features[0].place_name
                callback(undefined, {
                    latitude: latitude,
                    longitude: longitude,
                    place_name: place_name
                })
            }
        })
    }
}