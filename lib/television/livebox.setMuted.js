const sendCommand = require('../livebox.sendCommand.js');

module.exports = function setMuted(params){
    sails.log.debug('livebox.setMuted.'+params.status);
        return sendCommand('MUTE', params);
};
