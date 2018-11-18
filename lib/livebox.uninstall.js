const deleteDevice = require('./uninstall/livebox.deleteDevice.js');
const shared = require('./livebox.shared.js');
const queries = require('./livebox.queries.js');


module.exports = function uninstall() {

  //stop check status TV interval
  shared.setStatusInterval(false);

  //delete devices
  var liveboxDevices = deleteDevice()
  console.log('liveboxDevices', JSON.stringify(liveboxDevices))

  // delete param
  var param = {
    name: "DECODEUR_LIVEBOX"
  }
  gladys.param.delete(param)
    .then(function(param) {
      sails.log.debug('parameter "DECODEUR_LIVEBOX" deleted !');
    });

  // delete dashboard box
  gladys.utils.sql(queries.deleteBox)
    .then(function(data) {
      sails.log.debug('Livebox box deleted !');
    })

  // delete boxType
  return gladys.utils.sql(queries.deleteBoxType)
    .then(function(data) {
      sails.log.debug('Livebox boxType deleted !');
    })
};