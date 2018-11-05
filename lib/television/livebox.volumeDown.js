const volumeUpDown = require('./livebox.volumeUpDown.js');

module.exports = function volumeDown(params){
    params.volumeControl = 'VOLDOWN';

    return volumeUpDown(params);
};
