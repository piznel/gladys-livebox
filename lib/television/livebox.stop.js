const sendCommand = require('../livebox.sendCommand.js');

module.exports = function stop(params) {
  sails.log.debug('livebox.stop');
  return sendCommand('STOP', params);
};


