const sendCommand = require('../livebox.sendCommand.js');

module.exports = function rewind(params){
    sails.log.debug('livebox.programMinus');
    return sendCommand('PROGMINUS', params);
};