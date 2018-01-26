var exports = module.exports = {};
var pythonShell = require('python-shell');
exports.createLayer = function (red, green, blue, redvalue, greenvalue, bluevalue, dir) {
    var b1 = red;
    var b2 = green;
    var b3 = blue;
    var options = {
        args: [b1, b2, b3, redvalue, greenvalue, bluevalue, dir]
    };
    pythonShell.run('pythonScripts/mergeBands.py', options, function (err) {
        if (err) throw err;
        console.log('finished');
    })
};