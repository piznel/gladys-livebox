const sendCommand = require('../livebox.sendCommand.js');

module.exports = function setChannel(params){
    sails.log.debug('livebox.channel.'+params.channel);
    return sendCommand(params.channel, params);
};
