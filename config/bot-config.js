const Botkit = require('botkit'),
    { getWeather, getUser } = require('../helpers/functions'),
    { triggerWords, weatherPattern } = require('./keywords'),
    { SLACK_TOKEN } = require('./keys');

module.exports = () => {
    let controller = Botkit.slackbot();

    let bot = controller.spawn({
        token: SLACK_TOKEN
    });

    //Listen for weather
    controller.hears(weatherPattern, ['ambient'], (bot, message) => {
        controller.log('Slack message received');
        let zip = message.match[1];


        getWeather(zip)
        .then(data => {
            bot.reply(message, `<@${message.user}> Forecast for ${data.name}: ${data.weather[0].main}, ${Math.round(data.main.temp)}°F`);

        })
        .catch(err => {
            bot.reply(message, err);
        });
    });

    //Listen for other commands
    controller.hears(triggerWords, ['ambient'], (bot, message) => {
        console.log(message)
        if (message.match[0] === 'weather') {
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
