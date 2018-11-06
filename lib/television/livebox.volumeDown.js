const sendCommand = require('../livebox.sendCommand.js');

module.exports = function volumeDown(params){
    sails.log.debug('livebox.volDown');
    return sendCommand('VOLDOWN', params);
};
