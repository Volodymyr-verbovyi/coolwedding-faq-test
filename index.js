const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const https = require('https');
const helper = require('./helper');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');
const answers = require('./answers');

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
            case '/start':
                await bot.sendMessage(chatId, 'Оберіть, будь ласка яка мова вам зручніша🙌🏼', {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: keyboard.lang,
                    }
                });
                break;
            case kb.lang.UA:
                await bot.sendMessage(chatId, `${answers.helloUA} ${msg.from.first_name} !`, {
                    reply_markup: {resize_keyboard: true, keyboard: keyboard.homeUA}
                });
                break;
            case kb.lang.RU:
                await bot.sendMessage(chatId, `${answers.hello}${msg.from.first_name} !`, {
                    reply_markup: {resize_keyboard: true, keyboard: keyboard.homeRU}
                });
                break;
            case kb.homeRU.price:
                // language=HTML
                await bot.sendMessage(chatId, `Стоимость от <strong>10000 грн ₴</strong> до <b>15000 грн ₴</b> в зависимости от выбраного пакета👇🏽`,
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: keyboard.home3RU
                        }, parse_mode: 'HTML',
                    });
                break;
            case kb.homeUA.price:
                // language=HTML
                await bot.sendMessage(chatId, `Стоимость от <strong>10000 грн ₴</strong> до <b>15000 грн ₴</b> в зависимости от выбраного пакета👇🏽`,
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: keyboard.home3UA
                        }, parse_mode: 'HTML',
                    });
                break;
            case kb.homeRU.detail:
                await bot.sendMessage(chatId, `Съемка проходит на разных локациях, по вашему выбору. Возможно у вас есть ценные для вас места, я думаю там также возможно провести съёмку.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.homeUA.detail:
                await bot.sendMessage(chatId, `Съемка проходит на разных локациях, по вашему выбору. Возможно у вас есть ценные для вас места, я думаю там также возможно провести съёмку.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.homeRU.weddingSite:
                // language=HTML
                await bot.sendMessage(chatId, `<b>Свадебный сайт:</b>\nЭто онлайн приглашение на свадьбу. Онлайн приглашение, размещенное на сайте, это одновременно и Ваша уникальная история и созданное лично Вами обращение к гостям. Возможность быстро отправить и проинформировать гостей о деталях мероприятия, каких либо изменений или дополнений. Приглашение всегда доступно по ссылке которую вы отправите, одинаково красиво выглядит в компьютере или телефоне. Примеры можете псмотреть как раз внизу 👇🏽`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home5RU},
                        parse_mode: 'HTML',
                    });
                break;
            case kb.homeUA.weddingSite:
                // language=HTML
                await bot.sendMessage(chatId, `<b>Свадебный сайт:</b>\nЭто онлайн приглашение на свадьбу. Онлайн приглашение, размещенное на сайте, это одновременно и Ваша уникальная история и созданное лично Вами обращение к гостям. Возможность быстро отправить и проинформировать гостей о деталях мероприятия, каких либо изменений или дополнений. Приглашение всегда доступно по ссылке которую вы отправите, одинаково красиво выглядит в компьютере или телефоне. Примеры можете псмотреть как раз внизу 👇🏽`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home5UA},
                        parse_mode: 'HTML',
                    });
                break;
            case kb.home2RU.reservation:
                await bot.sendMessage(chatId, `Предоплата нужна для бронирования даты, и составляет 2000 грн ₴`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.home2UA.reservation:
                await bot.sendMessage(chatId, `Предоплата нужна для бронирования даты, и составляет 2000 грн ₴`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.home2RU.pay:
                await bot.sendMessage(chatId, `Так как для бронирования даты, берем задаток 2000 грн ₴, оставшаяся сума в день свадьбы`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.home2UA.pay:
                await bot.sendMessage(chatId, `Так как для бронирования даты, берем задаток 2000 грн ₴, оставшаяся сума в день свадьбы`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.home2RU.deadlines:
                await bot.sendMessage(chatId, `Процесс сложный и творческий 🙏, по времени стараемся от 2х недель, но бывает и 3 месяца☺️. Поверьте, результат того стоит 🔥`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.home2UA.deadlines:
                await bot.sendMessage(chatId, `Процесс сложный и творческий 🙏, по времени стараемся от 2х недель, но бывает и 3 месяца☺️. Поверьте, результат того стоит 🔥`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.home2RU.contract:
                await bot.sendMessage(chatId, `Если у вас есть пожелание, можем подписать с вами договор`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.home2UA.contract:
                await bot.sendMessage(chatId, `Если у вас есть пожелание, можем подписать с вами договор`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.home2RU.twoCamera:
                await bot.sendMessage(chatId, `Съемка происходит двумя операторами, таким образом позволяет снять разные планы одного события.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.home2UA.twoCamera:
                await bot.sendMessage(chatId, `Съемка происходит двумя операторами, таким образом позволяет снять разные планы одного события.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.home2RU.equipment:
                await bot.sendMessage(chatId, `Снимаем на фотоапараты. Также по возможности используем систему стабилизации. Звук на банкете и выездной церемонии записываем на звуковой рекордер.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.home2UA.equipment:
                await bot.sendMessage(chatId, `Снимаем на фотоапараты. Также по возможности используем систему стабилизации. Звук на банкете и выездной церемонии записываем на звуковой рекордер.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.home2RU.material:
                await bot.sendMessage(chatId, `Исходный материал по желанию можем отдать, как онлайн ссылку с нашего файлообменника, так и на вашем жестком диске. В среднем обьем зависит от насыщенности событий и составляет 200-300 гб.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU}
                    });
                break;
            case kb.home2UA.material:
                await bot.sendMessage(chatId, `Исходный материал по желанию можем отдать, как онлайн ссылку с нашего файлообменника, так и на вашем жестком диске. В среднем обьем зависит от насыщенности событий и составляет 200-300 гб.`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA}
                    });
                break;
            case kb.home5RU.var1:
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
                        }, keyboard: keyboard.home5RU
                    });
                break;
            case kb.home5UA.var1:
                await bot.sendPhoto(chatId, './pic/template_v1.jpg',
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
                        }, keyboard: keyboard.home5UA
                    });
                break;
            case kb.home5RU.var2:
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
                        }, keyboard: keyboard.home5RU
                    });
                break;
            case kb.home5UA.var2:
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
                        }, keyboard: keyboard.home5UA
                    });
                break;
            case kb.home5RU.var3:
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
                        }, keyboard: keyboard.home5RU
                    });
                break;
            case kb.home5UA.var3:
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
                        }, keyboard: keyboard.home5UA
                    });
                break;
            case kb.home3RU.hours8:
                // language=HTML
                await bot.sendMessage(chatId, `      <strong>Съёмка 8 часов:</strong>
            2 оператора
            Свадебный клип
            Свадебный сайт
            Онлайн галерея
            Исходный материал
            Предварительная встреча`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '10000 грн ₴',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        }
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3RU
                    });
                break;
            case kb.home3UA.hours8:
                // language=HTML
                await bot.sendMessage(chatId, `      <strong>Съёмка 8 часов:</strong>
                        2 оператора
                        Свадебный клип
                        Свадебный сайт
                        Онлайн галерея
                        Исходный материал
                        Предварительная встреча`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '10000 грн ₴',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        }
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3UA
                    });
                break;
            case kb.home3RU.hours10:
                // language=HTML
                await bot.sendMessage(chatId, `      <strong>Съёмка 10 часов:</strong>
                        2 оператора
                        Свадебный клип
                        Свадебный сайт
                        Онлайн галерея
                        <b>Свадебный фильм</b>
                        Исходный материал
                        Предварительная встреча`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '13000 грн ₴',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        }
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3RU
                    });
                break;
            case kb.home3UA.hours12:
                // language=HTML
                await bot.sendMessage(chatId, `      <strong>Съёмка 12 часов:</strong>
            2 оператора
            Свадебный клип
            Свадебный сайт
            Онлайн галерея
            <b>Свадебный фильм</b>
            Исходный материал   
            Предварительная встреча`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '15000 грн ₴',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        }
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3UA
                    });
                break;
            case kb.back:
                await bot.sendMessage(chatId, `Выбирайте вариант ниже 👇🏽`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home}
                    });
                break;
            case kb.contact:
                await bot.sendMessage(chatId, `С удовольствием отвечу по телефону +380633592121, на оставшиеся вопросы. Звоните, или пишите.💛`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home}
                    });
                break;
            case kb.contactUA:
                await bot.sendMessage(chatId, `З задоволенням відповім по телефону +380633592121, на залишився питання. Дзвоніть, або пишіть.💛`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home}
                    });
                break;
            default:
                await bot.sendMessage(chatId, `${msg.from.first_name}, оу, полегше, давай спробуемо ще раз выбирайте вариант нижче 👇🏽`)
        }
    });

} catch (err) {
    console.warn(err.message);
}


/*case kb.home3.hours10:
                await bot.sendMessage(chatId, `Съёмка 10 часов:\n 2 оператора\n Свадебный клип\n Свадебный сайт\n Онлайн галерея\n Свадебный фильм\n Исходный материал\n Предварительная встреча\n`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home3}
                    });
                break;*/


/*case kb.home2.pak:
await bot.sendMessage(chatId, `В каждый пакет входит - сьемка 2-мя операторами основных событый, монтаж клипа, предварительная встреча, онлайн пригласительный. В пакеты на 10 и 12 часов + добавляется монтаж свадебного фильма.`,
    {
        reply_markup: {resize_keyboard: true, keyboard: keyboard.home3}
    });
break;*/
