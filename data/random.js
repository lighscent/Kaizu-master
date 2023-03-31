var rn = require('random-number');

var randomDaily = rn.generator({
    min: 500,
    max: 1000,
    integer: true
})


module.exports = randomDaily;