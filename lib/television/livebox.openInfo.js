const sendCommand = require('../livebox.sendCommand.js');

module.exports = function openInfo(params){
    sails.log.debug('livebox.info');
    return sendCommand('INFO', params);
};
