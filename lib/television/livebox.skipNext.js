var mediaControl = require('./livebox.mediaControl');

module.exports = function play(params){
    params.controlType = "SKIP_NEXT"
    return mediaControl(params)
};