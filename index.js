const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const https = require('https');
const fs = require('fs');
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
            timeout: 10,
        },
    },
});

const user = [];

http.createServer().listen(process.env.PORT || 4000).on('request', function (req, res) {
    res.end('');
});
setInterval(function () {
    https.get('https://test-cool1-bot.herokuapp.com');
}, 300000);


try {
    bot.on('message', async msg => {
        console.log('msg: ', msg);
        const chatId = helper.getChatId(msg);





        if (!user.some(item => item.user === msg.from.username)) {
            user.push({user: msg.from.username, userId: msg.from.id, date: new Date(Date.now()).toString()});
            console.log(user);
            fs.writeFile('./test.json', JSON.stringify(user), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }


        let users = '';

        fs.readFile('./test.json', async (err, data) => {
            err ? console.error(err) : users =  await JSON.stringify(data);
            // err ? console.error(err) : console.log(JSON.stringify(data));
        });


        switch (msg.text) {
            case 'q':
                await bot.sendMessage(chatId, users);
                break;
            case '/start':
                await bot.sendMessage(chatId, 'Оберіть, будь ласка яка мова вам зручніша🙌🏼', {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: keyboard.lang,
                    },
                });
                break;
            case kb.lang.UA:
                await bot.sendMessage(chatId, `${answers.helloUA} ${msg.from.first_name} !`, {
                    reply_markup: {resize_keyboard: true, keyboard: keyboard.homeUA},
                });
                break;
            case kb.lang.RU:
                await bot.sendMessage(chatId, `${answers.helloRU}${msg.from.first_name} !`, {
                    reply_markup: {resize_keyboard: true, keyboard: keyboard.homeRU},
                });
                break;
            case kb.homeRU.price:
                // language=HTML
                await bot.sendMessage(chatId, `${answers.priceRU}`,
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: keyboard.home3RU,
                        }, parse_mode: 'HTML',
                    });
                break;
            case kb.homeUA.price:
                // language=HTML
                await bot.sendMessage(chatId, `${answers.priceUA}`,
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: keyboard.home3UA,
                        }, parse_mode: 'HTML',
                    });
                break;
            case kb.homeRU.detail:
                await bot.sendMessage(chatId, `${answers.detailRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU},
                    });
                break;
            case kb.homeUA.detail:
                await bot.sendMessage(chatId, `${answers.detailUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA},
                    });
                break;
            case kb.homeRU.weddingSite:
                // language=HTML
                await bot.sendMessage(chatId, `${answers.weddingSiteRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home4RU},
                        parse_mode: 'HTML',
                    });
                break;
            case kb.homeUA.weddingSite:
                // language=HTML
                await bot.sendMessage(chatId, `${answers.weddingSiteUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home4UA},
                        parse_mode: 'HTML',
                    });
                break;
            case kb.home2RU.reservation:
                await bot.sendMessage(chatId, `${answers.reservationRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU},
                    });
                break;
            case kb.home2UA.reservation:
                await bot.sendMessage(chatId, `${answers.reservationUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA},
                    });
                break;
            case kb.home2RU.pay:
                await bot.sendMessage(chatId, `${answers.payRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU},
                    });
                break;
            case kb.home2UA.pay:
                await bot.sendMessage(chatId, `${answers.payUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA},
                    });
                break;
            case kb.home2RU.deadlines:
                await bot.sendMessage(chatId, `${answers.deadlinesRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU},
                    });
                break;
            case kb.home2UA.deadlines:
                await bot.sendMessage(chatId, `${answers.deadlinesUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA},
                    });
                break;
            case kb.home2RU.contract:
                await bot.sendMessage(chatId, `${answers.contractRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU},
                    });
                break;
            case kb.home2UA.contract:
                await bot.sendMessage(chatId, `${answers.contractUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA},
                    });
                break;
            case kb.home2RU.twoCamera:
                await bot.sendMessage(chatId, `${answers.twoCameraRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU},
                    });
                break;
            case kb.home2UA.twoCamera:
                await bot.sendMessage(chatId, `${answers.twoCameraUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA},
                    });
                break;
            case kb.home2RU.material:
                await bot.sendMessage(chatId, `${answers.materialRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2RU},
                    });
                break;
            case kb.home2UA.material:
                await bot.sendMessage(chatId, `${answers.materialUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.home2UA},
                    });
                break;
            case kb.home4RU.var1:
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
                                    },
                                ],
                            ],
                        }, keyboard: keyboard.home4RU,
                    });
                break;
            case kb.home4RU.var2:
                await bot.sendPhoto(chatId, 'pic/template_v2.jpg',
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версия на сайте',
                                        url: 'https://coolwedding.studio/templates/v3/',
                                    },
                                ],
                            ],
                        }, keyboard: keyboard.home4RU,
                    });
                break;
            case kb.home4RU.var3:
                await bot.sendPhoto(chatId, './pic/template_v3.jpg',
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версия на сайте',
                                        url: 'https://coolwedding.studio/templates/v2/',
                                    },
                                ],
                            ],
                        }, keyboard: keyboard.home4RU,
                    });
                break;
            case kb.home4UA.var1UA:
                //Test photo Site👇🏽
                const url = 'https://coolwedding.studio/wp-content/uploads/2018/10/template_v1.jpg';
                await bot.sendPhoto(chatId, url,
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версія на сайті',
                                        url: 'https://coolwedding.studio/templates/v1/',
                                    },
                                ],
                            ],
                        }, keyboard: keyboard.home4UA,
                    });
                break;
            case kb.home4UA.var2UA:
                await bot.sendPhoto(chatId, './pic/template_v2.jpg',
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версія на сайті',
                                        url: 'https://coolwedding.studio/templates/v2/',
                                    },
                                ],
                            ],
                        }, keyboard: keyboard.home4UA,
                    });
                break;
            case kb.home4UA.var3UA:
                await bot.sendPhoto(chatId, './pic/template_v3.jpg',
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Версія на сайті',
                                        url: 'https://coolwedding.studio/templates/v2/',
                                    },
                                ],
                            ],
                        }, keyboard: keyboard.home4UA,
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
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3RU,
                    });
                break;
            case kb.home3UA.hours8:
                // language=HTML
                await bot.sendMessage(chatId, `      <strong>Зйомка 8 годин:</strong>
            2 оператора
            Весільний кліп
            Весільний сайт
            Онлайн галерея
            <b>Весільний фільм</b>
            Початковий матеріал
            Попередня зустріч`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '10000 грн ₴',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3UA,
                    });
                break;
            case kb.home3UA.hours10:
                // language=HTML
                await bot.sendMessage(chatId, `      <strong>Зйомка 10 годин:</strong>
            2 оператора
            Весільний кліп
            Весільний сайт
            <b>Весільний фільм</b>
            Онлайн галерея
            Початковий матеріал
            Попередня зустріч`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '13000 грн ₴',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3UA,
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
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3RU,
                    });
                break;
            case kb.home3RU.hours12:
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
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3UA,
                    });
                break;
            case kb.home3UA.hours12:
                // language=HTML
                await bot.sendMessage(chatId, `      <strong>Зйомка 12 годин:</strong>
            2 оператора
            Весільний кліп
            Весільний сайт
            <b>Весільний фільм</b>
            Онлайн галерея
            Початковий матеріал
            Попередня зустріч`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '15000 грн ₴',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3UA,
                    });
                break;
            case kb.backRU:
                await bot.sendMessage(chatId, `${answers.backRUanswer}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.homeRU},
                    });
                break;
            case kb.backUA:
                await bot.sendMessage(chatId, `${answers.backUAanswer}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.homeUA},
                    });
                break;
            case kb.contactRU:
                await bot.sendMessage(chatId, `${answers.contactRU}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.homeRU},
                    });
                break;
            case kb.contactRU_3:
                await bot.sendMessage(chatId, `${answers.contactRU}👇🏽`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'В Telegram',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3RU,
                    });
                break;
            case kb.contactUA:
                await bot.sendMessage(chatId, `${answers.contactUA}`,
                    {
                        reply_markup: {resize_keyboard: true, keyboard: keyboard.homeUA},
                    });
                break;
            case kb.contactUA_3:
                await bot.sendMessage(chatId, `${answers.contactUA}👇🏽`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'В Telegram',
                                            url: 'https://t.me/verbovyi_volodymyr',
                                        },
                                    ],
                                ],
                            }, parse_mode: 'HTML', keyboard: keyboard.home3UA,
                    });
                break;
            default:
                await bot.sendMessage(chatId, `${msg.from.first_name}, ${answers.all}`);
        }
    });

} catch (err) {
    console.warn(err.message);
}
