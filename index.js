const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const https = require('https');
const helper = require('./helper');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');

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
        const chatId = helper.getChatId(msg);

        switch (msg.text) {
            case kb.home.price:
                await bot.sendMessage(chatId, `Стоимость от 10000 грн до 15000грн в зависимости от выбраного пакета`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2}
                    });
                break;
            case kb.home.locations:
                await bot.sendMessage(chatId, `Съемка проходит в разных локация, по вашему выбору, так же предлагаем и своим локаци`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home4}
                    });
                break;
            case kb.home.pak:
                await bot.sendMessage(chatId, `В каждый пакет входит - сьемка 2-мя операторами основных событый, монтаж клипа, предварительная встреча, онлайн пригласительный`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home3}
                    });
                break;
            case kb.home.weddingSite:
                await bot.sendMessage(chatId, `Свадебный сайт, это онлайн приглашение на свадьбу. Онлайн приглашение, размещенное на сайте, это одновременно и Ваша уникальная история и созданное лично Вами обращение к гостям. Возможность быстро отправить и проинформировать гостей о деталях мероприятия, каких либо изменений или дополнений. Приглашение всегда доступно по ссылке которую вы отправите им, одинаково красиво выглядит в компьютере или телефоне гостя, которого Вы пригласили на свадьбу.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home5}
                    });
                break;
            case kb.home2.reservation:
                await bot.sendMessage(chatId, `Предоплата нужна для бронирования даты, составляет 2000 грн `,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2}
                    });
                break;
            case kb.home2.pay:
                await bot.sendMessage(chatId, `Так как для бронирования даты, берем задаток 2000 грн, оставшаяся сума в день свадьбы`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2}
                    });
                break;
            case kb.home2.deadlines:
                await bot.sendMessage(chatId, `Процесс сложный и творческий 🙏, по времени стараемся от 2х недель, но бывает и 3 месяца☺️. Поверьте, результат того стоит  🔥`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2}
                    });
                break;
            case kb.home2.contract:
                await bot.sendMessage(chatId, `Если у вас есть пожелание, можем подписать с вами договор`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2}
                    });
                break;
            case kb.home4.twoCamera:
                await bot.sendMessage(chatId, `Съемка происходит двумя операторами, таким образом позволяет снять разные планы одного события.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home4}
                    });
                break;
            case kb.home4.equipment:
                await bot.sendMessage(chatId, `Снимаем на фотоапараты. Также по возможности использкем систему стабилизации. Звук на банкете и выездной церемонии записываем на звуковой рекордер.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home4}
                    });
                break;
            case kb.home4.material:
                await bot.sendMessage(chatId, `Исходный материал по желанию можем отдать, как онлайн ссылку с нашего файлообменника, так и на вашем жестком диске. В среднем обьем зависит от насыщенности событий и составляет 200-300 гб.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home4}
                    });
                break;
            case kb.home5.var1:
                const fileId = './pic/template_v1.jpg';
                await bot.sendPhoto(chatId, fileId,
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версия на сайте',
                                        url: 'https://coolwedding.studio/templates/v1/',
                                    }
                                ]
                            ],
                        }, keyboard: keyboard.home5
                    });
                break;
            case kb.home5.var2:
                await bot.sendPhoto(chatId, './pic/template_v2.jpg',
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версия на сайте',
                                        url: 'https://coolwedding.studio/templates/v3/',
                                    }
                                ]
                            ],
                        }, keyboard: keyboard.home5
                    });
                break;
            case kb.home5.var3:
                await bot.sendPhoto(chatId, './pic/template_v3.jpg',
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версия на сайте',
                                        url: 'https://coolwedding.studio/templates/v2/',
                                    }
                                ]
                            ],
                        }, keyboard: keyboard.home5
                    });
                break;
            case kb.back:
                await bot.sendMessage(chatId, `Выберайте вариант ниже 👇`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home}
                    });
                break;
            case kb.contact:
                await bot.sendMessage(chatId, `С удовольствием ответчу по телефону +380633592121, на оставшиеся вопросы. Звоните 💛`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home}
                    });
                break;

            default:
                await bot.sendMessage(chatId, `${msg.from.first_name}, оу, полегше, давай спробуемо ще раз выберайте вариант ниже 👇`)
        }
    });

    bot.onText(/\/start/, async msg => {

        const text = `Привет🖐, выберайте вариант ниже 👇, ${msg.from.first_name}`;
        await bot.sendMessage(helper.getChatId(msg), text, {
            reply_markup: {resize_keyboard: true, keyboard: keyboard.home}
        })
    });
} catch (err) {
    console.warn(err.message);
}










