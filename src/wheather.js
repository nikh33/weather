const request = require('request');

module.exports = {
    conditions: (latitude, longitude, callback) => {
        const url = "https://api.darksky.net/forecast/129be92f47e593b0303f67c295929618/" + latitude + "," + longitude;
        request({
            url,
            json: true
        }, (err, {body}) => {
            if (err) {
                callback('unable to connect')
            } else if (body.error) {
                callback(body.error)
            } else {
                const data = body.daily.data[0].summary + body.currently.temperature + ' degree out. There is ' + body.currently.precipProbability + '% chance of rain.'
                callback(undefined, data)
            }
        })
    }
}