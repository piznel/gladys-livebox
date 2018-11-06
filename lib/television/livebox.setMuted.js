const sendCommand = require('../livebox.sendCommand.js');

module.exports = function setMuted(params){
    sails.log.debug('livebox.setMuted');
    return sendCommand('MUTE', params);
};
