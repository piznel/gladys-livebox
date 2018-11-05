//const livebox = require('./livebox_api.js');
//var shared = require('./livebox.shared.js');

module.exports = function init() {
    console.log('init')
    /*return gladys.param.getValue('DECODEUR_LIVEBOX_LIST')
    .then((DECODEUR_LIVEBOX_LIST) => {
        return liveboxListIp=DECODEUR_LIVEBOX_LIST.split('|');
    })
    .catch(() => {
        return []
    })
    .then((liveboxListIp) => {

        // reset all instances 
        shared.instances = {};

        liveboxListIp.forEach(liveboxIp => {
            gladys.device.getByIdentifier({identifier:liveboxIp,service:'livebox'})
            .then((device) => {
                shared.instances[device.id]= new livebox(liveboxIp);
            })
            .catch((er) => {
                sails.log.info('No livebox decoder install yet {'+liveboxIp+'}')
            })
        });
    })*/
};
