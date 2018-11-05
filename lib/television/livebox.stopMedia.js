var mediaControl = require('./livebox.mediaControl');

module.exports = function stop(params){
    params.controlType = "STOP"
    return mediaControl(params)
};