const sendCommand = require('../livebox.sendCommand.js');

module.exports = function rewind(params){
    sails.log.debug('livebox.programPlus');
    return sendCommand('PROGPLUS', params);
};