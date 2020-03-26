const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const https = require('https');

const TOKEN = '996463033:AAEX502RCoUE3pi8M0BSUyCijBW7moLSm-U';

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

http.createServer().listen(process.env.PORT || 4000).on('request', function (req, res) {
    res.end('')
});
setInterval(function () {
    https.get('https://test-cool1-bot.herokuapp.com')
}, 300000);

try {
    bot.on('message', async msg => {
        const chadid = msg.chat.id;
        const buttons = {
            reply_markup: {
                keyboard: [
                    ['page', 'О нас '],
                    ['Скоько опеарторов', '5'],
                    ['Цены'],
                ]
            }
        };

        if (msg.text === '/start') {
            await bot.sendMessage(chadid, `good day, ${msg.from.first_name}!`, buttons);
        }
        if (msg.text === 'page') {
           await bot.sendMessage(chadid, 'this is your page', buttons);
        } else if (msg.text === 'Цены') {
            await bot.sendMessage(chadid, '120000', buttons);
        }

       // await bot.sendMessage(chadid, 'Получили твой интерес! Спасибо!' + msg.from.first_name, buttons);
    });
} catch (err) {
    console.warn(err.message);
}

