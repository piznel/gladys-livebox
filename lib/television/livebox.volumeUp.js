const volumeUpDown = require('./livebox.volumeUpDown.js');

module.exports = function volumeUp(params){
    params.volumeControl = 'VOLUP';

    return volumeUpDown(params);
};
