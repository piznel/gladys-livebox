(function () {
	'use strict';
	
	angular
		.module('gladys')
		.controller('liveboxCtrl', liveboxCtrl); 
		//Gardez bien le "BoxCtrl" !

        liveboxCtrl.$inject  = ['boxService'];

	function  liveboxCtrl(boxService) {
		var  vm  =  this;
		vm.init = init;
        vm.updateBoxParams = updateBoxParams;
		vm.box = null;
		
		function init(id){
			boxService.getById(id) //On appel la route "getById" du service
				.then(function(data){
					vm.box = data.data; //On sauvegarde tout 
					activate(); //On active notre box
				});
		}
		
		function activate(){
			console.log('le controlleur est vivant ! :', vm.box.param)
		}

		function updateBoxParams(hello_world){
			boxService.update(vm.box.id, {params: {text: hello_world}})
				.then(function(data){
					console.log("Paramètres sauvegardés !")
				});
		}
	}
})();