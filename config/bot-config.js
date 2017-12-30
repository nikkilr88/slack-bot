const Botkit = require('botkit');
const { getWeather } = require('../helpers/functions');
const { SLACK_TOKEN } = require('../config/keys');

module.exports = () => {
    let controller = Botkit.slackbot();

    let bot = controller.spawn({
        token: SLACK_TOKEN
    });

    //Listen for weather
    controller.hears(['weather ([0-9]{5})'], ['ambient'], (bot, message) => {
        controller.log('Slack message received');
        
        let zip = message.match[1];
        
        getWeather(zip)
        .then(data => {
            bot.reply(message, `Forecast for ${data.name}: ${data.weather[0].main}, ${data.main.temp}°F`);
        })
        .catch(err =>{
            bot.reply(message, err);
        });
    });

    //Listen for other commands
    controller.hears(['weather', 'help'], ['ambient'], (bot, message) => {        
        if(message.text === 'weather') {
            bot.reply(message, 'Did you want the weather? Enter <weather zipcode>.');
        }
        else {
            bot.reply(message, 'I\'m just a bot. If you really need help, maybe you should call a fellow human. \n\n If you want your weather forecast, enter <weather zipcode>.');
        }
    });

    // Use RTM
    bot.startRTM(function (err, bot, payload) {
        if (err) {
            throw new Error('Could not connect to Slack');
        }
        controller.log('Slack connection established.');
    });
}
