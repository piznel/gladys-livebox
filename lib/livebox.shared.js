
var statusPower = '';
var statusChannel = '';

module.exports = {
	getStatusPower: function(){
		return statusPower;
	},

	setStatusPower: function(newStatusPower){
		statusPower = newStatusPower;
	},

	getStatusChannel: function() {
		return statusChannel;
	},

	setStatusChannel: function(newStatusChannel) {
		statusChannel = newStatusChannel;
	}
};