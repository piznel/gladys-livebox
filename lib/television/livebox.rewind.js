var mediaControl = require('./livebox.mediaControl');

module.exports = function rewind(params){
    params.controlType = "REWIND"
    return mediaControl(params)
};