var deleteSentences = require('./uninstall/livebox.deleteSentences.js');
var deleteDevice = require('./uninstall/livebox.deleteDevice.js');

module.exports = function uninstall(){

	deleteDevice()
    
};