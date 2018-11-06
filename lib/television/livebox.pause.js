const sendCommand = require('../livebox.sendCommand.js');

module.exports = function pause(params){
    sails.log.debug('livebox.stop_Media');
    return sendCommand('STOP_MEDIA', params);
};