const sendCommand = require('../livebox.sendCommand.js');

module.exports = function setChannel(params){
    sails.log.debug('livebox.channel.'+params.channel);
    if(typeof(params.channel) === 'number') {params.channel = params.channel.toString()}
    return sendCommand(params.channel, params);
};
