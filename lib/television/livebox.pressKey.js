const sendCommand = require('../livebox.sendCommand.js');
const key = ['OK','RIGHT','LEFT','UP','DOWN','BACK']

module.exports = function pressKey(params){
    if(key.indexOf(params.key.toUpperCase())>=0) {        
        return sendCommand(params.key.toUpperCase(), params);
    }
};
