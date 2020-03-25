const TelegramBot = require('node-telegram-bot-api');

const token = '996463033:AAH5nSO6f4YLEXQ97mAIY01vabd5AKMzrlE';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Получили твое сообщение! Спасибо!');
});