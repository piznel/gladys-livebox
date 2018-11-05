const sendCommand = require('../livebox.sendCommand.js');

module.exports = function start(params){
    sails.log.debug('livebox.start');
    return sendCommand('START', params);
};
