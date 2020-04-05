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
    home2: [
        [kb.home2.deadlines, kb.home2.pay],
        [kb.home2.reservation, kb.home2.contract],
        [kb.home2.twoCamera, kb.home2.material],
        [kb.home2.equipment, kb.contact],
        [kb.backUA],
    ],
    home2UA: [
        [kb.home2UA.deadlines, kb.home2UA.pay],
        [kb.home2UA.reservation, kb.home2UA.contract],
        [kb.home2UA.twoCamera, kb.home2UA.material],
        [kb.home2.equipment, kb.contact],
        [kb.back],
    ],
    home3: [
        [kb.home3.hours8, kb.home3.hours10],
        [kb.home3.hours12, kb.contact],
        [kb.back],
    ],
    home3UA: [
        [kb.home3UA.hours8, kb.home3UA.hours10],
        [kb.home3UA.hours12, kb.contactUA],
        [kb.backUA],
    ],
    home4: [
        [kb.home4.twoCamera, kb.home4.equipment],
        [kb.home4.material],
        [kb.back],
    ],
    home4UA: [
        [kb.home4.twoCamera, kb.home4.equipment],
        [kb.home4.material],
        [kb.backUA],
    ],
    home5: [
        [kb.home5.var1, kb.home5.var2, kb.home5.var3],
        [kb.back],
    ],
    home5UA: [
        [kb.home5UA.var1, kb.home5UA.var2, kb.home5UA.var3],
        [kb.backUA],
    ],
};