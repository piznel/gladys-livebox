var mediaControl = require('./livebox.mediaControl');

module.exports = function play(params){
    params.controlType = "PLAY"
    return mediaControl(params)
};