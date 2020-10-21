const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const https = require('https');
const rp = require('request-promise');
const helper = require('./helper');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');
const answers = require('./answers');

const TOKEN = `./token.txt`;

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

const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];

try {
    bot.on('message', async msg => {
        const chatId = helper.getChatId(msg);

        const config = { 'Content-Type': 'application/json' };
        config.body = JSON.stringify({
            user: msg.from.username,
            userId: msg.from.id,
        });

        const config2 = { 'Content-Type': 'application/json' };
        config2.body = JSON.stringify({
            user: msg.from.username,
            wmak: [
                {
                    text: msg.text,
                    date: new Date(Date.now()).toString(),
                },
            ],
        });

        const res = await rp.get('https://coolweddingfaq.firebaseio.com/statUnique.json');
        if (res === 'null') {
            await rp.post('https://coolweddingfaq.firebaseio.com/statUnique.json', config);
        } else {
            const parseData = [...new Set(Object.values(JSON.parse(res)).map(item => item.userId))];
            if (!parseData.some(item => item.toString() === msg.from.id.toString())) {
                await rp.post('https://coolweddingfaq.firebaseio.com/statUnique.json', config);
            }
        }

        const date = new Date();
        const tableName = `${date.getFullYear()}${month[date.getMonth()]}`;

        const resUniqueMonth = await rp.get(
            `https://coolweddingfaq.firebaseio.com/${tableName}.json`);
        if (resUniqueMonth === 'null') {
            await rp.post(`https://coolweddingfaq.firebaseio.com/${tableName}.json`, config2);
        } else {
            const users = [
                ...new Set(Object.values(JSON.parse(resUniqueMonth)).map(item => item.user))];

            if (!users.some(item => item === msg.from.username)) {
                await rp.post(`https://coolweddingfaq.firebaseio.com/${tableName}.json`, config2);
            } else {
                const currentUser = Object.values(JSON.parse(resUniqueMonth)).
                    find(item => item.user === msg.from.username);

                currentUser.wmak.push({
                    text: msg.text,
                    date: new Date(Date.now()).toString(),
                });

                const curUser = Object.keys(JSON.parse(resUniqueMonth)).map(key => ({
                    name: JSON.parse(resUniqueMonth)[key].user,
                    id: key,
                }));

                const idUser = curUser.find(item => item.name === msg.from.username).id;

                const config3 = { 'Content-Type': 'application/json' };
                config3.body = JSON.stringify({
                    user: msg.from.username,
                    wmak: currentUser.wmak,
                });

                await rp.put(`https://coolweddingfaq.firebaseio.com/${tableName}/${idUser}.json`,
                    config3);
            }
        }

        switch (msg.text) {
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
                    reply_markup: { resize_keyboard: true, keyboard: keyboard.homeUA },
                });
                break;
            case kb.lang.RU:
                await bot.sendMessage(chatId, `${answers.helloRU}${msg.from.first_name} !`, {
                    reply_markup: { resize_keyboard: true, keyboard: keyboard.homeRU },
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
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2RU },
                    });
                break;
            case kb.homeUA.detail:
                await bot.sendMessage(chatId, `${answers.detailUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2UA },
                    });
                break;
            case kb.homeRU.weddingSite:
                // language=HTML
                await bot.sendMessage(chatId, `${answers.weddingSiteRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home4RU },
                        parse_mode: 'HTML',
                    });
                break;
            case kb.homeUA.weddingSite:
                // language=HTML
                await bot.sendMessage(chatId, `${answers.weddingSiteUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home4UA },
                        parse_mode: 'HTML',
                    });
                break;
            case kb.home2RU.reservation:
                await bot.sendMessage(chatId, `${answers.reservationRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2RU },
                    });
                break;
            case kb.home2UA.reservation:
                await bot.sendMessage(chatId, `${answers.reservationUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2UA },
                    });
                break;
            case kb.home2RU.pay:
                await bot.sendMessage(chatId, `${answers.payRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2RU },
                    });
                break;
            case kb.home2UA.pay:
                await bot.sendMessage(chatId, `${answers.payUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2UA },
                    });
                break;
            case kb.home2RU.deadlines:
                await bot.sendMessage(chatId, `${answers.deadlinesRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2RU },
                    });
                break;
            case kb.home2UA.deadlines:
                await bot.sendMessage(chatId, `${answers.deadlinesUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2UA },
                    });
                break;
            case kb.home2RU.contract:
                await bot.sendMessage(chatId, `${answers.contractRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2RU },
                    });
                break;
            case kb.home2UA.contract:
                await bot.sendMessage(chatId, `${answers.contractUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2UA },
                    });
                break;
            case kb.home2RU.twoCamera:
                await bot.sendMessage(chatId, `${answers.twoCameraRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2RU },
                    });
                break;
            case kb.home2UA.twoCamera:
                await bot.sendMessage(chatId, `${answers.twoCameraUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2UA },
                    });
                break;
            case kb.home2RU.material:
                await bot.sendMessage(chatId, `${answers.materialRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2RU },
                    });
                break;
            case kb.home2UA.material:
                await bot.sendMessage(chatId, `${answers.materialUA}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.home2UA },
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
                                            text: '14000 грн ₴',
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
            Початковий матеріал
            Попередня зустріч`,
                    {
                        reply_markup:
                            {
                                resize_keyboard: true,
                                inline_keyboard: [
                                    [
                                        {
                                            text: '14000 грн ₴',
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
                                            text: '17000 грн ₴',
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
                                            text: '17000 грн ₴',
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
                                            text: '19000 грн ₴',
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
                                            text: '19000 грн ₴',
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
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.homeRU },
                    });
                break;
            case kb.backUA:
                await bot.sendMessage(chatId, `${answers.backUAanswer}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.homeUA },
                    });
                break;
            case kb.contactRU:
                await bot.sendMessage(chatId, `${answers.contactRU}`,
                    {
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.homeRU },
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
                        reply_markup: { resize_keyboard: true, keyboard: keyboard.homeUA },
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
