const sendCommand = require('../livebox.sendCommand.js');

module.exports = function rec(params){
    sails.log.debug('livebox.record');
    return sendCommand('REC', params);
};
