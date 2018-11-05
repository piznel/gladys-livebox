var mediaControl = require('./livebox.mediaControl');

module.exports = function fastForward(params){
    params.controlType = "FASTFORWARD"
    return mediaControl(params)
};