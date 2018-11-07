var stop = require('./livebox.stop.js')
var start = require('./livebox.start.js')

module.exports = function switchState(params){
	switch(!!params.state) {
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
			'value':params.state ? 1 : 0
		})
	}
}