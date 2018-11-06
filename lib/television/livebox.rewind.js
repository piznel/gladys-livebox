const sendCommand = require('../livebox.sendCommand.js');

module.exports = function rewind(params){
    sails.log.debug('livebox.rewind');
    return sendCommand('REWIND', params);
};