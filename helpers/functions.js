const request = require('request');
const { API_KEY } = require('../config/keys');


exports.getWeather = (zip) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${API_KEY}`;

    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let data = JSON.parse(body);
                resolve(data);
            }
            else {
                reject('Something went wrong.')
            }
        });
    });
}