const sendCommand = require('../livebox.sendCommand.js');

module.exports = function play(params){
    params.controlType = "SKIP_PREV"
    return mediaControl(params)
};