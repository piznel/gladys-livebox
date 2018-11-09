const sendCommand = require('../livebox.sendCommand.js');
const key = ['OK','RIGHT','LEFT','UP','DOWN','BACK']

module.exports = function pressKey(params){
    if(key.indexOf(params.key.toUpperCase())>=0) {
        return sendCommand(params.key.toUpperCase(), params);
    } else {
        if(params.key.substring(0, 3) = 'epg:') {
            var epg_id = params.key.substring(4)
            epg_id = '*'.repeat (10 - epg_id.length) + epg_id
            return sendCommand(epg_id, params);
        }
    }
};
