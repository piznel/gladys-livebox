var statusPower = '';
var statusInterval = true

module.exports = {
  getStatusPower: function() {
    return statusPower;
  },

  setStatusPower: function(newStatusPower) {
    statusPower = newStatusPower;
  },

  getStatusInterval: function() {
    return statusInterval
  },

  setStatusInterval(newStatus) {
    statusInterval = newStatus;
  }
};