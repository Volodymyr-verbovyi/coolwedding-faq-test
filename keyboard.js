const kb = require('./keyboard-buttons');

module.exports = {
    home: [
        [kb.home.price,kb.home.pak],
        [kb.home.locations,kb.home.weddingSite],
        [kb.contact]
    ],
    home2: [
        [kb.home2.deadlines,kb.home2.pay],
        [kb.home2.reservation,kb.home2.contract],
        [kb.back]
    ],
    home3: [
        [kb.home3.hours8,kb.home3.hours10],
        [kb.home3.hours12,kb.home3.hours],
        [kb.back]
    ],
    home4: [
        [kb.home4.twoCamera,kb.home4.equipment],
        [kb.home4.material],
        [kb.back]
    ],
    home5: [
        [kb.home5.var1,kb.home5.var2,kb.home5.var3],
        [kb.back]
    ]
};