var deleteDevice = require('./uninstall/livebox.deleteDevice.js');

module.exports = function uninstall(){

	deleteDevice()

	var param = {
		name: "DECODEUR_LIVEBOX"
   }
   
   gladys.param.delete(param)
		.then(function(param){
			sails.log.debug('suppression du paramètre "DECODEUR_LIVEBOX"');
		})
    
};