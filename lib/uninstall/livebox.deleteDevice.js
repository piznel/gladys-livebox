module.exports = function deleteDevice(){
	sails.log.debug('Début désinstallation du device');
	gladys.device.getByService({'service':'livebox'})
	.then((devices) => {
		devices.forEach(function(device) {
			gladys.device.delete(device)

		})
		return devices;
	})
	sails.log.debug('Fin désinstallation du device');
}