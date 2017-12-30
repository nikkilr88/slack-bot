const Botkit = require('botkit');
const { getWeather } = require('../helpers/functions');
const { SLACK_TOKEN } = require('../config/keys');

module.exports = () => {
    let controller = Botkit.slackbot();

    let bot = controller.spawn({
        token: SLACK_TOKEN
    });

    //Listen for key words
    controller.hears(['weather'], ['ambient'], (bot, message) => {
        controller.log('Slack message received');

        let zip = message.text.split(' ')[1];
        getWeather(zip).then(data => {
            bot.reply(message, `Forecast for ${data.name}: ${data.weather[0].main}, ${data.main.temp}°F`);
        });
    });

    // Use RTM
    bot.startRTM(function (err, bot, payload) {
        if (err) {
            throw new Error('Could not connect to Slack');
        }
        controller.log('Slack connection established.');
    });
    
}
