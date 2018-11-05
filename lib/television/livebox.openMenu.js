const sendCommand = require('../livebox.sendCommand.js');

module.exports = function openMenu(params){
    sails.log.debug('livebox.menu');
    return sendCommand('MENU', params);
};
