const kb = require('./keyboard-buttons');

module.exports = {
    lang: [
        [kb.lang.RU, kb.lang.UA],
    ],
    homeRU: [
        [kb.homeRU.price],
        [kb.homeRU.detail, kb.homeRU.weddingSite],
        [kb.contact],
    ],
    homeUA: [
        [kb.homeUA.price],
        [kb.homeUA.detail, kb.homeUA.weddingSite],
        [kb.contactUA],
    ],
    home2RU: [
        [kb.home2RU.deadlines, kb.home2RU.pay],
        [kb.home2RU.reservation, kb.home2RU.contract],
        [kb.home2RU.twoCamera, kb.home2RU.material],
        [kb.home2RU.equipment, kb.contact],
        [kb.backUA],
    ],
    home2UA: [
        [kb.home2UA.deadlines, kb.home2UA.pay],
        [kb.home2UA.reservation, kb.home2UA.contract],
        [kb.home2UA.twoCamera, kb.home2UA.material],
        [kb.home2RU.equipment, kb.contact],
        [kb.backUA],
    ],
    home3RU: [
        [kb.home3RU.hours8, kb.home3RU.hours10],
        [kb.home3RU.hours12, kb.contact],
        [kb.backRU],
    ],
    home3UA: [
        [kb.home3UA.hours8, kb.home3UA.hours10],
        [kb.home3UA.hours12, kb.contactUA],
        [kb.backUA],
    ],
    home4: [
        [kb.home4.twoCamera, kb.home4.equipment],
        [kb.home4.material],
        [kb.backRU],
    ],
    home4UA: [
        [kb.home4.twoCamera, kb.home4.equipment],
        [kb.home4.material],
        [kb.backUA],
    ],
    home5RU: [
        [kb.home5RU.var1, kb.home5RU.var2, kb.home5RU.var3],
        [kb.backRU],
    ],
    home5UA: [
        [kb.home5UA.var1, kb.home5UA.var2, kb.home5UA.var3],
        [kb.backUA],
    ],
};