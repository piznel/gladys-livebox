module.exports = function() {
    var param = {
		name: 'DECODEUR_LIVEBOX',
        value: '1.1.1.1',
        }
    
    var Promise = require('bluebird');
        
    return gladys.param.getValue(param.name)
    .catch(() => {
        sails.log.error('please enter the IP of the decoder in the parameter "DECODEUR_LIVEBOX" and then run a new configuration')
        return gladys.param.setValue(param);
    })
    .then((result) => {
        return createDevice(result);
    });
};


function createDevice(ip) {
    return new Promise(function(resolve, reject) {
    // Check if IP is valid IP address
    var ipRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    if (!ipRegExp.test(ip)) { reject (new Error('You entered invalid IP address!'))}
    if (ip === '1.1.1.1') {reject (new Error('Please indicate the correct IP address of your decoder in the "DECODEUR_LIVEBOX" parameter.'))}

    // if valid IP, create device and deviceTypes
    const Newdevice = {
        device: {
            name: 'livebox decoder',
            protocol: 'wifi',
            service: 'livebox',
            identifier: ip
        },
        types: [
            {
                name: 'Power',
                type: 'toggle',
                category:'television',
                identifier: 'Power',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Mute',
                type: 'push',
                identifier: 'Mute',
                category:'television',
                sensor: false,
                min: 0,
                max: 1,
            },
        ]
    }
    resolve(gladys.device.create(Newdevice));
    })
}
