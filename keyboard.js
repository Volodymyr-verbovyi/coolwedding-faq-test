const kb = require('./keyboard-buttons');

module.exports = {
    lang: [
        [kb.lang.RU, kb.lang.UA],
    ],
    homeRU: [
        [kb.homeRU.price],
        [kb.homeRU.detail, kb.homeRU.weddingSite],
        [kb.contactRU],
    ],
    home2RU: [
        [kb.home2RU.deadlines, kb.home2RU.pay],
        [kb.home2RU.reservation, kb.home2RU.contract],
        [kb.home2RU.twoCamera, kb.home2RU.material],
        [kb.backRU],
    ],
    home3RU: [
        [kb.home3RU.hours8, kb.home3RU.hours10],
        [kb.home3RU.hours12, kb.contactRU_3],
        [kb.backRU],
    ],
    home4RU: [
        [kb.home4RU.var1, kb.home4RU.var2, kb.home4RU.var3],
        [kb.backRU],
    ],
    homeUA: [
        [kb.homeUA.price],
        [kb.homeUA.detail, kb.homeUA.weddingSite],
        [kb.contactUA],
    ],
    home2UA: [
        [kb.home2UA.deadlines, kb.home2UA.pay],
        [kb.home2UA.reservation, kb.home2UA.contract],
        [kb.home2UA.twoCamera, kb.home2UA.material],
        [kb.backUA],
    ],
    home3UA: [
        [kb.home3UA.hours8, kb.home3UA.hours10],
        [kb.home3UA.hours12, kb.contactUA_3],
        [kb.backUA],
    ],
    home4UA: [
        [kb.home4UA.var1UA, kb.home4UA.var2UA, kb.home4UA.var3UA],
        [kb.backUA],
    ],
};