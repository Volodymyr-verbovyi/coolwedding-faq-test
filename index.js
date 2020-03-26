const TelegramBot = require('node-telegram-bot-api')

const TOKEN= '996463033:AAEX502RCoUE3pi8M0BSUyCijBW7moLSm-U'

const bot = new TelegramBot(TOKEN,  {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})




bot.on('message', msg => {

 const chadid = msg.chat.id



    bot.sendMessage(chadid, 'Получили твой интерес! Спасибо!'+ msg.from.first_name, {
        reply_markup: {
            keyboard: [
                ['Пакеты', 'О нас '],
                ['Скоько опеарторов', '5'],
                ['Цены'],
            ]
        }
    } );
});
