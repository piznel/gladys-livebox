const stop = require('./livebox.stop.js')
const start = require('./livebox.start.js')
const shared = require('../livebox.shared.js');

module.exports = function switchState(params){
	shared.setStatusPower(!!params.state);
	switch(shared.getStatusPower()) {
		case true :
			start(params)
			break;
		case false :
            stop(params)
			break;
		default:
			sails.log.error('error durring switch !')
	}
	if (params.deviceTypeId !== undefined || params.deviceTypeId != 0) {
		return gladys.deviceState.create({
			'devicetype': params.deviceTypeId,
			'value':shared.getStatusPower() ? 1 : 0
		})
	}
}