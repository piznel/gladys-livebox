const sendCommand = require('../livebox.sendCommand.js');

module.exports = function yellowButton(params){
    sails.log.debug('livebox.yellowButton');
    return sendCommand('VOD', params);
};
