
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVwaXRvcmFwcHMiLCJhIjoiY2p6NHhlMWpmMDRhODNocWFhZnFqMzVndCJ9.BRy7BqLTVLqSEBpSPzx67A&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect Location services', undefined)
        } else if (body.features.length === 0) {
            callback('It seems something wrong with the location, please try again', undefined)

        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })

}



module.exports = {
    geocode: geocode
}

