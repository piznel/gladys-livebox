const sendCommand = require('../livebox.sendCommand.js');

const controlType = ['PLAY', 'STOP', 'PAUSE', 'REWIND', 'FASTFORWARD', 'SKIP_PREV', 'SKIP_NEXT']

module.exports = function mediaControl(params){
    sails.log.debug('livebox.mediaControl.'+params.controlType);
    if(controlType.indexOf(params.controlType.toUpperCase())>=0) {
        if(params.controlType === 'FASTFORWARD') params.controlType = 'FF';
        else if(params.controlType === 'REWIND') params.controlType = 'REW';
        
        return sendCommand(params.controlType.toUpperCase(), params);
    }
};
