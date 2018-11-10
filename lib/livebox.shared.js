
var statusPower = '';

module.exports = {
	getStatusPower: function(){
		return statusPower;
	},

	setStatusPower: function(newStatusPower){
		statusPower = newStatusPower;
	}
};