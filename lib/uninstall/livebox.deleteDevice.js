module.exports = function deleteDevice(){
	sails.log.debug('Début désinstallation du device');
	return gladys.device.getByService({'service':'livebox'})
	.then((devices) => {
		devices.forEach(function(device) {
			gladys.device.delete(device)

		})
		sails.log.debug('Fin désinstallation du device');
		return devices;
	})
}