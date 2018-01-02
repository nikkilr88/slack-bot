const request = require('request');
const { API_KEY, SLACK_TOKEN } = require('../config/keys');

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

exports.getUsers = () => {
    let url = `https://slack.com/api/users.list?token=${SLACK_TOKEN}`;

    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let users = JSON.parse(body);
                resolve(users);
            }
            else {
                reject('Something went wrong.')
            }
        });
    });
}