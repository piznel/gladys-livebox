var shared = require('../livebox.shared.js');

module.exports = function setVolume(params){
    return new Promise(function(resolve, reject){
        sails.log.debug('livebox.volume.'+params.volume);
        if(!shared.instances[params.deviceType.device]) return reject(`No livebox with deviceId ${params.deviceType.device}`);

        // call the livebox function
        shared.instances[params.deviceType.device].setVolume(params.volume);
    });
};