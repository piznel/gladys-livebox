var stop = require('./livebox.stop.js')
var start = require('./livebox.start.js')

module.exports = function switchState(params){
	sails.log.error('switchState:params :', params)
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
	if (params.deviceType.Id !== undefined || params.deviceType.Id != 0) {
		gladys.deviceState.create({state:{
			deviceType:params.deviceType.Id,
			value:!!params.state
		}})
	}
}