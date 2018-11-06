const sendCommand = require('../livebox.sendCommand.js');

module.exports = function fastForward(params){
    sails.log.debug('livebox.fastForward');
    return sendCommand('FASTFORWARD', params);
};