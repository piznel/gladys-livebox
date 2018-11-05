var mediaControl = require('./livebox.mediaControl');

module.exports = function play(params){
    params.controlType = "PAUSE"
    return mediaControl(params)
};