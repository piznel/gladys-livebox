module.exports = function deleteDevice(){
	sails.log.debug('Uninstalling the Livebox module...');
	gladys.device.getByService({'service':'livebox'})
	.then((devices) => {
		devices.forEach(function(device) {
			gladys.device.delete(device)
		})
		sails.log.debug('uninstalled Livebox module!');
	})
}