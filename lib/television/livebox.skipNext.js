const sendCommand = require('../livebox.sendCommand.js');

module.exports = function play(params){
    params.controlType = "SKIP_NEXT"
    return mediaControl(params)
};