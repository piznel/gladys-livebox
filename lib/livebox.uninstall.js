var deleteDevice = require('./uninstall/livebox.deleteDevice.js');

module.exports = function uninstall(){

	deleteDevice()

	var param = {
		name: "DECODEUR_LIVEBOX"
   }

   boxLivebox = {
    uuid: '451a8766-407b-43ca-b1d4-2f2787ef4f6b',
    title: 'Orange TV',
    path: 'hooks/livebox/views/livebox.ejs',
    view: 'dashboard'
  }
   
   gladys.param.delete(param)
		.then(function(param){
			sails.log.debug('suppression du paramètre "DECODEUR_LIVEBOX"');
		})
    
};