const sendCommand = require('../livebox.sendCommand.js');

module.exports = function volumeUp(params){
    sails.log.debug('livebox.volUp');
    return sendCommand('VOLUP', params);
};
