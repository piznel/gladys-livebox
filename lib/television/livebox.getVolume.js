var shared = require('../livebox.shared.js');

module.exports = function getVolume(params){
    return new Promise(function(resolve, reject){
        sails.log.debug('livebox.volume');
        if(!shared.instances[params.deviceType.device]) return reject(`No livebox with deviceId ${params.deviceType.device}`);

        // call the livebox function
        return shared.instances[params.deviceType.device].getVolume();
    });
};