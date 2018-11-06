const sendCommand = require('../livebox.sendCommand.js');

module.exports = function play(params){
    sails.log.debug('livebox.play');
    return sendCommand('PLAY', params);
};