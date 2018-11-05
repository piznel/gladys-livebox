const sendCommand = require('../livebox.sendCommand.js');

module.exports = function rec(params){
    sails.log.debug('livebox.apps');
    return sendCommand('APPS', params);
};
